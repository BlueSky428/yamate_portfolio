import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText, getLocalizedArray } from '../utils/dataLoader'
import { Star, Quote, ExternalLink, Calendar, MapPin } from 'lucide-react'

const Testimonials: React.FC = () => {
  const { language } = useLanguage()
  const data = loadPortfolioData()
  const testimonialsData = data.testimonials
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="min-h-screen bg-soft-50">
      {/* Hero Section */}
      <section className="section-padding hero-section">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            ref={ref}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient-cool mb-4">
                {getLocalizedText(testimonialsData, 'title', language)}
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>
            <p className="text-xl text-soft-600 leading-relaxed">
              {language === 'ja' 
                ? 'クライアント、同僚、メンターからの推薦の言葉' 
                : 'Words of recommendation from clients, colleagues, and mentors'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className="section-padding">
        <div className="container-max">
          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonialsData.testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="card p-6 h-full flex flex-col"
              >
                {/* Profile Image & Quote */}
                <div className="flex items-start space-x-4 mb-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 relative"
                  >
                    <img
                      src={testimonial.photo_url}
                      alt={getLocalizedText(testimonial, 'name', language)}
                      className="w-12 h-12 rounded-full object-cover shadow-md"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-ocean-500 rounded-full flex items-center justify-center">
                      <Quote className="w-3 h-3 text-white" />
                    </div>
                  </motion.div>
                  
                  <div className="flex-1">
                    <Quote className="w-6 h-6 text-ocean-200 mb-2" />
                    <p className="text-sm text-gray-700 leading-relaxed italic line-clamp-4">
                      "{getLocalizedText(testimonial, 'testimonial', language)}"
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex items-center space-x-1 mb-4"
                >
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 transition-all duration-300 ${
                        i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </motion.div>

                {/* Author Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="border-t border-gray-200 pt-4 flex-1"
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {getLocalizedText(testimonial, 'name', language)}
                    </h3>
                    <p className="text-ocean-600 font-semibold text-sm">
                      {getLocalizedText(testimonial, 'position', language)}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {getLocalizedText(testimonial, 'company', language)}
                    </p>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{testimonial.date}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{getLocalizedText(testimonial, 'relationship', language)}</span>
                    </div>
                  </div>

                  {/* Key Qualities */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="mb-4"
                  >
                    <h4 className="text-xs font-semibold text-gray-900 mb-2">
                      {language === 'ja' ? '主要な品質' : 'Key Qualities'}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {getLocalizedArray(testimonial, 'key_qualities', language).slice(0, 3).map((quality: string, qualityIndex: number) => (
                        <motion.span
                          key={qualityIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.4, delay: 0.6 + index * 0.1 + qualityIndex * 0.05 }}
                          className="px-2 py-1 bg-gradient-to-r from-ocean-100 to-purple-100 text-ocean-700 text-xs font-medium rounded-full"
                        >
                          {quality}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Project Context */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    className="mb-4"
                  >
                    <h4 className="text-xs font-semibold text-gray-900 mb-1">
                      {language === 'ja' ? '関連プロジェクト' : 'Related Project'}
                    </h4>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {getLocalizedText(testimonial, 'project_context', language)}
                    </p>
                  </motion.div>

                  {/* LinkedIn Link */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="mt-auto"
                  >
                    <a
                      href={testimonial.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs text-ocean-600 hover:text-ocean-700 transition-all duration-300 hover:scale-105"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      {language === 'ja' ? 'LinkedInで確認' : 'View on LinkedIn'}
                    </a>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Testimonials
