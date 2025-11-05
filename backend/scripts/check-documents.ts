import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('📊 Vérification des documents...\n');
  
  const documents = await prisma.chatbotDocument.findMany({
    select: {
      id: true,
      filename: true,
      title: true,
      isActive: true,
      wordCount: true,
      uploadedAt: true,
      _count: {
        select: { chunks: true }
      }
    },
    orderBy: { uploadedAt: 'desc' }
  });
  
  console.log(`Total documents: ${documents.length}\n`);
  
  documents.forEach((doc, index) => {
    console.log(`${index + 1}. ${doc.title}`);
    console.log(`   Fichier: ${doc.filename}`);
    console.log(`   Actif: ${doc.isActive ? '✅' : '❌'}`);
    console.log(`   Mots: ${doc.wordCount}`);
    console.log(`   Chunks: ${doc._count.chunks}`);
    console.log(`   Uploadé: ${doc.uploadedAt}`);
    console.log('');
  });
  
  const totalChunks = await prisma.documentChunk.count();
  console.log(`\n📦 Total chunks générés: ${totalChunks}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
