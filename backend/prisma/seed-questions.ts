import { PrismaClient } from '@prisma/client';
import { SECTOR_QUESTIONNAIRES } from '../src/data/questionnaires.data';
import { GENERAL_QUESTIONS } from '../src/data/general-questions.data';
import { SectorCategory, DiagnosticCategory } from '../src/types/questionnaire.types';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début de l\'importation des questions...');

  let totalImported = 0;

  // 1. Import des questions GÉNÉRALES (tous secteurs)
  console.log('\n📋 Importation des questions GÉNÉRALES (tronc commun)...');
  for (const question of GENERAL_QUESTIONS) {
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
          sector: 'GENERAL', // Secteur spécial pour questions communes
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
  console.log(`✅ ${GENERAL_QUESTIONS.length} questions générales importées`);

  // 2. Import des questions SECTORIELLES
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
  console.log(`   - Questions générales: ${GENERAL_QUESTIONS.length}`);
  console.log(`   - Questions sectorielles: ${totalImported - GENERAL_QUESTIONS.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
