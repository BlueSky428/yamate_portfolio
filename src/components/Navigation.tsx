import React, { useState, useEffect } from 'react'
import { Menu, X, Globe } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { language, setLanguage } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'experience', 'education', 'projects', 'skills', 'achievements', 'testimonials', 'blog', 'gallery', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigationItems = [
    { name: 'Home', japanese_name: 'ホーム', href: '#home' },
    { name: 'About', japanese_name: '自己紹介', href: '#about' },
    { name: 'Experience', japanese_name: '経歴', href: '#experience' },
    { name: 'Education', japanese_name: '学歴', href: '#education' },
    { name: 'Projects', japanese_name: '制作実績', href: '#projects' },
    { name: 'Skills', japanese_name: 'スキル', href: '#skills' },
    { name: 'Contact', japanese_name: 'お問い合わせ', href: '#contact' },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
    setIsOpen(false)
  }

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ja' : 'en')
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container-max">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('home')}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
          >
            <div className="w-8 h-8 bg-ocean-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">Y</span>
            </div>
            <span className="font-display font-bold text-xl text-white">
              {language === 'ja' ? '山手佐々木' : 'Yamate Sasaki'}
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href.replace('#', ''))}
                className={`text-sm font-heading font-medium transition-colors duration-200 ${
                  activeSection === item.href.replace('#', '')
                    ? 'text-ocean-400'
                    : 'text-gray-300 hover:text-ocean-400'
                }`}
              >
                {language === 'ja' ? item.japanese_name : item.name}
              </button>
            ))}
          </div>

          {/* Language Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-sm font-medium text-gray-300 hover:text-ocean-400 transition-colors duration-200"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? '日本語' : 'English'}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-gray-300 hover:text-ocean-400 hover:bg-gray-800 transition-colors duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-700 shadow-lg">
            <div className="px-4 py-2 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href.replace('#', ''))}
                  className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                    activeSection === item.href.replace('#', '')
                      ? 'text-ocean-400 bg-ocean-900/20'
                      : 'text-gray-300 hover:text-ocean-400 hover:bg-gray-800'
                  }`}
                >
                  {language === 'ja' ? item.japanese_name : item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
