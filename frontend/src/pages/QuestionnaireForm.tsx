
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../config'

const BACKEND_URL = API_URL

const questions = {
  governance: [
    { id: 'g1', text: 'Votre organisation a-t-elle une politique formelle d\'économie circulaire ?' },
    { id: 'g2', text: 'Existe-t-il une équipe dédiée à l\'économie circulaire ?' },
    { id: 'g3', text: 'Les objectifs circulaires sont-ils intégrés dans la stratégie globale ?' },
  ],
  economic: [
    { id: 'e1', text: 'Mesurez-vous régulièrement vos flux de matières ?' },
    { id: 'e2', text: 'Avez-vous identifié des opportunités de valorisation des déchets ?' },
    { id: 'e3', text: 'Pratiquez-vous l\'éco-conception de vos produits ?' },
  ],
  social: [
    { id: 's1', text: 'Les employés sont-ils formés aux principes de l\'économie circulaire ?' },
    { id: 's2', text: 'Impliquez-vous les parties prenantes dans votre démarche ?' },
    { id: 's3', text: 'Communiquez-vous sur vos actions circulaires ?' },
  ],
  environmental: [
    { id: 'env1', text: 'Suivez-vous votre empreinte carbone ?' },
    { id: 'env2', text: 'Utilisez-vous des énergies renouvelables ?' },
    { id: 'env3', text: 'Avez-vous des objectifs de réduction des déchets ?' },
  ],
}

