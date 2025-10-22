import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../config'

const BACKEND_URL = API_URL

export default function ActionPlan() {
  const { scoreId } = useParams()
  const [plan, setPlan] = useState<any>(null)
  const [score, setScore] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPlan()
  }, [scoreId])

  const loadPlan = async () => {
    try {
      const scoreResponse = await axios.get(`${BACKEND_URL}/scores/${scoreId}`)
      setScore(scoreResponse.data)
      
      if (scoreResponse.data.actionPlan) {
        setPlan(scoreResponse.data.actionPlan)
      }
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Chargement...</div>
      </div>
    )
  }

  const priorityColors = {
    'Critique': 'bg-red-100 text-red-800',
    'Haute': 'bg-orange-100 text-orange-800',
    'Moyenne': 'bg-yellow-100 text-yellow-800',
    'Faible': 'bg-green-100 text-green-800',
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-circular-green/10 to-circular-blue/10 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Plan d'action</h1>
              <p className="text-gray-600">Feuille de route personnalisée ISO 59000</p>
            </div>
            <Link to={`/dashboard/${scoreId}`} className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              Retour au tableau de bord
            </Link>
          </div>

          {score && (
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="card text-center">
                <div className="text-sm text-gray-600 mb-1">Score global</div>
                <div className="text-3xl font-bold text-circular-blue">
                  {score.globalScore.toFixed(1)}%
                </div>
              </div>
              <div className="card text-center">
                <div className="text-sm text-gray-600 mb-1">Priorité</div>
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                  priorityColors[plan?.priority as keyof typeof priorityColors] || 'bg-gray-100'
                }`}>
                  {plan?.priority || 'Non définie'}
                </div>
              </div>
              <div className="card text-center">
                <div className="text-sm text-gray-600 mb-1">Durée estimée</div>
                <div className="text-3xl font-bold text-circular-green">
                  {plan?.timeline || '12 mois'}
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Recommandations détaillées</h2>
            
            {plan?.recommendations && plan.recommendations.length > 0 ? (
              plan.recommendations.map((rec: any, index: number) => (
                <div key={index} className="card border-l-4 border-circular-blue">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">{rec.category}</div>
                      <h3 className="text-xl font-bold text-gray-900">{rec.title}</h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      priorityColors[rec.priority as keyof typeof priorityColors] || 'bg-gray-100'
                    }`}>
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">{rec.description}</p>
                  <div className="text-sm text-circular-blue font-semibold">
                    📘 Référence: {rec.iso}
                  </div>
                </div>
              ))
            ) : (
              <div className="card text-center py-12">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Excellent travail !
                </h3>
                <p className="text-gray-600">
                  Votre entreprise démontre un bon niveau de maturité en économie circulaire.
                  Continuez à maintenir vos bonnes pratiques.
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 p-6 bg-circular-blue/10 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              📚 Ressources complémentaires
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• ISO 59004:2024 - Lignes directrices pour la mise en œuvre</li>
              <li>• ISO 59020:2024 - Mesure et évaluation de la circularité</li>
              <li>• Guide pratique de l'économie circulaire pour PME</li>
            </ul>
            <button className="btn-secondary mt-4">
              Télécharger le guide complet (PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
