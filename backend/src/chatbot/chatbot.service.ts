import { Injectable } from '@nestjs/common';
import { HfInference } from '@huggingface/inference';

interface KnowledgeEntry {
  keywords: string[];
  answer: string;
  category: string;
  priority: number;
}

@Injectable()
export class ChatbotService {
  private hf: HfInference;

  constructor() {
    // Remplacer par votre clé API Hugging Face (à mettre dans Secrets)
    const HF_API_KEY = process.env.HUGGING_FACE_API_KEY || '';
    this.hf = new HfInference(HF_API_KEY);
  }

  private knowledgeBase: KnowledgeEntry[] = [
    // Famille ISO 59000 - Vue d'ensemble
    {
      keywords: ['iso 59000', 'famille iso', 'normes iso circulaire'],
      answer: '🌍 La famille ISO 59000 est l\'ensemble des normes internationales dédiées à l\'économie circulaire. Elle comprend ISO 59004 (mise en œuvre), ISO 59010 (indicateurs), ISO 59020 (mesure de circularité), ISO 59014 (vocabulaire), et d\'autres normes en développement comme ISO 59001 (système de management).',
      category: 'normes',
      priority: 10,
    },
    // Économie circulaire - Concepts
    {
      keywords: ['économie circulaire', 'c\'est quoi', 'définition', 'qu\'est-ce que'],
      answer: '♻️ L\'économie circulaire est un système économique visant à maintenir la valeur des produits, matières et ressources le plus longtemps possible, en réduisant les déchets au minimum. Elle s\'oppose au modèle linéaire "extraire-fabriquer-jeter" et repose sur 3 principes : éliminer déchets et pollution, maintenir produits et matériaux en usage, régénérer les systèmes naturels.',
      category: 'concepts',
      priority: 10,
    },
    // Plateforme
    {
      keywords: ['plateforme', 'comment ça marche', 'utiliser', 'fonctionnement'],
      answer: '💻 Cette plateforme vous guide : 1) Remplissez le questionnaire sectoriel (20 secteurs disponibles), 2) Obtenez votre score de circularité sur 4 dimensions, 3) Consultez votre dashboard avec graphiques, 4) Recevez un plan d\'action personnalisé selon ISO 59004. Tout est conforme ISO 59000.',
      category: 'plateforme',
      priority: 10,
    },
  ];