export default function QuestionnaireForm() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [company, setCompany] = useState({ 
    name: '', 
    sector: '', 
    email: '', 
    phone: '',
    employeeCount: undefined,
    tonnageLogistique: undefined,
    emissionsLogistiques: undefined,
    tonnageAlternatif: undefined,
    coutActuel: undefined,
    coutTraitement: undefined,
    centreActuel: undefined,
    centreAlternatif: undefined,
    electriciteKWh: undefined,
    gazKWh: undefined,
    eauM3: undefined,
    carburantsLitres: undefined,
    consommationEau: undefined,
    consommationCarburant: undefined,
    emissionsScope12: undefined,
    heuresFormation: undefined,
    partAchatsLocaux: undefined,
    partEmploisLocaux: undefined,
    dechetsTotaux: undefined,
    dechetsValorises: undefined,
    pourcentageValorisation: undefined,
    dechetsDangereux: undefined
  })
  const [responses, setResponses] = useState<any>({})
  const [loading, setLoading] = useState(false)

  const dimensions = ['governance', 'economic', 'social', 'environmental']
  const dimensionTitles = {
    governance: 'Gouvernance',
    economic: 'Économique',
    social: 'Social',
    environmental: 'Environnemental',
  }

  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(1)
  }

  const handleResponse = (dimensionKey: string, questionId: string, value: number) => {
    setResponses((prev: any) => ({
      ...prev,
      [dimensionKey]: [
        ...(prev[dimensionKey] || []).filter((r: any) => r.id !== questionId),
        { id: questionId, value },
      ],
    }))
  }

  const handleNext = () => {
    if (step < dimensions.length) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const companyResponse = await axios.post(`${BACKEND_URL}/companies`, company)
      const companyId = companyResponse.data.id

      const scoreResponse = await axios.post(`${BACKEND_URL}/scores/calculate`, {
        companyId,
        responses,
      })

      navigate(`/dashboard/${scoreResponse.data.id}`)
    } catch (error) {
      console.error('Erreur:', error)
      alert('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  const currentDimension = dimensions[step - 1]
  const currentQuestions = currentDimension ? questions[currentDimension as keyof typeof questions] : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-circular-green/10 to-circular-blue/10 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Questionnaire d'évaluation ISO 59000</h1>
            <div className="flex items-center justify-between">
              <p className="text-gray-600">Étape {step} sur {dimensions.length + 1}</p>
              <div className="flex space-x-2">
                {[...Array(dimensions.length + 1)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-12 rounded ${
                      i < step ? 'bg-circular-blue' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {step === 0 && (
            <form onSubmit={handleCompanySubmit} className="space-y-8">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <p className="text-sm text-blue-700">
                  <strong>Note :</strong> Les champs marqués d'un astérisque (*) sont obligatoires. Les autres indicateurs sont optionnels mais permettent une évaluation plus précise.
                </p>
              </div>

              <section>
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-circular-blue pb-2">
                  📋 Informations Générales
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom de l'entreprise *
                    </label>
                    <input
                      type="text"
                      required
                      value={company.name}
                      onChange={(e) => setCompany({ ...company, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-circular-blue focus:border-transparent"
                      placeholder="Ex: EcoEntreprise SA"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Secteur d'activité *
                    </label>
                    <select
                      required
                      value={company.sector}
                      onChange={(e) => setCompany({ ...company, sector: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-circular-blue focus:border-transparent"
                    >
                      <option value="">Sélectionnez un secteur</option>
                      <option value="Industrie">Industrie</option>
                      <option value="Services">Services</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Commerce">Commerce</option>
                      <option value="Construction">Construction</option>
                      <option value="Transport">Transport & Logistique</option>
                      <option value="Energie">Énergie</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={company.email}
                      onChange={(e) => setCompany({ ...company, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-circular-blue focus:border-transparent"
                      placeholder="contact@entreprise.fr"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={company.phone}
                      onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-circular-blue focus:border-transparent"
                      placeholder="+33 1 23 45 67 89"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre d'employés
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={company.employeeCount || ''}
                      onChange={(e) => setCompany({ ...company, employeeCount: e.target.value ? parseInt(e.target.value) : undefined })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-circular-blue focus:border-transparent"
                      placeholder="Ex: 50"
                    />
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-green-500 pb-2">
                  🚛 Logistique et Centres de Traitement
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tonnage logistique actuel (tonnes/an)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={company.tonnageLogistique || ''}
                      onChange={(e) => setCompany({ ...company, tonnageLogistique: e.target.value ? parseFloat(e.target.value) : undefined })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-circular-blue focus:border-transparent"
                      placeholder="Ex: 1200.5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Émissions logistiques (tCO2e/an)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={company.emissionsLogistiques || ''}
                      onChange={(e) => setCompany({ ...company, emissionsLogistiques: e.target.value ? parseFloat(e.target.value) : undefined })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-circular-blue focus:border-transparent"
                      placeholder="Ex: 85.3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tonnage alternatif (tonnes/an)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={company.tonnageAlternatif || ''}
                      onChange={(e) => setCompany({ ...company, tonnageAlternatif: e.target.value ? parseFloat(e.target.value) : undefined })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-circular-blue focus:border-transparent"
                      placeholder="Ex: 800"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Coût actuel (€/an)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={company.coutActuel || ''}
                      onChange={(e) => setCompany({ ...company, coutActuel: e.target.value ? parseFloat(e.target.value) : undefined })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-circular-blue focus:border-transparent"
                      placeholder="Ex: 150000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Coût traitement (€/tonne)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={company.coutTraitement || ''}
                      onChange={(e) => setCompany({ ...company, coutTraitement: e.target.value ? parseFloat(e.target.value) : undefined })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-circular-blue focus:border-transparent"
                      placeholder="Ex: 125"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Centre de traitement actuel (km)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={company.centreActuel || ''}
                      onChange={(e) => setCompany({ ...company, centreActuel: e.target.value ? parseFloat(e.target.value) : undefined })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-circular-blue focus:border-transparent"
                      placeholder="Ex: 45.5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Centre de traitement alternatif (km)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={company.centreAlternatif || ''}
                      onChange={(e) => setCompany({ ...company, centreAlternatif: e.target.value ? parseFloat(e.target.value) : undefined })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-circular-blue focus:border-transparent"
                      placeholder="Ex: 25"
                    />
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-yellow-500 pb-2">
                  ⚡ Consommations Énergétiques
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Électricité (kWh/an)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={company.electriciteKWh || ''}
                      onChange={(e) => setCompany({ ...company, electriciteKWh: e.target.value ? parseFloat(e.target.value) : undefined })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-circular-blue focus:border-transparent"
                      placeholder="Ex: 250000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gaz naturel (kWh/an)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={company.gazKWh || ''}
                      onChange={(e) => setCompany({ ...company, gazKWh: e.target.value ? parseFloat(e.target.value) : undefined })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-circular-blue focus:border-transparent"
                      placeholder="Ex: 180000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Eau (m³/an)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={company.eauM3 || ''}
                      onChange={(e) => setCompany({ ...company, eauM3: e.target.value ? parseFloat(e.target.value) : undefined })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-circular-blue focus:border-transparent"
                      placeholder="Ex: 5000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Carburants (litres/an)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={company.carburantsLitres || ''}
                      onChange={(e) => setCompany({ ...company, carburantsLitres: e.target.value ? parseFloat(e.target.value) : undefined })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-circular-blue focus:border-transparent"
                      placeholder="Ex: 12000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Consommation eau globale (m³/an)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={company.consommationEau || ''}
                      onChange={(e) => setCompany({ ...company, consommationEau: e.target.value ? parseFloat(e.target.value) : undefined })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-circular-blue focus:border-transparent"
                      placeholder="Ex: 6500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Consommation carburant globale (L/an)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={company.consommationCarburant || ''}
                      onChange={(e) => setCompany({ ...company, consommationCarburant: e.target.value ? parseFloat(e.target.value) : undefined })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-circular-blue focus:border-transparent"
                      placeholder="Ex: 15000"
                    />
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-red-500 pb-2">
                  🌍 Émissions de Gaz à Effet de Serre
                </h2>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Émissions Scope 1 + 2 (tCO2e/an)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={company.emissionsScope12 || ''}
                      onChange={(e) => setCompany({ ...company, emissionsScope12: e.target.value ? parseFloat(e.target.value) : undefined })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-circular-blue focus:border-transparent"
                      placeholder="Ex: 450.75"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Scope 1: émissions directes | Scope 2: émissions indirectes liées à l'énergie
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-purple-500 pb-2">
                  👥 Indicateurs Sociaux
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Heures de formation (h/ETP/an)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={company.heuresFormation || ''}
                      onChange={(e) => setCompany({ ...company, heuresFormation: e.target.value ? parseFloat(e.target.value) : undefined })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-circular-blue focus:border-transparent"
                      placeholder="Ex: 35"
                    />
                    <p className="text-xs text-gray-500 mt-1">ETP = Équivalent Temps Plein</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Part des achats locaux (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value={company.partAchatsLocaux || ''}
                      onChange={(e) => setCompany({ ...company, partAchatsLocaux: e.target.value ? parseFloat(e.target.value) : undefined })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-circular-blue focus:border-transparent"
                      placeholder="Ex: 65"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Part des emplois locaux (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value={company.partEmploisLocaux || ''}
                      onChange={(e) => setCompany({ ...company, partEmploisLocaux: e.target.value ? parseFloat(e.target.value) : undefined })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-circular-blue focus:border-transparent"
                      placeholder="Ex: 80"
                    />
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-orange-500 pb-2">
                  ♻️ Gestion des Déchets
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Déchets totaux produits (tonnes/an)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={company.dechetsTotaux || ''}
                      onChange={(e) => setCompany({ ...company, dechetsTotaux: e.target.value ? parseFloat(e.target.value) : undefined })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-circular-blue focus:border-transparent"
                      placeholder="Ex: 500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Déchets valorisés (tonnes/an)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={company.dechetsValorises || ''}
                      onChange={(e) => setCompany({ ...company, dechetsValorises: e.target.value ? parseFloat(e.target.value) : undefined })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-circular-blue focus:border-transparent"
                      placeholder="Ex: 380"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Taux de valorisation (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value={company.pourcentageValorisation || ''}
                      onChange={(e) => setCompany({ ...company, pourcentageValorisation: e.target.value ? parseFloat(e.target.value) : undefined })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-circular-blue focus:border-transparent"
                      placeholder="Ex: 76"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Déchets dangereux (tonnes/an)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={company.dechetsDangereux || ''}
                      onChange={(e) => setCompany({ ...company, dechetsDangereux: e.target.value ? parseFloat(e.target.value) : undefined })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-circular-blue focus:border-transparent"
                      placeholder="Ex: 12.5"
                    />
                  </div>
                </div>
              </section>

              <div className="pt-6 border-t">
                <button type="submit" className="btn-primary w-full py-4 text-lg font-semibold">
                  ▶️ Commencer l'évaluation ISO 59000
                </button>
              </div>
            </form>
          )}

          {step > 0 && step <= dimensions.length && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">
                {dimensionTitles[currentDimension as keyof typeof dimensionTitles]}
              </h2>

              {currentQuestions.map((question) => (
                <div key={question.id} className="border-b border-gray-200 pb-6">
                  <p className="text-lg mb-4">{question.text}</p>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleResponse(currentDimension, question.id, value)}
                        className={`flex-1 py-2 rounded-lg border-2 transition-all ${
                          responses[currentDimension]?.find((r: any) => r.id === question.id)?.value === value
                            ? 'bg-circular-blue border-circular-blue text-white'
                            : 'border-gray-300 hover:border-circular-blue'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Pas du tout</span>
                    <span>Totalement</span>
                  </div>
                </div>
              ))}

              <div className="flex justify-between pt-6">
                <button
                  onClick={handlePrevious}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  ← Précédent
                </button>
                {step < dimensions.length ? (
                  <button onClick={handleNext} className="btn-primary">
                    Suivant →
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="btn-primary"
                  >
                    {loading ? '⏳ Calcul en cours...' : '✅ Voir mes résultats'}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
