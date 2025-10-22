
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface AdminStats {
  totalCompanies: number
  totalScores: number
  totalQuestions: number
  recentCompanies: any[]
  scoresByMonth: { month: string; count: number }[]
  sectorDistribution: { sector: string; count: number }[]
  averageScores: {
    global: number
    governance: number
    economic: number
    social: number
    environmental: number
  }
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D']

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('adminToken')

  useEffect(() => {
    loadStats()
  }, [])

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Chargement...</div>
      </div>
    )
  }

  if (!stats) return null

  const avgScoresData = [
    { name: 'Global', value: stats.averageScores.global },
    { name: 'Gouvernance', value: stats.averageScores.governance },
    { name: 'Économique', value: stats.averageScores.economic },
    { name: 'Social', value: stats.averageScores.social },
    { name: 'Environnemental', value: stats.averageScores.environmental },
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Admin */}
        <div className="bg-white shadow-md rounded-lg mb-6 p-4 flex justify-between items-center">
          <div className="flex gap-4">
            <a href="/admin/dashboard" className="text-blue-600 font-semibold hover:text-blue-800">
              📊 Dashboard
            </a>
            <a href="/admin/questions" className="text-blue-600 font-semibold hover:text-blue-800">
              📝 Questions
            </a>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('adminToken')
              localStorage.removeItem('adminUser')
              window.location.href = '/'
            }}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
          >
            🚪 Déconnexion
          </button>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          📊 Tableau de bord administrateur
        </h1>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-gray-600 mb-2">Total Entreprises</div>
            <div className="text-4xl font-bold text-blue-600">{stats.totalCompanies}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-gray-600 mb-2">Total Évaluations</div>
            <div className="text-4xl font-bold text-green-600">{stats.totalScores}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-gray-600 mb-2">Total Questions</div>
            <div className="text-4xl font-bold text-purple-600">{stats.totalQuestions}</div>
          </div>
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Évaluations par mois */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Évaluations par mois</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.scoresByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8884d8" name="Évaluations" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Distribution par secteur */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Distribution par secteur</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.sectorDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.sector.substring(0, 20)}...`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {stats.sectorDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scores moyens */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4">Scores moyens par dimension</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={avgScoresData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" name="Score moyen (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Entreprises récentes */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Dernières entreprises enregistrées</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Nom</th>
                  <th className="text-left p-3">Secteur</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Score</th>
                  <th className="text-left p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentCompanies.map((company) => (
                  <tr key={company.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{company.name}</td>
                    <td className="p-3">{company.sector.substring(0, 30)}...</td>
                    <td className="p-3">{company.email}</td>
                    <td className="p-3">
                      {company.scores[0] ? (
                        <span className="text-green-600 font-bold">
                          {company.scores[0].globalScore.toFixed(1)}%
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="p-3">
                      {new Date(company.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