  private handleSmallTalk(question: string): string | null {
    const greetings = [
      /^(salut|bonjour|hello|hi|hey|bonsoir|coucou)/i,
      /^(ça va|comment ça va|comment vas-tu|comment allez-vous|tu vas bien|vous allez bien)/i,
    ];

    const farewells = [
      /^(au revoir|bye|à bientôt|à plus|ciao|salut|tchao)/i,
      /^(merci|merci beaucoup|merci bien)/i,
    ];

    const aboutMe = [
      /^(qui es-tu|qui êtes-vous|c'est quoi|qu'est-ce que tu es|tu es qui|vous êtes qui)/i,
      /^(comment tu t'appelles|comment vous vous appelez|ton nom|votre nom)/i,
    ];

    // Salutations
    for (const pattern of greetings) {
      if (pattern.test(question)) {
        const responses = [
          '👋 Bonjour ! Je suis ravi de vous aider dans votre transition vers l\'économie circulaire ! Comment puis-je vous accompagner aujourd\'hui ?',
          '🌟 Bonjour et bienvenue ! Je suis votre assistant spécialisé en économie circulaire ISO 59000. Que souhaitez-vous savoir ?',
        ];
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }

    // Au revoir
    for (const pattern of farewells) {
      if (pattern.test(question)) {
        return '👋 Au revoir ! N\'hésitez pas à revenir si vous avez d\'autres questions sur l\'économie circulaire. Bonne continuation ! 🌍';
      }
    }

    // Qui es-tu
    for (const pattern of aboutMe) {
      if (pattern.test(question)) {
        return '🤖 Je suis votre assistant virtuel spécialisé en économie circulaire ! Mon expertise couvre les normes ISO 59000, les bonnes pratiques sectorielles, et je peux vous guider dans l\'utilisation de cette plateforme d\'évaluation ISO 59000. 🇲🇦♻️';
      }
    }

    return null; // Pas de small talk détecté
  }

  async askQuestion(question: string, context?: string, documentsService?: any) {
    const lowerQuestion = question.toLowerCase();

    // Gestion des conversations basiques (small talk)
    const smallTalkResponse = this.handleSmallTalk(lowerQuestion);
    if (smallTalkResponse) {
      return {
        question,
        answer: smallTalkResponse,
        confidence: 1.0,
        source: 'Conversation',
        category: 'small_talk',
      };
    }

    // Normalisation de la question
    const normalizedQuestion = this.normalizeText(lowerQuestion);

    // Recherche dans la base hardcodée
    let bestMatch: { entry: KnowledgeEntry; score: number } | null = null;

    for (const entry of this.knowledgeBase) {
      const matchScore = this.calculateMatchScore(normalizedQuestion, entry);

      if (matchScore > 0 && (!bestMatch || matchScore > bestMatch.score)) {
        bestMatch = { entry, score: matchScore };
      }
    }

    // Recherche dans les documents uploadés avec RAG
    let documentResults: any = null;
    if (documentsService) {
      try {
        documentResults = await documentsService.searchInDocumentsRAG(question);
      } catch (error) {
        console.error('Erreur recherche documents RAG:', error);
      }
    }

    // Combiner les résultats
    const sources = [];

    // Priorité aux documents uploadés (RAG)
    if (documentResults && documentResults.confidence > 0.3) {
      return {
        question,
        answer: documentResults.answer,
        confidence: documentResults.confidence,
        source: documentResults.source,
        category: 'documents',
        explanation: documentResults.explanation,
      };
    }

    // Si match dans la base hardcodée
    if (bestMatch && bestMatch.score > 0.3) {
      return {
        question,
        answer: bestMatch.entry.answer,
        confidence: Math.min(0.95, bestMatch.score),
        source: 'Base de connaissances ISO 59000',
        category: bestMatch.entry.category,
      };
    }

    // Réponse par défaut
    return {
      question,
      answer: '🤔 Je n\'ai pas trouvé de réponse précise à votre question. Voici quelques sujets que je maîtrise bien :\n\n' +
              '• Les normes ISO 59000 (ISO 59004, ISO 59020, ISO 59010)\n' +
              '• Les principes de l\'économie circulaire\n' +
              '• L\'écoconception et les modèles d\'affaires circulaires\n' +
              '• La gestion des déchets et la valorisation\n' +
              '• Comment utiliser cette plateforme\n\n' +
              'Pouvez-vous reformuler ou préciser votre question ?',
      confidence: 0.3,
      source: 'Réponse par défaut',
      category: 'general',
    };
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

  private calculateMatchScore(question: string, entry: KnowledgeEntry): number {
    let score = 0;
    const questionWords = question.split(' ');

    // Vérifie chaque mot-clé de l'entrée
    for (const keyword of entry.keywords) {
      const normalizedKeyword = this.normalizeText(keyword);
      const keywordWords = normalizedKeyword.split(' ');

      // Match exact de la phrase complète
      if (question.includes(normalizedKeyword)) {
        score += 1.0 * entry.priority / 10;
      }

      // Match partiel : proportion de mots-clés trouvés
      let matchedWords = 0;
      for (const kw of keywordWords) {
        if (questionWords.some(qw => qw.includes(kw) || kw.includes(qw))) {
          matchedWords++;
        }
      }

      if (matchedWords > 0) {
        score += (matchedWords / keywordWords.length) * 0.5 * entry.priority / 10;
      }
    }

    return score;
  }

  getSuggestedQuestions(): string[] {
    return [
      'Qu\'est-ce que l\'économie circulaire ?',
      'Comment fonctionne ISO 59004 ?',
      'Quels sont les avantages pour mon entreprise ?',
      'Comment démarrer ma transition circulaire ?',
      'Comment utiliser cette plateforme ?',
      'Qu\'est-ce que l\'écoconception ?',
      'Comment mesurer ma circularité ?',
      'Quels sont les modèles d\'affaires circulaires ?',
    ];
  }
}