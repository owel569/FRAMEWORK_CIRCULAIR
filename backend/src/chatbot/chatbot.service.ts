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

  // Calcul de la distance de Levenshtein pour détecter les fautes de frappe
  private levenshteinDistance(str1: string, str2: string): number {
    const m = str1.length;
    const n = str2.length;
    const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.min(
            dp[i - 1][j] + 1,     // deletion
            dp[i][j - 1] + 1,     // insertion
            dp[i - 1][j - 1] + 1  // substitution
          );
        }
      }
    }

    return dp[m][n];
  }

  // Vérifier si un mot est similaire avec tolérance aux fautes
  private isSimilar(word: string, targetWord: string, maxDistance: number = 2): boolean {
    if (word === targetWord) return true;
    if (Math.abs(word.length - targetWord.length) > maxDistance) return false;
    return this.levenshteinDistance(word.toLowerCase(), targetWord.toLowerCase()) <= maxDistance;
  }

  private handleSmallTalk(question: string): string | null {
    const normalizedQuestion = question.toLowerCase().trim();
    const firstWord = normalizedQuestion.split(/\s+/)[0];

    // Salutations avec tolérance aux fautes
    const greetingWords = ['salut', 'bonjour', 'hello', 'hi', 'hey', 'bonsoir', 'coucou', 'hola', 'salam'];
    for (const greeting of greetingWords) {
      if (this.isSimilar(firstWord, greeting, 2) || this.isSimilar(normalizedQuestion, greeting, 2)) {
        const responses = [
          '👋 Bonjour ! Je suis ravi de vous aider dans votre transition vers l\'économie circulaire ! Comment puis-je vous accompagner aujourd\'hui ?',
          '🌟 Bonjour et bienvenue ! Je suis votre assistant spécialisé en économie circulaire ISO 59000. Que souhaitez-vous savoir ?',
        ];
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }

    // "Ça va" / "Comment ça va" avec tolérance
    if (
      /^(ca va|sa va|ça va|comment ca va|comment sa va|comment ça va)/i.test(normalizedQuestion) ||
      this.isSimilar(normalizedQuestion, 'ca va', 2) ||
      this.isSimilar(normalizedQuestion, 'ça va', 2)
    ) {
      return '😊 Je vais très bien, merci ! Je suis prêt à vous aider avec toutes vos questions sur l\'économie circulaire. Et vous, comment puis-je vous assister ?';
    }

    // Au revoir avec tolérance
    const farewellWords = ['bye', 'au revoir', 'aurevoir', 'à bientôt', 'a bientot', 'à plus', 'a plus', 'ciao', 'tchao'];
    for (const farewell of farewellWords) {
      if (this.isSimilar(normalizedQuestion, farewell, 2)) {
        return '👋 Au revoir ! N\'hésitez pas à revenir si vous avez d\'autres questions sur l\'économie circulaire. Bonne continuation ! 🌍';
      }
    }

    // Merci avec tolérance
    if (
      /^(merci|mercy|mersi|thanks|thank you)/i.test(normalizedQuestion) ||
      this.isSimilar(normalizedQuestion, 'merci', 2)
    ) {
      return '🙏 Avec plaisir ! N\'hésitez pas si vous avez d\'autres questions. Je suis là pour vous aider ! 😊';
    }

    // Qui es-tu avec tolérance
    if (
      /qui (es|est|et)[ -]?tu/i.test(normalizedQuestion) ||
      /c'?est quoi/i.test(normalizedQuestion) ||
      /ton nom/i.test(normalizedQuestion)
    ) {
      return '🤖 Je suis votre assistant virtuel spécialisé en économie circulaire ! Mon expertise couvre les normes ISO 59000, les bonnes pratiques sectorielles, et je peux vous guider dans l\'utilisation de cette plateforme d\'évaluation ISO 59000. 🇲🇦♻️';
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

    // Recherche dans les documents uploadés (recherche textuelle simple)
    let documentResults: any = null;
    if (documentsService) {
      try {
        const results = await documentsService.searchInDocuments(question);
        if (results.length > 0) {
          const bestResult = results[0];
          documentResults = {
            answer: `D'après le document "${bestResult.title}" :\n\n${bestResult.excerpt}`,
            confidence: Math.min(0.9, bestResult.matchScore / 10),
            source: bestResult.title,
            explanation: `Trouvé ${bestResult.matchedWords} mots-clés pertinents`,
          };
        }
      } catch (error) {
        console.error('Erreur recherche documents:', error);
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

    // Fallback : Tentative avec Hugging Face si clé API disponible
    if (process.env.HUGGING_FACE_API_KEY) {
      try {
        const aiResponse = await this.askHuggingFace(question);
        if (aiResponse && aiResponse.length > 20) {
          return {
            question,
            answer: `🤖 Voici ma meilleure réponse basée sur l'IA :\n\n${aiResponse}\n\n💡 _Cette réponse est générée par IA et peut nécessiter vérification._`,
            confidence: 0.5,
            source: 'Hugging Face AI',
            category: 'ai_generated',
          };
        }
      } catch (error) {
        console.error('Erreur Hugging Face:', error);
      }
    }

    // Réponse par défaut si tout échoue
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

  private async askHuggingFace(question: string): Promise<string> {
    try {
      const prompt = `Tu es un assistant spécialisé en économie circulaire et normes ISO 59000. Réponds de manière concise et professionnelle en français.\n\nQuestion: ${question}\n\nRéponse:`;
      
      const response = await this.hf.textGeneration({
        model: 'mistralai/Mistral-7B-Instruct-v0.2',
        inputs: prompt,
        parameters: {
          max_new_tokens: 250,
          temperature: 0.7,
          top_p: 0.9,
          return_full_text: false,
        },
      });

      return response.generated_text?.trim() || '';
    } catch (error) {
      console.error('Erreur génération Hugging Face:', error);
      return '';
    }
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

      // Match partiel : proportion de mots-clés trouvés avec tolérance aux fautes
      let matchedWords = 0;
      for (const kw of keywordWords) {
        // Match exact ou inclusion
        if (questionWords.some(qw => qw.includes(kw) || kw.includes(qw))) {
          matchedWords++;
        }
        // Match avec tolérance aux fautes (distance de Levenshtein)
        else if (questionWords.some(qw => this.isSimilar(qw, kw, 2))) {
          matchedWords += 0.8; // Score légèrement réduit pour match approximatif
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