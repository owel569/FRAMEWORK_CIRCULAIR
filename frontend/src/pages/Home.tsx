import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-circular-green/20 to-circular-blue/20">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              🌍 Framework Économie Circulaire
            </h1>
            <div className="text-sm text-gray-600">
              ISO 59000:2024
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Évaluez votre niveau d'économie circulaire
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Plateforme d'accompagnement des PME marocaines dans leur transition vers l'économie circulaire, 
            conforme aux normes ISO 59000.
          </p>
          <Link 
            to="/questionnaire" 
            className="btn-primary inline-block text-lg"
          >
            Commencer l'évaluation
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="card text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-3">Évaluation complète</h3>
            <p className="text-gray-600">
              Questionnaire interactif couvrant tous les aspects de l'économie circulaire selon ISO 59004
            </p>
          </div>

          <div className="card text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-3">Score personnalisé</h3>
            <p className="text-gray-600">
              Calcul automatique de votre maturité circulaire avec indicateurs détaillés
            </p>
          </div>

          <div className="card text-center">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-xl font-bold mb-3">Plan d'action</h3>
            <p className="text-gray-600">
              Recommandations pratiques et feuille de route personnalisée ISO 59020
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Pourquoi l'économie circulaire ?
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">✅</div>
              <div>
                <h4 className="font-semibold mb-1">Réduction des coûts</h4>
                <p className="text-gray-600 text-sm">
                  Optimisation des ressources et diminution des déchets
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-2xl">✅</div>
              <div>
                <h4 className="font-semibold mb-1">Innovation</h4>
                <p className="text-gray-600 text-sm">
                  Nouveaux modèles économiques et opportunités de marché
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-2xl">✅</div>
              <div>
                <h4 className="font-semibold mb-1">Conformité ISO</h4>
                <p className="text-gray-600 text-sm">
                  Respect des standards internationaux ISO 59000
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-2xl">✅</div>
              <div>
                <h4 className="font-semibold mb-1">Impact environnemental</h4>
                <p className="text-gray-600 text-sm">
                  Contribution à la durabilité et à la protection de l'environnement
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 Framework Économie Circulaire - Conforme ISO 59000:2024
          </p>
        </div>
      </footer>
    </div>
  )
}
