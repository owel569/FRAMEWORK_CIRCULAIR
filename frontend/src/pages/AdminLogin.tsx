import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../config'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation de l'email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError("Format d'email invalide");
      return;
    }

    // Validation du mot de passe
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/admin/login`, {
        email,
        password,
      })

      localStorage.setItem('adminToken', response.data.token)
      localStorage.setItem('adminUser', JSON.stringify(response.data.admin))

      navigate('/admin/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur de connexion')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🔐 Admin ISO 59000
          </h1>
          <p className="text-gray-600">Connexion au panneau d'administration</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            Se connecter
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/auth"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Retour à l'espace entreprises
          </a>
        </div>
      </div>
    </div>
  )
}