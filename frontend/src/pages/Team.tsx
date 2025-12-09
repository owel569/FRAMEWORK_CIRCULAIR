
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../config'

interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  linkedin?: string
  email: string
  specialties: string[]
}

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTeam()
  }, [])

  const loadTeam = async () => {
    try {
      const response = await axios.get(`${API_URL}/team`)
      setTeamMembers(response.data)
    } catch (error) {
      console.error('Erreur chargement équipe:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-700">Chargement de l'équipe...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
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
                <p className="text-xs text-gray-500">Notre Équipe</p>
              </div>
            </Link>
            <Link to="/" className="text-circular-blue hover:text-circular-blue-dark font-semibold transition-colors">
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-circular-blue rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-circular-green rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16 animate-fadeInDown">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Rencontrez Notre
              <span className="bg-gradient-to-r from-circular-blue to-circular-green bg-clip-text text-transparent"> Équipe</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des experts passionnés dédiés à transformer l'économie marocaine vers un modèle plus circulaire et durable
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredId(member.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedMember(member)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-circular-blue/10 to-circular-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative p-8">
                  <div className="flex justify-center mb-4">
                    <div className={`relative w-32 h-32 rounded-full overflow-hidden border-4 border-circular-blue/20 transform transition-transform duration-500 ${hoveredId === member.id ? 'scale-110 border-circular-blue' : ''}`}>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/150/0EA5E9/ffffff?text=' + member.name.split(' ').map(n => n[0]).join('');
                        }}
                      />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center group-hover:text-circular-blue transition-colors">
                    {member.name}
                  </h3>
                  
                  <p className="text-circular-blue-dark font-semibold text-center mb-4">
                    {member.role}
                  </p>

                  <p className="text-gray-600 text-sm mb-6 line-clamp-3 text-center">
                    {member.bio}
                  </p>

                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {member.specialties.map((spec, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gradient-to-r from-circular-blue/20 to-circular-green/20 text-circular-blue-dark text-xs font-semibold rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-center gap-4">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        className="text-blue-600 hover:text-blue-800 transform hover:scale-110 transition-all"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    )}
                    <a
                      href={`mailto:${member.email}`}
                      className="text-circular-green-dark hover:text-circular-green transform hover:scale-110 transition-all"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  </div>

                  <button
                    onClick={() => setSelectedMember(member)}
                    className="mt-6 w-full bg-gradient-to-r from-circular-blue to-circular-green text-white py-2 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                  >
                    Voir le profil complet
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { icon: "🎓", value: "15+", label: "Années d'expérience" },
              { icon: "🏆", value: "100+", label: "Entreprises accompagnées" },
              { icon: "🌍", value: "20+", label: "Secteurs couverts" },
              { icon: "⭐", value: "4.9/5", label: "Satisfaction client" }
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300 animate-fadeInUp"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="text-5xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-circular-blue mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal détails membre */}
      {selectedMember && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fadeIn"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 transform animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-circular-blue/20">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{selectedMember.name}</h2>
                  <p className="text-circular-blue-dark font-semibold">{selectedMember.role}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">À propos</h3>
              <p className="text-gray-600 leading-relaxed">{selectedMember.bio}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Domaines d'expertise</h3>
              <div className="flex flex-wrap gap-2">
                {selectedMember.specialties.map((spec, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-gradient-to-r from-circular-blue to-circular-green text-white text-sm font-semibold rounded-full"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              {selectedMember.linkedin && (
                <a
                  href={selectedMember.linkedin}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-center transition-colors"
                >
                  LinkedIn
                </a>
              )}
              <a
                href={`mailto:${selectedMember.email}`}
                className="flex-1 bg-circular-green hover:bg-circular-green-dark text-white py-3 rounded-lg font-semibold text-center transition-colors"
              >
                Contacter
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
