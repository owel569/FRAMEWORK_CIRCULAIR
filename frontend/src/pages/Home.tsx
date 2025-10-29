import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src="/logo-eigsi.png"
                alt="EIGSI Circular Lab"
                className="h-12 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">EIGSI Circular Lab</h1>
                <p className="text-xs text-gray-500">Plateforme ISO 59000</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-gray-700 hover:text-circular-blue font-medium transition-colors">À propos</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-circular-blue font-medium transition-colors">Comment ça marche</a>
              <a href="#features" className="text-gray-700 hover:text-circular-blue font-medium transition-colors">Fonctionnalités</a>
              <a href="#faq" className="text-gray-700 hover:text-circular-blue font-medium transition-colors">FAQ</a>
              <button
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-circular-blue to-circular-green text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              >
                Commencer l'évaluation
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-circular-blue rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-circular-green rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-circular-blue/20">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-circular-blue opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-circular-blue"></span>
                </span>
                <span className="text-sm font-semibold text-circular-blue-dark">Certifié ISO 59000 • Maroc</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Transformez votre entreprise vers l'
                <span className="bg-gradient-to-r from-circular-blue to-circular-green bg-clip-text text-transparent">
                  économie circulaire
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Première plateforme marocaine d'évaluation et d'accompagnement ISO 59000. 
                Mesurez, analysez et améliorez votre performance circulaire en moins de 30 minutes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={() => navigate('/auth')}
                  className="group relative px-8 py-4 bg-gradient-to-r from-circular-blue to-circular-blue-dark text-white text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>🚀</span>
                    Évaluation gratuite
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-circular-blue-dark to-circular-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                <a
                  href="#about"
                  className="group px-8 py-4 text-lg font-semibold bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-circular-blue hover:text-circular-blue transition-all duration-300 shadow-md hover:shadow-xl text-center"
                >
                  En savoir plus
                </a>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>100% gratuit</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Résultats instantanés</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Plan d'action personnalisé</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                    <div className="text-4xl font-bold text-circular-blue mb-2">4</div>
                    <div className="text-sm text-gray-600">Dimensions d'analyse</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                    <div className="text-4xl font-bold text-circular-green mb-2">20+</div>
                    <div className="text-sm text-gray-600">Secteurs couverts</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                    <div className="text-4xl font-bold text-purple-600 mb-2">360°</div>
                    <div className="text-sm text-gray-600">Évaluation complète</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                    <div className="text-4xl font-bold text-orange-600 mb-2">ISO</div>
                    <div className="text-sm text-gray-600">59000 conforme</div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">A</div>
                      <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">B</div>
                      <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">C</div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-900">150+ entreprises</span> déjà évaluées
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-circular-green rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-circular-blue rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-gray-500 mb-8 font-medium">Développé en partenariat avec</p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            <div className="text-gray-400 font-bold text-xl">EIGSI Casablanca</div>
            <div className="text-gray-400 font-bold text-xl">ISO 59000 Standards</div>
            <div className="text-gray-400 font-bold text-xl">Ministère de l'Industrie</div>
            <div className="text-gray-400 font-bold text-xl">CGEM</div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              À propos de la plateforme
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              EIGSI Circular Lab est la première plateforme marocaine dédiée à l'accompagnement 
              des PME dans leur transition vers l'économie circulaire selon les normes ISO 59000.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
              <div className="w-14 h-14 bg-circular-blue rounded-xl flex items-center justify-center mb-6 text-white text-2xl">
                🎯
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Notre Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                Démocratiser l'accès à l'économie circulaire pour toutes les entreprises marocaines, 
                quelle que soit leur taille, en fournissant des outils d'évaluation conformes aux standards internationaux.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl">
              <div className="w-14 h-14 bg-circular-green rounded-xl flex items-center justify-center mb-6 text-white text-2xl">
                💡
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Notre Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                Faire du Maroc un leader régional de l'économie circulaire en accompagnant 10 000 entreprises 
                d'ici 2030 dans leur transformation durable et responsable.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl">
              <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center mb-6 text-white text-2xl">
                🌍
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Notre Impact</h3>
              <p className="text-gray-700 leading-relaxed">
                Contribuer à la réduction de 30% de l'empreinte environnementale des entreprises évaluées 
                et créer un écosystème circulaire marocain performant et résilient.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600">
              Un processus simple en 4 étapes pour évaluer votre performance circulaire
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="relative">
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-circular-blue">
                <div className="w-12 h-12 bg-circular-blue rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Inscription</h3>
                <p className="text-gray-600">
                  Créez votre compte en 2 minutes. Renseignez les informations de base de votre entreprise.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-circular-blue to-circular-green"></div>
            </div>

            <div className="relative">
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-circular-green">
                <div className="w-12 h-12 bg-circular-green rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Questionnaire</h3>
                <p className="text-gray-600">
                  Répondez à un questionnaire adapté à votre secteur d'activité (20-30 minutes).
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-circular-green to-purple-600"></div>
            </div>

            <div className="relative">
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-purple-600">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Analyse</h3>
                <p className="text-gray-600">
                  Recevez instantanément votre score de circularité sur 4 dimensions clés.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-600 to-orange-500"></div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-orange-500">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Action</h3>
              <p className="text-gray-600">
                Téléchargez votre plan d'action personnalisé et démarrez votre transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Fonctionnalités de la plateforme
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils complets pour mesurer, analyser et améliorer votre performance circulaire
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all border border-gray-100 hover:border-circular-blue">
              <div className="w-16 h-16 bg-gradient-to-br from-circular-blue to-circular-blue-dark rounded-2xl flex items-center justify-center mb-6 text-3xl">
                📋
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Questionnaires sectoriels
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                20 secteurs d'activité avec questionnaires adaptés : Agriculture, Industrie, Construction, Commerce, IT, Santé, Finance, etc.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Questions personnalisées par secteur
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Interface intuitive et guidée
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all border border-gray-100 hover:border-circular-green">
              <div className="w-16 h-16 bg-gradient-to-br from-circular-green to-circular-green-dark rounded-2xl flex items-center justify-center mb-6 text-3xl">
                🎯
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                4 Diagnostics complets
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Évaluation 360° selon 4 dimensions ISO 59000 : Environnement, Économie, Social, Logistique
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Analyse multi-dimensionnelle
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Conforme ISO 59010
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all border border-gray-100 hover:border-purple-600">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                📊
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Scoring ISO 59020
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Calcul automatique et précis de votre score de circularité selon les standards internationaux
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Algorithme certifié ISO 59020
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Résultats instantanés
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all border border-gray-100 hover:border-yellow-500">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                🎨
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Dashboard interactif
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Visualisez vos performances avec des graphiques radar, barres de progression et KPIs
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Graphiques interactifs
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Exportable en PDF
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all border border-gray-100 hover:border-red-500">
              <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                📝
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Plan d'action ISO 59004
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Recommandations personnalisées et feuille de route détaillée pour votre transformation
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Actions priorisées
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  ROI estimé
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all border border-gray-100 hover:border-green-600">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                🤖
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Assistant IA
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Chatbot intelligent pour répondre à vos questions sur l'économie circulaire et ISO 59000
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Disponible 24/7
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Base de connaissances complète
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ISO Standards */}
      <section className="py-20 bg-gradient-to-br from-circular-blue/10 to-circular-green/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Conformité aux normes ISO 59000
            </h2>
            <p className="text-xl text-gray-600">
              Notre plateforme implémente intégralement les standards internationaux
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-circular-blue-dark font-bold text-lg mb-2">ISO 59004:2024</div>
              <p className="text-gray-600 text-sm mb-3">Lignes directrices pour la mise en œuvre des principes de l'économie circulaire</p>
              <div className="inline-flex items-center gap-1 text-xs text-green-600 font-semibold">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Implémenté
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-circular-green-dark font-bold text-lg mb-2">ISO 59010:2024</div>
              <p className="text-gray-600 text-sm mb-3">Indicateurs de mesure et méthodes d'évaluation de la circularité</p>
              <div className="inline-flex items-center gap-1 text-xs text-green-600 font-semibold">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Implémenté
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-circular-blue-dark font-bold text-lg mb-2">ISO 59020:2024</div>
              <p className="text-gray-600 text-sm mb-3">Mesure et évaluation de la circularité et de ses impacts</p>
              <div className="inline-flex items-center gap-1 text-xs text-green-600 font-semibold">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Implémenté
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-circular-green-dark font-bold text-lg mb-2">ISO 59014:2024</div>
              <p className="text-gray-600 text-sm mb-3">Principes fondamentaux et vocabulaire de l'économie circulaire</p>
              <div className="inline-flex items-center gap-1 text-xs text-green-600 font-semibold">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Implémenté
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Questions fréquentes
            </h2>
            <p className="text-xl text-gray-600">
              Tout ce que vous devez savoir sur notre plateforme
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Combien de temps prend l'évaluation ?",
                a: "L'évaluation complète prend entre 20 et 30 minutes selon votre secteur d'activité. Vous pouvez sauvegarder votre progression et revenir plus tard."
              },
              {
                q: "Est-ce que l'évaluation est vraiment gratuite ?",
                a: "Oui, l'évaluation ISO 59000 est 100% gratuite pour toutes les entreprises. Nous proposons également des services d'accompagnement premium optionnels."
              },
              {
                q: "Mes données sont-elles sécurisées ?",
                a: "Absolument. Vos données sont cryptées et stockées de manière sécurisée. Nous ne partageons jamais vos informations sans votre consentement explicite."
              },
              {
                q: "Puis-je refaire l'évaluation plusieurs fois ?",
                a: "Oui, nous encourageons les réévaluations régulières (tous les 6-12 mois) pour suivre votre progression vers l'économie circulaire."
              },
              {
                q: "Quels secteurs d'activité sont couverts ?",
                a: "Nous couvrons 20+ secteurs : Agriculture, Industrie, BTP, Commerce, Transport, Énergie, Santé, IT, Finance, Administration publique, Éducation, Tourisme, et bien d'autres."
              },
              {
                q: "Comment utiliser mon plan d'action ?",
                a: "Le plan d'action contient des recommandations priorisées avec des délais suggérés et des impacts estimés. Vous pouvez le télécharger en PDF et le partager avec votre équipe."
              }
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
                >
                  <span className="font-semibold text-gray-900">{faq.q}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${activeFaq === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeFaq === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-circular-green via-circular-blue to-purple-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à transformer votre entreprise ?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Rejoignez les centaines d'entreprises marocaines engagées dans la transition vers l'économie circulaire
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button
              onClick={() => navigate('/auth')}
              className="group relative px-10 py-5 bg-white text-circular-blue text-lg font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>🚀</span>
                Démarrer gratuitement
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            <a
              href="#about"
              className="px-10 py-5 text-lg font-semibold bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-2xl hover:bg-white/20 transition-all duration-300 shadow-lg"
            >
              En savoir plus
            </a>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Aucune carte de crédit requise
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Résultats en 30 minutes
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Support expert inclus
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="/logo-eigsi.png"
                  alt="EIGSI"
                  className="h-8 w-auto brightness-0 invert"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
                <span className="font-bold text-lg">EIGSI Circular Lab</span>
              </div>
              <p className="text-gray-400 text-sm">
                Plateforme d'évaluation ISO 59000 pour l'économie circulaire au Maroc
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#about" className="hover:text-white transition-colors">À propos</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">Comment ça marche</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Fonctionnalités</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Ressources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Guide ISO 59000</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Études de cas</a></li>
                <li><Link to="/admin/login" className="hover:text-white transition-colors">Espace Admin</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>EIGSI Casablanca</li>
                <li>Technopark, Route de Nouaceur</li>
                <li>contact@eigsi-circular-lab.ma</li>
                <li>+212 5XX-XXX-XXX</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© 2025 EIGSI Circular Lab. Tous droits réservés.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
              <a href="#" className="hover:text-white transition-colors">CGU</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}