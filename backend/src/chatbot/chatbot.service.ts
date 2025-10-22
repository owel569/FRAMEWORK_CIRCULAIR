import { Injectable } from '@nestjs/common';

interface KnowledgeEntry {
  keywords: string[];
  answer: string;
  category: string;
  priority: number;
}

@Injectable()
export class ChatbotService {
  private knowledgeBase: KnowledgeEntry[] = [
    // Famille ISO 59000 - Vue d'ensemble
    {
      keywords: ['iso 59000', 'famille iso', 'normes iso circulaire'],
      answer: '🌍 La famille ISO 59000 est l\'ensemble des normes internationales dédiées à l\'économie circulaire. Elle comprend ISO 59004 (mise en œuvre), ISO 59010 (indicateurs), ISO 59020 (mesure de circularité), ISO 59014 (vocabulaire), et d\'autres normes en développement comme ISO 59001 (système de management).',
      category: 'normes',
      priority: 10,
    },
    {
      keywords: ['iso 59004', 'mise en œuvre', 'lignes directrices'],
      answer: '📋 ISO 59004:2024 fournit des lignes directrices pour la mise en œuvre des principes de l\'économie circulaire dans votre organisation. Elle couvre : la planification stratégique, l\'identification des flux de ressources, la conception circulaire, les modèles d\'affaires circulaires, et la collaboration entre parties prenantes.',
      category: 'normes',
      priority: 9,
    },
    {
      keywords: ['iso 59020', 'mesure', 'évaluation circularité', 'mesurer'],
      answer: '📊 ISO 59020:2024 définit les méthodes de mesure et d\'évaluation de la circularité. Elle propose des indicateurs quantitatifs pour mesurer : le taux de circularité des matières, l\'efficacité d\'utilisation des ressources, la durée de vie des produits, et le taux de valorisation des déchets.',
      category: 'normes',
      priority: 9,
    },
    {
      keywords: ['iso 59010', 'indicateurs', 'kpi', 'performance'],
      answer: '📈 ISO 59010:2024 établit les indicateurs et méthodes de mesure pour l\'économie circulaire. Elle définit des KPI pour évaluer : la consommation de matières premières, les flux de déchets, l\'énergie utilisée, la réutilisation, le recyclage, et l\'impact environnemental.',
      category: 'normes',
      priority: 8,
    },
    {
      keywords: ['iso 59014', 'vocabulaire', 'définitions', 'principes'],
      answer: '📖 ISO 59014:2024 établit les principes et le vocabulaire de l\'économie circulaire. Elle définit les termes clés comme : économie circulaire, boucles de valeur, écoconception, symbiose industrielle, économie de la fonctionnalité, et logistique inverse.',
      category: 'normes',
      priority: 7,
    },
    {
      keywords: ['iso 59001', 'système management', 'certification'],
      answer: '🏆 ISO 59001 (en développement) sera la norme de système de management de l\'économie circulaire, similaire à ISO 9001 ou ISO 14001. Elle permettra la certification des organisations engagées dans la transition circulaire.',
      category: 'normes',
      priority: 6,
    },

    // Économie circulaire - Concepts
    {
      keywords: ['économie circulaire', 'c\'est quoi', 'définition', 'qu\'est-ce que'],
      answer: '♻️ L\'économie circulaire est un système économique visant à maintenir la valeur des produits, matières et ressources le plus longtemps possible, en réduisant les déchets au minimum. Elle s\'oppose au modèle linéaire "extraire-fabriquer-jeter" et repose sur 3 principes : éliminer déchets et pollution, maintenir produits et matériaux en usage, régénérer les systèmes naturels.',
      category: 'concepts',
      priority: 10,
    },
    {
      keywords: ['modèle linéaire', 'linéaire vs circulaire', 'différence'],
      answer: '🔄 Le modèle linéaire suit : Extraction → Production → Consommation → Déchet. Le modèle circulaire transforme les déchets en ressources : Écoconception → Utilisation prolongée → Réparation/Réemploi → Recyclage → Nouvelle matière. La circularité réduit drastiquement l\'impact environnemental.',
      category: 'concepts',
      priority: 8,
    },
    {
      keywords: ['3r', 'réduire réutiliser recycler', 'principes'],
      answer: '🔄 Les 3R de base (Réduire, Réutiliser, Recycler) évoluent vers les 10R : Refuser, Réduire, Réemployer, Réparer, Rénover, Remanufacturer, Réutiliser, Recycler, Récupérer l\'énergie, Re-miner. Chaque niveau représente une stratégie de circularité avec un impact différent.',
      category: 'concepts',
      priority: 7,
    },

    // Écoconception
    {
      keywords: ['écoconception', 'design circulaire', 'conception durable'],
      answer: '🎨 L\'écoconception intègre la protection de l\'environnement dès la conception du produit. Principes : durabilité accrue, modularité, réparabilité, utilisation de matières recyclées, démontabilité, et anticipation de la fin de vie. ISO 59004 encourage fortement l\'écoconception.',
      category: 'pratiques',
      priority: 8,
    },
    {
      keywords: ['durée vie', 'obsolescence', 'durabilité produit'],
      answer: '⏱️ Prolonger la durée de vie des produits est essentiel. Stratégies : conception robuste, garanties étendues, pièces détachées disponibles, réparabilité, mises à jour logicielles, et programmes de reprise. L\'obsolescence programmée va à l\'encontre de l\'économie circulaire.',
      category: 'pratiques',
      priority: 7,
    },

    // Modèles d\'affaires circulaires
    {
      keywords: ['modèle affaires', 'business model', 'revenus circulaires'],
      answer: '💼 Modèles d\'affaires circulaires : 1) Économie de la fonctionnalité (location vs vente), 2) Produit comme service (PaaS), 3) Partage et mutualisation, 4) Extension de la durée de vie (réparation, reconditionnement), 5) Récupération des ressources (recyclage, upcycling).',
      category: 'business',
      priority: 9,
    },
    {
      keywords: ['économie fonctionnalité', 'usage service', 'location'],
      answer: '🔧 L\'économie de la fonctionnalité vend l\'usage plutôt que le produit. Exemples : location de véhicules, leasing d\'équipements, éclairage comme service. Avantages : fidélisation client, revenus récurrents, maîtrise de la fin de vie, incitation à la durabilité.',
      category: 'business',
      priority: 7,
    },

    // Symbiose industrielle
    {
      keywords: ['symbiose industrielle', 'écologie industrielle', 'mutualisation'],
      answer: '🤝 La symbiose industrielle consiste à échanger flux de matières, d\'énergie, d\'eau et de sous-produits entre entreprises. Les déchets d\'une entreprise deviennent ressources pour une autre. Exemple célèbre : le parc industriel de Kalundborg au Danemark.',
      category: 'pratiques',
      priority: 8,
    },

    // Gestion des déchets
    {
      keywords: ['déchets', 'valorisation', 'gestion déchets', 'recyclage'],
      answer: '🗑️ Hiérarchie de gestion des déchets (du meilleur au pire) : 1) Prévention, 2) Réemploi, 3) Recyclage, 4) Valorisation énergétique, 5) Élimination. L\'objectif circulaire est "zéro déchet" en transformant tous les flux en ressources valorisables.',
      category: 'pratiques',
      priority: 8,
    },
    {
      keywords: ['taux valorisation', 'recyclage matière', 'récupération'],
      answer: '📊 Le taux de valorisation mesure le pourcentage de déchets transformés en ressources (recyclage matière, compostage, valorisation énergétique). Objectif ISO 59020 : maximiser ce taux. Un bon taux est > 70%, excellent > 90%.',
      category: 'indicateurs',
      priority: 7,
    },

    // Logistique inverse
    {
      keywords: ['logistique inverse', 'reverse logistics', 'collecte retour'],
      answer: '🔙 La logistique inverse organise les flux retour : collecte des produits usagés, tri, réparation, reconditionnement, recyclage. Essentielle pour fermer les boucles. Nécessite : réseau de collecte, traçabilité, partenariats, et incitations clients.',
      category: 'pratiques',
      priority: 7,
    },

    // Secteurs spécifiques
    {
      keywords: ['agriculture circulaire', 'agroécologie', 'agriculture'],
      answer: '🌾 Agriculture circulaire : compostage, méthanisation des déchets organiques, rotation des cultures, agroforesterie, récupération de l\'eau, utilisation de matières organiques recyclées. Objectif : zéro intrant externe, régénération des sols.',
      category: 'secteurs',
      priority: 6,
    },
    {
      keywords: ['industrie circulaire', 'manufacture', 'production'],
      answer: '🏭 Industrie circulaire : écoconception produits, efficacité matière et énergie, réutilisation chutes de production, symbiose avec autres industries, reconditionnement/remanufacturing, récupération métaux et matières critiques.',
      category: 'secteurs',
      priority: 6,
    },
    {
      keywords: ['construction circulaire', 'btp', 'bâtiment'],
      answer: '🏗️ Construction circulaire : matériaux biosourcés/recyclés, conception modulaire et démontable, réemploi matériaux de déconstruction, banques de matériaux, passeports matières, durabilité bâtiments. Le BTP génère 40% des déchets mondiaux.',
      category: 'secteurs',
      priority: 6,
    },
    {
      keywords: ['textile circulaire', 'mode', 'vêtements'],
      answer: '👕 Textile circulaire : fibres recyclées/biosourcées, location/partage vêtements, réparation/upcycling, collecte vêtements usagés, recyclage fibres. La fast-fashion est très linéaire, la circularité ralentit les cycles.',
      category: 'secteurs',
      priority: 5,
    },

    // Indicateurs et mesure
    {
      keywords: ['indicateurs', 'mesure performance', 'kpi circulaire'],
      answer: '📏 Indicateurs clés ISO 59010 : Taux d\'utilisation matières recyclées (%), Taux de valorisation déchets (%), Durée de vie moyenne produits (années), Consommation énergétique (kWh/unité), Intensité matière (kg/€ CA), Taux de réparabilité (%).',
      category: 'indicateurs',
      priority: 8,
    },
    {
      keywords: ['score circularité', 'indice', 'évaluation'],
      answer: '🎯 Le score de circularité évalue votre niveau de transition. Cette plateforme calcule 4 dimensions : Gouvernance (stratégie, formation), Économique (efficacité, innovation), Social (emploi local, inclusion), Environnemental (déchets, énergie, eau). Score global sur 100.',
      category: 'plateforme',
      priority: 9,
    },

    // Plateforme
    {
      keywords: ['plateforme', 'comment ça marche', 'utiliser', 'fonctionnement'],
      answer: '💻 Cette plateforme vous guide : 1) Remplissez le questionnaire sectoriel (20 secteurs disponibles), 2) Obtenez votre score de circularité sur 4 dimensions, 3) Consultez votre dashboard avec graphiques, 4) Recevez un plan d\'action personnalisé selon ISO 59004. Tout est conforme ISO 59000.',
      category: 'plateforme',
      priority: 10,
    },
    {
      keywords: ['questionnaire', 'évaluation', 'diagnostic'],
      answer: '📋 Le questionnaire évalue 4 dimensions : 1) Environnement (déchets, énergie, eau), 2) Économie (efficacité, circularité, innovation), 3) Social (emploi, formation, gouvernance), 4) Logistique (supply chain, traçabilité). Adapté à 20 secteurs d\'activité.',
      category: 'plateforme',
      priority: 8,
    },
    {
      keywords: ['plan action', 'recommandations', 'améliorer'],
      answer: '📝 Le plan d\'action personnalisé propose des recommandations ISO 59004 adaptées à votre score et secteur : actions prioritaires, feuille de route, investissements suggérés, partenaires potentiels, et indicateurs de suivi. Objectif : amélioration continue.',
      category: 'plateforme',
      priority: 8,
    },
    {
      keywords: ['secteurs', 'activités', 'industries'],
      answer: '🏢 20 secteurs disponibles : Agriculture, Industrie manufacturière, Construction/BTP, Commerce, Transport, Énergie, Santé, IT, Finance, Administration, Éducation, Hôtellerie/Tourisme, Culture/Médias, Immobilier, Sciences, Artisanat, Services entreprises, Services particuliers, Associations/ONG, Secteurs émergents.',
      category: 'plateforme',
      priority: 7,
    },

    // Avantages économiques
    {
      keywords: ['avantages', 'bénéfices', 'rentabilité', 'pourquoi'],
      answer: '💰 Avantages économie circulaire : Réduction coûts (matières, énergie, déchets), Nouveaux revenus (vente matières secondaires, services), Innovation (nouveaux produits/services), Résilience (indépendance ressources), Image de marque améliorée, Conformité réglementaire anticipée.',
      category: 'business',
      priority: 9,
    },
    {
      keywords: ['retour investissement', 'roi', 'rentabilité'],
      answer: '📈 ROI typique : Réduction déchets (15-30% économies), Efficacité énergétique (20-40%), Optimisation matières (10-25%), Nouveaux services (revenus additionnels). Payback période : 2-5 ans selon investissements. Les bénéfices augmentent avec le temps.',
      category: 'business',
      priority: 7,
    },

    // Barrières et défis
    {
      keywords: ['défis', 'obstacles', 'difficultés', 'problèmes'],
      answer: '⚠️ Défis courants : Investissement initial, Changement de culture d\'entreprise, Manque de compétences, Coordination entre acteurs, Infrastructure de collecte/recyclage insuffisante, Réglementation complexe. Solutions : formation, partenariats, accompagnement progressif.',
      category: 'pratiques',
      priority: 7,
    },
    {
      keywords: ['commencer', 'débuter', 'premiers pas', 'démarrer'],
      answer: '🚀 Pour démarrer : 1) Réalisez un diagnostic (utilisez cette plateforme !), 2) Identifiez 2-3 actions rapides à impact, 3) Formez vos équipes, 4) Établissez des partenariats (fournisseurs, clients, recycleurs), 5) Mesurez et communiquez vos progrès. Commencez petit, pensez grand.',
      category: 'pratiques',
      priority: 9,
    },

    // Réglementation et contexte marocain
    {
      keywords: ['maroc', 'marocain', 'réglementation maroc'],
      answer: '🇲🇦 Au Maroc : Stratégie Nationale de Développement Durable, Programme National des Déchets Ménagers, interdiction sacs plastiques, promotion énergies renouvelables, Charte de l\'Environnement. L\'économie circulaire est priorité nationale pour l\'emploi et l\'environnement.',
      category: 'contexte',
      priority: 7,
    },
    {
      keywords: ['pme', 'petite entreprise', 'tpe'],
      answer: '🏪 Les PME ont un rôle clé dans la transition circulaire : agilité pour innover, ancrage territorial, collaboration locale facilitée. Cette plateforme est spécialement conçue pour accompagner les PME marocaines avec des solutions adaptées à leur taille et ressources.',
      category: 'contexte',
      priority: 8,
    },

    // Économie sociale et solidaire
    {
      keywords: ['social', 'emploi', 'inclusif', 'solidaire'],
      answer: '👥 Dimension sociale de l\'économie circulaire : création d\'emplois locaux (réparation, recyclage), inclusion (personnes éloignées emploi), formation et montée en compétences, achats responsables, gouvernance participative. L\'économie circulaire est aussi sociale !',
      category: 'concepts',
      priority: 7,
    },

    // Numérique et circularité
    {
      keywords: ['numérique', 'digital', 'technologie', 'data'],
      answer: '💻 Le numérique facilite la circularité : traçabilité (blockchain), plateformes de partage, IoT pour optimiser usage, IA pour tri déchets, jumeaux numériques, market-places de matières secondaires. Attention : l\'empreinte du numérique doit aussi être circulaire (DEEE, efficacité énergétique).',
      category: 'pratiques',
      priority: 6,
    },

    // Énergie circulaire
    {
      keywords: ['énergie', 'renouvelable', 'efficacité énergétique'],
      answer: '⚡ Énergie circulaire : efficacité énergétique maximale, énergies renouvelables, récupération chaleur fatale, méthanisation déchets organiques, valorisation énergétique résiduelle. Objectif : découplage croissance/consommation énergie fossile.',
      category: 'pratiques',
      priority: 7,
    },

    // Eau circulaire
    {
      keywords: ['eau', 'water', 'recyclage eau', 'réutilisation eau'],
      answer: '💧 Gestion circulaire de l\'eau : réduction consommation, recyclage eaux usées, récupération eau pluie, phytoépuration, circuits fermés. Crucial au Maroc (stress hydrique). Indicateurs : m³ consommés/produit, taux recyclage eau.',
      category: 'pratiques',
      priority: 7,
    },

    // Certification et labels
    {
      keywords: ['certification', 'label', 'accréditation'],
      answer: '🏆 Labels et certifications circulaires : Cradle to Cradle, EU Ecolabel, B Corp, ISO 14001 (environnement), ISO 50001 (énergie), future ISO 59001. Ils valorisent vos engagements et rassurent clients/investisseurs.',
      category: 'normes',
      priority: 6,
    },

    // Innovation
    {
      keywords: ['innovation', 'recherche', 'nouvelles technologies'],
      answer: '🔬 Innovations clés : matériaux biosourcés/biodégradables, chimie verte, bioplastiques, recyclage chimique, upcycling, fabrication additive (impression 3D recyclée), bioéconomie. L\'innovation est moteur de circularité.',
      category: 'pratiques',
      priority: 6,
    },

    // Finance circulaire
    {
      keywords: ['financement', 'investissement', 'fonds', 'subventions'],
      answer: '💵 Financements disponibles : subventions publiques (INDH, ADEREE Maroc), prêts verts, fonds d\'investissement impact, financements européens (si partenariats), obligations vertes. De plus en plus d\'investisseurs ciblent l\'économie circulaire.',
      category: 'business',
      priority: 7,
    },

    // Chaîne d\'approvisionnement
    {
      keywords: ['supply chain', 'chaîne approvisionnement', 'fournisseurs'],
      answer: '🔗 Supply chain circulaire : sélection fournisseurs responsables, traçabilité complète, collaboration long terme, circuits courts privilégiés, mutualisation transports, emballages réutilisables, contrats incluant reprise produits en fin de vie.',
      category: 'pratiques',
      priority: 7,
    },

    // Aide générale
    {
      keywords: ['aide', 'besoin aide', 'support', 'assistance'],
      answer: '🆘 Je suis là pour vous aider ! Je peux répondre à vos questions sur : les normes ISO 59000, l\'économie circulaire, le fonctionnement de cette plateforme, votre diagnostic et score, les bonnes pratiques sectorielles. N\'hésitez pas à me poser toutes vos questions !',
      category: 'plateforme',
      priority: 10,
    },
  ];

