import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../config'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'

const BACKEND_URL = API_URL

// Interfaces TypeScript
interface Question {
  id: string;
  text: string;
  type: 'boolean' | 'percentage' | 'number' | 'choice' | 'text';
  category: string;
  unit?: string;
  weight: number;
  choices?: string[];
}

interface CompanyData {
  name: string;
  sector: string;
  subSector: string;
  email: string;
  phone: string;
  employeeCount?: number;
}

interface ResponsesData {
  [categoryId: string]: {
    [questionId: string]: any;
  };
}

interface SectorQuestions {
  environmental: Question[];
  economic: Question[];
  social: Question[];
  logistics: Question[];
}

interface QuestionnaireProgress {
  company: CompanyData;
  responses: ResponsesData;
  currentStep: number;
  lastSaved: number;
}

const STORAGE_KEY = 'questionnaire-progress'

// Import des secteurs et sous-secteurs depuis votre structure de données
const SECTORS = {
  'Agriculture, sylviculture et pêche': [
    'Exploitation agricole',
    'Élevage',
    'Sylviculture',
    'Pêche et aquaculture'
  ],
  'Industrie manufacturière': [
    'Agroalimentaire',
    'Textile et habillement',
    'Chimie et pharmacie',
    'Métallurgie',
    'Électronique',
    'Automobile',
    'Aéronautique'
  ],
  'Construction / BTP': [
    'Gros œuvre',
    'Second œuvre',
    'Travaux publics',
    'Rénovation énergétique'
  ],
  'Commerce et distribution': [
    'Commerce de détail',
    'Commerce de gros',
    'E-commerce',
    'Grande distribution'
  ],
  'Transport et logistique': [
    'Transport routier',
    'Transport ferroviaire',
    'Transport maritime',
    'Transport aérien',
    'Logistique'
  ],
  'Énergie et environnement': [
    'Production d\'énergie',
    'Distribution d\'énergie',
    'Énergies renouvelables',
    'Gestion des déchets',
    'Traitement de l\'eau'
  ],
  'Santé et action sociale': [
    'Hôpitaux',
    'Cliniques',
    'Maisons de retraite',
    'Services à la personne',
    'Pharmacie',
    'Social et handicap'
  ],
  'Informatique et télécommunications': [
    'Développement logiciel',
    'Cybersécurité',
    'Cloud computing',
    'Téléphonie',
    'Réseaux et infrastructure',
    'Data centers',
    'Intelligence artificielle'
  ],
  'Banque, assurance et finance': [
    'Banque',
    'Assurance',
    'Mutuelle',
    'Comptabilité',
    'Audit',
    'Conseil financier',
    'Gestion de patrimoine',
    'Fintech'
  ],
  'Administration publique et défense': [
    'Fonction publique',
    'Collectivités territoriales',
    'Sécurité publique',
    'Justice',
    'Armée',
    'Police',
    'Douanes',
    'Administration fiscale'
  ],
  'Éducation et formation': [
    'Collèges',
    'Lycées',
    'Universités',
    'Centres de formation',
    'Recherche publique',
    'Formation continue',
    'Éducation numérique'
  ],
  'Hôtellerie, restauration et tourisme': [
    'Restaurants',
    'Hôtels',
    'Agences de voyages',
    'Loisirs',
    'Événementiel',
    'Tourisme durable',
    'Camping'
  ],
  'Culture, médias et communication': [
    'Journalisme',
    'Édition',
    'Publicité',
    'Audiovisuel',
    'Cinéma',
    'Design graphique',
    'Photographie',
    'Réseaux sociaux'
  ],
  'Immobilier et logement': [
    'Promotion immobilière',
    'Architecture',
    'Urbanisme',
    'Gestion locative',
    'Syndic de copropriété',
    'Bâtiments durables'
  ],
  'Sciences et technologies': [
    'Recherche et développement',
    'Ingénierie',
    'Biotechnologies',
    'Nanotechnologies',
    'Robotique',
    'Matériaux avancés'
  ],
  'Artisanat et métiers de proximité': [
    'Boulangerie',
    'Coiffure',
    'Menuiserie',
    'Mécanique',
    'Électricité',
    'Couture',
    'Bijouterie',
    'Réparation'
  ],
  'Services aux entreprises': [
    'Nettoyage industriel',
    'Sécurité privée',
    'Intérim',
    'Maintenance',
    'Facility management',
    'Audit organisationnel'
  ],
  'Services aux particuliers': [
    'Aide à domicile',
    'Garde d\'enfants',
    'Soins esthétiques',
    'Jardinage',
    'Entretien ménager',
    'Coaching personnel'
  ],
  'Associations et ONG': [
    'Humanitaire',
    'Environnementale',
    'Sociale',
    'Caritative',
    'Éducation solidaire',
    'Développement durable'
  ],
  'Autres secteurs émergents': [
    'Économie circulaire',
    'Numérique responsable',
    'Agriculture urbaine',
    'Mobilité douce',
    'Énergies alternatives',
    'Réemploi et réparation'
  ]
}

