export enum SectorCategory {
  AGRICULTURE = 'Agriculture, sylviculture et pêche',
  INDUSTRY = 'Industrie manufacturière',
  CONSTRUCTION = 'Construction / BTP',
  COMMERCE = 'Commerce et distribution',
  TRANSPORT = 'Transport et logistique',
  ENERGY = 'Énergie et environnement',
  HEALTH = 'Santé et action sociale',
  IT = 'Informatique et télécommunications',
  FINANCE = 'Banque, assurance et finance',
  PUBLIC_ADMIN = 'Administration publique et défense',
  EDUCATION = 'Éducation et formation',
  HOSPITALITY = 'Hôtellerie, restauration et tourisme',
  CULTURE = 'Culture, médias et communication',
  REAL_ESTATE = 'Immobilier et logement',
  SCIENCES = 'Sciences et technologies',
  CRAFTS = 'Artisanat et métiers de proximité',
  B2B_SERVICES = 'Services aux entreprises',
  B2C_SERVICES = 'Services aux particuliers',
  NGO = 'Associations et ONG',
  EMERGING = 'Autres secteurs émergents'
}

export enum DiagnosticCategory {
  GOVERNANCE = 'Diagnostic de gouvernance (ISO 59004)',
  ENVIRONMENTAL = 'Diagnostic environnemental (Flux, Déchets, Énergie, Eau)',
  ECONOMIC = 'Diagnostic économique & production',
  SOCIAL = 'Diagnostic social & territorial',
  LOGISTICS = 'Logistique & chaîne d\'approvisionnement'
}

export interface Question {
  id: string;
  category: DiagnosticCategory;
  text: string;
  type: 'boolean' | 'percentage' | 'number' | 'text' | 'choice';
  unit?: string;
  choices?: string[];
  weight: number;
  isoReference?: string;
}

export interface SectorQuestionnaire {
  sector: SectorCategory;
  subSectors: string[];
  questions: Question[];
}

export const SUB_SECTORS: Record<SectorCategory, string[]> = {
  [SectorCategory.AGRICULTURE]: [
    'Exploitation agricole',
    'Élevage',
    'Sylviculture',
    'Pêche et aquaculture'
  ],
  [SectorCategory.INDUSTRY]: [
    'Agroalimentaire',
    'Textile et habillement',
    'Chimie et pharmacie',
    'Métallurgie',
    'Électronique',
    'Automobile',
    'Aéronautique'
  ],
  [SectorCategory.CONSTRUCTION]: [
    'Gros œuvre',
    'Second œuvre',
    'Travaux publics',
    'Rénovation énergétique'
  ],
  [SectorCategory.COMMERCE]: [
    'Commerce de détail',
    'Commerce de gros',
    'E-commerce',
    'Grande distribution'
  ],
  [SectorCategory.TRANSPORT]: [
    'Transport routier',
    'Transport ferroviaire',
    'Transport maritime',
    'Transport aérien',
    'Logistique'
  ],
  [SectorCategory.ENERGY]: [
    'Production d\'énergie',
    'Distribution d\'énergie',
    'Énergies renouvelables',
    'Gestion des déchets',
    'Traitement de l\'eau'
  ],
  [SectorCategory.HEALTH]: [
    'Hôpitaux',
    'Cliniques',
    'Maisons de retraite',
    'Services à la personne',
    'Pharmacie',
    'Social et handicap'
  ],
  [SectorCategory.IT]: [
    'Développement logiciel',
    'Cybersécurité',
    'Cloud computing',
    'Téléphonie',
    'Réseaux et infrastructure',
    'Data centers',
    'Intelligence artificielle'
  ],
  [SectorCategory.FINANCE]: [
    'Banque',
    'Assurance',
    'Mutuelle',
    'Comptabilité',
    'Audit',
    'Conseil financier',
    'Gestion de patrimoine',
    'Fintech'
  ],
  [SectorCategory.PUBLIC_ADMIN]: [
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
  [SectorCategory.EDUCATION]: [
    'Collèges',
    'Lycées',
    'Universités',
    'Centres de formation',
    'Recherche publique',
    'Formation continue',
    'Éducation numérique'
  ],
  [SectorCategory.HOSPITALITY]: [
    'Restaurants',
    'Hôtels',
    'Agences de voyages',
    'Loisirs',
    'Événementiel',
    'Tourisme durable',
    'Camping',
    'Croisières'
  ],
  [SectorCategory.CULTURE]: [
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
  [SectorCategory.REAL_ESTATE]: [
    'Promotion immobilière',
    'Architecture',
    'Urbanisme',
    'Gestion locative',
    'Syndic de copropriété',
    'Bâtiments durables',
    'Écoquartiers'
  ],
  [SectorCategory.SCIENCES]: [
    'Recherche et développement',
    'Ingénierie',
    'Biotechnologies',
    'Nanotechnologies',
    'Robotique',
    'Matériaux avancés',
    'Innovation industrielle'
  ],
  [SectorCategory.CRAFTS]: [
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
  [SectorCategory.B2B_SERVICES]: [
    'Nettoyage industriel',
    'Sécurité privée',
    'Intérim',
    'Maintenance',
    'Facility management',
    'Audit organisationnel'
  ],
  [SectorCategory.B2C_SERVICES]: [
    'Aide à domicile',
    'Garde d\'enfants',
    'Soins esthétiques',
    'Jardinage',
    'Entretien ménager',
    'Coaching personnel',
    'Services funéraires'
  ],
  [SectorCategory.NGO]: [
    'Humanitaire',
    'Environnementale',
    'Sociale',
    'Caritative',
    'Éducation solidaire',
    'Développement durable',
    'Économie sociale et solidaire'
  ],
  [SectorCategory.EMERGING]: [
    'Économie circulaire',
    'Numérique responsable',
    'Agriculture urbaine',
    'Mobilité douce',
    'Énergies alternatives',
    'Réemploi et réparation'
  ]
};
