import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText, getLocalizedArray } from '../utils/dataLoader'
import { Award, Calendar, ExternalLink, Star } from 'lucide-react'

const Achievements: React.FC = () => {
  const { language } = useLanguage()
  const data = loadPortfolioData()
  const achievementsData = data.achievements
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
                {getLocalizedText(achievementsData, 'title', language)}
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>
            <p className="text-xl text-soft-600 leading-relaxed">
              {language === 'ja' 
                ? 'プロフェッショナルな成果と認定の軌跡' 
                : 'A journey of professional achievements and certifications'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Professional Awards */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gradient-cool mb-4">
                {language === 'ja' ? 'プロフェッショナルな賞' : 'Professional Awards'}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>
          </motion.div>

          <div className="space-y-8">
            {achievementsData.professional_awards.map((award, index) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card p-8"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="w-8 h-8 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {getLocalizedText(award, 'title', language)}
                      </h3>
                      <p className="text-lg text-ocean-600 font-semibold mb-2">
                        {getLocalizedText(award, 'organization', language)}
                      </p>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {award.date}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 bg-ocean-100 text-ocean-700 text-sm font-medium rounded-full">
                      {getLocalizedText(award, 'category', language)}
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  {getLocalizedText(award, 'description', language)}
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {language === 'ja' ? '関連プロジェクト' : 'Related Project'}
                    </h4>
                    <p className="text-gray-600">
                      {getLocalizedText(award, 'project_related', language)}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {language === 'ja' ? '影響' : 'Impact'}
                    </h4>
                    <p className="text-gray-600">
                      {getLocalizedText(award, 'impact', language)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                    <span>5.0</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {award.date}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gradient-cool mb-4">
                {language === 'ja' ? '認定・資格' : 'Certifications'}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievementsData.certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {getLocalizedText(cert, 'name', language)}
                    </h3>
                    <p className="text-sm text-ocean-600 font-medium">
                      {getLocalizedText(cert, 'issuer', language)}
                    </p>
                  </div>
                  <Award className="w-6 h-6 text-yellow-500" />
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  {getLocalizedText(cert, 'description', language)}
                </p>

                <div className="space-y-2 text-xs text-gray-500 mb-4">
                  <div className="flex justify-between">
                    <span>{language === 'ja' ? '取得日' : 'Earned'}:</span>
                    <span>{cert.date_earned}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'ja' ? '有効期限' : 'Expires'}:</span>
                    <span>{cert.expiry_date}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {getLocalizedArray(cert, 'skills_covered', language).map((skill: string, skillIndex: number) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <a
                  href={cert.verification_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-ocean-600 hover:text-ocean-700 transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {language === 'ja' ? '検証' : 'Verify'}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source Contributions */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Achievements
