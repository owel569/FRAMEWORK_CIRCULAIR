
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config'

interface Document {
  id: string
  filename: string
  title: string
  description?: string
  fileType: string
  fileSize: number
  isActive: boolean
  wordCount?: number
  usageCount: number
  uploadedAt: string
}

export default function AdminChatbotDocs() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const token = localStorage.getItem('adminToken')

  useEffect(() => {
    loadDocuments()
  }, [])

  const loadDocuments = async () => {
    try {
      const response = await axios.get(`${API_URL}/chatbot/documents`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setDocuments(response.data)
    } catch (error) {
      console.error('Erreur chargement documents:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const allowedTypes = ['.pdf', '.txt', '.md', '.docx']
      const fileExt = '.' + file.name.split('.').pop()?.toLowerCase()
      
      if (!allowedTypes.includes(fileExt)) {
        alert('Type de fichier non autorisé. Utilisez: PDF, TXT, MD ou DOCX')
        return
      }
      
      if (file.size > 10 * 1024 * 1024) {
        alert('Fichier trop volumineux (max 10 MB)')
        return
      }
      
      setSelectedFile(file)
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, ''))
      }
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !title.trim()) {
      alert('Veuillez sélectionner un fichier et entrer un titre')
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('title', title)
    if (description) {
      formData.append('description', description)
    }

    try {
      await axios.post(`${API_URL}/chatbot/documents/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      
      alert('✅ Document uploadé avec succès !')
      setSelectedFile(null)
      setTitle('')
      setDescription('')
      loadDocuments()
    } catch (error) {
      console.error('Erreur upload:', error)
      alert('❌ Erreur lors de l\'upload du document')
    } finally {
      setUploading(false)
    }
  }

  const toggleDocument = async (id: string) => {
    try {
      await axios.patch(
        `${API_URL}/chatbot/documents/${id}/toggle`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      loadDocuments()
    } catch (error) {
      console.error('Erreur toggle:', error)
    }
  }

  const deleteDocument = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
      return
    }

    try {
      await axios.delete(`${API_URL}/chatbot/documents/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      alert('✅ Document supprimé')
      loadDocuments()
    } catch (error) {
      console.error('Erreur suppression:', error)
      alert('❌ Erreur lors de la suppression')
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
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
                  className="px-4 py-2 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
                >
                  📝 Questions
                </a>
                <a 
                  href="/admin/chatbot-docs" 
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                >
                  🤖 Chatbot Docs
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
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          📚 Gestion de la Base de Connaissances Chatbot
        </h2>

        {/* Section Upload */}
        <div className="bg-white p-6 rounded-2xl shadow-xl mb-8">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="text-3xl mr-3">📤</span>
            Uploader un Nouveau Document
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Titre du document *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Guide ISO 59004 complet"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description (optionnel)
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Documentation officielle pour l'économie circulaire"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Fichier * (PDF, TXT, MD, DOCX - Max 10 MB)
            </label>
            <div className="flex items-center gap-4">
              <label className="flex-1 cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors text-center">
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    accept=".pdf,.txt,.md,.docx"
                    className="hidden"
                  />
                  {selectedFile ? (
                    <div>
                      <p className="text-green-600 font-semibold">✅ {selectedFile.name}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatFileSize(selectedFile.size)}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-600 font-semibold">📁 Cliquez pour sélectionner un fichier</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Formats acceptés: PDF, TXT, MD, DOCX
                      </p>
                    </div>
                  )}
                </div>
              </label>
              
              <button
                onClick={handleUpload}
                disabled={!selectedFile || !title.trim() || uploading}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {uploading ? '⏳ Upload...' : '📤 Uploader'}
              </button>
            </div>
          </div>
        </div>

        {/* Liste des Documents */}
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center justify-between">
            <span className="flex items-center">
              <span className="text-3xl mr-3">📄</span>
              Documents Uploadés ({documents.length})
            </span>
          </h3>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Chargement...</p>
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">📭 Aucun document uploadé</p>
              <p className="text-gray-400 mt-2">Uploadez votre premier document pour enrichir le chatbot</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left p-3 font-semibold text-gray-700">Titre</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Fichier</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Taille</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Mots</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Utilisé</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Statut</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => (
                    <tr key={doc.id} className="border-b hover:bg-blue-50 transition-colors">
                      <td className="p-3">
                        <div>
                          <p className="font-semibold text-gray-800">{doc.title}</p>
                          {doc.description && (
                            <p className="text-sm text-gray-500 mt-1">{doc.description}</p>
                          )}
                        </div>
                      </td>
                      <td className="p-3 text-gray-600">
                        <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {doc.filename}
                        </span>
                      </td>
                      <td className="p-3 text-gray-600">
                        {formatFileSize(doc.fileSize)}
                      </td>
                      <td className="p-3 text-gray-600">
                        {doc.wordCount?.toLocaleString() || '-'}
                      </td>
                      <td className="p-3 text-gray-600">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold">
                          {doc.usageCount}×
                        </span>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => toggleDocument(doc.id)}
                          className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
                            doc.isActive
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {doc.isActive ? '✅ Actif' : '⏸️ Inactif'}
                        </button>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => deleteDocument(doc.id)}
                          className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-lg font-semibold transition-colors"
                        >
                          🗑️ Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Informations */}
        <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <h4 className="font-bold text-blue-900 mb-3">ℹ️ Comment ça marche ?</h4>
          <ul className="space-y-2 text-blue-800">
            <li>• <strong>Uploadez des documents</strong> : PDF, Word, Markdown ou texte</li>
            <li>• <strong>Le chatbot s'entraîne automatiquement</strong> sur le contenu extrait</li>
            <li>• <strong>Activez/désactivez</strong> des documents pour contrôler les sources utilisées</li>
            <li>• <strong>Le chatbot cite ses sources</strong> quand il utilise vos documents</li>
            <li>• <strong>Plus de documents = plus de connaissances</strong> pour des réponses précises</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
