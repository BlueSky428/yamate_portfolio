import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText } from '../utils/dataLoader'
import { 
  Code, 
  Server, 
  Cloud, 
  Brain,
  Star,
  Calendar,
  Award,
  TrendingUp
} from 'lucide-react'

const Skills: React.FC = () => {
  const { language } = useLanguage()
  const data = loadPortfolioData()
  const skillsData = data.skills
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const iconMap = {
    'paint-brush': Code,
    'server': Server,
    'cloud': Cloud,
    'brain': Brain,
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'text-green-600 bg-green-100'
      case 'Advanced':
        return 'text-blue-600 bg-blue-100'
      case 'Intermediate':
        return 'text-yellow-600 bg-yellow-100'
      case 'Beginner':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getLevelPercentage = (level: string) => {
    switch (level) {
      case 'Expert':
        return 90
      case 'Advanced':
        return 75
      case 'Intermediate':
        return 60
      case 'Beginner':
        return 30
      default:
        return 50
    }
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
                {getLocalizedText(skillsData, 'title', language)}
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>
            <p className="text-xl text-soft-600 leading-relaxed">
              {language === 'ja' 
                ? 'モダンなテクノロジーと継続的な学習への情熱' 
                : 'Passion for modern technologies and continuous learning'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Categories */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-soft-800 mb-4">
              {language === 'ja' ? 'スキルカテゴリ' : 'Skill Categories'}
            </h2>
          </motion.div>

          <div className="space-y-16">
            {skillsData.categories.map((category, categoryIndex) => {
              const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Code
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                  className="card p-8"
                >
                  {/* Category Header */}
                  <div className="flex items-center mb-8">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center mr-6"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <IconComponent 
                        className="w-8 h-8" 
                        style={{ color: category.color }}
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-soft-800 mb-2">
                        {getLocalizedText(category, 'name', language)}
                      </h3>
                      <p className="text-soft-600">
                        {getLocalizedText(category, 'description', language)}
                      </p>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                        className="border border-soft-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300"
                      >
                        {/* Skill Header */}
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-soft-800">
                            {getLocalizedText(skill, 'name', language)}
                          </h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}>
                            {getLocalizedText(skill, 'level', language)}
                          </span>
                        </div>

                        {/* Skill Description */}
                        <p className="text-soft-600 text-sm mb-4 leading-relaxed">
                          {getLocalizedText(skill, 'description', language)}
                        </p>

                        {/* Skill Stats */}
                        <div className="space-y-3">
                          {/* Experience */}
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-soft-600 flex items-center">
                              <Calendar className="w-4 h-4 mr-2" />
                              {language === 'ja' ? '経験年数' : 'Experience'}
                            </span>
                            <span className="font-medium text-soft-800">
                              {skill.years_experience} {language === 'ja' ? '年' : 'years'}
                            </span>
                          </div>

                          {/* Projects Used */}
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-soft-600 flex items-center">
                              <TrendingUp className="w-4 h-4 mr-2" />
                              {language === 'ja' ? '使用プロジェクト' : 'Projects Used'}
                            </span>
                            <span className="font-medium text-soft-800">
                              {skill.projects_used}
                            </span>
                          </div>

                          {/* Skill Level Bar */}
                          <div>
                            <div className="flex items-center justify-between text-xs text-soft-600 mb-1">
                              <span>{language === 'ja' ? '習熟度' : 'Proficiency'}</span>
                              <span>{getLevelPercentage(skill.level)}%</span>
                            </div>
                            <div className="w-full bg-soft-200 rounded-full h-2">
                              <div
                                className="h-2 rounded-full transition-all duration-1000"
                                style={{
                                  width: `${getLevelPercentage(skill.level)}%`,
                                  backgroundColor: category.color,
                                }}
                              />
                            </div>
                          </div>

                          {/* Certifications */}
                          {skill.certifications.length > 0 && (
                            <div className="flex items-center text-sm">
                              <Award className="w-4 h-4 mr-2 text-yellow-500" />
                              <span className="text-gray-600">
                                {skill.certifications.length} {language === 'ja' ? '認定' : 'Certifications'}
                              </span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Skill Levels Legend */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gradient-cool mb-4">
                {language === 'ja' ? 'スキルレベル' : 'Skill Levels'}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillsData.skill_levels.map((level, index) => (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card p-6 text-center"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${level.color}20` }}>
                  <Star className="w-8 h-8" style={{ color: level.color }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {getLocalizedText(level, 'level', language)}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {getLocalizedText(level, 'description', language)}
                </p>
                <div className="text-2xl font-mono font-bold" style={{ color: level.color }}>
                  {level.percentage}%
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Goals */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gradient-cool mb-4">
                {language === 'ja' ? '学習目標' : 'Learning Goals'}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>
            <p className="text-xl text-gray-600">
              {language === 'ja' 
                ? '継続的な成長とスキル向上への取り組み' 
                : 'Commitment to continuous growth and skill enhancement'
              }
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {skillsData.learning_goals.map((goal, index) => (
              <motion.div
                key={goal.skill}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {getLocalizedText(goal, 'skill', language)}
                </h3>
                <p className="text-gray-600 mb-4">
                  {getLocalizedText(goal, 'reason', language)}
                </p>
                <div className="text-sm text-ocean-600 font-medium">
                  {language === 'ja' ? '目標時期' : 'Target Date'}: {goal.target_date}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Skills
