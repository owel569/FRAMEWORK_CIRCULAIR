
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
  isoReference: 'ISO 59000 - Tronc commun',
});

/**
 * Questions générales communes à TOUS les secteurs
 * Ces questions constituent le diagnostic de base de l'économie circulaire
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
    ['ISO 14001', 'ISO 9001', 'ISO 59000', 'Aucune', 'Autres']
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
    'Pourcentage d\'employés formés à l\'économie circulaire ?',
    'percentage',
    2,
    '%'
  ),
  createGeneralQuestion(
    'gen_gov_5',
    DiagnosticCategory.GOVERNANCE,
    'Suivi d\'indicateurs de performance circulaire (KPI) ?',
    'boolean',
    2
  ),
  createGeneralQuestion(
    'gen_gov_6',
    DiagnosticCategory.GOVERNANCE,
    'Responsable dédié à l\'économie circulaire ou RSE ?',
    'boolean',
    2
  ),

  // ========== ENVIRONNEMENTAL (ISO 59010) ==========
  createGeneralQuestion(
    'gen_env_1',
    DiagnosticCategory.ENVIRONMENTAL,
    'Pourcentage de déchets valorisés (recyclage, compostage, réemploi) ?',
    'percentage',
    3,
    '%'
  ),
  createGeneralQuestion(
    'gen_env_2',
    DiagnosticCategory.ENVIRONMENTAL,
    'Consommation annuelle d\'énergie (kWh/an) ?',
    'number',
    2,
    'kWh/an'
  ),
  createGeneralQuestion(
    'gen_env_3',
    DiagnosticCategory.ENVIRONMENTAL,
    'Part d\'énergies renouvelables dans votre consommation totale ?',
    'percentage',
    3,
    '%'
  ),
  createGeneralQuestion(
    'gen_env_4',
    DiagnosticCategory.ENVIRONMENTAL,
    'Consommation annuelle d\'eau (m³/an) ?',
    'number',
    2,
    'm³/an'
  ),
  createGeneralQuestion(
    'gen_env_5',
    DiagnosticCategory.ENVIRONMENTAL,
    'Dispositifs de récupération/réutilisation de l\'eau en place ?',
    'boolean',
    2
  ),
  createGeneralQuestion(
    'gen_env_6',
    DiagnosticCategory.ENVIRONMENTAL,
    'Tri sélectif organisé sur l\'ensemble des sites ?',
    'boolean',
    2
  ),
  createGeneralQuestion(
    'gen_env_7',
    DiagnosticCategory.ENVIRONMENTAL,
    'Émissions de CO₂ estimées (tonnes équivalent CO₂/an) ?',
    'number',
    3,
    'tCO₂e/an'
  ),

  // ========== ÉCONOMIQUE (ISO 59020) ==========
  createGeneralQuestion(
    'gen_eco_1',
    DiagnosticCategory.ECONOMIC,
    'Chiffre d\'affaires annuel (MAD) ?',
    'number',
    1,
    'MAD'
  ),
  createGeneralQuestion(
    'gen_eco_2',
    DiagnosticCategory.ECONOMIC,
    'Part du CA réinvesti dans la durabilité et l\'économie circulaire ?',
    'percentage',
    3,
    '%'
  ),
  createGeneralQuestion(
    'gen_eco_3',
    DiagnosticCategory.ECONOMIC,
    'Pourcentage de produits/services écoconçus ?',
    'percentage',
    3,
    '%'
  ),
  createGeneralQuestion(
    'gen_eco_4',
    DiagnosticCategory.ECONOMIC,
    'Modèles économiques circulaires proposés (location, réparation, reconditionnement) ?',
    'boolean',
    2
  ),
  createGeneralQuestion(
    'gen_eco_5',
    DiagnosticCategory.ECONOMIC,
    'Partenariats avec d\'autres entreprises pour valorisation des déchets/matières ?',
    'boolean',
    2
  ),
  createGeneralQuestion(
    'gen_eco_6',
    DiagnosticCategory.ECONOMIC,
    'Objectifs chiffrés de réduction des déchets fixés ?',
    'boolean',
    2
  ),

  // ========== SOCIAL & TERRITORIAL (ISO 59014) ==========
  createGeneralQuestion(
    'gen_social_1',
    DiagnosticCategory.SOCIAL,
    'Nombre total d\'employés (ETP) ?',
    'number',
    1,
    'employés'
  ),
  createGeneralQuestion(
    'gen_social_2',
    DiagnosticCategory.SOCIAL,
    'Pourcentage d\'emplois locaux (<50 km du siège) ?',
    'percentage',
    2,
    '%'
  ),
  createGeneralQuestion(
    'gen_social_3',
    DiagnosticCategory.SOCIAL,
    'Heures de formation par employé et par an ?',
    'number',
    2,
    'heures/an'
  ),
  createGeneralQuestion(
    'gen_social_4',
    DiagnosticCategory.SOCIAL,
    'Politique de diversité et inclusion formalisée ?',
    'boolean',
    2
  ),
  createGeneralQuestion(
    'gen_social_5',
    DiagnosticCategory.SOCIAL,
    'Parité homme/femme dans l\'entreprise (% femmes) ?',
    'percentage',
    2,
    '%'
  ),
  createGeneralQuestion(
    'gen_social_6',
    DiagnosticCategory.SOCIAL,
    'Actions d\'insertion ou partenariats avec structures sociales ?',
    'boolean',
    2
  ),
  createGeneralQuestion(
    'gen_social_7',
    DiagnosticCategory.SOCIAL,
    'Satisfaction des employés mesurée régulièrement ?',
    'choice',
    1,
    undefined,
    ['Oui, annuellement', 'Oui, ponctuellement', 'Non']
  ),

  // ========== LOGISTIQUE (ISO 59024) ==========
  createGeneralQuestion(
    'gen_log_1',
    DiagnosticCategory.LOGISTICS,
    'Pourcentage d\'achats auprès de fournisseurs locaux (<200 km) ?',
    'percentage',
    2,
    '%'
  ),
  createGeneralQuestion(
    'gen_log_2',
    DiagnosticCategory.LOGISTICS,
    'Critères environnementaux dans la sélection des fournisseurs ?',
    'boolean',
    2
  ),
  createGeneralQuestion(
    'gen_log_3',
    DiagnosticCategory.LOGISTICS,
    'Optimisation des livraisons (mutualisation, rotation, remplissage) ?',
    'boolean',
    2
  ),
  createGeneralQuestion(
    'gen_log_4',
    DiagnosticCategory.LOGISTICS,
    'Flotte de véhicules bas-carbone (électrique, hybride, GNV) ?',
    'percentage',
    2,
    '%'
  ),
  createGeneralQuestion(
    'gen_log_5',
    DiagnosticCategory.LOGISTICS,
    'Système de traçabilité des flux matières en place ?',
    'boolean',
    2
  ),
];

export const GENERAL_QUESTIONS_COUNT = GENERAL_QUESTIONS.length;
