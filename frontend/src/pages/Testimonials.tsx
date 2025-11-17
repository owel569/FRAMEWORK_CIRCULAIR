
import { useState } from 'react'
import { Link } from 'react-router-dom'

interface Testimonial {
  id: number
  name: string
  company: string
  role: string
  sector: string
  rating: number
  text: string
  image: string
  date: string
  score: number
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ahmed Tazi",
    company: "EcoTech Maroc",
    role: "Directeur Général",
    sector: "Technologie",
    rating: 5,
    text: "Une plateforme exceptionnelle qui nous a permis d'identifier précisément nos axes d'amélioration. Le plan d'action personnalisé est très concret et applicable.",
    image: "👨‍💼",
    date: "Octobre 2025",
    score: 87
  },
  {
    id: 2,
    name: "Samira El Fassi",
    company: "Green Industries SA",
    role: "Responsable RSE",
    sector: "Industrie",
    rating: 5,
    text: "L'évaluation ISO 59000 nous a ouvert les yeux sur notre potentiel de circularité. L'accompagnement de l'équipe est remarquable.",
    image: "👩‍💼",
    date: "Septembre 2025",
    score: 92
  },
  {
    id: 3,
    name: "Karim Benkirane",
    company: "AgriCirculaire",
    role: "Fondateur",
    sector: "Agriculture",
    rating: 5,
    text: "Grâce à cette plateforme, nous avons réduit nos déchets de 45% en 6 mois. Les recommandations sont pertinentes et adaptées à notre secteur.",
    image: "👨‍🌾",
    date: "Août 2025",
    score: 85
  },
  {
    id: 4,
    name: "Nadia Alaoui",
    company: "Textile Durable",
    role: "DG Adjointe",
    sector: "Textile",
    rating: 4,
    text: "Un outil précieux pour structurer notre démarche d'économie circulaire. Le dashboard est très visuel et facile à partager avec nos équipes.",
    image: "👩‍💼",
    date: "Juillet 2025",
    score: 78
  },
  {
    id: 5,
    name: "Youssef Ziani",
    company: "BuildCircular",
    role: "Directeur Opérations",
    sector: "Construction",
    rating: 5,
    text: "La méthodologie ISO 59000 bien implémentée. Nous avons pu valoriser 60% de nos déchets de chantier grâce aux recommandations.",
    image: "👨‍🔧",
    date: "Juin 2025",
    score: 89
  },
  {
    id: 6,
    name: "Laila Chraibi",
    company: "EcoLogistics",
    role: "CEO",
    sector: "Logistique",
    rating: 5,
    text: "Interface intuitive et résultats immédiats. Le chatbot IA est très utile pour répondre à nos questions techniques.",
    image: "👩‍💼",
    date: "Mai 2025",
    score: 94
  }
]

export default function Testimonials() {
  const [filter, setFilter] = useState<string>('all')
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)

  const sectors = ['all', ...Array.from(new Set(testimonials.map(t => t.sector)))]
  
  const filteredTestimonials = filter === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.sector === filter)

  const averageRating = (testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1)
  const averageScore = Math.round(testimonials.reduce((acc, t) => acc + t.score, 0) / testimonials.length)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/logo-eigsi.png"
                alt="EIGSI Circular Lab"
                className="h-12 w-auto transform group-hover:scale-110 transition-transform duration-300"
                onError={(e) => e.currentTarget.style.display = 'none'}
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">EIGSI Circular Lab</h1>
                <p className="text-xs text-gray-500">Témoignages Clients</p>
              </div>
            </Link>
            <Link to="/" className="text-circular-blue hover:text-circular-blue-dark font-semibold transition-colors">
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-12 animate-fadeInDown">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Ils Nous Font
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Confiance</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Découvrez les témoignages de nos clients et leur transformation vers l'économie circulaire
            </p>

            {/* Stats rapides */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600">{averageRating}/5</div>
                <div className="text-sm text-gray-600 flex items-center gap-1 justify-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <div className="text-xs text-gray-500 mt-1">Note moyenne</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-600">{testimonials.length}+</div>
                <div className="text-sm text-gray-600 mt-1">Témoignages</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-circular-green">{averageScore}%</div>
                <div className="text-sm text-gray-600 mt-1">Score moyen</div>
              </div>
            </div>
          </div>

          {/* Filtres */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {sectors.map((sector) => (
              <button
                key={sector}
                onClick={() => setFilter(sector)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  filter === sector
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
              >
                {sector === 'all' ? '🌟 Tous' : sector}
              </button>
            ))}
          </div>

          {/* Grille de témoignages */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 cursor-pointer animate-fadeInUp group"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedTestimonial(testimonial)}
              >
                <div className="p-6">
                  {/* Rating */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xl">⭐</span>
                      ))}
                    </div>
                    <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">
                      {testimonial.score}% score
                    </span>
                  </div>

                  {/* Texte */}
                  <p className="text-gray-700 mb-6 line-clamp-4 italic leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  {/* Auteur */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="text-4xl transform group-hover:scale-110 transition-transform">
                      {testimonial.image}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                      <div className="text-xs text-circular-blue font-semibold">{testimonial.company}</div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-gray-500">{testimonial.date}</span>
                    <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">
                      {testimonial.sector}
                    </span>
                  </div>
                </div>

                <div className="h-1 bg-gradient-to-r from-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Rejoignez nos clients satisfaits
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Commencez votre transformation vers l'économie circulaire dès aujourd'hui
          </p>
          <Link
            to="/auth"
            className="inline-block bg-white text-purple-600 px-10 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Démarrer l'évaluation gratuite 🚀
          </Link>
        </div>
      </section>

      {/* Modal détails témoignage */}
      {selectedTestimonial && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fadeIn"
          onClick={() => setSelectedTestimonial(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 transform animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-1">
                {[...Array(selectedTestimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-2xl">⭐</span>
                ))}
              </div>
              <button
                onClick={() => setSelectedTestimonial(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-gray-700 text-lg mb-8 italic leading-relaxed">
              "{selectedTestimonial.text}"
            </p>

            <div className="flex items-center gap-4 mb-6 pb-6 border-b">
              <div className="text-6xl">{selectedTestimonial.image}</div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{selectedTestimonial.name}</div>
                <div className="text-gray-600">{selectedTestimonial.role}</div>
                <div className="text-circular-blue font-semibold">{selectedTestimonial.company}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="text-3xl font-bold text-purple-600">{selectedTestimonial.score}%</div>
                <div className="text-xs text-gray-600 mt-1">Score ISO</div>
              </div>
              <div className="text-center p-4 bg-pink-50 rounded-xl">
                <div className="text-3xl font-bold text-pink-600">{selectedTestimonial.sector}</div>
                <div className="text-xs text-gray-600 mt-1">Secteur</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-sm font-bold text-gray-600">{selectedTestimonial.date}</div>
                <div className="text-xs text-gray-600 mt-1">Date</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
