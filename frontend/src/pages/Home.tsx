import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-circular-green/20 via-white to-circular-blue/20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-circular-green/10 to-circular-blue/10 animate-gradient"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-circular-blue rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-circular-green rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-24 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-8 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-circular-blue/20 animate-fadeInDown">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-circular-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-circular-blue"></span>
              </span>
              <span className="text-circular-blue-dark font-semibold">🌍 Conforme ISO 59000</span>
              <span className="px-2 py-0.5 bg-circular-green/20 rounded-full text-xs font-bold text-circular-green-dark">NOUVEAU</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight animate-fadeInUp">
              Plateforme d'Évaluation
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-circular-green-dark via-circular-blue to-circular-green-dark bg-300% animate-gradientShift">
                Économie Circulaire
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed animate-fadeInUp animation-delay-200">
              Accompagnement professionnel des PME marocaines dans leur transition vers l'économie circulaire
              selon les normes <span className="font-semibold text-circular-blue-dark">ISO 59000, ISO 59004, ISO 59010 et ISO 59020</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-fadeInUp animation-delay-400">
              <Link
                to="/questionnaire"
                className="group relative px-10 py-5 bg-gradient-to-r from-circular-blue to-circular-blue-dark text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>🚀</span>
                  Démarrer l'évaluation
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-circular-blue-dark to-circular-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <a
                href="#fonctionnalites"
                className="group px-10 py-5 text-lg font-semibold bg-white border-2 border-circular-blue text-circular-blue-dark rounded-2xl hover:bg-circular-blue hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
              >
                <span>📖</span>
                En savoir plus
                <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-circular-blue-dark mb-2">20+</div>
              <div className="text-gray-600">Secteurs d'activité</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-circular-green-dark mb-2">4</div>
              <div className="text-gray-600">Dimensions d'analyse</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-circular-blue-dark mb-2">100%</div>
              <div className="text-gray-600">Conforme ISO 59000</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-circular-green-dark mb-2">360°</div>
              <div className="text-gray-600">Évaluation complète</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fonctionnalites" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Fonctionnalités de la plateforme
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une solution complète pour évaluer et améliorer votre performance en économie circulaire
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-circular-blue to-circular-blue-dark rounded-2xl flex items-center justify-center mb-6 text-3xl">
                📋
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Questionnaires sectoriels
              </h3>
              <p className="text-gray-600 leading-relaxed">
                20 secteurs d'activité avec sous-secteurs détaillés (Agriculture, Industrie, Construction, Commerce, Transport, Énergie, Santé, IT, Finance, etc.)
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-circular-green to-circular-green-dark rounded-2xl flex items-center justify-center mb-6 text-3xl">
                🎯
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                4 Diagnostics complets
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Évaluation selon 4 dimensions : Diagnostic environnemental, Économique & production, Social & territorial, Logistique & chaîne d'approvisionnement
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                📊
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Scoring automatique ISO
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Calcul précis des scores selon ISO 59020 : scores globaux et par dimension avec indicateurs de performance détaillés
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                🎨
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Visualisations interactives
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Graphiques radar, barres de progression, tableaux de bord personnalisés pour suivre vos progrès en temps réel
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                📝
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Plans d'action ISO 59004
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Recommandations personnalisées basées sur vos résultats avec feuille de route détaillée et priorisation des actions
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                🤖
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Assistant intelligent
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Chatbot IA pour répondre à vos questions sur ISO 59000, l'économie circulaire et vous guider dans votre démarche
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ISO Standards Section */}
      <section className="py-20 bg-gradient-to-br from-circular-blue/10 to-circular-green/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Normes ISO implémentées
            </h2>
            <p className="text-xl text-gray-600">
              Conformité totale avec les standards internationaux
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-circular-blue-dark font-bold text-lg mb-2">ISO 59004:2024</div>
              <p className="text-gray-600 text-sm">Lignes directrices pour la mise en œuvre</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-circular-green-dark font-bold text-lg mb-2">ISO 59010:2024</div>
              <p className="text-gray-600 text-sm">Indicateurs et méthodes de mesure</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-circular-blue-dark font-bold text-lg mb-2">ISO 59020:2024</div>
              <p className="text-gray-600 text-sm">Mesure et évaluation de la circularité</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-circular-green-dark font-bold text-lg mb-2">ISO 59014:2024</div>
              <p className="text-gray-600 text-sm">Principes et vocabulaire</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-circular-green to-circular-blue">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à transformer votre entreprise ?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Rejoignez les PME marocaines engagées dans la transition vers l'économie circulaire
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link
              to="/questionnaire"
              className="group relative px-10 py-5 bg-gradient-to-r from-circular-blue to-circular-blue-dark text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>🚀</span>
                Démarrer l'évaluation
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-circular-blue-dark to-circular-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <Link
              to="/admin/login"
              className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg text-sm transition-all duration-300 mt-4"
            >
              🔐 Accès Administrateur
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}