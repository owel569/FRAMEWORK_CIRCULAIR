
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

@Injectable()
export class ChatbotDocumentsService {
  private readonly uploadDir = path.join(process.cwd(), 'uploads', 'chatbot');

  constructor(private readonly prisma: PrismaService) {
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

    return document;
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

      // Supprimer de la base
      await this.prisma.chatbotDocument.delete({
        where: { id },
      });
    }

    return { message: 'Document supprimé avec succès' };
  }

  async searchInDocuments(query: string): Promise<any[]> {
    const activeDocuments = await this.prisma.chatbotDocument.findMany({
      where: { isActive: true },
    });

    const results = [];
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\s+/);

    for (const doc of activeDocuments) {
      const contentLower = doc.content.toLowerCase();
      let matchScore = 0;

      // Calculer un score de correspondance simple
      for (const word of queryWords) {
        if (contentLower.includes(word)) {
          matchScore += 1;
        }
      }

      if (matchScore > 0) {
        // Extraire un extrait pertinent
        const excerpt = this.extractRelevantExcerpt(doc.content, queryWords);

        results.push({
          documentId: doc.id,
          title: doc.title,
          excerpt,
          matchScore: matchScore / queryWords.length,
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

    return results.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
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
          `python3 ${path.join(process.cwd(), 'scripts', 'extract_pdf.py')} "${filePath}"`,
        );
        return stdout;
      } else if (ext === '.docx') {
        // Utiliser Python pour extraire le DOCX
        const { stdout } = await execAsync(
          `python3 ${path.join(process.cwd(), 'scripts', 'extract_docx.py')} "${filePath}"`,
        );
        return stdout;
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
    const sentences = content.split(/[.!?]+/);

    for (const sentence of sentences) {
      const sentenceLower = sentence.toLowerCase();
      let matches = 0;

      for (const word of queryWords) {
        if (sentenceLower.includes(word)) {
          matches++;
        }
      }

      if (matches >= Math.min(2, queryWords.length)) {
        return sentence.trim().substring(0, 200) + '...';
      }
    }

    return content.substring(0, 200) + '...';
  }
}
