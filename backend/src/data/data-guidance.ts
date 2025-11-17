import { DataGuidance } from '../types/questionnaire.types';

export const DATA_GUIDANCE_MAP: Record<string, DataGuidance> = {
  dechets_totaux: {
    howToObtain: 'Additionner les tonnages figurant sur les bordereaux de suivi, factures de collecte et contrats de traitement.',
    source: 'Ministère de l\'Environnement',
    sourceUrl: 'https://www.environnement.gov.ma'
  },
  dechets_valorises: {
    howToObtain: 'Additionner les tonnages envoyés vers des filières de recyclage, réemploi ou valorisation (preuves : BSD, certificats prestataires).',
    source: 'Ministère de l\'Environnement',
    sourceUrl: 'https://www.environnement.gov.ma'
  },
  pourcentage_valorisation: {
    howToObtain: 'Calculer : (déchets valorisés / déchets totaux) × 100.',
    source: 'Ministère de l\'Environnement',
    sourceUrl: 'https://www.environnement.gov.ma'
  },
  dechets_dangereux: {
    howToObtain: 'Additionner les masses figurant sur les BSDD et factures de traitement agréées.',
    source: 'Ministère de l\'Environnement',
    sourceUrl: 'https://www.environnement.gov.ma'
  },
  cout_traitement: {
    howToObtain: 'Diviser le coût total annuel des contrats de traitement par le tonnage total.',
    source: 'Ministère de l\'Environnement',
    sourceUrl: 'https://www.environnement.gov.ma'
  },
  electricite_kwh: {
    howToObtain: 'Relever la consommation sur les 12 factures ONEE ou exporter depuis le portail client.',
    source: 'Office National de l\'Électricité et de l\'Eau Potable',
    sourceUrl: 'https://www.onee.ma'
  },
  gaz_kwh: {
    howToObtain: 'Additionner les consommations figurant sur les factures de gaz, propane ou butane. Convertir en kWh si exprimé en m³.',
    source: 'Ministère de la Transition Énergétique',
    sourceUrl: 'https://www.mtedd.gov.ma'
  },
  eau_m3: {
    howToObtain: 'Relever les volumes sur les factures d\'eau potable ou compteurs internes.',
    source: 'Office National de l\'Électricité et de l\'Eau Potable',
    sourceUrl: 'https://www.onee.ma'
  },
  carburants_litres: {
    howToObtain: 'Totaliser les litres achetés via factures ou cartes flotte pour tous véhicules et engins.',
    source: 'Confédération Générale des Entreprises du Maroc',
    sourceUrl: 'https://www.cgem.ma'
  },
  km_logistique: {
    howToObtain: 'Exporter les km annuels depuis le logiciel de gestion de flotte ou les relevés GPS.',
    source: 'Office National des Chemins de Fer',
    sourceUrl: 'https://www.oncf.ma'
  },
  emissions_co2: {
    howToObtain: 'Utiliser les facteurs d\'émission officiels publiés par l\'AMEE ou, à défaut, par l\'ADEME.',
    source: 'Agence Marocaine pour l\'Efficacité Énergétique',
    sourceUrl: 'https://www.amee.ma'
  },
  bilan_carbone_scope1: {
    howToObtain: 'Additionner les émissions issues des combustibles, carburants et procédés directs selon les facteurs d\'émission AMEE/CGEM.',
    source: 'Confédération Générale des Entreprises du Maroc',
    sourceUrl: 'https://www.cgem.ma'
  },
  bilan_carbone_scope2: {
    howToObtain: 'Multiplier la consommation électrique par le facteur d\'émission du réseau marocain (kgCO₂/kWh).',
    source: 'Agence Marocaine pour l\'Efficacité Énergétique',
    sourceUrl: 'https://www.amee.ma'
  },
  bilan_carbone_scope3: {
    howToObtain: 'Estimer les émissions indirectes (achats, transport, déchets, déplacements) via la méthode GHG Protocol.',
    source: 'GHG Protocol',
    sourceUrl: 'https://ghgprotocol.org'
  },
  taux_utilisation_equipements: {
    howToObtain: 'Calcul : (heures de marche / heures disponibles) × 100. Données issues du MES, SCADA ou GMAO.',
    source: 'Agence Marocaine pour l\'Efficacité Énergétique',
    sourceUrl: 'https://www.amee.ma'
  },
  matieres_recyclees_pct: {
    howToObtain: 'Masse de matières recyclées utilisées / masse totale achetée × 100.',
    source: 'Haut-Commissariat au Plan',
    sourceUrl: 'https://www.hcp.ma'
  },
  depenses_maintenance: {
    howToObtain: 'Additionner les coûts issus du service maintenance (pièces, contrats, main-d\'œuvre).',
    source: 'Agence Marocaine pour l\'Efficacité Énergétique',
    sourceUrl: 'https://www.amee.ma'
  },
  duree_vie_equipements: {
    howToObtain: 'Moyenne des durées d\'amortissement comptable ou historiques de remplacement.',
    source: 'Haut-Commissariat au Plan',
    sourceUrl: 'https://www.hcp.ma'
  },
  taux_rebut: {
    howToObtain: 'Calcul : (pièces rebutées / pièces produites) × 100. Données issues du service qualité.',
    source: 'Haut-Commissariat au Plan',
    sourceUrl: 'https://www.hcp.ma'
  },
  achats_responsables_pct: {
    howToObtain: 'Proportion d\'achats réalisés auprès de fournisseurs locaux ou certifiés ISO/RSE.',
    source: 'Confédération Générale des Entreprises du Maroc',
    sourceUrl: 'https://www.cgem.ma'
  },
  emplois_locaux_pct: {
    howToObtain: 'Salariés résidant à moins de 100 km / effectif total × 100.',
    source: 'Haut-Commissariat au Plan',
    sourceUrl: 'https://www.hcp.ma'
  },
  recrutements_insertion: {
    howToObtain: 'Comptabiliser les recrutements dans ces catégories à partir des données RH.',
    source: 'Haut-Commissariat au Plan',
    sourceUrl: 'https://www.hcp.ma'
  },
  heures_formation: {
    howToObtain: 'Total heures formation / effectif moyen. Source : service formation ou LMS.',
    source: 'Haut-Commissariat au Plan',
    sourceUrl: 'https://www.hcp.ma'
  },
  part_femmes: {
    howToObtain: 'Nombre de femmes / effectif total × 100.',
    source: 'Haut-Commissariat au Plan',
    sourceUrl: 'https://www.hcp.ma'
  },
  initiatives_locales: {
    howToObtain: 'Nombre d\'actions avec acteurs locaux (associations, écoles, collectivités…).',
    source: 'Confédération Générale des Entreprises du Maroc',
    sourceUrl: 'https://www.cgem.ma'
  },
  nombre_fournisseurs: {
    howToObtain: 'Total des fournisseurs actifs selon la base comptable/ERP.',
    source: 'Confédération Générale des Entreprises du Maroc',
    sourceUrl: 'https://www.cgem.ma'
  },
  fournisseurs_locaux_pct: {
    howToObtain: 'Fournisseurs situés à moins de 100 km / total fournisseurs × 100.',
    source: 'Confédération Générale des Entreprises du Maroc',
    sourceUrl: 'https://www.cgem.ma'
  },
  distance_approvisionnement: {
    howToObtain: 'Moyenne pondérée des distances fournisseur → site.',
    source: 'Confédération Générale des Entreprises du Maroc',
    sourceUrl: 'https://www.cgem.ma'
  },
  taux_remplissage_camions: {
    howToObtain: 'Volume transporté / capacité totale × 100.',
    source: 'Agence Marocaine pour l\'Efficacité Énergétique',
    sourceUrl: 'https://www.amee.ma'
  },
  vehicules_faibles_emissions: {
    howToObtain: 'Véhicules hybrides, électriques, GNV ou H₂ / total flotte × 100.',
    source: 'Agence Marocaine pour l\'Efficacité Énergétique',
    sourceUrl: 'https://www.amee.ma'
  }
};

