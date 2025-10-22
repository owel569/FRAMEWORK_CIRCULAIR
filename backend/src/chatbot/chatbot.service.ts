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

    {
      keywords: ['analyse cycle vie', 'acv', 'life cycle'],
      answer: '🔄 L\'Analyse de Cycle de Vie (ACV) évalue l\'impact environnemental d\'un produit de l\'extraction des matières à sa fin de vie. Elle est complémentaire à l\'économie circulaire en identifiant les étapes les plus impactantes : extraction matières premières, fabrication, transport, utilisation, fin de vie. L\'ACV guide les actions prioritaires de circularité.',
      category: 'pratiques',
      priority: 7,
    },
    {
      keywords: ['cradle to cradle', 'c2c', 'berceau au berceau'],
      answer: '♾️ Cradle to Cradle (du berceau au berceau) est une approche d\'écoconception radicale : tous les matériaux doivent être soit biologiques (retour à la terre), soit techniques (recyclage infini). Pas de déchet, tout est nutriment. Certification C2C reconnue mondialement.',
      category: 'concepts',
      priority: 6,
    },
    {
      keywords: ['économie bleue', 'biomimétisme', 'gunter pauli'],
      answer: '🌊 L\'économie bleue, initiée par Gunter Pauli, s\'inspire du biomimétisme : imiter les écosystèmes naturels où il n\'y a pas de déchets. Principes : valoriser ce qui est localement disponible, créer cascades de valeur, régénérer plutôt que simplement sustainer. Compatible avec ISO 59000.',
      category: 'concepts',
      priority: 5,
    },
    {
      keywords: ['économie performance', 'fonctionnelle', 'usage'],
      answer: '⚙️ L\'économie de la performance (ou fonctionnelle) vend l\'usage d\'un bien plutôt que le bien lui-même. Avantages : fabricant garde propriété et responsabilité (incitation durabilité), client paye pour l\'usage réel, ressources optimisées. Exemples : Michelin vend du kilomètre, Philips vend de la lumière.',
      category: 'business',
      priority: 7,
    },
    {
      keywords: ['upcycling', 'surcyclage', 'valorisation'],
      answer: '⬆️ L\'upcycling (surcyclage) transforme un déchet en produit de valeur supérieure. Exemple : vieux pneus → sacs design, palettes → meubles. Différence avec recyclage classique : l\'upcycling augmente la valeur, le recyclage maintient ou diminue. Favorisé par économie circulaire.',
      category: 'pratiques',
      priority: 6,
    },
    {
      keywords: ['réemploi', 'réutilisation', 'seconde main'],
      answer: '🔁 Le réemploi consiste à utiliser à nouveau un produit pour le même usage ou un usage différent. Hiérarchie : Réparation > Reconditionnement > Réutilisation > Recyclage. Le réemploi économise matières et énergie. Secteurs clés : électronique, textile, meubles, BTP.',
      category: 'pratiques',
      priority: 7,
    },
    {
      keywords: ['réparation', 'réparer', 'droit réparation'],
      answer: '🔧 Le droit à la réparation impose fabricants de concevoir produits réparables : disponibilité pièces détachées, documentation technique, outils accessibles. Indice de réparabilité obligatoire en France. La réparation prolonge durée de vie et réduit déchets électroniques (DEEE).',
      category: 'pratiques',
      priority: 7,
    },
    {
      keywords: ['consigne', 'emballage réutilisable', 'verre consigné'],
      answer: '♻️ La consigne encourage retour emballages via dépôt remboursable. Système très efficace pour verre (taux retour 95%+). En développement pour plastique. Nécessite : logistique retour, nettoyage/contrôle, incitation financière. Réduire drastiquement déchets emballages.',
      category: 'pratiques',
      priority: 6,
    },
    {
      keywords: ['matériaux biosourcés', 'bioplastique', 'matière végétale'],
      answer: '🌱 Matériaux biosourcés = issus de biomasse renouvelable (maïs, canne à sucre, algues). Attention : biosourcé ≠ biodégradable ! Avantages : renouvelable, stockage CO2. Limites : concurrence alimentaire, monocultures. Privilégier déchets agricoles/forestiers.',
      category: 'pratiques',
      priority: 6,
    },
    {
      keywords: ['plastique océan', 'pollution marine', 'microplastique'],
      answer: '🌊 8 millions de tonnes plastique/an dans océans. Microplastiques dans chaîne alimentaire. Solutions circulaires : réduction usage plastique, consigne, collecte avant océan, plastique recyclé, bioplastiques marins biodégradables. Projets : Ocean Cleanup, plastiques pêchés valorisés.',
      category: 'environnement',
      priority: 6,
    },
    {
      keywords: ['deee', 'déchet électronique', 'e-waste'],
      answer: '💻 DEEE (Déchets Équipements Électriques/Électroniques) = défi majeur circularité. Contiennent métaux précieux ET toxiques. Solutions : écoconception modulaire, réparation facilitée, collecte organisée, recyclage spécialisé, réemploi (reconditionnement). Objectif EU : 65% collecte.',
      category: 'pratiques',
      priority: 7,
    },
    {
      keywords: ['économie sociale solidaire', 'ess', 'coopérative'],
      answer: '🤝 Économie Sociale et Solidaire (ESS) allie activité économique et utilité sociale. Acteurs clés circularité : ressourceries, recycleries, ateliers réparation, coopératives recyclage. Valeurs partagées : local, emploi inclusif, gouvernance démocratique. ESS + Circularité = puissant !',
      category: 'social',
      priority: 6,
    },
    {
      keywords: ['territoire', 'écologie territoriale', 'local'],
      answer: '🏘️ L\'écologie territoriale organise circularité à échelle locale : symbioses industrielles, circuits courts alimentaires, matériaux construction locaux, ressourceries, compostage collectif. Avantages : emplois locaux, résilience, réduction transport. Le Maroc développe zones industrielles circulaires.',
      category: 'concepts',
      priority: 6,
    },
    {
      keywords: ['green washing', 'écoblanchiment', 'fausse écologie'],
      answer: '⚠️ Le greenwashing (écoblanchiment) = publicité mensongère sur vertus écologiques. Signaux d\'alerte : termes vagues ("écologique"), labels inventés, focus 1 aspect (ignore autres impacts). Protection : certifications reconnues (ISO, Ecolabel), transparence traçabilité, méfiance "100% naturel".',
      category: 'business',
      priority: 6,
    },
    {
      keywords: ['objectifs développement durable', 'odd', 'sdg', 'agenda 2030'],
      answer: '🎯 Les 17 ODD (Objectifs Développement Durable) ONU 2030. Économie circulaire contribue à : ODD 12 (consommation responsable), ODD 13 (climat), ODD 8 (travail décent), ODD 11 (villes durables), ODD 14-15 (vie aquatique/terrestre). ISO 59000 s\'aligne sur ODD.',
      category: 'concepts',
      priority: 6,
    },
    {
      keywords: ['taxonomie verte', 'finance durable', 'investissement vert'],
      answer: '💚 La taxonomie verte européenne classe activités économiques selon durabilité. Facilite investissements verts. Critères : contribution environnement, pas nuire significativement, standards sociaux. Économie circulaire = activité verte. Impact : accès financement facilité, reporting obligatoire.',
      category: 'business',
      priority: 5,
    },
    {
      keywords: ['passeport produit', 'dpp', 'traçabilité numérique'],
      answer: '📱 Le Passeport Produit Digital (DPP) européen tracera composition, origine, réparabilité, recyclabilité produits. Objectifs : transparence consommateur, faciliter réparation/recyclage, lutter obsolescence. Technologies : QR codes, blockchain. Obligatoire EU d\'ici 2026 (textiles, électronique, batteries).',
      category: 'pratiques',
      priority: 6,
    },
    {
      keywords: ['responsabilité élargie producteur', 'rep', 'filière rep'],
      answer: '🏭 REP (Responsabilité Élargie Producteur) = fabricants financent collecte/recyclage produits en fin de vie. Filières REP Maroc : emballages, batteries, pneus, DEEE (en développement). Principe pollueur-payeur. Incite écoconception. Éco-contribution visible sur produits.',
      category: 'réglementation',
      priority: 7,
    },
    {
      keywords: ['méthanisation', 'biogaz', 'déchets organiques'],
      answer: '🔥 Méthanisation = transformation déchets organiques en biogaz (méthane) + digestat (engrais). Double valorisation : énergie renouvelable + fertilisant. Idéal pour : déchets agricoles, boues station épuration, biodéchets restauration. Maroc développe unités méthanisation.',
      category: 'pratiques',
      priority: 6,
    },
    {
      keywords: ['compost', 'compostage', 'bio déchets'],
      answer: '🌿 Compostage transforme déchets organiques en amendement fertile. Réduit 30-40% déchets ménagers, évite méthane décharge, régénère sols. Échelles : individuel (jardin), collectif (quartier), industriel. Maroc interdit mise en décharge déchets organiques d\'ici 2030.',
      category: 'pratiques',
      priority: 6,
    },
    {
      keywords: ['économie régénérative', 'régénération', 'biomimicry'],
      answer: '🌍 L\'économie régénérative va au-delà du durable : elle restaure activement écosystèmes. Inspirée des systèmes naturels. Pratiques : agriculture régénérative (sols), reforestation, restauration zones humides, biomimétisme industriel. Vision holistique : prospérité humaine + santé planète.',
      category: 'concepts',
      priority: 5,
    },
    {
      keywords: ['empreinte carbone', 'co2', 'gaz effet serre'],
      answer: '🌡️ Empreinte carbone mesure émissions GES (CO2 équivalent) produit/activité. Économie circulaire réduit : moins extraction/production, transports optimisés, recyclage (énergie), durée vie prolongée, énergies renouvelables. Objectif Accord Paris : neutralité carbone 2050.',
      category: 'environnement',
      priority: 7,
    },
    {
      keywords: ['empreinte eau', 'stress hydrique', 'eau virtuelle'],
      answer: '💦 Empreinte eau = volume eau consommé cycle vie produit. Inclut eau virtuelle (indirecte). Critique au Maroc (stress hydrique sévère). Circularité eau : réutilisation eaux usées traitées, recyclage process industriels, récupération pluie, irrigation goutte-à-goutte.',
      category: 'environnement',
      priority: 8,
    },
    {
      keywords: ['zéro déchet', 'zero waste', 'objectif zéro'],
      answer: '🎯 Zéro déchet = objectif éliminer déchets non valorisables. Hiérarchie 5R : Refuser, Réduire, Réutiliser, Recycler, Rendre à la terre (compost). S\'applique : particuliers, entreprises, territoires. Succès : San Francisco 80% détournement, Kamikatsu Japon 80%. Nécessite changement systémique.',
      category: 'concepts',
      priority: 7,
    },
    {
      keywords: ['low tech', 'basse technologie', 'sobriété'],
      answer: '🔨 Low-tech privilégie technologies simples, durables, réparables, accessibles. Opposition high-tech complexe/obsolescence. Exemples : frigo sans électricité, éolienne autoconstruite, four solaire. Compatible circularité : durabilité, réparabilité, autonomie, low cost. Complémentaire avec numérique circulaire.',
      category: 'pratiques',
      priority: 5,
    },
    {
      keywords: ['décroissance', 'sobriété', 'limites croissance'],
      answer: '🌏 Débat croissance/décroissance : comment prospérer dans limites planétaires ? Économie circulaire propose découplage : croissance bien-être sans croissance consommation ressources. Solutions : efficacité ressources, économie servicielle, partage, durabilité. Circularité permet développement soutenable.',
      category: 'concepts',
      priority: 5,
    },
    {
      keywords: ['norme', 'certification', 'iso', 'standard'],
      answer: '📜 Normes ISO = standards internationaux volontaires. Famille ISO 59000 = première famille normes dédiée économie circulaire ! Autres normes liées : ISO 14001 (environnement), ISO 50001 (énergie), ISO 26000 (RSE). Certification = reconnaissance tierce partie de conformité.',
      category: 'normes',
      priority: 8,
    },
    {
      keywords: ['rapport durabilité', 'reporting extra-financier', 'csrd'],
      answer: '📊 Reporting extra-financier = publication impacts environnementaux/sociaux. Directive CSRD européenne obligera PME publier indicateurs circularité. Maroc développe cadre RSE. Avantages : transparence investisseurs, pilotage performance, conformité réglementaire.',
      category: 'business',
      priority: 6,
    },
    {
      keywords: ['blockchain', 'traçabilité', 'transparence chaîne'],
      answer: '⛓️ Blockchain assure traçabilité infalsifiable produits : origine matières, conditions production, parcours supply chain, authenticité recyclé. Applications : mode éthique, minéraux responsables, plastique océan certifié. Renforce confiance économie circulaire.',
      category: 'technologie',
      priority: 5,
    },
    {
      keywords: ['intelligence artificielle', 'ia', 'tri automatique'],
      answer: '🤖 IA appliquée à circularité : tri automatique déchets (vision), optimisation logistique inverse, prédiction maintenance préventive (durabilité), écoconception assistée. Exemple : robots trieur déchets Greyparrot (UK) identifient 70+ matériaux. IA consomme énergie : elle doit aussi être circulaire !',
      category: 'technologie',
      priority: 5,
    },
    {
      keywords: ['jumeau numérique', 'digital twin', 'simulation'],
      answer: '🔮 Jumeau numérique = réplique virtuelle produit/process. Usage circularité : simuler durée vie, optimiser usage ressources, prédire pannes (maintenance), tester démontabilité. Secteurs : industrie, bâtiment, ville. Réduit prototypes physiques, améliore écoconception.',
      category: 'technologie',
      priority: 5,
    },
    {
      keywords: ['iot', 'internet objets', 'capteurs connectés'],
      answer: '📡 IoT (Internet des Objets) optimise circularité : capteurs usage réel (économie fonctionnelle), monitoring consommations (énergie/eau), alerte maintenance prédictive, logistique retour intelligente. Exemple : poubelles intelligentes optimisent collecte. Attention empreinte électronique !',
      category: 'technologie',
      priority: 5,
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
