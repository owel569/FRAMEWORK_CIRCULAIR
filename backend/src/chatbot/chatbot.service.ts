import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatbotService {
  private knowledgeBase = {
    'ISO 59000': 'La famille de normes ISO 59000 fournit un cadre pour l\'économie circulaire dans les organisations.',
    'ISO 59004': 'ISO 59004:2024 - Lignes directrices pour la mise en œuvre des principes de l\'économie circulaire dans les organisations.',
    'ISO 59020': 'ISO 59020:2024 - Mesure et évaluation de la circularité.',
    'économie circulaire': 'L\'économie circulaire vise à minimiser les déchets et à maximiser la réutilisation des ressources.',
  };

  async askQuestion(question: string, context?: string) {
    const lowerQuestion = question.toLowerCase();
    
    for (const [key, value] of Object.entries(this.knowledgeBase)) {
      if (lowerQuestion.includes(key.toLowerCase())) {
        return {
          question,
          answer: value,
          confidence: 0.9,
          source: 'Knowledge Base',
        };
      }
    }

    return {
      question,
      answer: 'Je peux vous aider avec des questions sur les normes ISO 59000, l\'économie circulaire, et le fonctionnement de cette plateforme. Pouvez-vous reformuler votre question ?',
      confidence: 0.5,
      source: 'Default',
    };
  }
}
