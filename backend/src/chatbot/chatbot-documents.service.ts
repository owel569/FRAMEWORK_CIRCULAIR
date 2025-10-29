
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { HuggingFaceRAGService } from './huggingface-rag.service';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

@Injectable()
export class ChatbotDocumentsService {
  private readonly uploadDir = path.join(process.cwd(), 'uploads', 'chatbot');

  constructor(
    private readonly prisma: PrismaService,
    private readonly ragService: HuggingFaceRAGService,
  ) {
    // Créer le dossier uploads si inexistant
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async uploadDocument(
    file: Express.Multer.File,
    title: string,
    description: string | undefined,
    uploadedBy: string,
  ) {
    // Sauvegarder le fichier
    const filename = `${Date.now()}_${file.originalname}`;
    const filePath = path.join(this.uploadDir, filename);
    fs.writeFileSync(filePath, file.buffer);

    // Extraire le contenu
    const content = await this.extractContent(filePath, file.mimetype);
    const wordCount = content.split(/\s+/).length;

    // Détecter la langue (simple heuristique)
    const language = this.detectLanguage(content);

    // Créer l'entrée en base
    const document = await this.prisma.chatbotDocument.create({
      data: {
        filename,
        fileType: path.extname(file.originalname).toLowerCase(),
        filePath,
        fileSize: file.size,
        title,
        description,
        content,
        uploadedBy,
        wordCount,
        language,
      },
    });

    // Générer les chunks et embeddings en arrière-plan
    this.generateChunksAndEmbeddings(document.id, content, title).catch((error) => {
      console.error('Erreur génération embeddings:', error);
    });

    return document;
  }

  private async generateChunksAndEmbeddings(
    documentId: string,
    content: string,
    title: string,
  ): Promise<void> {
    try {
      // Diviser le contenu en chunks
      const chunks = this.ragService.splitTextIntoChunks(content, 500, 100);
      
      console.log(`Génération de ${chunks.length} chunks pour le document ${title}...`);

      // Générer les embeddings pour chaque chunk
      for (let i = 0; i < chunks.length; i++) {
        const chunkText = chunks[i];
        
        try {
          const embedding = await this.ragService.generateEmbedding(chunkText);
          
          // Stocker le chunk et son embedding
          await this.prisma.documentChunk.create({
            data: {
              documentId,
              chunkIndex: i,
              content: chunkText,
              embedding: JSON.stringify(embedding),
            },
          });
          
          console.log(`Chunk ${i + 1}/${chunks.length} traité`);
        } catch (error) {
          console.error(`Erreur traitement chunk ${i}:`, error);
        }
      }
      
      console.log(`✅ Document ${title} indexé avec ${chunks.length} chunks`);
    } catch (error) {
      console.error('Erreur génération chunks:', error);
      throw error;
    }
  }

  async getAllDocuments() {
    return this.prisma.chatbotDocument.findMany({
      orderBy: { uploadedAt: 'desc' },
      select: {
        id: true,
        filename: true,
        title: true,
        description: true,
        fileType: true,
        fileSize: true,
        isActive: true,
        wordCount: true,
        usageCount: true,
        uploadedAt: true,
      },
    });
  }

  async getDocument(id: string) {
    return this.prisma.chatbotDocument.findUnique({
      where: { id },
    });
  }

  async toggleDocument(id: string) {
    const document = await this.prisma.chatbotDocument.findUnique({
      where: { id },
    });

    return this.prisma.chatbotDocument.update({
      where: { id },
      data: { isActive: !document.isActive },
    });
  }

  async deleteDocument(id: string) {
    const document = await this.prisma.chatbotDocument.findUnique({
      where: { id },
    });

    if (document) {
      // Supprimer le fichier physique
      if (fs.existsSync(document.filePath)) {
        fs.unlinkSync(document.filePath);
      }

      // Supprimer de la base (les chunks sont supprimés automatiquement avec onDelete: Cascade)
      await this.prisma.chatbotDocument.delete({
        where: { id },
      });
    }

    return { message: 'Document supprimé avec succès' };
  }

  async searchInDocumentsRAG(query: string): Promise<{
    answer: string;
    confidence: number;
    source: string;
    explanation: string;
  }> {
    try {
      // Générer l'embedding de la question
      const queryEmbedding = await this.ragService.generateEmbedding(query);

      // Récupérer tous les chunks des documents actifs
      const activeDocuments = await this.prisma.chatbotDocument.findMany({
        where: { isActive: true },
        include: { chunks: true },
      });

      if (activeDocuments.length === 0 || activeDocuments.every(doc => doc.chunks.length === 0)) {
        return {
          answer: 'Aucun document n\'est actuellement disponible dans la base de connaissances. Veuillez uploader des documents pertinents.',
          confidence: 0,
          source: 'Aucune source',
          explanation: 'Aucun document trouvé dans la base.',
        };
      }

      // Calculer la similarité pour chaque chunk
      const chunksWithSimilarity: Array<{
        content: string;
        source: string;
        similarity: number;
        documentId: string;
      }> = [];

      for (const document of activeDocuments) {
        for (const chunk of document.chunks) {
          try {
            const chunkEmbedding = JSON.parse(chunk.embedding) as number[];
            const similarity = this.ragService.cosineSimilarity(queryEmbedding, chunkEmbedding);

            chunksWithSimilarity.push({
              content: chunk.content,
              source: document.title,
              similarity,
              documentId: document.id,
            });
          } catch (error) {
            console.error('Erreur parsing embedding:', error);
          }
        }
      }

      // Trier par similarité et garder les top 5
      const topChunks = chunksWithSimilarity
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 5);

      // Filtrer les chunks avec une similarité minimale (seuil: 0.3)
      const relevantChunks = topChunks.filter(chunk => chunk.similarity > 0.3);

      if (relevantChunks.length === 0) {
        return {
          answer: 'Je n\'ai pas trouvé d\'informations pertinentes dans la documentation actuelle pour répondre à votre question. Pourriez-vous reformuler ou poser une autre question ?',
          confidence: 0,
          source: 'Aucune source pertinente',
          explanation: 'Aucun passage avec une similarité suffisante n\'a été trouvé.',
        };
      }

      // Mettre à jour les compteurs d'utilisation
      const usedDocumentIds = [...new Set(relevantChunks.map(c => c.documentId))];
      for (const docId of usedDocumentIds) {
        await this.prisma.chatbotDocument.update({
          where: { id: docId },
          data: {
            usageCount: { increment: 1 },
            lastUsed: new Date(),
          },
        });
      }

      // Générer la réponse avec le LLM
      const response = await this.ragService.generateAnswer(query, relevantChunks);

      return response;
    } catch (error) {
      console.error('Erreur recherche RAG:', error);
      return {
        answer: 'Une erreur est survenue lors de la recherche. Veuillez réessayer.',
        confidence: 0,
        source: 'Erreur système',
        explanation: error.message,
      };
    }
  }

