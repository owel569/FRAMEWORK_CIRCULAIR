
import { DiagnosticCategory, Question } from '../types/questionnaire.types';

const createGeneralQuestion = (
  id: string,
  category: DiagnosticCategory,
  text: string,
  type: Question['type'],
  weight: number = 1,
  unit?: string,
  choices?: string[]
): Question => ({
  id,
  category,
  text,
  type,
  weight,
  unit,
  choices,
});

/**
 * Questions générales communes à TOUS les secteurs
 * Fusion intelligente ISO 59000 + Indicateurs quantitatifs
 */
export const GENERAL_QUESTIONS: Question[] = [
  // ========== GOUVERNANCE (ISO 59004) ==========
  createGeneralQuestion(
    'gen_gov_1',
    DiagnosticCategory.GOVERNANCE,
    'Votre entreprise dispose-t-elle d\'une politique formalisée d\'économie circulaire ?',
    'boolean',
    3
  ),
  createGeneralQuestion(
    'gen_gov_2',
    DiagnosticCategory.GOVERNANCE,
    'Certifications obtenues ou en cours ?',
    'choice',
    2,
    undefined,
    ['ISO 14001', 'ISO 9001', 'ISO 59000', 'Label RSE', 'Aucune', 'Autres']
  ),
  createGeneralQuestion(
    'gen_gov_3',
    DiagnosticCategory.GOVERNANCE,
    'Bilan carbone réalisé au cours des 3 dernières années ?',
    'boolean',
    2
  ),
  createGeneralQuestion(
    'gen_gov_4',
    DiagnosticCategory.GOVERNANCE,
    'Pourcentage d\'employés formés à l\'économie circulaire ou au développement durable ?',
    'percentage',
    2,
    '%'
  ),
  createGeneralQuestion(
    'gen_gov_5',
    DiagnosticCategory.GOVERNANCE,
    'Suivi régulier d\'indicateurs de performance circulaire (KPI environnementaux, sociaux, économiques) ?',
    'boolean',
    2
  ),
  createGeneralQuestion(
    'gen_gov_6',
    DiagnosticCategory.GOVERNANCE,
    'Responsable dédié à l\'économie circulaire, RSE ou développement durable ?',
    'boolean',
    2
  ),

  // ========== ENVIRONNEMENTAL (ISO 59010) ==========
  createGeneralQuestion(
    'gen_env_1',
    DiagnosticCategory.ENVIRONMENTAL,
    'Pourcentage de déchets valorisés (recyclage, compostage, réemploi, méthanisation) ?',
    'percentage',
    3,
    '%'
  ),
  createGeneralQuestion(
    'gen_env_2',
    DiagnosticCategory.ENVIRONMENTAL,
    'Consommation annuelle totale d\'énergie (toutes sources confondues) ?',
    'number',
    2,
    'kWh/an'
  ),
  createGeneralQuestion(
    'gen_env_3',
    DiagnosticCategory.ENVIRONMENTAL,
    'Part d\'énergies renouvelables dans votre consommation totale (solaire, éolien, biomasse, hydroélectrique) ?',
    'percentage',
    3,
    '%'
  ),
  createGeneralQuestion(
    'gen_env_4',
    DiagnosticCategory.ENVIRONMENTAL,
    'Consommation annuelle totale d\'eau ?',
    'number',
    2,
    'm³/an'
  ),
  createGeneralQuestion(
    'gen_env_5',
    DiagnosticCategory.ENVIRONMENTAL,
    'Dispositifs de récupération et/ou réutilisation de l\'eau en place (eaux pluviales, eaux grises, circuits fermés) ?',
    'boolean',
    2
  ),
  createGeneralQuestion(
    'gen_env_6',
    DiagnosticCategory.ENVIRONMENTAL,
    'Tri sélectif organisé et opérationnel sur l\'ensemble des sites de l\'entreprise ?',
    'boolean',
    2
  ),
  createGeneralQuestion(
    'gen_env_7',
    DiagnosticCategory.ENVIRONMENTAL,
    'Émissions totales de gaz à effet de serre (scope 1 + 2 minimum) ?',
    'number',
    3,
    'tCO₂e/an'
  ),
  createGeneralQuestion(
    'gen_env_8',
    DiagnosticCategory.ENVIRONMENTAL,
    'Intensité carbone de vos activités (émissions rapportées au chiffre d\'affaires ou à la production) ?',
    'number',
    2,
    'tCO₂e/M MAD'
  ),
  createGeneralQuestion(
    'gen_env_9',
    DiagnosticCategory.ENVIRONMENTAL,
    'Quantité annuelle de matières premières consommées (hors eau et énergie) ?',
    'number',
    2,
    'tonnes/an'
  ),
  createGeneralQuestion(
    'gen_env_10',
    DiagnosticCategory.ENVIRONMENTAL,
    'Part de matières premières recyclées ou biosourcées utilisées dans la production ?',
    'percentage',
    3,
    '%'
  ),

  // ========== ÉCONOMIQUE (ISO 59020) ==========
  createGeneralQuestion(
    'gen_eco_1',
    DiagnosticCategory.ECONOMIC,
    'Chiffre d\'affaires annuel total (dernière année fiscale clôturée) ?',
    'number',
    1,
    'MAD'
  ),
  createGeneralQuestion(
    'gen_eco_2',
    DiagnosticCategory.ECONOMIC,
    'Part du chiffre d\'affaires ou du budget annuel réinvesti dans la durabilité et l\'économie circulaire ?',
    'percentage',
    3,
    '%'
  ),
  createGeneralQuestion(
    'gen_eco_3',
    DiagnosticCategory.ECONOMIC,
    'Pourcentage de produits ou services intégrant des principes d\'écoconception ?',
    'percentage',
    3,
    '%'
  ),
  createGeneralQuestion(
    'gen_eco_4',
    DiagnosticCategory.ECONOMIC,
    'Modèles économiques circulaires proposés aux clients (location, leasing, réparation, reconditionnement, revente) ?',
    'boolean',
    2
  ),
  createGeneralQuestion(
    'gen_eco_5',
    DiagnosticCategory.ECONOMIC,
    'Partenariats actifs avec d\'autres entreprises pour la valorisation des déchets, matières ou coproduits ?',
    'boolean',
    2
  ),
  createGeneralQuestion(
    'gen_eco_6',
    DiagnosticCategory.ECONOMIC,
    'Objectifs chiffrés et échéancés de réduction des impacts environnementaux (déchets, énergie, eau, CO₂) ?',
    'choice',
    2,
    undefined,
    ['Oui, avec suivi annuel', 'Oui, sans suivi régulier', 'En cours de définition', 'Non']
  ),
  createGeneralQuestion(
    'gen_eco_7',
    DiagnosticCategory.ECONOMIC,
    'Taux de marge brute ou rentabilité opérationnelle (EBITDA/CA) ?',
    'percentage',
    1,
    '%'
  ),
  createGeneralQuestion(
    'gen_eco_8',
    DiagnosticCategory.ECONOMIC,
    'Coût annuel total des déchets (collecte + traitement + élimination) ?',
    'number',
    2,
    'MAD/an'
  ),
  createGeneralQuestion(
    'gen_eco_9',
    DiagnosticCategory.ECONOMIC,
    'Revenus générés par la vente de déchets valorisables ou de coproduits ?',
    'number',
    2,
    'MAD/an'
  ),
  createGeneralQuestion(
    'gen_eco_10',
    DiagnosticCategory.ECONOMIC,
    'Économies annuelles réalisées grâce aux actions d\'efficacité énergétique ?',
    'number',
    2,
    'MAD/an'
  ),

  // ========== SOCIAL & TERRITORIAL (ISO 59030) ==========
  createGeneralQuestion(
    'gen_social_1',
    DiagnosticCategory.SOCIAL,
    'Nombre total d\'employés (ETP - Équivalent Temps Plein) ?',
    'number',
    2,
    'ETP'
  ),
  createGeneralQuestion(
    'gen_social_2',
    DiagnosticCategory.SOCIAL,
    'Pourcentage d\'emplois locaux (recrutés dans un rayon de 50 km) ?',
    'percentage',
    2,
    '%'
  ),
  createGeneralQuestion(
    'gen_social_3',
    DiagnosticCategory.SOCIAL,
    'Nombre moyen d\'heures de formation par employé et par an (tous types de formation) ?',
    'number',
    2,
    'heures/ETP/an'
  ),
  createGeneralQuestion(
    'gen_social_4',
    DiagnosticCategory.SOCIAL,
    'Politique ou actions concrètes en faveur de la diversité et de l\'inclusion (handicap, genre, origine) ?',
    'boolean',
    2
  ),
  createGeneralQuestion(
    'gen_social_5',
    DiagnosticCategory.SOCIAL,
    'Ratio de parité hommes/femmes dans l\'effectif total ?',
    'percentage',
    1,
    '% femmes'
  ),
  createGeneralQuestion(
    'gen_social_6',
    DiagnosticCategory.SOCIAL,
    'Actions d\'insertion professionnelle (stages, alternance, contrats aidés, partenariats avec associations) ?',
    'boolean',
    2
  ),
  createGeneralQuestion(
    'gen_social_7',
    DiagnosticCategory.SOCIAL,
    'Niveau de satisfaction des employés (enquête interne, baromètre social, NPS employés) ?',
    'choice',
    2,
    undefined,
    ['Très satisfait (>80%)', 'Satisfait (60-80%)', 'Moyen (40-60%)', 'Insatisfait (<40%)', 'Non mesuré']
  ),
  createGeneralQuestion(
    'gen_social_8',
    DiagnosticCategory.SOCIAL,
    'Taux d\'absentéisme annuel moyen ?',
    'percentage',
    1,
    '%'
  ),
  createGeneralQuestion(
    'gen_social_9',
    DiagnosticCategory.SOCIAL,
    'Taux de turnover annuel (départs volontaires) ?',
    'percentage',
    1,
    '%'
  ),
  createGeneralQuestion(
    'gen_social_10',
    DiagnosticCategory.SOCIAL,
    'Nombre d\'accidents du travail avec arrêt par an ?',
    'number',
    2,
    'accidents/an'
  ),

  // ========== LOGISTIQUE & SUPPLY CHAIN (ISO 59024) ==========
  createGeneralQuestion(
    'gen_log_1',
    DiagnosticCategory.LOGISTICS,
    'Pourcentage d\'achats réalisés auprès de fournisseurs locaux ou régionaux (<200 km) ?',
    'percentage',
    2,
    '%'
  ),
  createGeneralQuestion(
    'gen_log_2',
    DiagnosticCategory.LOGISTICS,
    'Intégration de critères environnementaux et sociaux dans la sélection et l\'évaluation des fournisseurs ?',
    'boolean',
    2
  ),
  createGeneralQuestion(
    'gen_log_3',
    DiagnosticCategory.LOGISTICS,
    'Optimisation des livraisons (mutualisation, consolidation, planification des tournées, taux de remplissage) ?',
    'boolean',
    2
  ),
  createGeneralQuestion(
    'gen_log_4',
    DiagnosticCategory.LOGISTICS,
    'Part de la flotte de véhicules à faibles émissions (électrique, hybride, GNV, biocarburants) ?',
    'percentage',
    2,
    '% flotte'
  ),
  createGeneralQuestion(
    'gen_log_5',
    DiagnosticCategory.LOGISTICS,
    'Système de traçabilité des flux de matières premières et de produits en place (ERP, blockchain, RFID) ?',
    'boolean',
    2
  ),
  createGeneralQuestion(
    'gen_log_6',
    DiagnosticCategory.LOGISTICS,
    'Distance moyenne de transport des matières premières (depuis les fournisseurs principaux) ?',
    'number',
    2,
    'km'
  ),
  createGeneralQuestion(
    'gen_log_7',
    DiagnosticCategory.LOGISTICS,
    'Distance moyenne de livraison des produits finis (vers les clients principaux) ?',
    'number',
    2,
    'km'
  ),
  createGeneralQuestion(
    'gen_log_8',
    DiagnosticCategory.LOGISTICS,
    'Coût logistique total annuel (transport + stockage + manutention) ?',
    'number',
    1,
    'MAD/an'
  ),
  createGeneralQuestion(
    'gen_log_9',
    DiagnosticCategory.LOGISTICS,
    'Taux de retours produits ou de non-conformités logistiques ?',
    'percentage',
    1,
    '%'
  ),
  createGeneralQuestion(
    'gen_log_10',
    DiagnosticCategory.LOGISTICS,
    'Système de logistique inverse ou de reprise des produits en fin de vie ?',
    'boolean',
    2
  ),
];
