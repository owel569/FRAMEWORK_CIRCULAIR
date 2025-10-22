import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import DashboardRadar from '../components/DashboardRadar'
import ProgressBar from '../components/ProgressBar'
import { API_URL } from '../config'

const BACKEND_URL = API_URL

export default function ScoreDashboard() {
  const { scoreId } = useParams()
  const [score, setScore] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadScore()
  }, [scoreId])

  const loadScore = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/scores/${scoreId}`)
      setScore(response.data)
    } catch (error) {
      console.error('Erreur de chargement:', error)
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

  if (!score) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Score introuvable</div>
      </div>
    )
  }

  const scoreLevel = 
    score.globalScore >= 80 ? { label: 'Excellent', color: 'text-green-600' } :
    score.globalScore >= 60 ? { label: 'Bon', color: 'text-blue-600' } :
    score.globalScore >= 40 ? { label: 'Moyen', color: 'text-yellow-600' } :
    { label: 'À améliorer', color: 'text-red-600' }

  return (
    <div className="min-h-screen bg-gradient-to-br from-circular-green/10 to-circular-blue/10 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Tableau de bord - {score.company.name}
              </h1>
              <p className="text-gray-600">Secteur: {score.company.sector}</p>
            </div>
            <Link to={`/plan/${scoreId}`} className="btn-primary">
              Voir le plan d'action
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              <div className={`text-6xl font-bold mb-4 ${scoreLevel.color}`}>
                {score.globalScore.toFixed(1)}%
              </div>
              <div className={`text-2xl font-semibold ${scoreLevel.color}`}>
                {scoreLevel.label}
              </div>
              <p className="text-gray-600 mt-2">Score global d'économie circulaire</p>
            </div>

            <div>
              <DashboardRadar
                governance={score.governanceScore}
                economic={score.economicScore}
                social={score.socialScore}
                environmental={score.environmentalScore || 0}
              />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Détail par dimension</h2>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Gouvernance (ISO 59004)</span>
                <span className="text-gray-600">{score.governanceScore.toFixed(1)}%</span>
              </div>
              <ProgressBar value={score.governanceScore} color="bg-blue-500" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Économique (ISO 59020)</span>
                <span className="text-gray-600">{score.economicScore.toFixed(1)}%</span>
              </div>
              <ProgressBar value={score.economicScore} color="bg-green-500" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Social</span>
                <span className="text-gray-600">{score.socialScore.toFixed(1)}%</span>
              </div>
              <ProgressBar value={score.socialScore} color="bg-purple-500" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Environnemental</span>
                <span className="text-gray-600">{(score.environmentalScore || 0).toFixed(1)}%</span>
              </div>
              <ProgressBar value={score.environmentalScore || 0} color="bg-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Prochaines étapes</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">1️⃣</div>
              <div>
                <h3 className="font-semibold">Consultez votre plan d'action personnalisé</h3>
                <p className="text-gray-600 text-sm">
                  Recommandations spécifiques basées sur vos résultats
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-2xl">2️⃣</div>
              <div>
                <h3 className="font-semibold">Téléchargez le guide de mise en œuvre</h3>
                <p className="text-gray-600 text-sm">
                  Documentation complète ISO 59000
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-2xl">3️⃣</div>
              <div>
                <h3 className="font-semibold">Suivez vos progrès</h3>
                <p className="text-gray-600 text-sm">
                  Réévaluez votre entreprise dans 6 mois
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
