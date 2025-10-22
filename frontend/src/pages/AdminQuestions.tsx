
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

export default function AdminQuestions() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [selectedSector, setSelectedSector] = useState<string>('')
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const token = localStorage.getItem('adminToken')

  useEffect(() => {
    loadQuestions()
  }, [selectedSector])

  const loadQuestions = async () => {
    try {
      const url = selectedSector
        ? `${API_URL}/admin/questions?sector=${encodeURIComponent(selectedSector)}`
        : `${API_URL}/admin/questions`
      
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setQuestions(response.data)
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Confirmer la suppression ?')) return

    try {
      await axios.delete(`${API_URL}/admin/questions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      loadQuestions()
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            📝 Gestion des questions
          </h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            + Nouvelle question
          </button>
        </div>

        {/* Filtre par secteur */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filtrer par secteur
          </label>
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Tous les secteurs</option>
            <option value="Agriculture, sylviculture et pêche">Agriculture, sylviculture et pêche</option>
            <option value="Industrie manufacturière">Industrie manufacturière</option>
            <option value="Construction / BTP">Construction / BTP</option>
            <option value="Informatique et télécommunications">Informatique et télécommunications</option>
            <option value="Banque, assurance et finance">Banque, assurance et finance</option>
            {/* Ajouter tous les autres secteurs */}
          </select>
        </div>

        {/* Liste des questions */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4">ID</th>
                  <th className="text-left p-4">Secteur</th>
                  <th className="text-left p-4">Catégorie</th>
                  <th className="text-left p-4">Question</th>
                  <th className="text-left p-4">Type</th>
                  <th className="text-left p-4">Poids</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((q) => (
                  <tr key={q.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-mono text-sm">{q.questionId}</td>
                    <td className="p-4">{q.sector.substring(0, 20)}...</td>
                    <td className="p-4">{q.category.substring(0, 30)}...</td>
                    <td className="p-4">{q.text.substring(0, 60)}...</td>
                    <td className="p-4">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        {q.type}
                      </span>
                    </td>
                    <td className="p-4">{q.weight}</td>
                    <td className="p-4">
                      <button
                        onClick={() => setEditingQuestion(q)}
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        ✏️ Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(q.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        🗑️ Supprimer
                      </button>
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
