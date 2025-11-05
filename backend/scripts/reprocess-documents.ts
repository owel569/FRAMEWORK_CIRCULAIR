import { PrismaClient } from '@prisma/client';
import { HuggingFaceRAGService } from '../src/chatbot/huggingface-rag.service';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const prisma = new PrismaClient();

async function extractContent(filePath: string): Promise<string> {
  const ext = path.extname(filePath).toLowerCase();

  try {
    if (ext === '.txt' || ext === '.md') {
      return fs.readFileSync(filePath, 'utf-8');
    } else if (ext === '.pdf') {
      const { stdout } = await execAsync(
        `python3 ${path.join(process.cwd(), 'scripts', 'extract_pdf.py')} "${filePath}"`,
      );
      return stdout.trim();
    } else if (ext === '.docx') {
      const { stdout } = await execAsync(
        `python3 ${path.join(process.cwd(), 'scripts', 'extract_docx.py')} "${filePath}"`,
      );
      return stdout.trim();
    }
  } catch (error) {
    console.error('Erreur extraction:', error);
    return '';
  }

  return '';
}

async function main() {
  console.log('🔄 Retraitement des documents...\n');

  const ragService = new HuggingFaceRAGService();
  
  const documents = await prisma.chatbotDocument.findMany({
    include: {
      chunks: true,
    },
  });

  console.log(`📚 ${documents.length} document(s) à retraiter\n`);

  for (const doc of documents) {
    console.log(`📄 Traitement: ${doc.title}`);
    console.log(`   Fichier: ${doc.filename}`);

    try {
      // Extraire le contenu
      const content = await extractContent(doc.filePath);
      
      if (!content || content.length < 10) {
        console.log(`   ⚠️  Contenu vide ou trop court - IGNORÉ\n`);
        continue;
      }

      const wordCount = content.split(/\s+/).length;
      console.log(`   ✅ ${wordCount} mots extraits`);

      // Mettre à jour le contenu
      await prisma.chatbotDocument.update({
        where: { id: doc.id },
        data: {
          content,
          wordCount,
        },
      });

      // Supprimer les anciens chunks
      await prisma.documentChunk.deleteMany({
        where: { documentId: doc.id },
      });
      console.log(`   🗑️  Anciens chunks supprimés`);

      // Générer les nouveaux chunks
      const chunks = ragService.splitTextIntoChunks(content, 500, 100);
      console.log(`   📦 ${chunks.length} chunks générés`);

      // Générer les embeddings
      for (let i = 0; i < chunks.length; i++) {
        const chunkText = chunks[i];
        
        try {
          const embedding = await ragService.generateEmbedding(chunkText);
          
          await prisma.documentChunk.create({
            data: {
              documentId: doc.id,
              chunkIndex: i,
              content: chunkText,
              embedding: JSON.stringify(embedding),
            },
          });
          
          if ((i + 1) % 5 === 0 || i === chunks.length - 1) {
            console.log(`   ⏳ ${i + 1}/${chunks.length} chunks traités`);
          }
        } catch (error) {
          console.error(`   ❌ Erreur chunk ${i}:`, error.message);
        }
      }

      console.log(`   ✅ Document retraité avec succès!\n`);
    } catch (error) {
      console.error(`   ❌ Erreur:`, error.message, '\n');
    }
  }

  console.log('✅ Retraitement terminé!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
