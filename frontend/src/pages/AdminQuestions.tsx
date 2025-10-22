
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config'

interface Question {
  id: string
  questionId: string
  sector: string
  category: string
  text: string
  type: string
  weight: number
  unit?: string
  choices?: string
  isoReference?: string
}

const SECTORS = [
  'Agriculture, sylviculture et pêche',
  'Industrie manufacturière',
  'Construction / BTP',
  'Informatique et télécommunications',
  'Banque, assurance et finance',
  'Commerce de gros et de détail',
  'Transport et entreposage',
  'Hébergement et restauration',
  'Santé et action sociale',
  'Éducation',
]

export default function AdminQuestions() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([])
  const [selectedSector, setSelectedSector] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [formData, setFormData] = useState({
    questionId: '',
    sector: '',
    category: '',
    text: '',
    type: 'boolean',
    weight: 1,
    unit: '',
    isoReference: ''
  })
  const token = localStorage.getItem('adminToken')

  useEffect(() => {
    loadQuestions()
  }, [])

  useEffect(() => {
    filterQuestions()
  }, [selectedSector, searchTerm, questions])

  const loadQuestions = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/questions`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setQuestions(response.data)
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  const filterQuestions = () => {
    let filtered = questions

    if (selectedSector) {
      filtered = filtered.filter((q) => q.sector === selectedSector)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (q) =>
          q.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.questionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredQuestions(filtered)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Confirmer la suppression de cette question ?')) return

    try {
      await axios.delete(`${API_URL}/admin/questions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      alert('Question supprimée avec succès')
      loadQuestions()
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la suppression')
    }
  }

  const handleCreate = async () => {
    try {
      await axios.post(`${API_URL}/admin/questions`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      alert('Question créée avec succès')
      setShowCreateModal(false)
      resetForm()
      loadQuestions()
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la création')
    }
  }

  const handleUpdate = async () => {
    if (!editingQuestion) return

    try {
      await axios.put(`${API_URL}/admin/questions/${editingQuestion.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      alert('Question mise à jour avec succès')
      setEditingQuestion(null)
      resetForm()
      loadQuestions()
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la mise à jour')
    }
  }

  const resetForm = () => {
    setFormData({
      questionId: '',
      sector: '',
      category: '',
      text: '',
      type: 'boolean',
      weight: 1,
      unit: '',
      isoReference: ''
    })
  }

  const openEditModal = (question: Question) => {
    setFormData({
      questionId: question.questionId,
      sector: question.sector,
      category: question.category,
      text: question.text,
      type: question.type,
      weight: question.weight,
      unit: question.unit || '',
      isoReference: question.isoReference || ''
    })
    setEditingQuestion(question)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'boolean': return '✅'
      case 'percentage': return '%'
      case 'number': return '#'
      case 'text': return '📝'
      case 'choice': return '🔘'
      default: return '❓'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'boolean': return 'bg-green-100 text-green-800'
      case 'percentage': return 'bg-blue-100 text-blue-800'
      case 'number': return 'bg-purple-100 text-purple-800'
      case 'text': return 'bg-yellow-100 text-yellow-800'
      case 'choice': return 'bg-pink-100 text-pink-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

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
                  className="px-4 py-2 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
                >
                  📊 Dashboard
                </a>
                <a 
                  href="/admin/questions" 
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                >
                  📝 Questions
                </a>
              </div>
            </div>
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
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            📝 Gestion des questions
          </h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            + Nouvelle question
          </button>
        </div>

        {/* Filtres */}
        <div className="bg-white p-6 rounded-2xl shadow-xl mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔍 Rechercher
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="ID, texte, catégorie..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🏭 Filtrer par secteur
              </label>
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              >
                <option value="">Tous les secteurs ({questions.length})</option>
                {SECTORS.map((sector) => (
                  <option key={sector} value={sector}>
                    {sector} ({questions.filter((q) => q.sector === sector).length})
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {filteredQuestions.length} question(s) affichée(s)
            </div>
            {(selectedSector || searchTerm) && (
              <button
                onClick={() => {
                  setSelectedSector('')
                  setSearchTerm('')
                }}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                🔄 Réinitialiser les filtres
              </button>
            )}
          </div>
        </div>

        {/* Liste des questions */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <tr>
                  <th className="text-left p-4 font-semibold">ID</th>
                  <th className="text-left p-4 font-semibold">Secteur</th>
                  <th className="text-left p-4 font-semibold">Catégorie</th>
                  <th className="text-left p-4 font-semibold">Question</th>
                  <th className="text-left p-4 font-semibold">Type</th>
                  <th className="text-left p-4 font-semibold">Poids</th>
                  <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuestions.map((q, index) => (
                  <tr 
                    key={q.id} 
                    className={`border-b hover:bg-blue-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="p-4 font-mono text-sm text-blue-600 font-semibold">{q.questionId}</td>
                    <td className="p-4 text-sm max-w-xs">
                      <div className="truncate" title={q.sector}>
                        {q.sector.substring(0, 25)}...
                      </div>
                    </td>
                    <td className="p-4 text-sm max-w-xs">
                      <div className="truncate" title={q.category}>
                        {q.category.substring(0, 30)}...
                      </div>
                    </td>
                    <td className="p-4 text-sm max-w-md">
                      <div className="truncate" title={q.text}>
                        {q.text.substring(0, 60)}...
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getTypeColor(q.type)}`}>
                        {getTypeIcon(q.type)} {q.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="bg-gray-100 px-3 py-1 rounded-full font-semibold">
                        {q.weight}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(q)}
                          className="text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(q.id)}
                          className="text-red-600 hover:text-red-800 font-semibold"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredQuestions.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">🔍</div>
              <div className="text-xl font-semibold">Aucune question trouvée</div>
              <div className="text-sm mt-2">Essayez d'ajuster vos filtres de recherche</div>
            </div>
          )}
        </div>
      </div>

      {/* Modale de création */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">➕ Nouvelle question</h2>
                <button
                  onClick={() => {
                    setShowCreateModal(false)
                    resetForm()
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✖️
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ID de la question</label>
                  <input
                    type="text"
                    value={formData.questionId}
                    onChange={(e) => setFormData({ ...formData, questionId: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                    placeholder="ex: agr_env_1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Secteur</label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                  >
                    <option value="">Sélectionner un secteur</option>
                    {SECTORS.map((sector) => (
                      <option key={sector} value={sector}>{sector}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Catégorie</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                    placeholder="ex: Diagnostic environnemental"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Question</label>
                  <textarea
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                    rows={3}
                    placeholder="Texte de la question..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                    >
                      <option value="boolean">Boolean (Oui/Non)</option>
                      <option value="percentage">Pourcentage</option>
                      <option value="number">Nombre</option>
                      <option value="text">Texte</option>
                      <option value="choice">Choix</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Poids</label>
                    <input
                      type="number"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                      min="1"
                      max="5"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Unité (optionnel)</label>
                    <input
                      type="text"
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                      placeholder="ex: %, kg, m³"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Référence ISO (optionnel)</label>
                    <input
                      type="text"
                      value={formData.isoReference}
                      onChange={(e) => setFormData({ ...formData, isoReference: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                      placeholder="ex: ISO 59000:2024"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleCreate}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg"
                  >
                    ➕ Créer la question
                  </button>
                  <button
                    onClick={() => {
                      setShowCreateModal(false)
                      resetForm()
                    }}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modale d'édition */}
      {editingQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">✏️ Modifier la question</h2>
                <button
                  onClick={() => {
                    setEditingQuestion(null)
                    resetForm()
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✖️
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ID de la question</label>
                  <input
                    type="text"
                    value={formData.questionId}
                    disabled
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Secteur</label>
                  <input
                    type="text"
                    value={formData.sector}
                    disabled
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Catégorie</label>
                  <input
                    type="text"
                    value={formData.category}
                    disabled
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Question</label>
                  <textarea
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                    >
                      <option value="boolean">Boolean (Oui/Non)</option>
                      <option value="percentage">Pourcentage</option>
                      <option value="number">Nombre</option>
                      <option value="text">Texte</option>
                      <option value="choice">Choix</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Poids</label>
                    <input
                      type="number"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                      min="1"
                      max="5"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Unité (optionnel)</label>
                    <input
                      type="text"
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                      placeholder="ex: %, kg, m³"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Référence ISO (optionnel)</label>
                    <input
                      type="text"
                      value={formData.isoReference}
                      onChange={(e) => setFormData({ ...formData, isoReference: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                      placeholder="ex: ISO 59000:2024"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleUpdate}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg"
                  >
                    💾 Sauvegarder
                  </button>
                  <button
                    onClick={() => {
                      setEditingQuestion(null)
                      resetForm()
                    }}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