  async searchInDocuments(query: string): Promise<any[]> {
    const activeDocuments = await this.prisma.chatbotDocument.findMany({
      where: { isActive: true },
    });

    const results = [];
    const normalizedQuery = this.normalizeText(query);
    const queryWords = normalizedQuery.split(/\s+/).filter(w => w.length > 2);

    for (const doc of activeDocuments) {
      const normalizedContent = this.normalizeText(doc.content);
      let matchScore = 0;
      let exactMatches = 0;
      
      // Recherche de la phrase complète (bonus si trouvée)
      if (normalizedContent.includes(normalizedQuery)) {
        matchScore += 10;
        exactMatches += 1;
      }

      // Calculer un score de correspondance par mot
      for (const word of queryWords) {
        if (word.length < 3) continue; // Ignorer les mots trop courts
        
        const wordCount = (normalizedContent.match(new RegExp(word, 'g')) || []).length;
        if (wordCount > 0) {
          matchScore += wordCount * 2; // 2 points par occurrence
          exactMatches += 1;
        }
      }

      // Vérifier si au moins 30% des mots sont trouvés (plus sensible)
      const minMatches = Math.max(1, Math.floor(queryWords.length * 0.3));
      
      if (exactMatches >= minMatches && matchScore > 0) {
        // Extraire un extrait pertinent
        const excerpt = this.extractRelevantExcerpt(doc.content, queryWords);

        results.push({
          documentId: doc.id,
          title: doc.title,
          excerpt,
          matchScore: matchScore / queryWords.length,
          matchedWords: exactMatches,
        });

        // Incrémenter le compteur d'utilisation
        await this.prisma.chatbotDocument.update({
          where: { id: doc.id },
          data: {
            usageCount: { increment: 1 },
            lastUsed: new Date(),
          },
        });
      }
    }

    return results.sort((a, b) => b.matchScore - a.matchScore).slice(0, 5);
  }

