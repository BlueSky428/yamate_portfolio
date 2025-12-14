import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText, getLocalizedArray } from '../utils/dataLoader'
import { Project } from '../types/portfolio'
import { 
  ExternalLink, 
  Github, 
  Play, 
  X, 
  Calendar, 
  Clock, 
  Award,
  Lightbulb,
  CheckCircle
} from 'lucide-react'

const Projects: React.FC = () => {
  const { language } = useLanguage()
  const data = loadPortfolioData()
  const projectsData = data.projects
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const openProjectModal = (project: Project) => {
    setSelectedProject(project)
  }

  const closeProjectModal = () => {
    setSelectedProject(null)
  }

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
                {getLocalizedText(projectsData, 'title', language)}
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>
            <p className="text-xl text-soft-600 leading-relaxed">
              {language === 'ja' 
                ? '革新的なソリューションと創造的なプロジェクトのコレクション' 
                : 'A collection of innovative solutions and creative projects'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card card-hover cursor-pointer"
                onClick={() => openProjectModal(project)}
              >
                {/* Project Image */}
                <div className="aspect-video rounded-t-xl overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={getLocalizedText(project, 'name', language)}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-ocean-100 text-ocean-700 text-xs font-medium rounded-full">
                      {getLocalizedText(project, 'category', language)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {getLocalizedText(project, 'name', language)}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {getLocalizedText(project, 'description', language)}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="flex items-center text-ocean-600 font-medium text-sm">
                    <span>{language === 'ja' ? '詳細を見る' : 'View Details'}</span>
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Categories */}
      <section className="section-padding bg-soft-100">
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
                {language === 'ja' ? 'プロジェクトカテゴリ' : 'Project Categories'}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.project_categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card p-6 text-center"
              >
                <h3 className="text-xl font-semibold text-soft-800 mb-2">
                  {getLocalizedText(category, 'name', language)}
                </h3>
                <p className="text-soft-600 mb-4">
                  {getLocalizedText(category, 'description', language)}
                </p>
                <div className="text-2xl font-bold text-ocean-500">
                  {category.count} {language === 'ja' ? 'プロジェクト' : 'Projects'}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={closeProjectModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative">
                <img
                  src={selectedProject.images[0]}
                  alt={getLocalizedText(selectedProject, 'name', language)}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <button
                  onClick={closeProjectModal}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                {/* Project Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="px-3 py-1 bg-ocean-100 text-ocean-700 text-sm font-medium rounded-full">
                        {getLocalizedText(selectedProject, 'category', language)}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                        {getLocalizedText(selectedProject, 'status', language)}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {getLocalizedText(selectedProject, 'name', language)}
                    </h2>
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {selectedProject.year}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {getLocalizedText(selectedProject, 'duration', language)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  {getLocalizedText(selectedProject, 'description', language)}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-ocean-600" />
                    {language === 'ja' ? '主な機能' : 'Key Features'}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {getLocalizedArray(selectedProject, 'features', language).map((feature: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-ocean-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Challenges & Solutions */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2 text-orange-500" />
                      {language === 'ja' ? '課題' : 'Challenges'}
                    </h3>
                    <p className="text-gray-700">
                      {getLocalizedText(selectedProject, 'challenges', language)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Award className="w-5 h-5 mr-2 text-green-500" />
                      {language === 'ja' ? '解決策' : 'Solutions'}
                    </h3>
                    <p className="text-gray-700">
                      {getLocalizedText(selectedProject, 'solutions', language)}
                    </p>
                  </div>
                </div>

                {/* Results */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {language === 'ja' ? '成果' : 'Results'}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {getLocalizedArray(selectedProject, 'results', language).map((result: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {language === 'ja' ? '使用技術' : 'Technologies Used'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-ocean-100 text-ocean-700 text-sm font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  {selectedProject.demo_url && (
                    <a
                      href={selectedProject.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex items-center"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {language === 'ja' ? 'デモを見る' : 'View Demo'}
                    </a>
                  )}
                  {selectedProject.github_url && (
                    <a
                      href={selectedProject.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary flex items-center"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      {language === 'ja' ? 'GitHub' : 'GitHub'}
                    </a>
                  )}
                  {selectedProject.live_url && (
                    <a
                      href={selectedProject.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary flex items-center"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {language === 'ja' ? 'ライブサイト' : 'Live Site'}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Projects
