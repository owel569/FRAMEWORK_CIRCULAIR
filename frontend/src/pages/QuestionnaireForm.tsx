import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../config'

const BACKEND_URL = API_URL

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
  const [company, setCompany] = useState({
    name: '',
    sector: '',
    subSector: '',
    email: '',
    phone: '',
    employeeCount: undefined as number | undefined
  })
  const [responses, setResponses] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [sectorQuestions, setSectorQuestions] = useState<any>({
    environmental: [],
    economic: [],
    social: [],
    logistics: []
  })

  const totalSteps = 5 // Info entreprise + 4 diagnostics

  useEffect(() => {
    const loadSectorQuestions = async () => {
      if (company.sector) {
        try {
          // Mapper le secteur au format backend
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
          if (sectorKey) {
            const response = await axios.get(`${BACKEND_URL}/questionnaires/${sectorKey}`)
            const questions = response.data.questions
            
            // Grouper par catégorie
            const grouped = {
              environmental: questions.filter((q: any) => q.category.includes('environnemental')),
              economic: questions.filter((q: any) => q.category.includes('économique')),
              social: questions.filter((q: any) => q.category.includes('social')),
              logistics: questions.filter((q: any) => q.category.includes('Logistique'))
            }
            
            setSectorQuestions(grouped)
          }
        } catch (error) {
          console.error('Erreur chargement questions:', error)
        }
      }
    }
    
    loadSectorQuestions()
  }, [company.sector])

  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!company.sector || !company.subSector) {
      alert('Veuillez sélectionner un secteur et un sous-secteur')
      return
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
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nom de l'entreprise *
          </label>
          <input
            type="text"
            required
            value={company.name}
            onChange={(e) => setCompany({ ...company, name: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-circular-blue focus:border-circular-blue transition-all"
            placeholder="Ex: EcoEntreprise SA"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email professionnel *
          </label>
          <input
            type="email"
            required
            value={company.email}
            onChange={(e) => setCompany({ ...company, email: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-circular-blue focus:border-circular-blue transition-all"
            placeholder="contact@entreprise.ma"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Téléphone
          </label>
          <input
            type="tel"
            value={company.phone}
            onChange={(e) => setCompany({ ...company, phone: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-circular-blue focus:border-circular-blue transition-all"
            placeholder="+212 5XX-XXXXXX"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nombre d'employés
          </label>
          <input
            type="number"
            min="1"
            value={company.employeeCount || ''}
            onChange={(e) => setCompany({ ...company, employeeCount: e.target.value ? parseInt(e.target.value) : undefined })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-circular-blue focus:border-circular-blue transition-all"
            placeholder="Ex: 50"
          />
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl">
        <p className="text-sm text-yellow-800 font-medium">
          📊 Sélectionnez votre secteur d'activité principal
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Secteur d'activité principal *
        </label>
        <select
          required
          value={company.sector}
          onChange={(e) => setCompany({ ...company, sector: e.target.value, subSector: '' })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-circular-blue focus:border-circular-blue transition-all text-base"
        >
          <option value="">-- Sélectionnez un secteur --</option>
          {Object.keys(SECTORS).map((sector) => (
            <option key={sector} value={sector}>{sector}</option>
          ))}
        </select>
      </div>

      {company.sector && (
        <div className="animate-fadeIn">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Sous-secteur / Activité spécifique *
          </label>
          <select
            required
            value={company.subSector}
            onChange={(e) => setCompany({ ...company, subSector: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-circular-green focus:border-circular-green transition-all text-base"
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

  const renderDiagnosticQuestions = () => {
    const categoryIndex = currentStep - 1
    const category = DIAGNOSTIC_CATEGORIES[categoryIndex]
    
    const categoryKeys = ['environmental', 'economic', 'social', 'logistics']
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
        </div>

        {questions.length === 0 ? (
          <div className="text-center py-12 bg-yellow-50 rounded-xl border border-yellow-200">
            <p className="text-yellow-800 font-medium">
              ⚠️ Chargement des questions pour votre secteur...
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {questions.map((question: any, index: number) => (
            <div key={question.id} className="bg-white rounded-xl shadow-lg p-6 border-l-4 hover:shadow-xl transition-all" 
                 style={{ borderLeftColor: responses[category.id]?.[question.id] !== undefined ? '#10b981' : '#e5e7eb' }}>
              <div className="flex items-start mb-4">
                <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-circular-blue to-circular-blue-dark text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 shadow-md">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-900 mb-1">{question.text}</p>
                  {question.unit && (
                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                      Unité: {question.unit}
                    </span>
                  )}
                  {question.weight > 1 && (
                    <span className="inline-block ml-2 px-3 py-1 bg-orange-50 text-orange-700 text-xs font-medium rounded-full">
                      ⭐ Poids: {question.weight}x
                    </span>
                  )}
                </div>
              </div>

              {question.type === 'boolean' && (
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleResponse(category.id, question.id, true)}
                    className={`flex-1 py-4 px-6 rounded-xl border-2 transition-all font-bold text-lg ${
                      responses[category.id]?.[question.id] === true
                        ? 'bg-gradient-to-r from-green-500 to-green-600 border-green-600 text-white shadow-lg scale-105'
                        : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
                    }`}
                  >
                    ✓ Oui
                  </button>
                  <button
                    type="button"
                    onClick={() => handleResponse(category.id, question.id, false)}
                    className={`flex-1 py-4 px-6 rounded-xl border-2 transition-all font-bold text-lg ${
                      responses[category.id]?.[question.id] === false
                        ? 'bg-gradient-to-r from-red-500 to-red-600 border-red-600 text-white shadow-lg scale-105'
                        : 'border-gray-300 hover:border-red-400 hover:bg-red-50'
                    }`}
                  >
                    ✗ Non
                  </button>
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
          ))}
        </div>
        )}
      </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
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