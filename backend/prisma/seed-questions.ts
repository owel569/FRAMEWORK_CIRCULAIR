import { PrismaClient } from '@prisma/client';
import { SECTOR_QUESTIONNAIRES } from '../src/data/questionnaires.data';
import { SectorCategory, DiagnosticCategory } from '../src/types/questionnaire.types';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début de l\'importation des questions...');

  let totalImported = 0;

  for (const [sectorKey, sectorData] of Object.entries(SECTOR_QUESTIONNAIRES)) {
    console.log(`\n📊 Importation des questions pour: ${sectorKey}`);
    
    for (const question of sectorData.questions) {
      try {
        await prisma.questionnaireQuestion.upsert({
          where: { questionId: question.id },
          update: {
            text: question.text,
            type: question.type,
            weight: question.weight,
            unit: question.unit || null,
            choices: question.choices ? JSON.stringify(question.choices) : null,
            category: question.category,
          },
          create: {
            questionId: question.id,
            sector: sectorKey,
            category: question.category,
            text: question.text,
            type: question.type,
            weight: question.weight,
            unit: question.unit || null,
            choices: question.choices ? JSON.stringify(question.choices) : null,
          },
        });
        totalImported++;
      } catch (error) {
        console.error(`❌ Erreur pour ${question.id}:`, error);
      }
    }
    
    console.log(`✅ ${sectorData.questions.length} questions importées pour ${sectorKey}`);
  }

  console.log(`\n🎉 Total: ${totalImported} questions importées avec succès!`);
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
