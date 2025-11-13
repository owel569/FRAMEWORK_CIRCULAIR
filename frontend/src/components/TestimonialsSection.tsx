import { motion } from 'framer-motion';
import { useState } from 'react';

interface Testimonial {
  company: string;
  industry: string;
  author: string;
  role: string;
  content: string;
  rating: number;
  logo?: string;
  improvement: string;
}

const testimonials: Testimonial[] = [
  {
    company: 'Maroc Textile Industries',
    industry: 'Textile',
    author: 'Hassan Berrada',
    role: 'Directeur RSE',
    content: 'Grâce à EIGSI Circular Lab, nous avons réduit nos déchets de production de 45% en 6 mois. L\'évaluation ISO 59000 nous a permis d\'identifier des opportunités concrètes d\'amélioration.',
    rating: 5,
    logo: 'https://ui-avatars.com/api/?name=MTI&background=A3EB9F&color=fff&size=200&bold=true&rounded=true',
    improvement: '+45% de réduction des déchets'
  },
  {
    company: 'Atlas Food Group',
    industry: 'Agroalimentaire',
    author: 'Salma Alaoui',
    role: 'Directrice Qualité',
    content: 'La plateforme est intuitive et les recommandations sont très pertinentes. Nous avons obtenu notre certification ISO 59004 en un temps record. Un vrai partenaire pour notre transition circulaire !',
    rating: 5,
    logo: 'https://ui-avatars.com/api/?name=AFG&background=91E0EB&color=fff&size=200&bold=true&rounded=true',
    improvement: 'Certification ISO 59004 obtenue'
  },
  {
    company: 'Moroccan Electronics Co.',
    industry: 'Électronique',
    author: 'Karim Tazi',
    role: 'CEO',
    content: 'L\'assistant IA est remarquable ! Il nous a guidé dans la mise en place d\'un système de récupération des composants électroniques. Notre taux de recyclage a doublé.',
    rating: 5,
    logo: 'https://ui-avatars.com/api/?name=MEC&background=A3EB9F&color=fff&size=200&bold=true&rounded=true',
    improvement: '+100% de taux de recyclage'
  },
  {
    company: 'Cosmétiques du Maroc',
    industry: 'Cosmétique',
    author: 'Leila Benjelloun',
    role: 'Directrice Innovation',
    content: 'Les outils d\'écoconception nous ont aidé à repenser nos emballages. Nous avons économisé 30% sur nos coûts de packaging tout en réduisant notre impact environnemental.',
    rating: 5,
    logo: 'https://ui-avatars.com/api/?name=CDM&background=91E0EB&color=fff&size=200&bold=true&rounded=true',
    improvement: '30% d\'économies packaging'
  },
  {
    company: 'Bâtir Durable',
    industry: 'Construction',
    author: 'Mohamed Taoufik',
    role: 'Directeur Technique',
    content: 'Une solution complète pour évaluer et améliorer nos pratiques circulaires. Le tableau de bord nous permet de suivre nos progrès en temps réel.',
    rating: 5,
    logo: 'https://ui-avatars.com/api/?name=BD&background=A3EB9F&color=fff&size=200&bold=true&rounded=true',
    improvement: 'Suivi temps réel de la circularité'
  },
  {
    company: 'Pharma Plus Maroc',
    industry: 'Pharmaceutique',
    author: 'Nadia Chraibi',
    role: 'Responsable HSE',
    content: 'L\'accompagnement personnalisé et les plans d\'action sectoriels nous ont permis de structurer notre démarche. Très satisfaits de l\'expertise de l\'équipe.',
    rating: 5,
    logo: 'https://ui-avatars.com/api/?name=PPM&background=91E0EB&color=fff&size=200&bold=true&rounded=true',
    improvement: 'Structuration complète de la démarche'
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-circular-green rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-circular-blue rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ils nous font{' '}
            <span className="bg-gradient-to-r from-circular-green to-circular-blue bg-clip-text text-transparent">
              confiance
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez comment des entreprises marocaines transforment leur modèle économique grâce à notre plateforme
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-center"
            >
              <motion.img
                src={testimonial.logo}
                alt={testimonial.company}
                className="w-20 h-20 rounded-lg grayscale hover:grayscale-0 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              />
            </motion.div>
          ))}
        </div>

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0">
                <img
                  src={testimonials[currentIndex].logo}
                  alt={testimonials[currentIndex].company}
                  className="w-24 h-24 rounded-2xl"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {testimonials[currentIndex].company}
                    </h3>
                    <p className="text-circular-blue font-semibold">
                      {testimonials[currentIndex].industry}
                    </p>
                  </div>
                  {renderStars(testimonials[currentIndex].rating)}
                </div>

                <div className="mb-6">
                  <div className="inline-block bg-gradient-to-r from-circular-green/10 to-circular-blue/10 px-4 py-2 rounded-full">
                    <span className="text-sm font-semibold text-circular-blue">
                      📊 {testimonials[currentIndex].improvement}
                    </span>
                  </div>
                </div>

                <blockquote className="text-lg text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonials[currentIndex].content}"
                </blockquote>

                <div className="flex items-center">
                  <div>
                    <p className="font-bold text-gray-800">
                      {testimonials[currentIndex].author}
                    </p>
                    <p className="text-sm text-gray-600">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <motion.button
              onClick={prevTestimonial}
              className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6 text-circular-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-gradient-to-r from-circular-green to-circular-blue'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6 text-circular-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-circular-green to-circular-blue rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Prêt à transformer votre entreprise ?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Rejoignez plus de 150 entreprises marocaines dans leur transition vers l'économie circulaire
            </p>
            <motion.a
              href="/auth"
              className="inline-block bg-white text-circular-blue px-8 py-4 rounded-full font-bold text-lg shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.98 }}
            >
              Commencer l'évaluation gratuite
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
