import React from 'react'
import IBRAResume from '../../Resume/IBRAResume.pdf'

const About = ({ isDarkMode, setActiveSection }) => {
  const achievements = [
    {
      title: 'Founder of Code4Impact Rwanda',
      description: 'Leading a community of developers focused on creating social impact through technology',
      icon: '🏆'
    },
    {
      title: 'Tech Community Leader',
      description: 'Organizing workshops and mentoring sessions for aspiring developers',
      icon: '👥'
    },
    {
      title: 'Open Source Contributor',
      description: 'Active contributor to various open-source projects',
      icon: '🌟'
    }
  ]

  const personalInfo = [
    {
      title: 'Education',
      value: 'Certified Software Developer',
      icon: '🎓'
    },
    {
      title: 'Location',
      value: ' Gatenga , Kicukiro , Kigali, Rwanda , Africa ',
      icon: '🌍'
    },
    {
      title: 'Languages',
      value: 'English, Kinyarwanda, Swahili ',
      icon: '💬'
    }
  ]

  const handleContactClick = () => {
    setActiveSection('contact')
  }

  return (
    <div className={`p-6 space-y-8 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Hello I'M TUYIZERE IBRAHIM
        </h1>
        <p className="text-xl max-w-2xl mx-auto">
          I'm a passionate full-stack developer dedicated to creating impactful solutions through technology.
        </p>
      </div>

      {/* About Me Card */}
      <div className={`rounded-lg p-6 shadow-lg max-w-3xl mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          About Me
        </h2>
        <p className="text-lg leading-relaxed">
          I'm a full-stack developer with a passion for creating innovative solutions. 
          With expertise in modern web technologies and a strong foundation in software development, 
          I strive to build applications that make a difference.
        </p>
      </div>

      {/* Staggered Cards Layout */}
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Personal Info and Achievements in Staggered Layout */}
        {[...Array(Math.max(personalInfo.length, achievements.length))].map((_, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Info Card */}
            {personalInfo[index] && (
              <div className={`rounded-lg p-6 shadow-lg transform transition-transform hover:scale-105 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center">
                  <span className="text-3xl mr-4">{personalInfo[index].icon}</span>
                  <div>
                    <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {personalInfo[index].title}
                    </h3>
                    <p className="text-lg mt-1">{personalInfo[index].value}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Achievement Card */}
            {achievements[index] && (
              <div className={`rounded-lg p-6 shadow-lg transform transition-transform hover:scale-105 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-start">
                  <span className="text-3xl mr-4">{achievements[index].icon}</span>
                  <div>
                    <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {achievements[index].title}
                    </h3>
                    <p className="text-lg mt-2 opacity-80">{achievements[index].description}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className={`text-center mt-12 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
        <h2 className="text-2xl font-semibold mb-4">Let's Work Together</h2>
        <p className="mb-6">I'm always open to new opportunities and collaborations.</p>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={handleContactClick}
            className={`px-6 py-3 rounded-full font-medium transition-colors cursor-pointer
              ${isDarkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'}`}>
            Get in Touch
          </button>
          <a 
            href={IBRAResume}
            download="Tuyizere_Ibrahim_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-6 py-3 rounded-full font-medium transition-colors cursor-pointer
              ${isDarkMode 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                : 'bg-emerald-500 hover:bg-emerald-600 text-white'}`}>
            Download Resume
          </a>
        </div>
      </div>
    </div>
  )
}

export default About 