  async askQuestion(question: string, context?: string) {
    const lowerQuestion = question.toLowerCase();
    
    // Normalisation de la question
    const normalizedQuestion = this.normalizeText(lowerQuestion);
    
    // Recherche avec scoring de pertinence
    let bestMatch: { entry: KnowledgeEntry; score: number } | null = null;
    
    for (const entry of this.knowledgeBase) {
      const matchScore = this.calculateMatchScore(normalizedQuestion, entry);
      
      if (matchScore > 0 && (!bestMatch || matchScore > bestMatch.score)) {
        bestMatch = { entry, score: matchScore };
      }
    }

    // Si un match est trouvé avec un score suffisant
    if (bestMatch && bestMatch.score > 0.3) {
      return {
        question,
        answer: bestMatch.entry.answer,
        confidence: Math.min(0.95, bestMatch.score),
        source: 'Base de connaissances ISO 59000',
        category: bestMatch.entry.category,
      };
    }

    // Réponse par défaut avec suggestions
    return {
      question,
      answer: '🤔 Je n\'ai pas trouvé de réponse précise à votre question. Voici quelques sujets que je maîtrise bien :\n\n' +
              '• Les normes ISO 59000 (ISO 59004, ISO 59020, ISO 59010)\n' +
              '• Les principes de l\'économie circulaire\n' +
              '• L\'écoconception et les modèles d\'affaires circulaires\n' +
              '• La gestion des déchets et la valorisation\n' +
              '• Comment utiliser cette plateforme\n' +
              '• Les indicateurs de circularité\n\n' +
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
