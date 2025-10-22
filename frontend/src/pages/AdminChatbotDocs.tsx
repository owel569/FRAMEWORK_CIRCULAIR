
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

interface ChatbotDocument {
  id: string;
  filename: string;
  title: string;
  description: string | null;
  fileType: string;
  fileSize: number;
  isActive: boolean;
  wordCount: number;
  usageCount: number;
  uploadedAt: string;
}

const AdminChatbotDocs: React.FC = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<ChatbotDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchDocuments();
  }, [navigate]);

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/chatbot/documents`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Erreur lors du chargement des documents');

      const data = await response.json();
      setDocuments(data);
    } catch (err) {
      setError('Impossible de charger les documents');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'text/markdown',
      ];

      if (!allowedTypes.includes(file.type)) {
        setError('Type de fichier non supporté. Utilisez PDF, DOCX, TXT ou MD');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError('Le fichier est trop volumineux (max 10 MB)');
        return;
      }

      setSelectedFile(file);
      setError('');
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile || !title.trim()) {
      setError('Veuillez sélectionner un fichier et entrer un titre');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('title', title.trim());
      if (description.trim()) {
        formData.append('description', description.trim());
      }

      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/chatbot/documents/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Erreur lors du téléversement');

      setSuccess('Document téléversé avec succès');
      setSelectedFile(null);
      setTitle('');
      setDescription('');
      fetchDocuments();
    } catch (err) {
      setError('Erreur lors du téléversement du document');
    } finally {
      setUploading(false);
    }
  };

  const toggleDocument = async (id: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/chatbot/documents/${id}/toggle`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Erreur');

      fetchDocuments();
    } catch (err) {
      setError('Erreur lors de la modification du statut');
    }
  };

  const deleteDocument = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/chatbot/documents/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Erreur');

      setSuccess('Document supprimé');
      fetchDocuments();
    } catch (err) {
      setError('Erreur lors de la suppression');
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              📚 Documents Chatbot
            </h1>
            <p className="text-gray-600">
              Gérez les documents utilisés par l'assistant intelligent
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            ← Retour au Dashboard
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}

        {/* Upload Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            📤 Téléverser un nouveau document
          </h2>

          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fichier *
              </label>
              <input
                type="file"
                accept=".pdf,.docx,.txt,.md"
                onChange={handleFileSelect}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
              <p className="mt-1 text-xs text-gray-500">
                Formats acceptés : PDF, DOCX, TXT, MD (max 10 MB)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre du document *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Ex: Guide ISO 59000 - Section 4"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (optionnel)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Décrivez le contenu du document..."
              />
            </div>

            <button
              type="submit"
              disabled={uploading || !selectedFile}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Téléversement en cours...' : '📤 Téléverser le document'}
            </button>
          </form>
        </div>

        {/* Documents List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            📋 Documents existants ({documents.length})
          </h2>

          {documents.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              Aucun document téléversé pour le moment
            </div>
          ) : (
            <div className="space-y-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">
                          {doc.fileType === '.pdf' ? '📄' : doc.fileType === '.docx' ? '📝' : '📋'}
                        </span>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-800">
                            {doc.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {doc.filename}
                          </p>
                        </div>
                      </div>

                      {doc.description && (
                        <p className="text-gray-600 mb-3">{doc.description}</p>
                      )}

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span>📊 {doc.wordCount?.toLocaleString()} mots</span>
                        <span>💾 {formatFileSize(doc.fileSize)}</span>
                        <span>🔍 Utilisé {doc.usageCount} fois</span>
                        <span>📅 {formatDate(doc.uploadedAt)}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <button
                        onClick={() => toggleDocument(doc.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          doc.isActive
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {doc.isActive ? '✓ Actif' : '⊗ Inactif'}
                      </button>

                      <button
                        onClick={() => deleteDocument(doc.id)}
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors"
                      >
                        🗑️ Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl mb-2">📚</div>
            <div className="text-2xl font-bold text-gray-800">
              {documents.length}
            </div>
            <div className="text-gray-600">Documents totaux</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl mb-2">✓</div>
            <div className="text-2xl font-bold text-green-600">
              {documents.filter((d) => d.isActive).length}
            </div>
            <div className="text-gray-600">Documents actifs</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-2xl font-bold text-blue-600">
              {documents.reduce((sum, d) => sum + d.usageCount, 0)}
            </div>
            <div className="text-gray-600">Utilisations totales</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChatbotDocs;
