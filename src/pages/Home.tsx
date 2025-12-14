import React, { useState, useEffect } from 'react'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText } from '../utils/dataLoader'
import { OceanBackground } from '../types/portfolio'

const Home: React.FC = () => {
  const { language } = useLanguage()
  const [currentBackground, setCurrentBackground] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const data = loadPortfolioData()
  const homeData = data.home

  const backgrounds: OceanBackground[] = homeData.ocean_backgrounds

  useEffect(() => {
    setIsLoaded(true)
    
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgrounds.length)
    }, homeData.rotation_settings.interval_seconds * 1000)

    return () => clearInterval(interval)
  }, [backgrounds.length, homeData.rotation_settings.interval_seconds])

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ocean Backgrounds */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBackground}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: homeData.rotation_settings.transition_duration }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${backgrounds[currentBackground].image_url})`,
            }}
          />
        </AnimatePresence>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="container-max text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            {/* Main Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white mb-6">
              <span className="block text-gradient-cool py-3">
                {getLocalizedText(homeData.languages[language === 'ja' ? 'japanese' : 'english'], 'title', language)}
              </span>
            </h1>

            {/* Subtitle */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-white/90 mb-8 font-heading font-medium">
              {getLocalizedText(homeData.languages[language === 'ja' ? 'japanese' : 'english'], 'subtitle', language)}
            </h2>

            {/* Description */}
            <p className="text-lg sm:text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              {getLocalizedText(homeData.languages[language === 'ja' ? 'japanese' : 'english'], 'description', language)}
            </p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button
                onClick={scrollToProjects}
                className="inline-flex items-center space-x-2 bg-white text-ocean-500 px-8 py-4 rounded-full font-heading font-semibold text-lg hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                <span>{getLocalizedText(homeData.languages[language === 'ja' ? 'japanese' : 'english'].cta, 'text', language)}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <button
          onClick={scrollToProjects}
          className="flex flex-col items-center space-y-2 text-white/80 hover:text-white transition-colors duration-300"
        >
          <span className="text-sm font-medium text-white/80">
            {language === 'ja' ? 'スクロール' : 'Scroll'}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </button>
      </motion.div>

      {/* Background Indicators */}
      <div className="absolute bottom-8 right-8 z-10">
        <div className="flex space-x-2">
          {backgrounds.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBackground(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentBackground
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Background Info */}
      <div className="absolute bottom-8 left-8 z-10 text-white/80">
        <div className="text-sm">
          <p className="font-medium">
            {backgrounds[currentBackground].name}
          </p>
          <p className="text-xs opacity-75">
            {backgrounds[currentBackground].description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