const DIAGNOSTIC_CATEGORIES = [
  {
    id: 'environmental',
    name: 'Diagnostic environnemental',
    icon: '🌱',
    description: 'Flux, Déchets, Énergie, Eau',
    color: 'from-green-400 to-green-600'
  },
  {
    id: 'economic',
    name: 'Diagnostic économique & production',
    icon: '💼',
    description: 'Efficacité, circularité, innovation',
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 'social',
    name: 'Diagnostic social & territorial',
    icon: '👥',
    description: 'Emploi, formation, inclusion, gouvernance',
    color: 'from-purple-400 to-purple-600'
  },
  {
    id: 'logistics',
    name: 'Logistique & chaîne d\'approvisionnement',
    icon: '🚚',
    description: 'Supply chain, mutualisation, traçabilité',
    color: 'from-orange-400 to-orange-600'
  }
]

export default function QuestionnaireForm() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [company, setCompany] = useState<CompanyData>({
    name: '',
    sector: '',
    subSector: '',
    email: '',
    phone: '',
    employeeCount: undefined
  })
  const [responses, setResponses] = useState<ResponsesData>({})
  const [loading, setLoading] = useState(false)
  const [sectorQuestions, setSectorQuestions] = useState<SectorQuestions>({
    environmental: [],
    economic: [],
    social: [],
    logistics: []
  })
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved')

  const totalSteps = 5 // Info entreprise + 4 diagnostics

  // 💾 Restaurer la progression au chargement
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const data: QuestionnaireProgress = JSON.parse(saved)
        const timeSinceLastSave = Date.now() - data.lastSaved
        
        // Si sauvegardé il y a moins de 24h
        if (timeSinceLastSave < 24 * 60 * 60 * 1000) {
          const shouldRestore = window.confirm(
            '💾 Nous avons trouvé une évaluation en cours. Voulez-vous la continuer ?'
          )
          
          if (shouldRestore) {
            setCompany(data.company)
            setResponses(data.responses)
            setCurrentStep(data.currentStep)
          } else {
            localStorage.removeItem(STORAGE_KEY)
          }
        } else {
          localStorage.removeItem(STORAGE_KEY)
        }
      } catch (error) {
        console.error('Erreur de restauration:', error)
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [])

  // 💾 Sauvegarde automatique
  useEffect(() => {
    if (company.name || Object.keys(responses).length > 0) {
      setAutoSaveStatus('saving')
      const saveTimer = setTimeout(() => {
        try {
          const progress: QuestionnaireProgress = {
            company,
            responses,
            currentStep,
            lastSaved: Date.now()
          }
          localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
          setAutoSaveStatus('saved')
        } catch (error) {
          console.error('Erreur de sauvegarde:', error)
          setAutoSaveStatus('error')
        }
      }, 1000) // Sauvegarde après 1 seconde d'inactivité

      return () => clearTimeout(saveTimer)
    }
  }, [company, responses, currentStep])

  useEffect(() => {
    const loadSectorQuestions = async () => {
      if (company.sector) {
        try {
          // Mapper le secteur au format backend (tous les 20 secteurs)
          const sectorMap: any = {
            'Agriculture, sylviculture et pêche': 'AGRICULTURE',
            'Industrie manufacturière': 'INDUSTRY',
            'Construction / BTP': 'CONSTRUCTION',
            'Commerce et distribution': 'COMMERCE',
            'Transport et logistique': 'TRANSPORT',
            'Énergie et environnement': 'ENERGY',
            'Santé et action sociale': 'HEALTH',
            'Informatique et télécommunications': 'IT',
            'Banque, assurance et finance': 'FINANCE',
            'Administration publique et défense': 'PUBLIC_ADMIN',
            'Éducation et formation': 'EDUCATION',
            'Hôtellerie, restauration et tourisme': 'HOSPITALITY',
            'Culture, médias et communication': 'CULTURE',
            'Immobilier et logement': 'REAL_ESTATE',
            'Sciences et technologies': 'SCIENCES',
            'Artisanat et métiers de proximité': 'CRAFTS',
            'Services aux entreprises': 'B2B_SERVICES',
            'Services aux particuliers': 'B2C_SERVICES',
            'Associations et ONG': 'NGO',
            'Autres secteurs émergents': 'EMERGING'
          }

          const sectorKey = sectorMap[company.sector]
          console.log('🔍 Chargement des questions pour secteur:', company.sector, '→', sectorKey)
          
          if (sectorKey) {
            const response = await axios.get(`${BACKEND_URL}/questionnaires/${sectorKey}`)
            console.log('📥 Réponse API:', response.data)
            
            if (response.data.error) {
              console.error('❌ Erreur API:', response.data.error)
              alert(`Erreur: ${response.data.error}`)
              return
            }
            
            const questions = response.data.questions || []
            console.log(`✅ ${questions.length} questions reçues`)

            // Grouper par catégorie
            const grouped = {
              environmental: questions.filter((q: any) => q.category.includes('environnemental')),
              economic: questions.filter((q: any) => q.category.includes('économique')),
              social: questions.filter((q: any) => q.category.includes('social')),
              logistics: questions.filter((q: any) => q.category.includes('Logistique'))
            }

            console.log('📊 Questions groupées:', {
              environmental: grouped.environmental.length,
              economic: grouped.economic.length,
              social: grouped.social.length,
              logistics: grouped.logistics.length
            })

            setSectorQuestions(grouped)
          } else {
            console.error('❌ Secteur non mappé:', company.sector)
          }
        } catch (error: any) {
          console.error('❌ Erreur chargement questions:', error)
          console.error('Détails:', error.response?.data || error.message)
        }
      }
    }

    loadSectorQuestions()
  }, [company.sector])

  const handleCompanySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!company.name || !company.email || !company.sector) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Validation stricte de l'email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(company.email)) {
      alert("Format d'email invalide. Exemple: nom@entreprise.com");
      return;
    }

    // Validation du téléphone (si fourni)
    if (company.phone && company.phone.length > 0) {
      // La librairie gère déjà la validation du format
      if (company.phone.length < 10) {
        alert("Veuillez entrer un numéro de téléphone complet");
        return;
      }
    }

    // Validation de la longueur du nom
    if (company.name.length < 2 || company.name.length > 100) {
      alert("Le nom de l'entreprise doit contenir entre 2 et 100 caractères");
      return;
    }
    
    if (!company.subSector) {
      alert('Veuillez sélectionner un sous-secteur');
      return;
    }

    setCurrentStep(1)
  }

  const handleResponse = (categoryId: string, questionId: string, value: any) => {
    setResponses((prev: any) => ({
      ...prev,
      [categoryId]: {
        ...(prev[categoryId] || {}),
        [questionId]: value
      }
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const companyResponse = await axios.post(`${BACKEND_URL}/companies`, {
        ...company,
        sector: `${company.sector} - ${company.subSector}`
      })
      const companyId = companyResponse.data.id

      const scoreResponse = await axios.post(`${BACKEND_URL}/scores/calculate`, {
        companyId,
        responses
      })

      // Nettoyer la sauvegarde automatique après succès
      localStorage.removeItem(STORAGE_KEY)
      
      navigate(`/dashboard/${scoreResponse.data.id}`)
    } catch (error) {
      console.error('Erreur:', error)
      alert('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Étape {currentStep + 1} sur {totalSteps}
        </span>
        <span className="text-sm text-gray-500">
          {Math.round(((currentStep + 1) / totalSteps) * 100)}% complété
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-circular-green to-circular-blue transition-all duration-500"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        />
      </div>
      <div className="flex justify-between mt-4">
        {['Entreprise', 'Environnement', 'Économique', 'Social', 'Logistique'].map((label, index) => (
          <div
            key={index}
            className={`text-xs text-center ${
              index <= currentStep ? 'text-circular-blue-dark font-semibold' : 'text-gray-400'
            }`}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  )

  const renderCompanyInfo = () => (
    <form onSubmit={handleCompanySubmit} className="space-y-6">
      <div className="bg-gradient-to-r from-circular-blue/10 to-circular-green/10 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
          <span className="mr-2">ℹ️</span>
          Informations de votre entreprise
        </h3>
        <p className="text-sm text-gray-600">
          Ces informations nous permettront de personnaliser votre évaluation et vos recommandations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Nom de l'entreprise *
          </label>
          <input
            type="text"
            required
            value={company.name}
            onChange={(e) => setCompany({ ...company, name: e.target.value })}
            className="h-12 w-full px-4 rounded-lg border border-gray-300 focus:border-circular-blue focus:ring-2 focus:ring-circular-blue/20 transition-all"
            placeholder="Ex: EcoEntreprise SA"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Email professionnel *
          </label>
          <input
            type="email"
            required
            value={company.email}
            onChange={(e) => setCompany({ ...company, email: e.target.value })}
            className="h-12 w-full px-4 rounded-lg border border-gray-300 focus:border-circular-blue focus:ring-2 focus:ring-circular-blue/20 transition-all"
            placeholder="contact@entreprise.ma"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Téléphone
          </label>
          <div className="h-12">
            <PhoneInput
              defaultCountry="ma"
              value={company.phone}
              onChange={(phone) => setCompany({ ...company, phone })}
              inputClassName="!h-12"
              className="!h-12"
              inputStyle={{
                height: '48px',
                width: '100%',
                paddingLeft: '52px',
                borderRadius: '0.5rem',
                border: '1px solid #D1D5DB',
                fontSize: '1rem'
              }}
              countrySelectorStyleProps={{
                buttonStyle: {
                  height: '48px',
                  borderRadius: '0.5rem 0 0 0.5rem',
                  border: '1px solid #D1D5DB',
                  borderRight: 'none'
                }
              }}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Nombre d'employés
          </label>
          <input
            type="number"
            min="1"
            value={company.employeeCount || ''}
            onChange={(e) => setCompany({ ...company, employeeCount: e.target.value ? parseInt(e.target.value) : undefined })}
            className="h-12 w-full px-4 rounded-lg border border-gray-300 focus:border-circular-blue focus:ring-2 focus:ring-circular-blue/20 transition-all"
            placeholder="Ex: 50"
          />
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl">
        <p className="text-sm text-yellow-800 font-medium">
          📊 Sélectionnez votre secteur d'activité principal
        </p>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-2">
          Secteur d'activité principal *
        </label>
        <select
          required
          value={company.sector}
          onChange={(e) => setCompany({ ...company, sector: e.target.value, subSector: '' })}
          className="h-12 w-full px-4 rounded-lg border border-gray-300 focus:border-circular-blue focus:ring-2 focus:ring-circular-blue/20 transition-all text-base"
        >
          <option value="">-- Sélectionnez un secteur --</option>
          {Object.keys(SECTORS).map((sector) => (
            <option key={sector} value={sector}>{sector}</option>
          ))}
        </select>
      </div>

      {company.sector && (
        <div className="flex flex-col animate-fadeIn">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Sous-secteur / Activité spécifique *
          </label>
          <select
            required
            value={company.subSector}
            onChange={(e) => setCompany({ ...company, subSector: e.target.value })}
            className="h-12 w-full px-4 rounded-lg border border-gray-300 focus:border-circular-blue focus:ring-2 focus:ring-circular-blue/20 transition-all text-base"
          >
            <option value="">-- Précisez votre activité --</option>
            {SECTORS[company.sector as keyof typeof SECTORS]?.map((subSector) => (
              <option key={subSector} value={subSector}>{subSector}</option>
            ))}
          </select>
        </div>
      )}

      <div className="pt-6">
        <button
          type="submit"
          className="w-full btn-primary py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          Continuer vers l'évaluation →
        </button>
      </div>
    </form>
  )

  // Mapping des questions aux ressources d'aide
  const getHelpResource = (questionText: string, categoryId: string) => {
    const helpResources: { [key: string]: { url: string; label: string } } = {
      // Environnement
      'déchets': { url: 'https://www.environnement.gov.ma', label: 'Ministère de l\'Environnement' },
      'valorisation': { url: 'https://www.environnement.gov.ma', label: 'Gestion des déchets' },
      'recyclage': { url: 'https://www.environnement.gov.ma', label: 'Recyclage au Maroc' },
      'énergie': { url: 'https://www.amee.ma', label: 'AMEE - Efficacité Énergétique' },
      'électricité': { url: 'https://www.onee.ma', label: 'ONEE - Factures' },
      'eau': { url: 'https://www.onee.ma', label: 'ONEE - Consommation' },
      'carbone': { url: 'https://www.amee.ma', label: 'Bilan Carbone' },
      'émissions': { url: 'https://www.amee.ma', label: 'Facteurs d\'émission' },
      'carburant': { url: 'https://www.cgem.ma', label: 'CGEM - Guide RSE' },
      
      // Économique
      'équipements': { url: 'https://www.amee.ma', label: 'Efficacité des équipements' },
      'maintenance': { url: 'https://www.hcp.ma', label: 'HCP - Statistiques' },
      'fournisseurs': { url: 'https://www.cgem.ma', label: 'CGEM - Achats responsables' },
      
      // Social
      'emploi': { url: 'https://www.hcp.ma', label: 'HCP - Emploi' },
      'formation': { url: 'https://www.hcp.ma', label: 'Formation professionnelle' },
      'insertion': { url: 'https://www.hcp.ma', label: 'Insertion sociale' },
      
      // Logistique
      'transport': { url: 'https://www.oncf.ma', label: 'Transport au Maroc' },
      'logistique': { url: 'https://www.cgem.ma', label: 'Logistique responsable' },
      'véhicules': { url: 'https://www.amee.ma', label: 'Véhicules propres' }
    };

    const questionLower = questionText.toLowerCase();
    for (const [keyword, resource] of Object.entries(helpResources)) {
      if (questionLower.includes(keyword)) {
        return resource;
      }
    }
    
    // Ressources par défaut selon la catégorie
    const defaultResources: { [key: string]: { url: string; label: string } } = {
      environmental: { url: 'https://www.environnement.gov.ma', label: 'Ministère de l\'Environnement' },
      economic: { url: 'https://www.cgem.ma', label: 'CGEM - Guide RSE' },
      social: { url: 'https://www.hcp.ma', label: 'HCP - Statistiques' },
      logistics: { url: 'https://www.amee.ma', label: 'AMEE - Transport' }
    };
    
    return defaultResources[categoryId] || { url: 'https://www.cgem.ma', label: 'Ressources disponibles' };
  };

  const renderDiagnosticQuestions = () => {
    const categoryIndex = currentStep - 1
    const category = DIAGNOSTIC_CATEGORIES[categoryIndex]

    const categoryKeys: (keyof SectorQuestions)[] = ['environmental', 'economic', 'social', 'logistics']
    const categoryKey = categoryKeys[categoryIndex]
    const questions = sectorQuestions[categoryKey] || []

    return (
      <div className="space-y-6">
        <div className={`bg-gradient-to-r ${category.color} rounded-2xl p-8 text-white mb-8 shadow-2xl`}>
          <div className="flex items-center justify-between mb-4">
            <div className="text-6xl">{category.icon}</div>
            <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
              <span className="text-sm font-medium">{questions.length} questions</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-2">{category.name}</h2>
          <p className="text-white/90 text-lg">{category.description}</p>
          <div className="mt-4 h-1 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-300"
              style={{ 
                width: `${(Object.keys(responses[category.id] || {}).length / questions.length) * 100}%` 
              }}
            />
          </div>
          <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <p className="text-sm text-white/90 flex items-start">
              <span className="mr-2">💡</span>
              <span>Besoin d'aide pour répondre ? Consultez nos guides et ressources officielles ci-dessous.</span>
            </p>
          </div>
        </div>

        {questions.length === 0 ? (
          <div className="text-center py-12 bg-yellow-50 rounded-xl border border-yellow-200">
            <p className="text-yellow-800 font-medium">
              ⚠️ Chargement des questions pour votre secteur...
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {questions.map((question: any, index: number) => {
              const helpResource = getHelpResource(question.text, category.id);
              return (
            <div key={question.id} className="bg-white rounded-xl shadow-lg p-6 border-l-4 hover:shadow-xl transition-all" 
                 style={{ borderLeftColor: responses[category.id]?.[question.id] !== undefined ? '#10b981' : '#e5e7eb' }}>
              <div className="flex items-start mb-4">
                <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-circular-blue to-circular-blue-dark text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 shadow-md">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-900 mb-2">{question.text}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {question.unit && (
                      <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                        📊 Unité: {question.unit}
                      </span>
                    )}
                    {question.weight > 1 && (
                      <span className="inline-flex items-center px-3 py-1 bg-orange-50 text-orange-700 text-xs font-medium rounded-full">
                        ⭐ Question prioritaire (×{question.weight})
                      </span>
                    )}
                  </div>
                  {/* Lien d'aide pour obtenir les données */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                    <div className="flex items-start">
                      <span className="text-blue-600 mr-2">ℹ️</span>
                      <div className="flex-1">
                        <p className="text-xs text-blue-800 font-medium mb-1">Besoin d'aide pour obtenir cette donnée ?</p>
                        <a 
                          href={helpResource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:text-blue-800 underline font-semibold flex items-center"
                        >
                          {helpResource.label} →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {question.type === 'boolean' && (
                <div className="space-y-2">
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => handleResponse(category.id, question.id, true)}
                      className={`flex-1 py-4 px-6 rounded-xl border-2 transition-all font-bold text-lg shadow-md hover:shadow-lg ${
                        responses[category.id]?.[question.id] === true
                          ? 'bg-gradient-to-r from-green-500 to-green-600 border-green-600 text-white shadow-lg scale-105'
                          : 'border-gray-300 hover:border-green-400 hover:bg-green-50 bg-white'
                      }`}
                    >
                      <span className="flex items-center justify-center">
                        <span className="mr-2 text-2xl">✓</span>
                        <span>Oui</span>
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleResponse(category.id, question.id, false)}
                      className={`flex-1 py-4 px-6 rounded-xl border-2 transition-all font-bold text-lg shadow-md hover:shadow-lg ${
                        responses[category.id]?.[question.id] === false
                          ? 'bg-gradient-to-r from-red-500 to-red-600 border-red-600 text-white shadow-lg scale-105'
                          : 'border-gray-300 hover:border-red-400 hover:bg-red-50 bg-white'
                      }`}
                    >
                      <span className="flex items-center justify-center">
                        <span className="mr-2 text-2xl">✗</span>
                        <span>Non</span>
                      </span>
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 text-center italic">
                    Cette question est essentielle pour votre diagnostic
                  </p>
                </div>
              )}

              {question.type === 'percentage' && (
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={responses[category.id]?.[question.id] || ''}
                    onChange={(e) => handleResponse(category.id, question.id, parseFloat(e.target.value))}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-circular-blue/20 focus:border-circular-blue text-lg font-medium"
                    placeholder="0 - 100"
                  />
                  <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 font-bold text-lg">%</span>
                  <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-circular-blue to-circular-green transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.max(0, responses[category.id]?.[question.id] || 0))}%` }}
                    />
                  </div>
                </div>
              )}

              {question.type === 'number' && (
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={responses[category.id]?.[question.id] || ''}
                    onChange={(e) => handleResponse(category.id, question.id, parseFloat(e.target.value))}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-circular-blue/20 focus:border-circular-blue text-lg font-medium"
                    placeholder={`Valeur en ${question.unit || 'unité'}`}
                  />
                  {question.unit && (
                    <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">{question.unit}</span>
                  )}
                </div>
              )}

              {question.type === 'choice' && question.choices && (
                <div className="space-y-2">
                  {question.choices.map((choice: string) => (
                    <button
                      key={choice}
                      type="button"
                      onClick={() => handleResponse(category.id, question.id, choice)}
                      className={`w-full py-3 px-6 rounded-xl border-2 transition-all font-medium text-left ${
                        responses[category.id]?.[question.id] === choice
                          ? 'bg-gradient-to-r from-circular-blue to-circular-blue-dark border-circular-blue-dark text-white shadow-lg'
                          : 'border-gray-300 hover:border-circular-blue hover:bg-blue-50'
                      }`}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              )}

              {question.type === 'text' && (
                <textarea
                  value={responses[category.id]?.[question.id] || ''}
                  onChange={(e) => handleResponse(category.id, question.id, e.target.value)}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-circular-blue/20 focus:border-circular-blue text-lg"
                  placeholder="Votre réponse..."
                  rows={3}
                />
              )}
            </div>
          );
            })}
        </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Indicateur de sauvegarde automatique */}
        {(company.name || Object.keys(responses).length > 0) && (
          <div className="mb-4 flex justify-end">
            <div className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
              autoSaveStatus === 'saved' ? 'bg-green-50 text-green-700' :
              autoSaveStatus === 'saving' ? 'bg-blue-50 text-blue-700' :
              'bg-red-50 text-red-700'
            }`}>
              {autoSaveStatus === 'saved' && (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Sauvegardé automatiquement
                </>
              )}
              {autoSaveStatus === 'saving' && (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sauvegarde en cours...
                </>
              )}
              {autoSaveStatus === 'error' && (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  Erreur de sauvegarde
                </>
              )}
            </div>
          </div>
        )}
        
        {/* En-tête professionnel */}
        <div className="bg-white rounded-t-2xl shadow-sm border-b-4 border-gradient-to-r from-circular-blue to-circular-green p-6 mb-0">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-circular-blue to-circular-green rounded-xl flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">♻️</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-circular-blue-dark to-circular-green-dark bg-clip-text text-transparent">
                    Évaluation ISO 59000
                  </h1>
                  <p className="text-gray-600 font-medium">
                    Diagnostic professionnel d'économie circulaire
                  </p>
                </div>
              </div>
            </div>
            {company.name && (
              <div className="text-right">
                <div className="text-sm text-gray-500 font-medium">Entreprise</div>
                <div className="text-lg font-bold text-gray-900">{company.name}</div>
                <div className="text-sm text-circular-blue">{company.sector}</div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-b-2xl shadow-2xl p-8 md:p-12">

          {renderProgressBar()}

          {currentStep === 0 && renderCompanyInfo()}
          {currentStep > 0 && currentStep < totalSteps && renderDiagnosticQuestions()}

          {currentStep > 0 && (
            <div className="flex justify-between pt-8 border-t mt-8">
              <button
                onClick={handlePrevious}
                className="px-8 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-semibold"
              >
                ← Précédent
              </button>
              {currentStep < totalSteps - 1 ? (
                <button
                  onClick={handleNext}
                  className="btn-primary px-8 py-3"
                >
                  Suivant →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="btn-primary px-8 py-3"
                >
                  {loading ? '⏳ Calcul en cours...' : '✅ Voir mes résultats'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}