  private normalizeText(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
      .replace(/[^\w\s]/g, ' ') // Remplace la ponctuation par des espaces
      .replace(/\s+/g, ' ') // Normalise les espaces multiples
      .trim();
  }

  private async extractContent(
    filePath: string,
    mimeType: string,
  ): Promise<string> {
    const ext = path.extname(filePath).toLowerCase();

    try {
      if (ext === '.txt' || ext === '.md') {
        return fs.readFileSync(filePath, 'utf-8');
      } else if (ext === '.pdf') {
        // Utiliser Python pour extraire le PDF
        const { stdout } = await execAsync(
          `python3 ${path.join(process.cwd(), 'backend', 'scripts', 'extract_pdf.py')} "${filePath}"`,
        );
        return stdout.trim();
      } else if (ext === '.docx') {
        // Utiliser Python pour extraire le DOCX
        const { stdout } = await execAsync(
          `python3 ${path.join(process.cwd(), 'backend', 'scripts', 'extract_docx.py')} "${filePath}"`,
        );
        return stdout.trim();
      }
    } catch (error) {
      console.error('Erreur extraction:', error);
      return '';
    }

    return '';
  }

  private detectLanguage(content: string): string {
    const frenchWords = ['le', 'la', 'les', 'de', 'et', 'est', 'des', 'pour'];
    const arabicPattern = /[\u0600-\u06FF]/;

    if (arabicPattern.test(content)) {
      return 'ar';
    }

    const words = content.toLowerCase().split(/\s+/).slice(0, 100);
    let frenchCount = 0;

    for (const word of words) {
      if (frenchWords.includes(word)) {
        frenchCount++;
      }
    }

    return frenchCount > 5 ? 'fr' : 'en';
  }

  private extractRelevantExcerpt(
    content: string,
    queryWords: string[],
  ): string {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    let bestSentences: { sentence: string; score: number; index: number }[] = [];

    // Scorer chaque phrase
    sentences.forEach((sentence, index) => {
      const normalizedSentence = this.normalizeText(sentence);
      let score = 0;

      for (const word of queryWords) {
        if (word.length < 3) continue;
        const occurrences = (normalizedSentence.match(new RegExp(word, 'g')) || []).length;
        score += occurrences * 3; // 3 points par occurrence
      }

      if (score > 0) {
        bestSentences.push({ sentence: sentence.trim(), score, index });
      }
    });

    // Trier par score et prendre les 2 meilleures phrases consécutives si possible
    bestSentences.sort((a, b) => b.score - a.score);

    if (bestSentences.length === 0) {
      return content.substring(0, 300) + '...';
    }

    // Prendre les 3 meilleures phrases pour un contexte plus riche
    let excerpt = '';
    const sentencesToInclude = Math.min(3, bestSentences.length);
    
    for (let i = 0; i < sentencesToInclude; i++) {
      if (excerpt.length > 0) {
        excerpt += '. ';
      }
      excerpt += bestSentences[i].sentence;
      
      // Arrêter si on dépasse 500 caractères
      if (excerpt.length > 500) {
        break;
      }
    }

    // Limiter la longueur totale
    if (excerpt.length > 600) {
      excerpt = excerpt.substring(0, 600) + '...';
    }

    return excerpt;
  }
}
