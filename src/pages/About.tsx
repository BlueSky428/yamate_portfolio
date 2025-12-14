import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText, getLocalizedArray } from '../utils/dataLoader'
import { 
  Puzzle, 
  Code, 
  Users, 
  GraduationCap,
  Heart
} from 'lucide-react'

const About: React.FC = () => {
  const { language } = useLanguage()
  const data = loadPortfolioData()
  const aboutData = data.about
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const iconMap = {
    'puzzle-piece': Puzzle,
    'code': Code,
    'users': Users,
    'graduation-cap': GraduationCap,
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding ocean-bg">
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
                {getLocalizedText(aboutData, 'title', language)}
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto">
                <div className="aspect-square rounded-full overflow-hidden shadow-2xl">
                  <img
                    src="/avatar.png"
                    alt={getLocalizedText(aboutData.profile, 'name', language)}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-ocean-500 rounded-full animate-float" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-japanese-gold rounded-full animate-float" style={{ animationDelay: '1s' }} />
              </div>
            </motion.div>

            {/* Profile Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-2"
            >
              <div className="text-center lg:text-left">
                <h2 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 mb-3">
                  {getLocalizedText(aboutData.profile, 'name', language)}
                </h2>
                <div className="inline-flex items-center px-4 py-2 bg-ocean-50 rounded-full">
                  <span className="text-lg text-ocean-600 font-heading font-semibold">
                    {getLocalizedText(aboutData.profile, 'title', language)}
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-ocean-50 to-blue-50 rounded-2xl p-8 border border-ocean-100">
                <p className="text-lg text-gray-700 leading-relaxed font-medium">
                  {aboutData.introduction[language === 'en' ? 'english' : 'japanese']}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Professional Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-block">
              <h2 className="text-4xl sm:text-5xl font-bold text-gradient-cool mb-4">
                {language === 'ja' ? 'プロフェッショナルな価値観' : 'Professional Values'}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-8 leading-relaxed">
              {language === 'ja' 
                ? '私の仕事へのアプローチを導く原則' 
                : 'The principles that guide my approach to work'
              }
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutData.professional_values.map((value, index) => {
              const IconComponent = iconMap[value.icon as keyof typeof iconMap] || Code
              
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group bg-white rounded-2xl p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 hover:border-ocean-200"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-ocean-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-10 h-10 text-ocean-600" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">
                    {getLocalizedText(value, 'title', language)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {getLocalizedText(value, 'description', language)}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Personal Highlights */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-block">
              <h2 className="text-4xl sm:text-5xl font-bold py-2 text-gradient-cool mb-4">
                {language === 'ja' ? '個人的なハイライト' : 'Personal Highlights'}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {aboutData.personal_highlights.map((highlight, index) => (
              <motion.div
                key={highlight.category}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group bg-white rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 hover:border-ocean-200"
              >
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-6 flex items-center justify-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-red-100 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                    <Heart className="w-5 h-5 text-pink-600" />
                  </div>
                  {getLocalizedText(highlight, 'category', language)}
                </h3>
                <ul className="space-y-3">
                  {getLocalizedArray(highlight, 'items', language).map((item: string, itemIndex: number) => (
                    <li key={itemIndex} className="text-gray-600 flex items-start group-hover:text-gray-700 transition-colors duration-300">
                      <span className="w-2 h-2 bg-gradient-to-r from-ocean-500 to-blue-500 rounded-full mt-2 mr-3 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
