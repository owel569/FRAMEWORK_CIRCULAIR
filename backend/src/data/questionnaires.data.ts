import { SectorCategory, DiagnosticCategory, SectorQuestionnaire, Question } from '../types/questionnaire.types';

const createQuestion = (
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

export const SECTOR_QUESTIONNAIRES: Record<SectorCategory, SectorQuestionnaire> = {
  [SectorCategory.AGRICULTURE]: {
    sector: SectorCategory.AGRICULTURE,
    subSectors: [
      'Exploitation agricole',
      'Élevage',
      'Sylviculture',
      'Pêche et aquaculture'
    ],
    questions: [
      createQuestion('agri_env_1', DiagnosticCategory.ENVIRONMENTAL, 'Part des engrais ou intrants d\'origine renouvelable ?', 'percentage', 2, '%'),
      createQuestion('agri_env_2', DiagnosticCategory.ENVIRONMENTAL, 'Pourcentage d\'exploitation sous label biologique ou HVE (Haute Valeur Environnementale) ?', 'percentage', 3, '%'),
      createQuestion('agri_env_3', DiagnosticCategory.ENVIRONMENTAL, 'Consommation d\'eau moyenne par hectare ou par tonne produite ?', 'number', 2, 'm³'),
      createQuestion('agri_env_4', DiagnosticCategory.ENVIRONMENTAL, 'Systèmes de récupération ou de recyclage des eaux usées mis en place ? Gestion des effluents d\'élevage (stockage, valorisation, méthanisation) ?', 'boolean', 2),
      createQuestion('agri_env_5', DiagnosticCategory.ENVIRONMENTAL, 'Taux de couverture des sols ou pratiques d\'agroforesterie ?', 'percentage', 2, '%'),
      createQuestion('agri_env_6', DiagnosticCategory.ENVIRONMENTAL, 'Utilisation de traitements phytosanitaires de synthèse (kg/ha) ?', 'number', 2, 'kg/ha'),
      createQuestion('agri_env_7', DiagnosticCategory.ENVIRONMENTAL, 'Pourcentage d\'énergie renouvelable utilisée sur le site (photovoltaïque, biomasse...) ?', 'percentage', 2, '%'),
      
      createQuestion('agri_eco_1', DiagnosticCategory.ECONOMIC, 'Part de la production vendue en circuits courts (<80 km) ?', 'percentage', 2, '%'),
      createQuestion('agri_eco_2', DiagnosticCategory.ECONOMIC, 'Ratio coût/production lié aux intrants (engrais, semences, énergie) ?', 'number', 2),
      createQuestion('agri_eco_3', DiagnosticCategory.ECONOMIC, 'Taux de pertes post-récolte (%) ?', 'percentage', 2, '%'),
      createQuestion('agri_eco_4', DiagnosticCategory.ECONOMIC, 'Valorisation des sous-produits (paille, tourteaux, déchets organiques, etc.) ?', 'boolean', 2),
      createQuestion('agri_eco_5', DiagnosticCategory.ECONOMIC, 'Existence d\'une stratégie de diversification (transformation, tourisme, vente directe) ?', 'boolean', 2),
      createQuestion('agri_eco_6', DiagnosticCategory.ECONOMIC, 'Part de l\'investissement allouée à la durabilité (matériel économe, stockage vert, etc.) ?', 'percentage', 1, '%'),
      
      createQuestion('agri_social_1', DiagnosticCategory.SOCIAL, 'Part d\'emplois locaux permanents (%) ?', 'percentage', 2, '%'),
      createQuestion('agri_social_2', DiagnosticCategory.SOCIAL, 'Nombre de saisonniers employés par an ?', 'number', 1),
      createQuestion('agri_social_3', DiagnosticCategory.SOCIAL, 'Taux de formation continue sur les bonnes pratiques environnementales ? Collaboration avec des exploitations voisines (entraide, coopératives) ?', 'boolean', 2),
      createQuestion('agri_social_4', DiagnosticCategory.SOCIAL, 'Taux de transmission d\'exploitation ou installation de jeunes agriculteurs ? Dispositifs d\'insertion sociale ou d\'accueil de publics en difficulté ?', 'boolean', 2),
      
      createQuestion('agri_log_1', DiagnosticCategory.LOGISTICS, 'Distances moyennes entre site de production et marché de distribution (km) ?', 'number', 2, 'km'),
      createQuestion('agri_log_2', DiagnosticCategory.LOGISTICS, 'Fréquence des livraisons vers les points de vente ?', 'choice', 1, undefined, ['Quotidienne', 'Hebdomadaire', 'Mensuelle']),
      createQuestion('agri_log_3', DiagnosticCategory.LOGISTICS, 'Utilisation de plateformes de mutualisation logistique (coopératives, circuits courts) ?', 'boolean', 2),
      createQuestion('agri_log_4', DiagnosticCategory.LOGISTICS, 'Mode de transport principal (camion, tracteur, train,...) ?', 'text', 1),
      createQuestion('agri_log_5', DiagnosticCategory.LOGISTICS, 'Volume de stockage sur site vs externalisé ?', 'choice', 1, undefined, ['100% sur site', '50/50', '100% externalisé']),
      createQuestion('agri_log_6', DiagnosticCategory.LOGISTICS, 'Coût logistique moyen par tonne ou unité vendue ?', 'number', 1, 'MAD/tonne'),
    ],
  },

  [SectorCategory.INDUSTRY]: {
    sector: SectorCategory.INDUSTRY,
    subSectors: [
      'Agroalimentaire',
      'Textile et habillement',
      'Chimie et pharmacie',
      'Métallurgie',
      'Électronique',
      'Automobile',
      'Aéronautique'
    ],
    questions: [
      createQuestion('ind_env_1', DiagnosticCategory.ENVIRONMENTAL, 'Taux de matières premières recyclées/réemployées dans la production ?', 'percentage', 3, '%'),
      createQuestion('ind_env_2', DiagnosticCategory.ENVIRONMENTAL, 'Pourcentage de chutes de production réutilisées ou valorisées en interne ?', 'percentage', 2, '%'),
      createQuestion('ind_env_3', DiagnosticCategory.ENVIRONMENTAL, 'Consommation énergétique moyenne par unité produite ?', 'number', 2, 'kWh/unité'),
      createQuestion('ind_env_4', DiagnosticCategory.ENVIRONMENTAL, 'Existence d\'un système de récupération ou réutilisation des eaux industrielles ?', 'boolean', 2),
      createQuestion('ind_env_5', DiagnosticCategory.ENVIRONMENTAL, 'Gestion des déchets dangereux et non dangereux (% valorisé) ?', 'percentage', 3, '%'),
      createQuestion('ind_env_6', DiagnosticCategory.ENVIRONMENTAL, 'Utilisation d\'énergies renouvelables dans les procédés de production ?', 'boolean', 2),
      createQuestion('ind_env_7', DiagnosticCategory.ENVIRONMENTAL, 'Niveau de maîtrise des émissions atmosphériques (poussières, COV, CO₂, NOx) ?', 'choice', 2, undefined, ['Élevé', 'Moyen', 'Faible']),
      createQuestion('ind_env_8', DiagnosticCategory.ENVIRONMENTAL, 'Suivi de la performance environnementale par indicateurs internes (ISO 14001, bilan carbone, etc.) ?', 'boolean', 2),
      
      createQuestion('ind_eco_1', DiagnosticCategory.ECONOMIC, 'Productivité énergétique (unités produites / kWh consommé) ?', 'number', 2),
      createQuestion('ind_eco_2', DiagnosticCategory.ECONOMIC, 'Taux d\'automatisation ou de maintenance prédictive ?', 'percentage', 1, '%'),
      createQuestion('ind_eco_3', DiagnosticCategory.ECONOMIC, 'Coût unitaire moyen de production et taux d\'amélioration annuel ?', 'number', 1, 'MAD'),
      createQuestion('ind_eco_4', DiagnosticCategory.ECONOMIC, 'Taux d\'utilisation des machines (% du temps opérationnel) ?', 'percentage', 2, '%'),
      createQuestion('ind_eco_5', DiagnosticCategory.ECONOMIC, 'Pourcentage des produits conçus selon une approche d\'écoconception ?', 'percentage', 3, '%'),
      createQuestion('ind_eco_6', DiagnosticCategory.ECONOMIC, 'Existence de boucles internes de réemploi (pièces, composants, eaux process, chaleur fatale) ?', 'boolean', 2),
      createQuestion('ind_eco_7', DiagnosticCategory.ECONOMIC, 'Dépenses d\'investissement annuelles consacrées à la modernisation durable (en %) ? Ratio matière première / produit fini (rendement matière) ?', 'percentage', 2, '%'),
      
      createQuestion('ind_social_1', DiagnosticCategory.SOCIAL, 'Part de main-d\'œuvre locale dans les effectifs totaux ?', 'percentage', 2, '%'),
      createQuestion('ind_social_2', DiagnosticCategory.SOCIAL, 'Taux d\'emploi permanent vs intérim ou sous-traitance ?', 'percentage', 2, '%'),
      createQuestion('ind_social_3', DiagnosticCategory.SOCIAL, 'Nombre moyen d\'heures de formation par salarié et par an ?', 'number', 2, 'heures/an'),
      createQuestion('ind_social_4', DiagnosticCategory.SOCIAL, 'Présence d\'un plan d\'amélioration des conditions de travail (ergonomie, sécurité, bruit, chaleur) ?', 'boolean', 2),
      createQuestion('ind_social_5', DiagnosticCategory.SOCIAL, 'Taux de fréquence / gravité des accidents du travail ?', 'number', 2),
      createQuestion('ind_social_6', DiagnosticCategory.SOCIAL, 'Actions d\'insertion ou partenariats avec écoles techniques locales ?', 'boolean', 2),
      createQuestion('ind_social_7', DiagnosticCategory.SOCIAL, 'Égalité professionnelle (f/h, diversité, inclusion) ?', 'boolean', 1),
      createQuestion('ind_social_8', DiagnosticCategory.SOCIAL, 'Satisfaction sociale des salariés (enquête interne, turnover, absentéisme) ?', 'choice', 1, undefined, ['Élevée', 'Moyenne', 'Faible']),
      
      createQuestion('ind_log_1', DiagnosticCategory.LOGISTICS, 'Taux de fournisseurs locaux (<200 km) ?', 'percentage', 2, '%'),
      createQuestion('ind_log_2', DiagnosticCategory.LOGISTICS, 'Pourcentage d\'approvisionnements issus de filières certifiées (ISO 14001, RSE, équitables) ?', 'percentage', 2, '%'),
      createQuestion('ind_log_3', DiagnosticCategory.LOGISTICS, 'Taux de remplissage des camions ou conteneurs (%) ?', 'percentage', 2, '%'),
      createQuestion('ind_log_4', DiagnosticCategory.LOGISTICS, 'Distance moyenne d\'acheminement des matières premières (km) ?', 'number', 2, 'km'),
      createQuestion('ind_log_5', DiagnosticCategory.LOGISTICS, 'Taux de retours logistiques gérés (emballages, palettes, pièces) ?', 'percentage', 2, '%'),
      createQuestion('ind_log_6', DiagnosticCategory.LOGISTICS, 'Optimisation des stocks (JAT, flux tendus, lean manufacturing) ?', 'boolean', 2),
      createQuestion('ind_log_7', DiagnosticCategory.LOGISTICS, 'Part de la logistique externalisée vs internalisée ?', 'percentage', 1, '%'),
      createQuestion('ind_log_8', DiagnosticCategory.LOGISTICS, 'Utilisation d\'outils numériques de pilotage logistique (ERP, traçabilité, IA) ?', 'boolean', 1),
    ],
  },

  [SectorCategory.CONSTRUCTION]: {
    sector: SectorCategory.CONSTRUCTION,
    subSectors: [
      'Gros œuvre',
      'Second œuvre',
      'Travaux publics',
      'Rénovation énergétique'
    ],
    questions: [
      createQuestion('const_env_1', DiagnosticCategory.ENVIRONMENTAL, 'Taux de matériaux recyclés/réemployés sur chantier (%) ?', 'percentage', 3, '%'),
      createQuestion('const_env_2', DiagnosticCategory.ENVIRONMENTAL, 'Plan de tri à la source des déchets de chantier en place ?', 'boolean', 2),
      createQuestion('const_env_3', DiagnosticCategory.ENVIRONMENTAL, 'Part de matériaux biosourcés (bois, chanvre, terre crue, etc.) ?', 'percentage', 2, '%'),
      createQuestion('const_env_4', DiagnosticCategory.ENVIRONMENTAL, 'Suivi des consommations d\'eau et d\'énergie par chantier ?', 'boolean', 2),
      createQuestion('const_env_5', DiagnosticCategory.ENVIRONMENTAL, 'Émissions liées aux engins (L carburant/heure, tCO₂e) ?', 'number', 2, 'L/h'),
      createQuestion('const_env_6', DiagnosticCategory.ENVIRONMENTAL, 'Mesures de protection des sols et biodiversité (chantier responsable) ? Étude ACV / RE2020 intégrée dès la conception ?', 'boolean', 2),
      
      createQuestion('const_eco_1', DiagnosticCategory.ECONOMIC, 'Part de chantiers intégrant un plan de valorisation des matériaux ?', 'percentage', 2, '%'),
      createQuestion('const_eco_2', DiagnosticCategory.ECONOMIC, 'Part de matériel loué/mutualisé entre chantiers (%) ?', 'percentage', 2, '%'),
      createQuestion('const_eco_3', DiagnosticCategory.ECONOMIC, 'Utilisation du BIM/SIG pour optimiser quantités et phasage ?', 'boolean', 2),
      createQuestion('const_eco_4', DiagnosticCategory.ECONOMIC, 'Ratio coût total / m² construit et évolution (3 ans) ?', 'number', 1, 'MAD/m²'),
      createQuestion('const_eco_5', DiagnosticCategory.ECONOMIC, 'Part de marchés avec clauses environnementales gagnés (%) ?', 'percentage', 2, '%'),
      createQuestion('const_eco_6', DiagnosticCategory.ECONOMIC, 'Partenariats réemploi (béton concassé, acier recyclé) en place ?', 'boolean', 2),
      
      createQuestion('const_social_1', DiagnosticCategory.SOCIAL, 'Taux d\'emplois locaux sur chantier (%) ?', 'percentage', 2, '%'),
      createQuestion('const_social_2', DiagnosticCategory.SOCIAL, 'Heures de formation sécurité / salarié / an ?', 'number', 2, 'heures/an'),
      createQuestion('const_social_3', DiagnosticCategory.SOCIAL, 'Accidents du travail (TF/TG) et plan de prévention ?', 'boolean', 2),
      createQuestion('const_social_4', DiagnosticCategory.SOCIAL, 'Nombre de personnes en insertion par projet ?', 'number', 2),
      createQuestion('const_social_5', DiagnosticCategory.SOCIAL, 'Engagement RSE des sous-traitants (chartes, audits) ? Satisfaction MOA/MOE (réception, réserves, SAV) ?', 'boolean', 1),
      
      createQuestion('const_log_1', DiagnosticCategory.LOGISTICS, 'Distance moyenne dépôt ⟷ chantier (km) ?', 'number', 2, 'km'),
      createQuestion('const_log_2', DiagnosticCategory.LOGISTICS, 'Nombre moyen de rotations camions/engins par jour ?', 'number', 1),
      createQuestion('const_log_3', DiagnosticCategory.LOGISTICS, 'Taux de remplissage bennes/camions (%) ?', 'percentage', 2, '%'),
      createQuestion('const_log_4', DiagnosticCategory.LOGISTICS, 'Livraisons groupées / bases logistiques partagées ?', 'boolean', 2),
      createQuestion('const_log_5', DiagnosticCategory.LOGISTICS, 'Part de fournisseurs régionaux (%) ?', 'percentage', 2, '%'),
      createQuestion('const_log_6', DiagnosticCategory.LOGISTICS, 'Part d\'engins/véhicules à faibles émissions (%) ?', 'percentage', 2, '%'),
    ],
  },

  [SectorCategory.COMMERCE]: {
    sector: SectorCategory.COMMERCE,
    subSectors: [
      'Commerce de détail',
      'Commerce de gros',
      'E-commerce',
      'Grande distribution'
    ],
    questions: [
      createQuestion('com_env_1', DiagnosticCategory.ENVIRONMENTAL, 'Part de produits certifiés (bio, écolabel, équitable) ?', 'percentage', 3, '%'),
      createQuestion('com_env_2', DiagnosticCategory.ENVIRONMENTAL, 'Réduction/éco-conception des emballages (poids, matériaux) ?', 'boolean', 2),
      createQuestion('com_env_3', DiagnosticCategory.ENVIRONMENTAL, 'Taux de déchets valorisés (cartons, plastiques, biodéchets) ?', 'percentage', 2, '%'),
      createQuestion('com_env_4', DiagnosticCategory.ENVIRONMENTAL, 'Consommation énergétique par m² de surface de vente (kWh/m²) ?', 'number', 2, 'kWh/m²'),
      createQuestion('com_env_5', DiagnosticCategory.ENVIRONMENTAL, 'Politique anti gaspillage (dons, anti-gaspi, DLC courtes) ? Usage d\'énergies renouvelables (PV, PPA, etc.) ?', 'boolean', 2),
      
      createQuestion('com_eco_1', DiagnosticCategory.ECONOMIC, 'Part des ventes en circuits courts / locaux (%) ?', 'percentage', 2, '%'),
      createQuestion('com_eco_2', DiagnosticCategory.ECONOMIC, 'Taux de démarque inconnue ou actions de réduction ?', 'percentage', 1, '%'),
      createQuestion('com_eco_3', DiagnosticCategory.ECONOMIC, 'Part d\'affaires issu d\'offres circulaires (location, reprise) ?', 'percentage', 2, '%'),
      createQuestion('com_eco_4', DiagnosticCategory.ECONOMIC, 'Taux d\'équipement de revente seconde main / reconditionné ? Investissements d\'efficacité (froid, éclairage, GTB) sur 3 ans ?', 'percentage', 2, '%'),
      
      createQuestion('com_social_1', DiagnosticCategory.SOCIAL, 'Emplois locaux (%) et qualité d\'emploi (CDI, temps plein) ?', 'percentage', 2, '%'),
      createQuestion('com_social_2', DiagnosticCategory.SOCIAL, 'Heures de formation client/produit/sobriété par salarié ?', 'number', 2, 'heures/an'),
      createQuestion('com_social_3', DiagnosticCategory.SOCIAL, 'Accessibilité et inclusion (handicap, prix soli­daires, dons) ? Satisfaction client et gestion des retours ?', 'boolean', 2),
      
      createQuestion('com_log_1', DiagnosticCategory.LOGISTICS, 'Taux de mutualisation des livraisons magasins ?', 'percentage', 2, '%'),
      createQuestion('com_log_2', DiagnosticCategory.LOGISTICS, 'Part de la flotte bas-carbone (électrique, GNV) ?', 'percentage', 2, '%'),
      createQuestion('com_log_3', DiagnosticCategory.LOGISTICS, 'Taux de remplissage des tournées (%) et optimisation des itinéraires ?', 'percentage', 2, '%'),
      createQuestion('com_log_4', DiagnosticCategory.LOGISTICS, 'Système retour/consigne des emballages en place ?', 'boolean', 2),
      createQuestion('com_log_5', DiagnosticCategory.LOGISTICS, 'Distance moyenne entre plateforme et magasin (km) ?', 'number', 1, 'km'),
    ],
  },

  [SectorCategory.TRANSPORT]: {
    sector: SectorCategory.TRANSPORT,
    subSectors: [
      'Transport routier',
      'Transport ferroviaire',
      'Transport maritime',
      'Transport aérien',
      'Logistique'
    ],
    questions: [
      createQuestion('trans_env_1', DiagnosticCategory.ENVIRONMENTAL, 'Intensité carbone (gCO₂/t.km ou gCO₂/colis) ?', 'number', 3, 'gCO₂/t.km'),
      createQuestion('trans_env_2', DiagnosticCategory.ENVIRONMENTAL, 'Part de carburants alternatifs (BEV, GNV, HVO, H₂) ?', 'percentage', 3, '%'),
      createQuestion('trans_env_3', DiagnosticCategory.ENVIRONMENTAL, 'Politique d\'éco-conduite et télématique embarquée ?', 'boolean', 2),
      createQuestion('trans_env_4', DiagnosticCategory.ENVIRONMENTAL, 'Taux de valorisation des déchets d\'exploitation (pneus, huiles) ? Énergie renouvelable sur sites/loges (PV, PPA) ?', 'boolean', 2),
      
      createQuestion('trans_eco_1', DiagnosticCategory.ECONOMIC, 'Taux d\'occupation moyen (camions, wagons, conteneurs) ?', 'percentage', 3, '%'),
      createQuestion('trans_eco_2', DiagnosticCategory.ECONOMIC, 'Taux de livraisons réussies du 1er coup (first-attempt) ?', 'percentage', 2, '%'),
      createQuestion('trans_eco_3', DiagnosticCategory.ECONOMIC, 'Part du chiffre d\'affaires via offres bas-carbone ?', 'percentage', 2, '%'),
      createQuestion('trans_eco_4', DiagnosticCategory.ECONOMIC, 'Coût logistique par colis/tonne et évolution ?', 'number', 1, 'MAD'),
      createQuestion('trans_eco_5', DiagnosticCategory.ECONOMIC, 'Niveau de digitalisation (TMS/WMS, ETA temps réel) ?', 'boolean', 2),
      
      createQuestion('trans_social_1', DiagnosticCategory.SOCIAL, 'Taux de turnover conducteurs / préparateurs ?', 'percentage', 2, '%'),
      createQuestion('trans_social_2', DiagnosticCategory.SOCIAL, 'Heures de formation sécurité/éco-conduite par salarié ?', 'number', 2, 'heures/an'),
      createQuestion('trans_social_3', DiagnosticCategory.SOCIAL, 'Accidents et sinistralité (par million de km) ?', 'number', 2, 'accidents/M km'),
      createQuestion('trans_social_4', DiagnosticCategory.SOCIAL, 'Qualité de service perçue (retards, avaries) ?', 'choice', 1, undefined, ['Excellente', 'Bonne', 'Moyenne', 'Faible']),
      
      createQuestion('trans_log_1', DiagnosticCategory.LOGISTICS, 'Part du rail/fluviale dans le mix modal (%) ?', 'percentage', 2, '%'),
      createQuestion('trans_log_2', DiagnosticCategory.LOGISTICS, 'Dernier kilomètre décarboné (%) ?', 'percentage', 2, '%'),
      createQuestion('trans_log_3', DiagnosticCategory.LOGISTICS, 'Mutualisation inter-clients (groupage, hubs urbains) ?', 'boolean', 2),
      createQuestion('trans_log_4', DiagnosticCategory.LOGISTICS, 'Taux de retours logistiques (emballages, palettes) ?', 'percentage', 2, '%'),
      createQuestion('trans_log_5', DiagnosticCategory.LOGISTICS, 'Utilisation de véhicules ULEZ/CRIT\'Air favorisés ?', 'boolean', 1),
    ],
  },

  [SectorCategory.ENERGY]: {
    sector: SectorCategory.ENERGY,
    subSectors: [
      'Production d\'énergie',
      'Distribution d\'énergie',
      'Énergies renouvelables',
      'Gestion des déchets',
      'Traitement de l\'eau'
    ],
    questions: [
      createQuestion('energy_env_1', DiagnosticCategory.ENVIRONMENTAL, 'Part d\'énergies renouvelables produites/fournies (%) ?', 'percentage', 3, '%'),
      createQuestion('energy_env_2', DiagnosticCategory.ENVIRONMENTAL, 'Rendement moyen des installations et pertes en réseau ?', 'percentage', 2, '%'),
      createQuestion('energy_env_3', DiagnosticCategory.ENVIRONMENTAL, 'Émissions évitées (tCO₂e/an) et facteurs d\'émission utilisés ?', 'number', 2, 'tCO₂e/an'),
      createQuestion('energy_env_4', DiagnosticCategory.ENVIRONMENTAL, 'Politique de gestion de l\'eau (r/refroidissement, nettoyage) ?', 'boolean', 2),
      createQuestion('energy_env_5', DiagnosticCategory.ENVIRONMENTAL, 'Plan de démantèlement/recyclage des équipements (pales, panneaux) ?', 'boolean', 2),
      
      createQuestion('energy_eco_1', DiagnosticCategory.ECONOMIC, 'Capex/opex dédiés à l\'efficacité et au stockage (3 ans) ?', 'number', 2, 'MAD'),
      createQuestion('energy_eco_2', DiagnosticCategory.ECONOMIC, 'Part de contrats de type PPA/CPP bas-carbone ? Taux de disponibilité des actifs (% uptime) ?', 'percentage', 2, '%'),
      createQuestion('energy_eco_3', DiagnosticCategory.ECONOMIC, 'Part de services d\'effacement/flexibilité vendus ?', 'percentage', 1, '%'),
      
      createQuestion('energy_social_1', DiagnosticCategory.SOCIAL, 'Emplois locaux et formation technique (heures/an) ?', 'number', 2, 'heures/an'),
      createQuestion('energy_social_2', DiagnosticCategory.SOCIAL, 'Partenariats territoire (collectivités, habitants) ?', 'boolean', 2),
      createQuestion('energy_social_3', DiagnosticCategory.SOCIAL, 'Santé-sécurité (TF/TG) et culture sécurité ?', 'choice', 2, undefined, ['Excellente', 'Bonne', 'Moyenne']),
      createQuestion('energy_social_4', DiagnosticCategory.SOCIAL, 'Dispositifs de concertation et acceptabilité sociale ?', 'boolean', 1),
      
      createQuestion('energy_log_1', DiagnosticCategory.LOGISTICS, 'Localisation des pièces critiques (stock tampon) ?', 'choice', 1, undefined, ['Local', 'Régional', 'International']),
      createQuestion('energy_log_2', DiagnosticCategory.LOGISTICS, 'Taux de fournisseurs certifiés (QSE/RSE) ?', 'percentage', 2, '%'),
      createQuestion('energy_log_3', DiagnosticCategory.LOGISTICS, 'Logistique de transport spécial (convois, risques) maîtrisée ?', 'boolean', 1),
      createQuestion('energy_log_4', DiagnosticCategory.LOGISTICS, 'Fin de vie : boucles de reprise des composants ?', 'boolean', 2),
    ],
  },

  [SectorCategory.HEALTH]: {
    sector: SectorCategory.HEALTH,
    subSectors: [
      'Hôpitaux',
      'Cliniques',
      'Maisons de retraite',
      'Services à la personne',
      'Pharmacie',
      'Social et handicap'
    ],
    questions: [
      createQuestion('health_env_1', DiagnosticCategory.ENVIRONMENTAL, 'Gestion des DASRI et déchets pharmaceutiques (% valorisation) ?', 'percentage', 3, '%'),
      createQuestion('health_env_2', DiagnosticCategory.ENVIRONMENTAL, 'Consommation d\'énergie par lit ou par lit/an (kWh/lit/an) ?', 'number', 2, 'kWh/lit/an'),
      createQuestion('health_env_3', DiagnosticCategory.ENVIRONMENTAL, 'Eau : dispositifs de réduction et de réutilisation ?', 'boolean', 2),
      createQuestion('health_env_4', DiagnosticCategory.ENVIRONMENTAL, 'Politique d\'achats écoresponsables (dispositifs, consommables) ?', 'boolean', 2),
      
      createQuestion('health_eco_1', DiagnosticCategory.ECONOMIC, 'Taux de réutilisation de dispositifs (lorsque réglementairement possible) ?', 'percentage', 2, '%'),
      createQuestion('health_eco_2', DiagnosticCategory.ECONOMIC, 'Plan d\'optimisation des consommables (stérilisation, recyclage) ?', 'boolean', 2),
      createQuestion('health_eco_3', DiagnosticCategory.ECONOMIC, 'Investissements d\'efficacité (CVC, éclairage, GTB) ?', 'number', 1, 'MAD'),
      createQuestion('health_eco_4', DiagnosticCategory.ECONOMIC, 'Taux d\'occupation et efficience des blocs/lits/plannings techniques ?', 'percentage', 2, '%'),
      
      createQuestion('health_social_1', DiagnosticCategory.SOCIAL, 'Qualité de vie au travail (QVT) et prévention TMS/RPS ?', 'boolean', 2),
      createQuestion('health_social_2', DiagnosticCategory.SOCIAL, 'Formation sobriété/écogestes des équipes ?', 'boolean', 2),
      createQuestion('health_social_3', DiagnosticCategory.SOCIAL, 'Accès égalitaire aux soins (indicateurs) ?', 'boolean', 2),
      createQuestion('health_social_4', DiagnosticCategory.SOCIAL, 'Ancrage local (emplois, partenariats médico-sociaux) ?', 'boolean', 2),
      
      createQuestion('health_log_1', DiagnosticCategory.LOGISTICS, 'Pharmacie : traçabilité et retours sécurisés ?', 'boolean', 2),
      createQuestion('health_log_2', DiagnosticCategory.LOGISTICS, 'Approvisionnement critique (chaîne du froid, médicaments) ?', 'boolean', 2),
      createQuestion('health_log_3', DiagnosticCategory.LOGISTICS, 'Gestion des flux patients/visiteurs (mobilité douce) ?', 'boolean', 1),
      createQuestion('health_log_4', DiagnosticCategory.LOGISTICS, 'Plan de continuité d\'activité (PCA) testé ?', 'boolean', 2),
    ],
  },

  [SectorCategory.IT]: {
    sector: SectorCategory.IT,
    subSectors: [
      'Développement logiciel',
      'Cybersécurité',
      'Cloud computing',
      'Téléphonie',
      'Réseaux et infrastructure',
      'Data centers',
      'Intelligence artificielle'
    ],
    questions: [
      // Diagnostic environnemental
      createQuestion('it_env_1', DiagnosticCategory.ENVIRONMENTAL, 'Durée de vie moyenne des équipements IT et taux de reconditionné ?', 'number', 2, 'années'),
      createQuestion('it_env_2', DiagnosticCategory.ENVIRONMENTAL, 'Efficacité énergétique des data centers (PUE) ?', 'number', 3, 'PUE'),
      createQuestion('it_env_3', DiagnosticCategory.ENVIRONMENTAL, 'Politique de recyclage des DEEE (taux de collecte) ?', 'percentage', 2, '%'),
      createQuestion('it_env_4', DiagnosticCategory.ENVIRONMENTAL, 'Green coding / optimisation des charges et requêtes ?', 'boolean', 2),
      
      // Diagnostic économique
      createQuestion('it_eco_1', DiagnosticCategory.ECONOMIC, 'Part de services \'as-a-service\' favorisant l\'usage vs propriété ?', 'percentage', 2, '%'),
      createQuestion('it_eco_2', DiagnosticCategory.ECONOMIC, 'Efficience des licences et mutualisation des ressources ?', 'boolean', 1),
      createQuestion('it_eco_3', DiagnosticCategory.ECONOMIC, 'Part du CA liée à des offres \'numérique responsable\' ?', 'percentage', 2, '%'),
      createQuestion('it_eco_4', DiagnosticCategory.ECONOMIC, 'Taux d\'automatisation/observabilité (SLO/SLA) ?', 'percentage', 2, '%'),
      
      // Diagnostic social
      createQuestion('it_social_1', DiagnosticCategory.SOCIAL, 'Compétences vertes (formations cloud/efficience) ?', 'boolean', 2),
      createQuestion('it_social_2', DiagnosticCategory.SOCIAL, 'Diversité & inclusion dans les équipes tech ?', 'boolean', 2),
      createQuestion('it_social_3', DiagnosticCategory.SOCIAL, 'Protection des données / cybersécurité (incidents/an) ?', 'number', 2, 'incidents/an'),
      createQuestion('it_social_4', DiagnosticCategory.SOCIAL, 'Ancrage territorial (partenariats écoles, fablabs) ?', 'boolean', 2),
      
      // Logistique
      createQuestion('it_log_1', DiagnosticCategory.LOGISTICS, 'Traçabilité des composants (minéraux responsables) ?', 'boolean', 2),
      createQuestion('it_log_2', DiagnosticCategory.LOGISTICS, 'Boucles de reprise des équipements (take-back) ?', 'boolean', 2),
      createQuestion('it_log_3', DiagnosticCategory.LOGISTICS, 'Localisation des hébergeurs / latence vs impact ?', 'choice', 1, undefined, ['Local', 'Régional', 'International']),
      createQuestion('it_log_4', DiagnosticCategory.LOGISTICS, 'Souveraineté/sécurité de la supply (multi-sourcing) ?', 'boolean', 2),
    ],
  },

  [SectorCategory.FINANCE]: {
    sector: SectorCategory.FINANCE,
    subSectors: [
      'Banque',
      'Assurance',
      'Mutuelle',
      'Comptabilité',
      'Audit',
      'Conseil financier',
      'Gestion de patrimoine',
      'Fintech'
    ],
    questions: [
      createQuestion('fin_env_1', DiagnosticCategory.ENVIRONMENTAL, 'Empreinte directe des sites (énergie, papier, déplacements) ?', 'number', 2, 'tCO₂e/an'),
      createQuestion('fin_env_2', DiagnosticCategory.ENVIRONMENTAL, 'Politique numérique responsable (cloud, PUE, éco-impression) ? Achats responsables des prestations externes ?', 'boolean', 2),
      
      createQuestion('fin_eco_1', DiagnosticCategory.ECONOMIC, 'Intégration ESG dans le crédit et l\'investissement (taux couverts) ?', 'percentage', 3, '%'),
      createQuestion('fin_eco_2', DiagnosticCategory.ECONOMIC, 'Exclusions sectorielles carbone et trajectoires alignées ?', 'boolean', 2),
      createQuestion('fin_eco_3', DiagnosticCategory.ECONOMIC, 'Part des produits financiers verts (green bonds, fonds ISR) ? Engagement actionnarial (votes, dialogues) ?', 'percentage', 3, '%'),
      
      createQuestion('fin_social_1', DiagnosticCategory.SOCIAL, 'Accès aux services financiers des publics fragiles ?', 'boolean', 2),
      createQuestion('fin_social_2', DiagnosticCategory.SOCIAL, 'Égalité pro et formation des conseillers aux risques climatiques ?', 'boolean', 2),
      createQuestion('fin_social_3', DiagnosticCategory.SOCIAL, 'Protection client (conformité, éthique) ?', 'boolean', 2),
      createQuestion('fin_social_4', DiagnosticCategory.SOCIAL, 'Ancrage local (financement économie réelle) ?', 'boolean', 2),
      
      createQuestion('fin_log_1', DiagnosticCategory.LOGISTICS, 'KYC/AML digitalisés et sécurisés ?', 'boolean', 1),
      createQuestion('fin_log_2', DiagnosticCategory.LOGISTICS, 'Résilience fournisseurs critiques (BPO/IT) ?', 'boolean', 2),
      createQuestion('fin_log_3', DiagnosticCategory.LOGISTICS, 'Plan de continuité (tests, redondances) ?', 'boolean', 2),
      createQuestion('fin_log_4', DiagnosticCategory.LOGISTICS, 'Traçabilité des données (RGPD, souveraineté) ?', 'boolean', 2),
    ],
  },

  [SectorCategory.PUBLIC_ADMIN]: {
    sector: SectorCategory.PUBLIC_ADMIN,
    subSectors: [
      'Fonction publique',
      'Collectivités territoriales',
      'Sécurité publique',
      'Justice',
      'Armée',
      'Police',
      'Douanes',
      'Administration fiscale',
      'Écoles primaires'
    ],
    questions: [
      // Diagnostic environnemental
      createQuestion('pub_env_1', DiagnosticCategory.ENVIRONMENTAL, 'Plans de sobriété énergétique sur bâtiments publics ?', 'boolean', 3),
      createQuestion('pub_env_2', DiagnosticCategory.ENVIRONMENTAL, 'Achats durables et clauses environnementales (% marchés) ?', 'percentage', 2, '%'),
      createQuestion('pub_env_3', DiagnosticCategory.ENVIRONMENTAL, 'Réemploi de mobilier/équipements (plateformes internes) ?', 'boolean', 2),
      createQuestion('pub_env_4', DiagnosticCategory.ENVIRONMENTAL, 'Numérisation des démarches pour réduire les flux physiques ?', 'boolean', 2),
      
      // Diagnostic économique
      createQuestion('pub_eco_1', DiagnosticCategory.ECONOMIC, 'Taux d\'exécution budgétaire des programmes verts ?', 'percentage', 2, '%'),
      createQuestion('pub_eco_2', DiagnosticCategory.ECONOMIC, 'Mutualisation inter-services (flotte, locaux, archives) ?', 'boolean', 2),
      createQuestion('pub_eco_3', DiagnosticCategory.ECONOMIC, 'Efficience des prestations externalisées ?', 'boolean', 2),
      createQuestion('pub_eco_4', DiagnosticCategory.ECONOMIC, 'Open data / transparence des résultats environnementaux ?', 'boolean', 2),
      
      // Diagnostic social & territorial
      createQuestion('pub_social_1', DiagnosticCategory.SOCIAL, 'Emplois locaux, insertion et alternance dans les marchés ?', 'boolean', 3),
      createQuestion('pub_social_2', DiagnosticCategory.SOCIAL, 'Accessibilité des services (handicap, inclusion) ?', 'boolean', 2),
      createQuestion('pub_social_3', DiagnosticCategory.SOCIAL, 'Prévention des risques (sécurité, santé) ?', 'boolean', 2),
      createQuestion('pub_social_4', DiagnosticCategory.SOCIAL, 'Concertation citoyenne et qualité de service perçue ?', 'boolean', 2),
      
      // Logistique & chaîne d'approvisionnement
      createQuestion('pub_log_1', DiagnosticCategory.LOGISTICS, 'Plan de mobilité des agents (PDME) ?', 'boolean', 2),
      createQuestion('pub_log_2', DiagnosticCategory.LOGISTICS, 'Gestion du parc auto (électrification, taux d\'usage) ?', 'percentage', 2, '%'),
      createQuestion('pub_log_3', DiagnosticCategory.LOGISTICS, 'Logistique des équipements sensibles (traçabilité) ?', 'boolean', 2),
      createQuestion('pub_log_4', DiagnosticCategory.LOGISTICS, 'Gestion circulaire des archives et consommables ?', 'boolean', 2),
    ],
  },

  [SectorCategory.EDUCATION]: {
    sector: SectorCategory.EDUCATION,
    subSectors: [
      'Collèges',
      'Lycées',
      'Universités',
      'Centres de formation',
      'Recherche publique',
      'Formation continue',
      'Éducation numérique'
    ],
    questions: [
      // Diagnostic environnemental
      createQuestion('edu_env_1', DiagnosticCategory.ENVIRONMENTAL, 'Tri et valorisation des déchets dans l\'établissement (%) ?', 'percentage', 2, '%'),
      createQuestion('edu_env_2', DiagnosticCategory.ENVIRONMENTAL, 'Sobriété énergétique des bâtiments (kWh/m²·an) ?', 'number', 2, 'kWh/m²·an'),
      createQuestion('edu_env_3', DiagnosticCategory.ENVIRONMENTAL, 'Achat de fournitures écoresponsables / manuels numériques ?', 'boolean', 2),
      createQuestion('edu_env_4', DiagnosticCategory.ENVIRONMENTAL, 'Espaces verts pédagogiques (potager, compost) ?', 'boolean', 2),
      
      // Diagnostic économique
      createQuestion('edu_eco_1', DiagnosticCategory.ECONOMIC, 'Part des achats mutualisés / groupés ?', 'percentage', 2, '%'),
      createQuestion('edu_eco_2', DiagnosticCategory.ECONOMIC, 'Taux d\'équipement numérique réemployé/reconditionné ?', 'percentage', 2, '%'),
      createQuestion('edu_eco_3', DiagnosticCategory.ECONOMIC, 'Optimisation des salles (taux d\'occupation) ?', 'percentage', 1, '%'),
      createQuestion('edu_eco_4', DiagnosticCategory.ECONOMIC, 'Partenariats avec entreprises locales (alternance) ?', 'boolean', 2),
      
      // Diagnostic social
      createQuestion('edu_social_1', DiagnosticCategory.SOCIAL, 'Programmes d\'éducation à l\'économie circulaire ?', 'boolean', 3),
      createQuestion('edu_social_2', DiagnosticCategory.SOCIAL, 'Égalité des chances et inclusion (bourses, handicap) ?', 'boolean', 2),
      createQuestion('edu_social_3', DiagnosticCategory.SOCIAL, 'Sécurité et bien-être (harcèlement, santé) ?', 'boolean', 2),
      createQuestion('edu_social_4', DiagnosticCategory.SOCIAL, 'Ouverture sur le territoire (associations, tiers-lieux) ?', 'boolean', 1),
      
      // Logistique
      createQuestion('edu_log_1', DiagnosticCategory.LOGISTICS, 'Transports scolaires bas-carbone (part modale) ?', 'percentage', 2, '%'),
      createQuestion('edu_log_2', DiagnosticCategory.LOGISTICS, 'Cantine : circuits courts et lutte anti-gaspi ?', 'boolean', 2),
      createQuestion('edu_log_3', DiagnosticCategory.LOGISTICS, 'Gestion des flux d\'événements (portes ouvertes, examens) ?', 'boolean', 1),
      createQuestion('edu_log_4', DiagnosticCategory.LOGISTICS, 'Parc informatique : boucles de reprise ?', 'boolean', 2),
    ],
  },

  [SectorCategory.HOSPITALITY]: {
    sector: SectorCategory.HOSPITALITY,
    subSectors: [
      'Restaurants',
      'Hôtels',
      'Agences de voyages',
      'Loisirs',
      'Événementiel',
      'Tourisme durable',
      'Camping',
      'Croisières'
    ],
    questions: [
      // Diagnostic environnemental
      createQuestion('hosp_env_1', DiagnosticCategory.ENVIRONMENTAL, 'Consommation d\'énergie par chambre/couvert (kWh/unité) ?', 'number', 2, 'kWh/unité'),
      createQuestion('hosp_env_2', DiagnosticCategory.ENVIRONMENTAL, 'Part d\'énergies renouvelables (solaire, géothermie...) ?', 'percentage', 2, '%'),
      createQuestion('hosp_env_3', DiagnosticCategory.ENVIRONMENTAL, 'Gestion de l\'eau (limiteurs, récupération eaux grises, réutilisation piscine) ?', 'boolean', 2),
      createQuestion('hosp_env_4', DiagnosticCategory.ENVIRONMENTAL, 'Tri et valorisation des déchets (biodéchets, huiles usagées, cartons) ?', 'boolean', 2),
      createQuestion('hosp_env_5', DiagnosticCategory.ENVIRONMENTAL, 'Part des achats alimentaires locaux, de saison, bio ou certifiés ?', 'percentage', 3, '%'),
      createQuestion('hosp_env_6', DiagnosticCategory.ENVIRONMENTAL, 'Actions anti-gaspillage (portions ajustées, buffet limité, dons) ?', 'boolean', 2),
      createQuestion('hosp_env_7', DiagnosticCategory.ENVIRONMENTAL, 'Produits d\'entretien écoresponsables / réutilisation linge "à la demande" ?', 'boolean', 2),
      createQuestion('hosp_env_8', DiagnosticCategory.ENVIRONMENTAL, 'Labels environnementaux obtenus (Clé Verte, Écolabel, ISO 14001...) ?', 'boolean', 2),
      
      // Diagnostic économique
      createQuestion('hosp_eco_1', DiagnosticCategory.ECONOMIC, 'Taux d\'occupation moyen annuel et durée de séjour ?', 'percentage', 2, '%'),
      createQuestion('hosp_eco_2', DiagnosticCategory.ECONOMIC, 'Part du CA issue de prestations bas-carbone (train, vélo, local) ?', 'percentage', 2, '%'),
      createQuestion('hosp_eco_3', DiagnosticCategory.ECONOMIC, 'Réduction du gaspillage alimentaire vs année précédente (en %) ?', 'percentage', 2, '%'),
      createQuestion('hosp_eco_4', DiagnosticCategory.ECONOMIC, 'Investissements d\'efficacité (CVC, froid, LED, GTB) sur 3 ans ?', 'number', 2, 'MAD'),
      createQuestion('hosp_eco_5', DiagnosticCategory.ECONOMIC, 'Diversification de l\'offre (séminaires, événementiel, forfaits durables) ?', 'boolean', 2),
      createQuestion('hosp_eco_6', DiagnosticCategory.ECONOMIC, 'Système de pilotage des consommations (énergie/eau/déchets) ?', 'boolean', 2),
      createQuestion('hosp_eco_7', DiagnosticCategory.ECONOMIC, 'Accès à des financements verts ou aides transition ?', 'boolean', 1),
      
      // Diagnostic social & territorial
      createQuestion('hosp_social_1', DiagnosticCategory.SOCIAL, 'Conditions de travail (horaires, saisonnalité, logement, rémunération) ?', 'choice', 2, undefined, ['Excellentes', 'Bonnes', 'Moyennes', 'Faibles']),
      createQuestion('hosp_social_2', DiagnosticCategory.SOCIAL, 'Formation continue (accueil, écoresponsabilité, langues) ?', 'boolean', 2),
      createQuestion('hosp_social_3', DiagnosticCategory.SOCIAL, 'Emploi local et stabilité (CDI vs saisonniers) ?', 'percentage', 2, '%'),
      createQuestion('hosp_social_4', DiagnosticCategory.SOCIAL, 'Accessibilité personnes à mobilité réduite (PMR) et services adaptés ?', 'boolean', 2),
      createQuestion('hosp_social_5', DiagnosticCategory.SOCIAL, 'Partenariats avec producteurs/artisans locaux et valorisation du territoire ?', 'boolean', 2),
      createQuestion('hosp_social_6', DiagnosticCategory.SOCIAL, 'Satisfaction client (avis en ligne, fidélisation, taux de retour) ?', 'choice', 2, undefined, ['Excellente', 'Bonne', 'Moyenne', 'Faible']),
      createQuestion('hosp_social_7', DiagnosticCategory.SOCIAL, 'Sensibilisation clients aux écogestes (affiches, livret, application) ?', 'boolean', 2),
      
      // Logistique & chaîne d'approvisionnement
      createQuestion('hosp_log_1', DiagnosticCategory.LOGISTICS, 'Part des approvisionnements locaux (<100 km) ?', 'percentage', 2, '%'),
      createQuestion('hosp_log_2', DiagnosticCategory.LOGISTICS, 'Livraisons mutualisées ou optimisées (fenêtres horaires, groupage) ?', 'boolean', 2),
      createQuestion('hosp_log_3', DiagnosticCategory.LOGISTICS, 'Emballages consignés/retournables (bouteilles, contenants) ?', 'boolean', 2),
      createQuestion('hosp_log_4', DiagnosticCategory.LOGISTICS, 'Mobilité douce pour clients/staff (vélos, navettes, TC) ?', 'boolean', 2),
      createQuestion('hosp_log_5', DiagnosticCategory.LOGISTICS, 'Gestion des retours et stock (FIFO, rotation optimisée, antigaspi) ?', 'boolean', 2),
      createQuestion('hosp_log_6', DiagnosticCategory.LOGISTICS, 'Offres de transport bas-carbone pour accès au site (train, covoiturage) ?', 'boolean', 2),
    ],
  },

  [SectorCategory.CULTURE]: {
    sector: SectorCategory.CULTURE,
    subSectors: [
      'Journalisme',
      'Édition',
      'Publicité',
      'Audiovisuel',
      'Cinéma',
      'Design graphique',
      'Photographie',
      'Réseaux sociaux',
      'Communication digitale'
    ],
    questions: [
      createQuestion('cult_env_1', DiagnosticCategory.ENVIRONMENTAL, 'Éco-conception des événements (énergie, déchets, déplacements) ?', 'boolean', 2),
      createQuestion('cult_env_2', DiagnosticCategory.ENVIRONMENTAL, 'Réemploi des décors, costumes, supports ?', 'boolean', 2),
      createQuestion('cult_env_3', DiagnosticCategory.ENVIRONMENTAL, 'Supports imprimés : papier recyclé/encres végétales ?', 'boolean', 2),
      createQuestion('cult_env_4', DiagnosticCategory.ENVIRONMENTAL, 'Stratégie numérique sobre (streaming, compression) ?', 'boolean', 2),
      
      createQuestion('cult_eco_1', DiagnosticCategory.ECONOMIC, 'Part des productions labellisées écoresponsables ?', 'percentage', 2, '%'),
      createQuestion('cult_eco_2', DiagnosticCategory.ECONOMIC, 'Modèles de diffusion hybrides (physique ⟷ numérique) ?', 'boolean', 1),
      createQuestion('cult_eco_3', DiagnosticCategory.ECONOMIC, 'Taux de remplissage des salles / occupation des équipements ? Partenariats mécénat/CSR pour circularité ?', 'percentage', 1, '%'),
      
      createQuestion('cult_social_1', DiagnosticCategory.SOCIAL, 'Accès à la culture des publics éloignés ?', 'boolean', 2),
      createQuestion('cult_social_2', DiagnosticCategory.SOCIAL, 'Conditions de travail des intermittents (sécurité, temps) ?', 'choice', 2, undefined, ['Bonnes', 'Moyennes', 'Faibles']),
      createQuestion('cult_social_3', DiagnosticCategory.SOCIAL, 'Parité et diversité à l\'affiche ?', 'boolean', 2),
      createQuestion('cult_social_4', DiagnosticCategory.SOCIAL, 'Engagement citoyen via campagnes de sensibilisation ?', 'boolean', 1),
      
      createQuestion('cult_log_1', DiagnosticCategory.LOGISTICS, 'Itinérance optimisée des tournées (routing) ?', 'boolean', 2),
      createQuestion('cult_log_2', DiagnosticCategory.LOGISTICS, 'Réutilisation/partage de matériels (banques de décors) ?', 'boolean', 2),
      createQuestion('cult_log_3', DiagnosticCategory.LOGISTICS, 'Gestion retours merchandising et invendus ?', 'boolean', 1),
      createQuestion('cult_log_4', DiagnosticCategory.LOGISTICS, 'Billetterie et flux : mobilité douce encouragée ?', 'boolean', 1),
    ],
  },

  [SectorCategory.REAL_ESTATE]: {
    sector: SectorCategory.REAL_ESTATE,
    subSectors: [
      'Promotion immobilière',
      'Architecture',
      'Urbanisme',
      'Gestion locative',
      'Syndic de copropriété',
      'Bâtiments durables',
      'Écoquartiers'
    ],
    questions: [
      // Diagnostic environnemental
      createQuestion('real_env_1', DiagnosticCategory.ENVIRONMENTAL, 'Performance énergétique moyenne du parc (DPE, kWh/m²·an) ?', 'number', 3, 'kWh/m²·an'),
      createQuestion('real_env_2', DiagnosticCategory.ENVIRONMENTAL, 'Part de logements rénovés (BBC, RT2012, RE2020) ?', 'percentage', 2, '%'),
      createQuestion('real_env_3', DiagnosticCategory.ENVIRONMENTAL, 'Installations d\'énergies renouvelables (PV, géothermie, solaire thermique) ?', 'boolean', 2),
      createQuestion('real_env_4', DiagnosticCategory.ENVIRONMENTAL, 'Gestion de l\'eau (récupération eaux pluviales, équipements économes) ?', 'boolean', 2),
      createQuestion('real_env_5', DiagnosticCategory.ENVIRONMENTAL, 'Végétalisation et biodiversité (toitures, façades, espaces verts) ?', 'boolean', 2),
      createQuestion('real_env_6', DiagnosticCategory.ENVIRONMENTAL, 'Gestion circulaire des déchets de construction / maintenance ?', 'boolean', 2),
      createQuestion('real_env_7', DiagnosticCategory.ENVIRONMENTAL, 'Matériaux biosourcés ou recyclés dans construction/rénovation ?', 'percentage', 2, '%'),
      createQuestion('real_env_8', DiagnosticCategory.ENVIRONMENTAL, 'Certifications environnementales (HQE, BREEAM, LEED, BBCA) ?', 'boolean', 2),
      
      // Diagnostic économique
      createQuestion('real_eco_1', DiagnosticCategory.ECONOMIC, 'Taux de vacance locative et rotation des locataires ?', 'percentage', 2, '%'),
      createQuestion('real_eco_2', DiagnosticCategory.ECONOMIC, 'Investissements dans l\'efficacité énergétique (isolation, CVC, GTB) ?', 'number', 2, 'MAD'),
      createQuestion('real_eco_3', DiagnosticCategory.ECONOMIC, 'Recours aux CEE, subventions, tiers-financement pour rénovation ?', 'boolean', 2),
      createQuestion('real_eco_4', DiagnosticCategory.ECONOMIC, 'Pilotage énergétique (GTB, smart meters, suivi consommations) ?', 'boolean', 2),
      createQuestion('real_eco_5', DiagnosticCategory.ECONOMIC, 'Valorisation "verte" (loyers, attractivité, valeur patrimoniale) ?', 'boolean', 2),
      createQuestion('real_eco_6', DiagnosticCategory.ECONOMIC, 'Taux de renouvellement des équipements (durée de vie prolongée) ?', 'percentage', 1, '%'),
      createQuestion('real_eco_7', DiagnosticCategory.ECONOMIC, 'Analyse du cycle de vie (ACV) des bâtiments ?', 'boolean', 2),
      
      // Diagnostic social & territorial
      createQuestion('real_social_1', DiagnosticCategory.SOCIAL, 'Part de logements sociaux/abordables dans le parc ?', 'percentage', 2, '%'),
      createQuestion('real_social_2', DiagnosticCategory.SOCIAL, 'Accessibilité PMR et adaptation aux seniors ?', 'boolean', 2),
      createQuestion('real_social_3', DiagnosticCategory.SOCIAL, 'Qualité de service (délais intervention, satisfaction locataires) ?', 'choice', 2, undefined, ['Excellente', 'Bonne', 'Moyenne', 'Faible']),
      createQuestion('real_social_4', DiagnosticCategory.SOCIAL, 'Dispositifs d\'accompagnement anti-précarité énergétique (aide, conseil) ?', 'boolean', 2),
      createQuestion('real_social_5', DiagnosticCategory.SOCIAL, 'Concertation occupants (AG, comités, participatif) ?', 'boolean', 2),
      createQuestion('real_social_6', DiagnosticCategory.SOCIAL, 'Espaces communs de qualité (bien-être, convivialité, services partagés) ?', 'boolean', 2),
      createQuestion('real_social_7', DiagnosticCategory.SOCIAL, 'Emploi local et clauses d\'insertion dans les travaux ?', 'boolean', 2),
      
      // Logistique & chaîne d'approvisionnement
      createQuestion('real_log_1', DiagnosticCategory.LOGISTICS, 'Fournisseurs locaux pour maintenance/travaux (<100 km) ?', 'percentage', 2, '%'),
      createQuestion('real_log_2', DiagnosticCategory.LOGISTICS, 'Réemploi de matériaux lors de rénovations/démolitions ?', 'boolean', 2),
      createQuestion('real_log_3', DiagnosticCategory.LOGISTICS, 'Plan mobilité pour occupants (bornes électriques, vélos, TC) ?', 'boolean', 2),
      createQuestion('real_log_4', DiagnosticCategory.LOGISTICS, 'Gestion des prestataires (contrats SLA, traçabilité, évaluation) ?', 'boolean', 2),
      createQuestion('real_log_5', DiagnosticCategory.LOGISTICS, 'Stockage et mutualisation de matériel/équipements (banque d\'outils) ?', 'boolean', 1),
      createQuestion('real_log_6', DiagnosticCategory.LOGISTICS, 'Système de collecte sélective des déchets (tri, compost) ?', 'boolean', 2),
    ],
  },

  [SectorCategory.SCIENCES]: {
    sector: SectorCategory.SCIENCES,
    subSectors: [
      'Recherche et développement',
      'Ingénierie',
      'Biotechnologies',
      'Nanotechnologies',
      'Robotique',
      'Matériaux avancés',
      'Innovation industrielle'
    ],
    questions: [
      createQuestion('sci_env_1', DiagnosticCategory.ENVIRONMENTAL, 'Gestion des substances et déchets de laboratoire ?', 'boolean', 3),
      createQuestion('sci_env_2', DiagnosticCategory.ENVIRONMENTAL, 'Efficience énergétique des équipements (salles blanches, HVAC) ?', 'number', 2, 'kWh/m²'),
      createQuestion('sci_env_3', DiagnosticCategory.ENVIRONMENTAL, 'Réutilisation/partage des instruments coûteux ?', 'boolean', 2),
      createQuestion('sci_env_4', DiagnosticCategory.ENVIRONMENTAL, 'Politique d\'achats \'green lab\' (verrerie réutilisable, solvants) ?', 'boolean', 2),
      
      createQuestion('sci_eco_1', DiagnosticCategory.ECONOMIC, 'Taux de valorisation des prototypes/sous-produits ?', 'percentage', 2, '%'),
      createQuestion('sci_eco_2', DiagnosticCategory.ECONOMIC, 'Part des projets intégrant l\'écoconception dès amont ?', 'percentage', 3, '%'),
      createQuestion('sci_eco_3', DiagnosticCategory.ECONOMIC, 'Partenariats industrie pour transfert/industrialisation frugale ? Financements dédiés à l\'innovation durable (%) ?', 'percentage', 2, '%'),
      
      createQuestion('sci_social_1', DiagnosticCategory.SOCIAL, 'Éthique et sécurité (protocoles, biosécurité) ?', 'boolean', 2),
      createQuestion('sci_social_2', DiagnosticCategory.SOCIAL, 'Formation aux pratiques de labo sobres ?', 'boolean', 2),
      createQuestion('sci_social_3', DiagnosticCategory.SOCIAL, 'Diversité des équipes scientifiques ?', 'boolean', 1),
      createQuestion('sci_social_4', DiagnosticCategory.SOCIAL, 'Ouverture (sciences participatives, médiation) ?', 'boolean', 1),
      
      createQuestion('sci_log_1', DiagnosticCategory.LOGISTICS, 'Traçabilité des réactifs et consommables (code-barres) ?', 'boolean', 2),
      createQuestion('sci_log_2', DiagnosticCategory.LOGISTICS, 'Approvisionnement critique (froid, matières rares) ?', 'boolean', 2),
      createQuestion('sci_log_3', DiagnosticCategory.LOGISTICS, 'Plan de fin de vie des équipements (don, reprise, recyclage) ?', 'boolean', 2),
      createQuestion('sci_log_4', DiagnosticCategory.LOGISTICS, 'Partage d\'infrastructures (plateformes, core facilities) ?', 'boolean', 2),
    ],
  },

  [SectorCategory.CRAFTS]: {
    sector: SectorCategory.CRAFTS,
    subSectors: [
      'Boulangerie',
      'Coiffure',
      'Menuiserie',
      'Mécanique',
      'Électricité',
      'Couture',
      'Bijouterie',
      'Réparation',
      'Maçonnerie',
      'Plâtrerie',
      'Conseil'
    ],
    questions: [
      createQuestion('craft_env_1', DiagnosticCategory.ENVIRONMENTAL, 'Gestion des déchets de production (bois, métaux, vernis) ?', 'boolean', 2),
      createQuestion('craft_env_2', DiagnosticCategory.ENVIRONMENTAL, 'Équipements sobres (aspiration, LED, compresseurs) ?', 'boolean', 2),
      createQuestion('craft_env_3', DiagnosticCategory.ENVIRONMENTAL, 'Matières premières locales/recyclées (%) ?', 'percentage', 2, '%'),
      createQuestion('craft_env_4', DiagnosticCategory.ENVIRONMENTAL, 'Gestion des solvants/colles/peintures (séchage, rejets) ?', 'boolean', 2),
      
      createQuestion('craft_eco_1', DiagnosticCategory.ECONOMIC, 'Part de réparation/réemploi dans l\'activité ?', 'percentage', 3, '%'),
      createQuestion('craft_eco_2', DiagnosticCategory.ECONOMIC, 'Taux de rebut et actions de réduction ?', 'percentage', 2, '%'),
      createQuestion('craft_eco_3', DiagnosticCategory.ECONOMIC, 'Mutualisation d\'ateliers/équipements (fablabs) ?', 'boolean', 2),
      createQuestion('craft_eco_4', DiagnosticCategory.ECONOMIC, 'Diversification de l\'offre (personnalisation, location) ?', 'boolean', 1),
      
      createQuestion('craft_social_1', DiagnosticCategory.SOCIAL, 'Apprentissage et transmission (nb d\'apprentis) ?', 'number', 2),
      createQuestion('craft_social_2', DiagnosticCategory.SOCIAL, 'Emplois locaux (%) et qualité de l\'emploi ?', 'percentage', 2, '%'),
      createQuestion('craft_social_3', DiagnosticCategory.SOCIAL, 'Sécurité/ergonomie des postes (TMS) ?', 'boolean', 2),
      createQuestion('craft_social_4', DiagnosticCategory.SOCIAL, 'Relations avec réseaux locaux (chambres métiers) ?', 'boolean', 1),
      
      createQuestion('craft_log_1', DiagnosticCategory.LOGISTICS, 'Approvisionnements locaux (km, % fournisseurs) ?', 'percentage', 2, '%'),
      createQuestion('craft_log_2', DiagnosticCategory.LOGISTICS, 'Gestion des tournées client (mobilité douce) ?', 'boolean', 1),
      createQuestion('craft_log_3', DiagnosticCategory.LOGISTICS, 'Boucles de reprise avec fournisseurs (emballages) ?', 'boolean', 2),
      createQuestion('craft_log_4', DiagnosticCategory.LOGISTICS, 'Stockage et retours de pièces (traçabilité) ?', 'boolean', 1),
    ],
  },

  [SectorCategory.B2B_SERVICES]: {
    sector: SectorCategory.B2B_SERVICES,
    subSectors: [
      'Nettoyage industriel',
      'Sécurité privée',
      'Intérim',
      'Maintenance',
      'Facility management',
      'Audit organisationnel'
    ],
    questions: [
      createQuestion('b2b_env_1', DiagnosticCategory.ENVIRONMENTAL, 'Empreinte des bureaux (énergie, eau, déchets, papier) ?', 'number', 2, 'tCO₂e/an'),
      createQuestion('b2b_env_2', DiagnosticCategory.ENVIRONMENTAL, 'Numérique responsable (impressions, cloud, postes) ?', 'boolean', 2),
      createQuestion('b2b_env_3', DiagnosticCategory.ENVIRONMENTAL, 'Achats responsables (prestations, fournitures) ? Déplacements pros : politique mobilité sobre ?', 'boolean', 2),
      
      createQuestion('b2b_eco_1', DiagnosticCategory.ECONOMIC, 'Part d\'offres circulaires (location, maintenance, performance) ?', 'percentage', 2, '%'),
      createQuestion('b2b_eco_2', DiagnosticCategory.ECONOMIC, 'Productivité par ETP et amélioration continue (lean office) ?', 'number', 1),
      createQuestion('b2b_eco_3', DiagnosticCategory.ECONOMIC, 'Taux d\'externalisation et efficience des coûts ?', 'percentage', 1, '%'),
      createQuestion('b2b_eco_4', DiagnosticCategory.ECONOMIC, 'Innovation/automatisation des process (RPA, IA) ?', 'boolean', 2),
      
      createQuestion('b2b_social_1', DiagnosticCategory.SOCIAL, 'Qualité de vie au travail (QVT), télétravail ?', 'boolean', 2),
      createQuestion('b2b_social_2', DiagnosticCategory.SOCIAL, 'Formation des collaborateurs (heures/an) ?', 'number', 2, 'heures/an'),
      createQuestion('b2b_social_3', DiagnosticCategory.SOCIAL, 'Égalité pro, inclusion, diversité ?', 'boolean', 2),
      createQuestion('b2b_social_4', DiagnosticCategory.SOCIAL, 'Engagement client (NPS, réclamations) ?', 'choice', 1, undefined, ['Excellent', 'Bon', 'Moyen']),
      
      createQuestion('b2b_log_1', DiagnosticCategory.LOGISTICS, 'Gestion des prestataires critiques (SLA, PCA) ?', 'boolean', 2),
      createQuestion('b2b_log_2', DiagnosticCategory.LOGISTICS, 'Traçabilité des données/contrats (RGPD) ?', 'boolean', 2),
      createQuestion('b2b_log_3', DiagnosticCategory.LOGISTICS, 'Mobilier/IT : reprise et reconditionnement ?', 'boolean', 2),
      createQuestion('b2b_log_4', DiagnosticCategory.LOGISTICS, 'Parc véhicules : verdissement (%) ?', 'percentage', 2, '%'),
    ],
  },

  [SectorCategory.B2C_SERVICES]: {
    sector: SectorCategory.B2C_SERVICES,
    subSectors: [
      'Aide à domicile',
      'Garde d\'enfants',
      'Soins esthétiques',
      'Jardinage',
      'Entretien ménager',
      'Coaching personnel',
      'Services funéraires'
    ],
    questions: [
      createQuestion('b2c_env_1', DiagnosticCategory.ENVIRONMENTAL, 'Produits/consommables écoresponsables utilisés ?', 'boolean', 2),
      createQuestion('b2c_env_2', DiagnosticCategory.ENVIRONMENTAL, 'Gestion des déchets générés chez les clients ?', 'boolean', 2),
      createQuestion('b2c_env_3', DiagnosticCategory.ENVIRONMENTAL, 'Équipements sobres (énergie/eau) ?', 'boolean', 2),
      createQuestion('b2c_env_4', DiagnosticCategory.ENVIRONMENTAL, 'Empreinte des déplacements domicile-clients ?', 'number', 2, 'km/jour'),
      
      createQuestion('b2c_eco_1', DiagnosticCategory.ECONOMIC, 'Modèles d\'abonnement/forfait favorisant l\'usage ?', 'boolean', 2),
      createQuestion('b2c_eco_2', DiagnosticCategory.ECONOMIC, 'Optimisation des plannings (tournées, annulations) ?', 'boolean', 2),
      createQuestion('b2c_eco_3', DiagnosticCategory.ECONOMIC, 'Offres de réparation/rénovation plutôt que remplacement ? Taux de satisfaction et rétention clients ?', 'boolean', 2),
      
      createQuestion('b2c_social_1', DiagnosticCategory.SOCIAL, 'Emplois locaux et conditions (temps, salaires) ?', 'choice', 2, undefined, ['Excellentes', 'Bonnes', 'Moyennes']),
      createQuestion('b2c_social_2', DiagnosticCategory.SOCIAL, 'Formation sécurité/qualité (heures/an) ?', 'number', 2, 'heures/an'),
      createQuestion('b2c_social_3', DiagnosticCategory.SOCIAL, 'Accessibilité des services (publics fragiles) ? Assurance et conformité réglementaire ?', 'boolean', 2),
      
      createQuestion('b2c_log_1', DiagnosticCategory.LOGISTICS, 'Rayon d\'intervention (km) et mutualisation des trajets ?', 'number', 2, 'km'),
      createQuestion('b2c_log_2', DiagnosticCategory.LOGISTICS, 'Gestion des stocks/retours de consommables ?', 'boolean', 1),
      createQuestion('b2c_log_3', DiagnosticCategory.LOGISTICS, 'Traçabilité interventions (outils numériques) ?', 'boolean', 1),
      createQuestion('b2c_log_4', DiagnosticCategory.LOGISTICS, 'Boucles de reprise avec fournisseurs (emballages) ?', 'boolean', 2),
    ],
  },

  [SectorCategory.NGO]: {
    sector: SectorCategory.NGO,
    subSectors: [
      'Humanitaire',
      'Environnementale',
      'Sociale',
      'Caritative',
      'Éducation solidaire',
      'Développement durable',
      'Économie sociale et solidaire'
    ],
    questions: [
      createQuestion('ngo_env_1', DiagnosticCategory.ENVIRONMENTAL, 'Politique écoresponsable d\'événements et de locaux ?', 'boolean', 2),
      createQuestion('ngo_env_2', DiagnosticCategory.ENVIRONMENTAL, 'Gestion des dons matériels (tri, réemploi) ?', 'boolean', 2),
      createQuestion('ngo_env_3', DiagnosticCategory.ENVIRONMENTAL, 'Empreinte numérique et déplacements sobres ? Sensibilisation environnementale du public ?', 'boolean', 2),
      
      createQuestion('ngo_eco_1', DiagnosticCategory.ECONOMIC, 'Diversification des financements (dons, subventions, ESS) ?', 'boolean', 2),
      createQuestion('ngo_eco_2', DiagnosticCategory.ECONOMIC, 'Efficience administrative (frais généraux %) ?', 'percentage', 2, '%'),
      createQuestion('ngo_eco_3', DiagnosticCategory.ECONOMIC, 'Modèles circulaires (réemploi, réparation) au cœur des projets ? Partenariats avec entreprises/fondations locales ?', 'boolean', 2),
      
      createQuestion('ngo_social_1', DiagnosticCategory.SOCIAL, 'Impact social mesuré (bénéficiaires, indicateurs) ?', 'boolean', 3),
      createQuestion('ngo_social_2', DiagnosticCategory.SOCIAL, 'Gouvernance participative/transparente ?', 'boolean', 2),
      createQuestion('ngo_social_3', DiagnosticCategory.SOCIAL, 'Gestion des bénévoles (formation, assurance) ? Inclusion des publics vulnérables ?', 'boolean', 2),
      
      createQuestion('ngo_log_1', DiagnosticCategory.LOGISTICS, 'Collecte et distribution : optimisation des tournées ?', 'boolean', 2),
      createQuestion('ngo_log_2', DiagnosticCategory.LOGISTICS, 'Traçabilité des dons et affectations ?', 'boolean', 2),
      createQuestion('ngo_log_3', DiagnosticCategory.LOGISTICS, 'Partenariats logistiques (banques alimentaires, plateformes) ?', 'boolean', 2),
      createQuestion('ngo_log_4', DiagnosticCategory.LOGISTICS, 'Boucles de reprise/valorisation des invendus ?', 'boolean', 2),
    ],
  },

  [SectorCategory.EMERGING]: {
    sector: SectorCategory.EMERGING,
    subSectors: [
      'Économie circulaire',
      'Numérique responsable',
      'Agriculture urbaine',
      'Mobilité douce',
      'Énergies alternatives',
      'Réemploi et réparation'
    ],
    questions: [
      createQuestion('emerg_env_1', DiagnosticCategory.ENVIRONMENTAL, 'Impacts environnementaux principaux identifiés ?', 'text', 2),
      createQuestion('emerg_env_2', DiagnosticCategory.ENVIRONMENTAL, 'Part d\'énergies renouvelables dans l\'activité ?', 'percentage', 2, '%'),
      createQuestion('emerg_env_3', DiagnosticCategory.ENVIRONMENTAL, 'Éco-conception des produits/services ?', 'boolean', 3),
      createQuestion('emerg_env_4', DiagnosticCategory.ENVIRONMENTAL, 'Plan de fin de vie et réemploi des composants ?', 'boolean', 2),
      
      createQuestion('emerg_eco_1', DiagnosticCategory.ECONOMIC, 'Modèle d\'affaires orienté usage/partage ?', 'boolean', 3),
      createQuestion('emerg_eco_2', DiagnosticCategory.ECONOMIC, 'Indicateurs de performance circulaire ?', 'boolean', 2),
      createQuestion('emerg_eco_3', DiagnosticCategory.ECONOMIC, 'Part de revenus issus d\'offres \'circulaires\' ?', 'percentage', 2, '%'),
      createQuestion('emerg_eco_4', DiagnosticCategory.ECONOMIC, 'Accès à des financements verts/innovants ?', 'boolean', 1),
      
      createQuestion('emerg_social_1', DiagnosticCategory.SOCIAL, 'Création d\'emplois locaux/qualifiés ?', 'boolean', 2),
      createQuestion('emerg_social_2', DiagnosticCategory.SOCIAL, 'Compétences vertes des équipes (formations) ?', 'boolean', 2),
      createQuestion('emerg_social_3', DiagnosticCategory.SOCIAL, 'Accessibilité et bénéfices sociaux du service ? Gouvernance ouverte/partenariale ?', 'boolean', 2),
      
      createQuestion('emerg_log_1', DiagnosticCategory.LOGISTICS, 'Supply multi-sourcing pour résilience ?', 'boolean', 2),
      createQuestion('emerg_log_2', DiagnosticCategory.LOGISTICS, 'Traçabilité et reprise des produits ?', 'boolean', 2),
      createQuestion('emerg_log_3', DiagnosticCategory.LOGISTICS, 'Mutualisation d\'infrastructures (hubs, fablabs) ?', 'boolean', 2),
      createQuestion('emerg_log_4', DiagnosticCategory.LOGISTICS, 'Implantation proche des usagers (km) ?', 'number', 1, 'km'),
    ],
  },
};
