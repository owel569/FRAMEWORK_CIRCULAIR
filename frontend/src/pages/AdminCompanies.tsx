
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

interface Company {
  id: string;
  name: string;
  sector: string;
  size: string;
  location: string;
  email: string;
  isActive: boolean;
  latestScore: {
    overallScore: number;
    maturityLevel: string;
    governanceScore: number;
    economicScore: number;
    socialScore: number;
    environmentalScore: number;
  } | null;
  assignedExperts: Array<{
    firstName: string;
    lastName: string;
  }>;
  _count: {
    scores: number;
    actionPlans: number;
  };
}

export default function AdminCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    sector: '',
    maturityLevel: '',
    isActive: '',
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    loadCompanies();
  }, [filters, pagination.page]);

  const loadCompanies = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.sector) params.append('sector', filters.sector);
      if (filters.maturityLevel) params.append('maturityLevel', filters.maturityLevel);
      if (filters.isActive) params.append('isActive', filters.isActive);
      params.append('page', pagination.page.toString());
      params.append('limit', pagination.limit.toString());

      const response = await axios.get(`${API_URL}/admin/companies?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCompanies(response.data.companies);
      setPagination((prev) => ({ ...prev, ...response.data.pagination }));
    } catch (error) {
      console.error('Erreur chargement entreprises:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCompanyStatus = async (id: string) => {
    try {
      await axios.patch(
        `${API_URL}/admin/companies/${id}/toggle-status`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      loadCompanies();
    } catch (error) {
      console.error('Erreur changement statut:', error);
    }
  };

  const getMaturityBadge = (level: string) => {
    const badges = {
      'Initiation': 'bg-red-100 text-red-800',
      'Croissance': 'bg-orange-100 text-orange-800',
      'Maturité': 'bg-yellow-100 text-yellow-800',
      'Excellence': 'bg-green-100 text-green-800',
    };
    return badges[level as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b-4 border-blue-600 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              🏢 Gestion des Entreprises
            </h1>
            <div className="flex gap-2">
              <a href="/admin/dashboard" className="px-4 py-2 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-colors">
                📊 Dashboard
              </a>
              <a href="/admin/companies" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold">
                🏢 Entreprises
              </a>
              <a href="/admin/action-plans" className="px-4 py-2 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-colors">
                📋 Plans d'Action
              </a>
              <a href="/admin/questions" className="px-4 py-2 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-colors">
                📝 Questions
              </a>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('adminToken');
                window.location.href = '/';
              }}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-all"
            >
              🚪 Déconnexion
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filtres */}
        <div className="bg-white p-6 rounded-2xl shadow-xl mb-6 animate-fadeIn">
          <h2 className="text-xl font-bold mb-4 text-gray-800">🔍 Filtres</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Rechercher..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <select
              value={filters.sector}
              onChange={(e) => setFilters({ ...filters, sector: e.target.value })}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous les secteurs</option>
              <option value="Industrie">Industrie</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Services">Services</option>
              <option value="Commerce">Commerce</option>
            </select>
            <select
              value={filters.maturityLevel}
              onChange={(e) => setFilters({ ...filters, maturityLevel: e.target.value })}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous niveaux</option>
              <option value="Initiation">Initiation</option>
              <option value="Croissance">Croissance</option>
              <option value="Maturité">Maturité</option>
              <option value="Excellence">Excellence</option>
            </select>
            <select
              value={filters.isActive}
              onChange={(e) => setFilters({ ...filters, isActive: e.target.value })}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous statuts</option>
              <option value="true">Actives</option>
              <option value="false">Inactives</option>
            </select>
          </div>
        </div>

        {/* Liste des entreprises */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Chargement...</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-slideUp">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Entreprise</th>
                  <th className="px-6 py-4 text-left font-semibold">Secteur</th>
                  <th className="px-6 py-4 text-left font-semibold">Score Global</th>
                  <th className="px-6 py-4 text-left font-semibold">Maturité</th>
                  <th className="px-6 py-4 text-left font-semibold">Experts</th>
                  <th className="px-6 py-4 text-left font-semibold">Statut</th>
                  <th className="px-6 py-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company) => (
                  <tr key={company.id} className="border-b hover:bg-blue-50 transition-all duration-200">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-800">{company.name}</p>
                        <p className="text-sm text-gray-500">{company.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{company.sector}</td>
                    <td className="px-6 py-4">
                      {company.latestScore ? (
                        <div className="flex items-center gap-2">
                          <div className="text-2xl font-bold text-blue-600">
                            {company.latestScore.overallScore.toFixed(0)}%
                          </div>
                          <div className="text-xs text-gray-500">
                            ({company._count.scores} éval.)
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">Non évalué</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {company.latestScore ? (
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getMaturityBadge(company.latestScore.maturityLevel)}`}>
                          {company.latestScore.maturityLevel}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {company.assignedExperts.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {company.assignedExperts.map((expert, idx) => (
                            <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                              {expert.firstName} {expert.lastName.charAt(0)}.
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">Non assigné</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleCompanyStatus(company.id)}
                        className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
                          company.isActive
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {company.isActive ? '✅ Active' : '⏸️ Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={`/admin/companies/${company.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all inline-block"
                      >
                        👁️ Détails
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t">
              <div className="text-sm text-gray-600">
                Page {pagination.page} sur {pagination.totalPages} ({pagination.total} entreprises)
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                  disabled={pagination.page === 1}
                  className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-all"
                >
                  ← Précédent
                </button>
                <button
                  onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                  disabled={pagination.page === pagination.totalPages}
                  className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-all"
                >
                  Suivant →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