export function getGuidanceForQuestion(questionText: string, category: string, unit?: string): DataGuidance | undefined {
  const text = questionText.toLowerCase();
  
  if (text.includes('déchet') && text.includes('total')) return DATA_GUIDANCE_MAP.dechets_totaux;
  if (text.includes('déchet') && text.includes('valoris')) return DATA_GUIDANCE_MAP.dechets_valorises;
  if (text.includes('valorisation') || (text.includes('recyclé') && text.includes('%'))) return DATA_GUIDANCE_MAP.pourcentage_valorisation;
  if (text.includes('dangereux')) return DATA_GUIDANCE_MAP.dechets_dangereux;
  if (text.includes('coût') && text.includes('traitement')) return DATA_GUIDANCE_MAP.cout_traitement;
  
  if (text.includes('électricité') || text.includes('electricite')) return DATA_GUIDANCE_MAP.electricite_kwh;
  if (text.includes('gaz')) return DATA_GUIDANCE_MAP.gaz_kwh;
  if (text.includes('eau') && unit?.includes('m³')) return DATA_GUIDANCE_MAP.eau_m3;
  if (text.includes('carburant')) return DATA_GUIDANCE_MAP.carburants_litres;
  
  if (text.includes('km') || text.includes('kilomètre')) return DATA_GUIDANCE_MAP.km_logistique;
  if (text.includes('émission') || text.includes('emission')) {
    if (text.includes('scope 1') || text.includes('scope1')) return DATA_GUIDANCE_MAP.bilan_carbone_scope1;
    if (text.includes('scope 2') || text.includes('scope2')) return DATA_GUIDANCE_MAP.bilan_carbone_scope2;
    if (text.includes('scope 3') || text.includes('scope3')) return DATA_GUIDANCE_MAP.bilan_carbone_scope3;
    return DATA_GUIDANCE_MAP.emissions_co2;
  }
  
  if (text.includes('bilan carbone')) {
    if (text.includes('scope 1')) return DATA_GUIDANCE_MAP.bilan_carbone_scope1;
    if (text.includes('scope 2')) return DATA_GUIDANCE_MAP.bilan_carbone_scope2;
    if (text.includes('scope 3')) return DATA_GUIDANCE_MAP.bilan_carbone_scope3;
  }
  
  if (text.includes('utilisation') && text.includes('équipement')) return DATA_GUIDANCE_MAP.taux_utilisation_equipements;
  if (text.includes('matière') && text.includes('recyclé')) return DATA_GUIDANCE_MAP.matieres_recyclees_pct;
  if (text.includes('maintenance')) return DATA_GUIDANCE_MAP.depenses_maintenance;
  if (text.includes('durée de vie')) return DATA_GUIDANCE_MAP.duree_vie_equipements;
  if (text.includes('rebut') || text.includes('non-qualité')) return DATA_GUIDANCE_MAP.taux_rebut;
  if (text.includes('achat') && text.includes('responsable')) return DATA_GUIDANCE_MAP.achats_responsables_pct;
  
  if (text.includes('emploi') && text.includes('local')) return DATA_GUIDANCE_MAP.emplois_locaux_pct;
  if (text.includes('insertion') || text.includes('alternance')) return DATA_GUIDANCE_MAP.recrutements_insertion;
  if (text.includes('formation')) return DATA_GUIDANCE_MAP.heures_formation;
  if (text.includes('femme') || text.includes('parité')) return DATA_GUIDANCE_MAP.part_femmes;
  if (text.includes('initiative') && text.includes('locale')) return DATA_GUIDANCE_MAP.initiatives_locales;
  
  if (text.includes('nombre') && text.includes('fournisseur')) return DATA_GUIDANCE_MAP.nombre_fournisseurs;
  if (text.includes('fournisseur') && text.includes('local')) return DATA_GUIDANCE_MAP.fournisseurs_locaux_pct;
  if (text.includes('distance') && text.includes('approvisionnement')) return DATA_GUIDANCE_MAP.distance_approvisionnement;
  if (text.includes('remplissage') && text.includes('camion')) return DATA_GUIDANCE_MAP.taux_remplissage_camions;
  if (text.includes('véhicule') && text.includes('émission')) return DATA_GUIDANCE_MAP.vehicules_faibles_emissions;
  
  return {
    howToObtain: 'Consulter vos documents administratifs, factures, ou systèmes de gestion interne (ERP, GMAO). Si la donnée n\'existe pas, mettre en place un suivi simple via tableur Excel.',
    source: 'Documentation interne de l\'entreprise',
    sourceUrl: 'https://www.cgem.ma'
  };
}
