import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText, getLocalizedArray } from '../utils/dataLoader'
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Trophy } from 'lucide-react'

const Education: React.FC = () => {
  const { language } = useLanguage()
  const data = loadPortfolioData()
  const aboutData = data.about
  const educationData = aboutData.education || []
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
              <div className="flex items-center justify-center mb-4">
                <GraduationCap className="w-12 h-12 text-ocean-600 mr-4" />
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient-cool">
                  {language === 'ja' ? '学歴' : 'Education'}
                </h1>
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>
            <p className="text-xl text-soft-600 leading-relaxed mt-6">
              {language === 'ja' 
                ? '学術的基盤と専門知識の形成' 
                : 'Academic foundation and professional knowledge formation'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Education Timeline */}
      <section className="section-padding">
        <div className="container-max">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-ocean-200 transform md:-translate-x-0.5" />
            
            <div className="space-y-12">
              {educationData.map((education: any, index: number) => (
                <motion.div
                  key={education.id}
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
                      {/* Degree & Period */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-sm text-ocean-600 font-semibold">
                          <Calendar className="w-4 h-4 mr-2" />
                          {getLocalizedText(education, 'period', language)}
                        </div>
                        <div className="px-3 py-1 bg-ocean-100 text-ocean-700 text-xs font-medium rounded-full">
                          {getLocalizedText(education, 'gpa', language)}
                        </div>
                      </div>

                      {/* Degree & Field */}
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {getLocalizedText(education, 'degree', language)}
                      </h3>
                      <h4 className="text-lg font-semibold text-ocean-600 mb-2">
                        {getLocalizedText(education, 'field', language)}
                      </h4>

                      {/* University */}
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="font-semibold mr-2">
                          {getLocalizedText(education, 'university', language)}
                        </span>
                        <span className="text-gray-500">
                          {getLocalizedText(education, 'location', language)}
                        </span>
                      </div>

                      {/* Thesis */}
                      {education.thesis_title && (
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg border-l-4 border-ocean-500">
                          <div className="flex items-center mb-1">
                            <BookOpen className="w-4 h-4 mr-2 text-ocean-600" />
                            <span className="text-xs font-semibold text-gray-600">
                              {language === 'ja' ? '卒業論文' : 'Thesis'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">
                            {getLocalizedText(education, 'thesis_title', language)}
                          </p>
                        </div>
                      )}

                      {/* Key Courses */}
                      {education.key_courses && (
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                            <BookOpen className="w-4 h-4 mr-2 text-ocean-600" />
                            {language === 'ja' ? '主要科目' : 'Key Courses'}
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {getLocalizedArray(education, 'key_courses', language).map((course: string, courseIndex: number) => (
                              <div
                                key={courseIndex}
                                className="text-sm text-gray-600 flex items-start"
                              >
                                <span className="w-1.5 h-1.5 bg-ocean-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                                <span className="text-xs">{course}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Achievements */}
                      {education.achievements && (
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                            <Trophy className="w-4 h-4 mr-2 text-ocean-600" />
                            {language === 'ja' ? '主な成果' : 'Achievements'}
                          </h5>
                          <ul className="space-y-1">
                            {getLocalizedArray(education, 'achievements', language).map((achievement: string, achievementIndex: number) => (
                              <li key={achievementIndex} className="text-sm text-gray-600 flex items-start">
                                <Award className="w-3 h-3 text-ocean-500 mt-1.5 mr-2 flex-shrink-0" />
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Summary */}
      {educationData.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gradient-cool mb-4">
                {language === 'ja' ? '教育のハイライト' : 'Education Highlights'}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="card p-6 text-center"
              >
                <GraduationCap className="w-12 h-12 text-ocean-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-ocean-600 mb-2">
                  {educationData.length}
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'ja' ? '学位取得' : 'Degrees Earned'}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="card p-6 text-center"
              >
                <BookOpen className="w-12 h-12 text-ocean-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-ocean-600 mb-2">
                  {educationData.reduce((total: number, edu: any) => 
                    total + (edu.key_courses?.length || 0), 0
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'ja' ? '修了科目' : 'Courses Completed'}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="card p-6 text-center"
              >
                <Trophy className="w-12 h-12 text-ocean-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-ocean-600 mb-2">
                  {educationData.reduce((total: number, edu: any) => 
                    total + (edu.achievements?.length || 0), 0
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'ja' ? '主な成果' : 'Key Achievements'}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Education

