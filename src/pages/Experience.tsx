import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText, getLocalizedArray } from '../utils/dataLoader'
import { Calendar, MapPin, Award, TrendingUp } from 'lucide-react'

const Experience: React.FC = () => {
  const { language } = useLanguage()
  const data = loadPortfolioData()
  const experienceData = data.experience
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
                {getLocalizedText(experienceData, 'title', language)}
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>
            <p className="text-xl text-soft-600 leading-relaxed">
              {language === 'ja' 
                ? '5年以上のプロフェッショナルな経験の軌跡' 
                : 'A journey of 5+ years of professional experience'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Career Highlights */}
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
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(experienceData.career_highlights).map(([key, value], index) => {
                if (key.startsWith('japanese_')) return null
                
                const japaneseKey = `japanese_${key}`
                const japaneseValue = experienceData.career_highlights[japaneseKey as keyof typeof experienceData.career_highlights]
                
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl sm:text-4xl font-bold text-ocean-600 mb-2">
                      {value}
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === 'ja' ? japaneseValue : key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Timeline */}
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
                {language === 'ja' ? '経験のタイムライン' : 'Experience Timeline'}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-ocean-200 transform md:-translate-x-0.5" />
            
            <div className="space-y-12">
              {experienceData.timeline.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-ocean-600 rounded-full transform -translate-x-2 md:-translate-x-2 z-10" />
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 w-full md:w-1/2 ${
                    index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                  }`}>
                    <div className="card p-6 hover:shadow-xl transition-all duration-300">
                      {/* Period */}
                      <div className="flex items-center text-sm text-ocean-600 font-semibold mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        {getLocalizedText(experience, 'period', language)}
                      </div>

                      {/* Company & Position */}
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {getLocalizedText(experience, 'position', language)}
                      </h3>
                      <h4 className="text-lg font-semibold text-ocean-600 mb-2">
                        {getLocalizedText(experience, 'company', language)}
                      </h4>

                      {/* Location */}
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <MapPin className="w-4 h-4 mr-2" />
                        {getLocalizedText(experience, 'location', language)}
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {getLocalizedText(experience, 'description', language)}
                      </p>

                      {/* Key Achievements */}
                      <div className="mb-4">
                        <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <Award className="w-4 h-4 mr-2 text-ocean-600" />
                          {language === 'ja' ? '主要な成果' : 'Key Achievements'}
                        </h5>
                        <ul className="space-y-1">
                          {getLocalizedArray(experience, 'key_achievements', language).map((achievement: string, achievementIndex: number) => (
                            <li key={achievementIndex} className="text-sm text-gray-600 flex items-start">
                              <span className="w-1.5 h-1.5 bg-ocean-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <TrendingUp className="w-4 h-4 mr-2 text-ocean-600" />
                          {language === 'ja' ? '使用技術' : 'Technologies'}
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-ocean-100 text-ocean-700 text-xs font-medium rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specializations */}
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
                {language === 'ja' ? '専門分野' : 'Specializations'}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experienceData.specializations.map((specialization, index) => (
              <motion.div
                key={specialization.area}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card p-6 text-center"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {getLocalizedText(specialization, 'area', language)}
                </h3>
                <div className="text-sm text-ocean-600 font-medium">
                  {getLocalizedText(specialization, 'expertise_level', language)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Experience
