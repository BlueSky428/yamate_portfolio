import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText, getLocalizedArray } from '../utils/dataLoader'
import { 
  Mail, 
  MapPin, 
  Clock,
  CheckCircle
} from 'lucide-react'

// Telegram Icon Component
const TelegramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
)

const Contact: React.FC = () => {
  const { language } = useLanguage()
  const data = loadPortfolioData()
  const contactData = data.contact
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
                {getLocalizedText(contactData, 'title', language)}
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>
            <p className="text-xl text-soft-600 leading-relaxed">
              {getLocalizedText(contactData, 'description', language)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Contact Details */}
              <div className="card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {language === 'ja' ? '連絡先情報' : 'Contact Information'}
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-ocean-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {getLocalizedText(contactData.contact_info.email, 'label', language)}
                      </h4>
                      <a 
                        href={`https://mail.google.com/mail/?view=cm&to=${contactData.contact_info.email.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ocean-600 hover:text-ocean-700 hover:underline transition-colors duration-200"
                      >
                        {contactData.contact_info.email.address}
                      </a>
                      <p className="text-sm text-gray-500">
                        {getLocalizedText(contactData.contact_info.email, 'description', language)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <TelegramIcon className="w-6 h-6 text-ocean-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {getLocalizedText(contactData.contact_info.telegram, 'label', language)}
                      </h4>
                      <a 
                        href={getLocalizedText(contactData.contact_info.telegram, 'url', language)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ocean-600 hover:text-ocean-700 hover:underline transition-colors duration-200"
                      >
                        {getLocalizedText(contactData.contact_info.telegram, 'username', language)}
                      </a>
                      <p className="text-sm text-gray-500">
                        {getLocalizedText(contactData.contact_info.telegram, 'description', language)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-ocean-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {getLocalizedText(contactData.contact_info.location, 'label', language)}
                      </h4>
                      <p className="text-gray-600">{contactData.contact_info.location.address}</p>
                      <p className="text-sm text-gray-500">
                        {getLocalizedText(contactData.contact_info.location, 'description', language)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-ocean-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {getLocalizedText(contactData.contact_info.timezone, 'label', language)}
                      </h4>
                      <p className="text-gray-600">{contactData.contact_info.timezone.zone}</p>
                      <p className="text-sm text-gray-500">
                        {getLocalizedText(contactData.contact_info.timezone, 'description', language)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {language === 'ja' ? '利用可能性' : 'Availability'}
                </h3>
                <div className="flex items-center space-x-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-green-600">
                    {getLocalizedText(contactData.availability, 'status', language)}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  {getLocalizedText(contactData.availability, 'description', language)}
                </p>
                <div className="text-sm text-gray-500">
                  <p>{getLocalizedText(contactData.availability, 'response_time', language)}</p>
                  <p>{getLocalizedText(contactData.availability, 'working_hours', language)}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
