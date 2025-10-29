import { Injectable } from '@nestjs/common';
import { HfInference } from '@huggingface/inference';

@Injectable()
export class HuggingFaceRAGService {
  private hf: HfInference;
  private readonly embeddingModel = 'sentence-transformers/all-MiniLM-L6-v2';
  private readonly generationModel = 'meta-llama/Meta-Llama-3-8B-Instruct';

  constructor() {
    const apiKey = process.env.HUGGINGFACE_API_KEY;
    if (!apiKey) {
      throw new Error('HUGGINGFACE_API_KEY manquante dans les variables d\'environnement');
    }
    this.hf = new HfInference(apiKey);
  }

  async generateEmbedding(text: string): Promise<number[]> {
    try {
      const result = await this.hf.featureExtraction({
        model: this.embeddingModel,
        inputs: text,
      });

      if (Array.isArray(result)) {
        return result as number[];
      }

      return [];
    } catch (error) {
      console.error('Erreur génération embedding:', error);
      throw new Error('Impossible de générer l\'embedding');
    }
  }

  async generateEmbeddings(texts: string[]): Promise<number[][]> {
    const embeddings: number[][] = [];
    
    for (const text of texts) {
      const embedding = await this.generateEmbedding(text);
      embeddings.push(embedding);
    }
    
    return embeddings;
  }

  cosineSimilarity(vecA: number[], vecB: number[]): number {
    if (vecA.length !== vecB.length) {
      return 0;
    }

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }

    if (normA === 0 || normB === 0) {
      return 0;
    }

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  async generateAnswer(
    question: string,
    relevantChunks: Array<{ content: string; source: string; similarity: number }>,
  ): Promise<{
    answer: string;
    confidence: number;
    source: string;
    explanation: string;
  }> {
    if (relevantChunks.length === 0) {
      return {
        answer: 'Je n\'ai pas trouvé d\'informations pertinentes dans la documentation disponible pour répondre à votre question.',
        confidence: 0,
        source: 'Aucune source',
        explanation: 'Aucun passage pertinent trouvé dans les documents.',
      };
    }

    const context = relevantChunks
      .slice(0, 3)
      .map((chunk, idx) => `[Document ${idx + 1}: ${chunk.source}]\n${chunk.content}`)
      .join('\n\n---\n\n');

    const systemPrompt = `Tu es un assistant expert en économie circulaire et normes ISO 59000. 
Ta mission est de répondre aux questions en te basant UNIQUEMENT sur les documents fournis.

RÈGLES STRICTES :
- Réponds uniquement avec les informations présentes dans les documents
- Si l'information n'est pas dans les documents, dis-le clairement
- Cite les sources (nom du document)
- Sois précis et factuel
- Structure ta réponse de manière claire
- Traite les fautes de frappe et synonymes avec intelligence
- Ne jamais inventer d'informations

DOCUMENTS DE RÉFÉRENCE :
${context}

QUESTION DE L'UTILISATEUR :
${question}

INSTRUCTIONS :
1. Analyse la question même si elle contient des erreurs
2. Cherche dans les documents les passages pertinents
3. Génère une réponse claire et structurée
4. Indique tes sources

Réponds maintenant de manière professionnelle et précise.`;

    try {
      let fullResponse = '';
      
      const stream = this.hf.chatCompletionStream({
        model: this.generationModel,
        messages: [
          {
            role: 'user',
            content: systemPrompt,
          },
        ],
        max_tokens: 1024,
        temperature: 0.3,
      });

      for await (const chunk of stream) {
        if (chunk.choices && chunk.choices.length > 0) {
          const delta = chunk.choices[0].delta;
          if (delta.content) {
            fullResponse += delta.content;
          }
        }
      }

      const avgSimilarity = relevantChunks.reduce((sum, chunk) => sum + chunk.similarity, 0) / relevantChunks.length;
      const confidence = Math.min(0.95, avgSimilarity);

      const sources = relevantChunks
        .slice(0, 2)
        .map((chunk) => chunk.source)
        .filter((v, i, a) => a.indexOf(v) === i)
        .join(', ');

      return {
        answer: fullResponse.trim() || 'Je n\'ai pas pu générer une réponse appropriée.',
        confidence: confidence,
        source: sources || 'Documents de la base de connaissances',
        explanation: `Réponse générée à partir de ${relevantChunks.length} passage(s) pertinent(s) avec une similarité moyenne de ${(avgSimilarity * 100).toFixed(1)}%.`,
      };
    } catch (error) {
      console.error('Erreur génération réponse:', error);
      
      const manualAnswer = this.generateManualAnswer(question, relevantChunks);
      return manualAnswer;
    }
  }

  private generateManualAnswer(
    question: string,
    chunks: Array<{ content: string; source: string; similarity: number }>,
  ): {
    answer: string;
    confidence: number;
    source: string;
    explanation: string;
  } {
    const bestChunk = chunks[0];
    const excerpt = bestChunk.content.substring(0, 400);

    const avgSimilarity = chunks.reduce((sum, chunk) => sum + chunk.similarity, 0) / chunks.length;

    return {
      answer: `Voici l'information pertinente trouvée dans la documentation :\n\n${excerpt}${bestChunk.content.length > 400 ? '...' : ''}`,
      confidence: avgSimilarity,
      source: chunks
        .slice(0, 2)
        .map((c) => c.source)
        .filter((v, i, a) => a.indexOf(v) === i)
        .join(', '),
      explanation: `Extrait direct du document le plus pertinent (similarité: ${(bestChunk.similarity * 100).toFixed(1)}%).`,
    };
  }

  splitTextIntoChunks(text: string, chunkSize: number = 500, overlap: number = 100): string[] {
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const chunks: string[] = [];
    let currentChunk = '';

    for (const sentence of sentences) {
      const trimmedSentence = sentence.trim();
      
      if ((currentChunk + ' ' + trimmedSentence).length > chunkSize && currentChunk.length > 0) {
        chunks.push(currentChunk.trim());
        
        const words = currentChunk.split(' ');
        const overlapWords = words.slice(-Math.floor(overlap / 5));
        currentChunk = overlapWords.join(' ') + ' ' + trimmedSentence;
      } else {
        currentChunk += (currentChunk ? ' ' : '') + trimmedSentence;
      }
    }

    if (currentChunk.trim().length > 0) {
      chunks.push(currentChunk.trim());
    }

    return chunks;
  }
}
