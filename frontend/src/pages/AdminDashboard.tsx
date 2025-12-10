
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  AreaChart, Area
} from 'recharts'

interface AdminStats {
  totalCompanies: number
  totalScores: number
  totalQuestions: number
  recentCompanies: CompanyWithScore[]
  scoresByMonth: MonthlyScoreData[]
  sectorDistribution: SectorData[]
  averageScores: AverageScoresData
  performanceTrends: PerformanceTrend[]
  topPerformers: TopPerformer[]
}

interface CompanyWithScore {
  id: string
  name: string
  sector: string
  email: string
  createdAt: string
  scores: Array<{ globalScore: number; createdAt: string }>
}

interface MonthlyScoreData {
  month: string
  count: number
  averageScore: number
}

interface SectorData {
  sector: string
  count: number
  averageScore: number
}

interface AverageScoresData {
  global: number
  governance: number
  economic: number
  social: number
  environmental: number
}

interface PerformanceTrend {
  month: string
  governance: number
  economic: number
  social: number
  environmental: number
}

interface TopPerformer {
  companyName: string
  sector: string
  overallScore: number
  rank: number
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#A4DE6C', '#D0ED57']

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeView, setActiveView] = useState<'overview' | 'trends' | 'companies'>('overview')
  const [demoMode, setDemoMode] = useState(false)
  const token = localStorage.getItem('adminToken')

  useEffect(() => {
    loadStats()
    checkDemoMode()
  }, [])

  const checkDemoMode = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/demo-mode`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setDemoMode(response.data.demoMode)
    } catch (error) {
      console.error('Erreur vérification mode démo:', error)
    }
  }

  const toggleDemoMode = async () => {
    try {
      const newMode = !demoMode
      await axios.post(
        `${API_URL}/admin/demo-mode`,
        { enabled: newMode },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setDemoMode(newMode)
      await loadStats()
    } catch (error) {
      console.error('Erreur toggle mode démo:', error)
    }
  }

  const loadStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setStats(response.data)
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <div className="text-2xl font-semibold text-gray-700">Chargement des données...</div>
        </div>
      </div>
    )
  }

  if (!stats) return null

  const avgScoresData = [
    { name: 'Gouvernance', value: stats.averageScores.governance, fullMark: 100 },
    { name: 'Économique', value: stats.averageScores.economic, fullMark: 100 },
    { name: 'Social', value: stats.averageScores.social, fullMark: 100 },
    { name: 'Environnemental', value: stats.averageScores.environmental, fullMark: 100 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation Admin */}
      <nav className="bg-white shadow-lg border-b-4 border-blue-600 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                🔐 Admin ISO 59000
              </h1>
              <div className="flex gap-2">
                <a 
                  href="/admin/dashboard" 
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                >
                  📊 Dashboard
                </a>
                <a 
                  href="/admin/questions" 
                  className="px-4 py-2 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
                >
                  📝 Questions
                </a>
                <a 
                  href="/admin/chatbot-docs" 
                  className="px-4 py-2 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
                >
                  🤖 Chatbot
                </a>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={toggleDemoMode}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md ${
                  demoMode
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-300'
                }`}
              >
                {demoMode ? '🎭 Mode Démo' : '📊 Données Réelles'}
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('adminToken')
                  localStorage.removeItem('adminUser')
                  window.location.href = '/'
                }}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
              >
                🚪 Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Onglets de vue */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveView('overview')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeView === 'overview'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            📈 Vue d'ensemble
          </button>
          <button
            onClick={() => setActiveView('trends')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeView === 'trends'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            📊 Tendances
          </button>
          <button
            onClick={() => setActiveView('companies')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeView === 'companies'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            🏢 Entreprises
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="text-blue-100">Entreprises</div>
              <div className="text-4xl">🏢</div>
            </div>
            <div className="text-5xl font-bold">{stats.totalCompanies}</div>
            <div className="text-blue-100 mt-2">Total inscrites</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="text-green-100">Évaluations</div>
              <div className="text-4xl">✅</div>
            </div>
            <div className="text-5xl font-bold">{stats.totalScores}</div>
            <div className="text-green-100 mt-2">Total effectuées</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="text-purple-100">Questions</div>
              <div className="text-4xl">❓</div>
            </div>
            <div className="text-5xl font-bold">{stats.totalQuestions}</div>
            <div className="text-purple-100 mt-2">Dans la base</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="text-yellow-100">Score moyen</div>
              <div className="text-4xl">⭐</div>
            </div>
            <div className="text-5xl font-bold">{stats.averageScores.global.toFixed(1)}%</div>
            <div className="text-yellow-100 mt-2">Performance globale</div>
          </div>
        </div>

        {/* Vue d'ensemble */}
        {activeView === 'overview' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Évaluations par mois */}
              <div className="bg-white p-6 rounded-2xl shadow-xl">
                <h2 className="text-xl font-bold mb-4 text-gray-800">📅 Évaluations mensuelles</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={stats.scoresByMonth}>
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="count" stroke="#8884d8" fillOpacity={1} fill="url(#colorCount)" name="Nombre" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Scores moyens radar */}
              <div className="bg-white p-6 rounded-2xl shadow-xl">
                <h2 className="text-xl font-bold mb-4 text-gray-800">🎯 Scores moyens par dimension</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={avgScoresData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Score" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Distribution par secteur */}
            <div className="bg-white p-6 rounded-2xl shadow-xl mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800">🏭 Distribution par secteur</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={stats.sectorDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="sector" angle={-45} textAnchor="end" height={150} />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="count" fill="#8884d8" name="Nombre d'entreprises" />
                  <Bar yAxisId="right" dataKey="averageScore" fill="#82ca9d" name="Score moyen (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Top Performers */}
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <h2 className="text-xl font-bold mb-4 text-gray-800">🏆 Top 10 Entreprises Performantes</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left p-3 font-semibold text-gray-700">Rang</th>
                      <th className="text-left p-3 font-semibold text-gray-700">Entreprise</th>
                      <th className="text-left p-3 font-semibold text-gray-700">Secteur</th>
                      <th className="text-left p-3 font-semibold text-gray-700">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.topPerformers.map((performer) => (
                      <tr key={performer.rank} className="border-b hover:bg-blue-50 transition-colors">
                        <td className="p-3">
                          <span className="text-2xl">
                            {performer.rank === 1 ? '🥇' : performer.rank === 2 ? '🥈' : performer.rank === 3 ? '🥉' : `#${performer.rank}`}
                          </span>
                        </td>
                        <td className="p-3 font-semibold">{performer.companyName}</td>
                        <td className="p-3 text-gray-600">{performer.sector.substring(0, 40)}...</td>
                        <td className="p-3">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold">
                            {performer.overallScore.toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Tendances */}
        {activeView === 'trends' && (
          <div className="bg-white p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-gray-800">📈 Évolution des performances</h2>
            <ResponsiveContainer width="100%" height={500}>
              <LineChart data={stats.performanceTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="governance" stroke="#8884d8" name="Gouvernance" strokeWidth={2} />
                <Line type="monotone" dataKey="economic" stroke="#82ca9d" name="Économique" strokeWidth={2} />
                <Line type="monotone" dataKey="social" stroke="#ffc658" name="Social" strokeWidth={2} />
                <Line type="monotone" dataKey="environmental" stroke="#ff7300" name="Environnemental" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Entreprises récentes */}
        {activeView === 'companies' && (
          <div className="bg-white p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-gray-800">🏢 Dernières entreprises enregistrées</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left p-3 font-semibold text-gray-700">Nom</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Secteur</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Email</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Score</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentCompanies.map((company) => (
                    <tr key={company.id} className="border-b hover:bg-blue-50 transition-colors">
                      <td className="p-3 font-semibold">{company.name}</td>
                      <td className="p-3 text-gray-600">{company.sector.substring(0, 30)}...</td>
                      <td className="p-3 text-gray-600">{company.email}</td>
                      <td className="p-3">
                        {company.scores[0] ? (
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold">
                            {company.scores[0].overallScore.toFixed(1)}%
                          </span>
                        ) : (
                          <span className="text-gray-400">Aucun score</span>
                        )}
                      </td>
                      <td className="p-3 text-gray-600">
                        {new Date(company.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
