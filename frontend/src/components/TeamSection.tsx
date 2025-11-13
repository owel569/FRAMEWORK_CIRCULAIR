import { motion } from 'framer-motion';
import { useState } from 'react';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  linkedin?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Dr. Amina Benali',
    role: 'Directrice Générale',
    description: 'Experte en économie circulaire avec 15 ans d\'expérience en développement durable',
    imageUrl: 'https://ui-avatars.com/api/?name=Amina+Benali&background=A3EB9F&color=fff&size=400&bold=true',
    linkedin: '#'
  },
  {
    name: 'Youssef El Amrani',
    role: 'Directeur Technique',
    description: 'Spécialiste ISO 59000 et certification internationale des systèmes de management',
    imageUrl: 'https://ui-avatars.com/api/?name=Youssef+ElAmrani&background=91E0EB&color=fff&size=400&bold=true',
    linkedin: '#'
  },
  {
    name: 'Fatima Zahra Idrissi',
    role: 'Consultante Senior',
    description: 'Accompagnement des PME marocaines dans leur transition circulaire',
    imageUrl: 'https://ui-avatars.com/api/?name=Fatima+Idrissi&background=A3EB9F&color=fff&size=400&bold=true',
    linkedin: '#'
  },
  {
    name: 'Mehdi Tazi',
    role: 'Chef de Projet Digital',
    description: 'Développement de solutions technologiques pour l\'évaluation de circularité',
    imageUrl: 'https://ui-avatars.com/api/?name=Mehdi+Tazi&background=91E0EB&color=fff&size=400&bold=true',
    linkedin: '#'
  }
];

const TeamSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="team" className="py-24 bg-gradient-to-br from-white via-circular-green/5 to-circular-blue/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Notre{' '}
            <span className="bg-gradient-to-r from-circular-green to-circular-blue bg-clip-text text-transparent">
              Équipe d'Experts
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des professionnels passionnés qui accompagnent les entreprises marocaines vers une économie circulaire durable
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative overflow-hidden aspect-square">
                  <motion.img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredIndex === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-circular-blue via-circular-blue/60 to-transparent"
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: hoveredIndex === index ? 0.7 : 0.3 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {member.linkedin && (
                    <motion.a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5 text-circular-blue" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </motion.a>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-circular-blue font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-circular-green to-circular-blue"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-circular-green/10 to-circular-blue/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Rejoignez notre mission
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl">
              Nous recherchons constamment des talents passionnés par l'économie circulaire et le développement durable
            </p>
            <motion.a
              href="#contact"
              className="inline-block bg-gradient-to-r from-circular-green to-circular-blue text-white px-8 py-3 rounded-full font-semibold shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}
              whileTap={{ scale: 0.98 }}
            >
              Nous contacter
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
