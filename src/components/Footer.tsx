import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText, getLocalizedArray } from '../utils/dataLoader'
import { 
  ArrowUp,
  Heart
} from 'lucide-react'

// Telegram Icon Component
const TelegramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
)

// Email Icon Component
const EmailIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
)

const Footer: React.FC = () => {
  const { language } = useLanguage()
  const data = loadPortfolioData()
  const footerData = data.footer

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }


  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container-max py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-ocean-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Y</span>
              </div>
              <span className="font-bold text-xl">
                {language === 'ja' ? '山手佐々木' : 'Yamate Sasaki'}
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {language === 'ja' 
                ? 'モダンなWeb技術と日本文化統合を専門とするソフトウェアエンジニア' 
                : 'Software Engineer specializing in modern web technologies and Japanese cultural integration'
              }
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href={`https://mail.google.com/mail/?view=cm&to=${footerData.contact_info.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-ocean-600 transition-colors duration-200"
              >
                <EmailIcon className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/kintsugi320"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-ocean-600 transition-colors duration-200"
              >
                <TelegramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          {footerData.quick_links.sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">
                {getLocalizedText(section, 'title', language)}
              </h3>
              <ul className="space-y-2">
                {getLocalizedArray(section, 'links', language).map((link: any, linkIndex: number) => (
                  <li key={linkIndex}>
                    {link.external ? (
                      <a
                        href={getLocalizedText(link, 'url', language)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {getLocalizedText(link, 'text', language)}
                      </a>
                    ) : (
                      <button
                        onClick={() => scrollToSection(getLocalizedText(link, 'url', language).replace('#', ''))}
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                      >
                        {getLocalizedText(link, 'text', language)}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-max py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              {language === 'ja' ? '© 2025 山手佐々木。すべての権利を保有。' : '© 2025 Yamate Sasaki. All rights reserved.'}
            </div>

            {/* Additional Links */}
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="/privacy-policy" className="hover:text-white transition-colors duration-200">
                {language === 'ja' ? 'プライバシーポリシー' : 'Privacy Policy'}
              </a>
              <a href="/terms-of-service" className="hover:text-white transition-colors duration-200">
                {language === 'ja' ? '利用規約' : 'Terms of Service'}
              </a>
              <a href="/sitemap.xml" className="hover:text-white transition-colors duration-200">
                {language === 'ja' ? 'サイトマップ' : 'Sitemap'}
              </a>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <span className="text-sm">
                {language === 'ja' ? 'トップに戻る' : 'Back to Top'}
              </span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Performance Info */}
      <div className="bg-gray-950 py-4">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 space-y-2 md:space-y-0">
            <div className="flex items-center space-x-4">
              <span>
                {language === 'ja' ? '最終更新' : 'Last Updated'}: 2025-01-15
              </span>
              <span>•</span>
              <span>
                {language === 'ja' ? 'バージョン' : 'Version'}: 2.1.0
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Heart className="w-3 h-3 text-red-500" />
              <span>
                {language === 'ja' ? '東京で作られました' : 'Made in Tokyo'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
