
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config'

interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  email: string
  linkedin?: string
  specialties: string[]
  order: number
  isActive: boolean
}

export default function AdminTeam() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const token = localStorage.getItem('adminToken')

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    image: '',
    email: '',
    linkedin: '',
    specialties: [] as string[],
  })

  useEffect(() => {
    loadMembers()
  }, [])

  const loadMembers = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/team?includeInactive=true`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setMembers(response.data)
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  const openCreateModal = () => {
    setEditingMember(null)
    setFormData({
      name: '',
      role: '',
      bio: '',
      image: '',
      email: '',
      linkedin: '',
      specialties: [],
    })
    setShowModal(true)
  }

  const openEditModal = (member: TeamMember) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio,
      image: member.image,
      email: member.email,
      linkedin: member.linkedin || '',
      specialties: member.specialties,
    })
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingMember) {
        await axios.put(
          `${API_URL}/admin/team/${editingMember.id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        )
      } else {
        await axios.post(
          `${API_URL}/admin/team`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        )
      }
      setShowModal(false)
      loadMembers()
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la sauvegarde')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer ce membre ?')) return

    try {
      await axios.delete(`${API_URL}/admin/team/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      loadMembers()
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  const handleToggleStatus = async (id: string) => {
    try {
      await axios.patch(`${API_URL}/admin/team/${id}/toggle`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      loadMembers()
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  const addSpecialty = () => {
    const specialty = prompt('Entrez une spécialité:')
    if (specialty) {
      setFormData(prev => ({
        ...prev,
        specialties: [...prev.specialties, specialty],
      }))
    }
  }

  const removeSpecialty = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.filter((_, i) => i !== index),
    }))
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <nav className="bg-white shadow-lg border-b-4 border-blue-600 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                👥 Gestion de l'Équipe
              </h1>
              <div className="flex gap-2">
                <a href="/admin/dashboard" className="px-4 py-2 rounded-lg text-gray-700 font-semibold hover:bg-gray-100">
                  📊 Dashboard
                </a>
                <a href="/admin/questions" className="px-4 py-2 rounded-lg text-gray-700 font-semibold hover:bg-gray-100">
                  📝 Questions
                </a>
                <a href="/admin/team" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold">
                  👥 Équipe
                </a>
              </div>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('adminToken')
                window.location.href = '/'
              }}
              className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600"
            >
              🚪 Déconnexion
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Membres de l'équipe ({members.length})</h2>
          <button
            onClick={openCreateModal}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl"
          >
            ➕ Ajouter un membre
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className={`bg-white rounded-2xl shadow-lg p-6 ${!member.isActive ? 'opacity-50' : ''}`}
            >
              <div className="flex justify-between items-start mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/150/0EA5E9/ffffff?text=' + member.name.split(' ').map(n => n[0]).join('')
                  }}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleStatus(member.id)}
                    className={`px-3 py-1 rounded-lg text-sm font-semibold ${member.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}
                  >
                    {member.isActive ? '✓' : '✗'}
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
              <p className="text-blue-600 font-semibold mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{member.bio}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {member.specialties.map((spec, idx) => (
                  <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {spec}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(member)}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600"
                >
                  ✏️ Modifier
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600"
                >
                  🗑️ Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {editingMember ? 'Modifier le membre' : 'Ajouter un membre'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Nom complet</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-12 rounded-lg border border-gray-300 focus:border-blue-400 px-3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Rôle</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full h-12 rounded-lg border border-gray-300 focus:border-blue-400 px-3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Biographie</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 focus:border-blue-400 px-3 py-2"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">URL de l'image</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full h-12 rounded-lg border border-gray-300 focus:border-blue-400 px-3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-12 rounded-lg border border-gray-300 focus:border-blue-400 px-3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">LinkedIn (optionnel)</label>
                <input
                  type="text"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full h-12 rounded-lg border border-gray-300 focus:border-blue-400 px-3"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Spécialités</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.specialties.map((spec, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-2">
                      {spec}
                      <button type="button" onClick={() => removeSpecialty(idx)} className="text-red-500">×</button>
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addSpecialty}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300"
                >
                  + Ajouter une spécialité
                </button>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg"
                >
                  {editingMember ? 'Mettre à jour' : 'Créer'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
