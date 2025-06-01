import React, { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { initScrollEffects } from '../../utils/scrollEffects'
import { FaEnvelope, FaGithub, FaLinkedin, FaPhone, FaMapMarkerAlt, FaTwitter } from 'react-icons/fa'

const Contact = ({ isDarkMode }) => {
  const form = useRef()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [isValidatingEmail, setIsValidatingEmail] = useState(false)
  const [emailValidationStatus, setEmailValidationStatus] = useState(null)

  const validateEmail = async (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return false
    }

    const disposableDomains = [
      'tempmail.com', 'throwawaymail.com', 'mailinator.com', 'guerrillamail.com',
      '10minutemail.com', 'yopmail.com', 'temp-mail.org', 'fakeinbox.com'
    ]
    const domain = email.split('@')[1]
    if (disposableDomains.includes(domain)) {
      return false
    }

    const commonProviders = [
      'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com',
      'protonmail.com', 'icloud.com', 'mail.com', 'zoho.com', 'yandex.com'
    ]
    if (!commonProviders.includes(domain)) {
      try {
        const response = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`)
        const data = await response.json()
        return data.Answer && data.Answer.length > 0
      } catch (error) {
        console.error('Error checking MX records:', error)
        return false
      }
    }

    return true
  }

  const validateForm = async () => {
    const newErrors = {}
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long'
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else {
      setIsValidatingEmail(true)
      const isValid = await validateEmail(formData.email)
      setIsValidatingEmail(false)
      
      if (!isValid) {
        newErrors.email = 'Please enter a valid and working email address'
        setEmailValidationStatus('invalid')
      } else {
        setEmailValidationStatus('valid')
      }
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters long'
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = async (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }

    if (name === 'email' && value.trim()) {
      setIsValidatingEmail(true)
      const isValid = await validateEmail(value)
      setIsValidatingEmail(false)
      setEmailValidationStatus(isValid ? 'valid' : 'invalid')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!await validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const result = await emailjs.sendForm(
        'service_1ufqts8',
        'template_diahb1s',
        form.current,
        'ZUrx5yuwUN5c538nb'
      )

      if (result.text === 'OK') {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setEmailValidationStatus(null)
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const cleanup = initScrollEffects();
    return cleanup;
  }, []);

  return (
    <div className={`min-h-screen flex flex-col overflow-x-hidden ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <main className={`flex-1 overflow-y-auto overflow-x-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center mb-6 xs:mb-8 sm:mb-12">
            <h1 className={`text-2xl xs:text-3xl sm:text-4xl font-bold mb-2 xs:mb-3 sm:mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Get in Touch
          </h1>
            <p className={`text-base xs:text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Have a question or want to work together? Send me a message!
          </p>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-6 sm:gap-8">
          {/* Contact Form */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-4 xs:p-6 sm:p-8`}>
              <form ref={form} onSubmit={handleSubmit} className="space-y-4 xs:space-y-6">
              <div>
                  <label className={`block text-sm font-medium mb-1 xs:mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                    className={`w-full px-3 xs:px-4 py-2 xs:py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    isDarkMode
                      ? 'bg-gray-700 text-white border-gray-600'
                      : 'bg-white text-gray-900 border-gray-300'
                  } ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Your name"
                  required
                />
                {errors.name && (
                    <p className="mt-1 text-xs xs:text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                  <label className={`block text-sm font-medium mb-1 xs:mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                      className={`w-full px-3 xs:px-4 py-2 xs:py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      isDarkMode
                        ? 'bg-gray-700 text-white border-gray-600'
                        : 'bg-white text-gray-900 border-gray-300'
                    } ${
                      errors.email 
                        ? 'border-red-500' 
                        : emailValidationStatus === 'valid' 
                          ? 'border-green-500' 
                          : emailValidationStatus === 'invalid' 
                            ? 'border-red-500' 
                            : ''
                    }`}
                    placeholder="your.email@example.com"
                    required
                  />
                  {isValidatingEmail && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-4 xs:h-5 w-4 xs:w-5 border-b-2 border-blue-500"></div>
                    </div>
                  )}
                  {emailValidationStatus === 'valid' && !isValidatingEmail && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  {emailValidationStatus === 'invalid' && !isValidatingEmail && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  )}
                </div>
                {errors.email && (
                    <p className="mt-1 text-xs xs:text-sm text-red-500">{errors.email}</p>
                )}
                {emailValidationStatus === 'valid' && !errors.email && (
                  <p className="mt-1 text-sm text-green-500">Valid email address</p>
                )}
              </div>

              <div>
                  <label className={`block text-sm font-medium mb-1 xs:mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                    className={`w-full px-3 xs:px-4 py-2 xs:py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    isDarkMode
                      ? 'bg-gray-700 text-white border-gray-600'
                      : 'bg-white text-gray-900 border-gray-300'
                  } ${errors.subject ? 'border-red-500' : ''}`}
                    placeholder="Message subject"
                  required
                />
                {errors.subject && (
                    <p className="mt-1 text-xs xs:text-sm text-red-500">{errors.subject}</p>
                )}
              </div>

              <div>
                  <label className={`block text-sm font-medium mb-1 xs:mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                    rows="4"
                    className={`w-full px-3 xs:px-4 py-2 xs:py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    isDarkMode
                      ? 'bg-gray-700 text-white border-gray-600'
                      : 'bg-white text-gray-900 border-gray-300'
                  } ${errors.message ? 'border-red-500' : ''}`}
                  placeholder="Your message here..."
                  required
                ></textarea>
                {errors.message && (
                    <p className="mt-1 text-xs xs:text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || emailValidationStatus !== 'valid' || !formData.name.trim() || !formData.subject.trim() || !formData.message.trim()}
                  className={`w-full py-2 xs:py-3 px-4 xs:px-6 rounded-lg font-medium transition-all duration-200 ${
                  isSubmitting || emailValidationStatus !== 'valid' || !formData.name.trim() || !formData.subject.trim() || !formData.message.trim()
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-[1.02]'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 xs:h-5 w-4 xs:w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>

              {submitStatus === 'success' && (
                  <div className="mt-4 p-3 xs:p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm xs:text-base text-green-700">Message sent successfully! I'll get back to you soon.</p>
                </div>
              )}
              {submitStatus === 'error' && (
                  <div className="mt-4 p-3 xs:p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm xs:text-base text-red-700">Failed to send message. Please try again.</p>
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
            <div className="space-y-6">
              <h2 className={`text-lg xs:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Contact Information
            </h2>
            
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-6">
                {/* Primary Contact Info */}
                <div className="space-y-4">
                  <a 
                    href="mailto:ibrahimtuyizere2@gmail.com"
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                      isDarkMode 
                        ? 'hover:bg-gray-700/50 text-gray-300 hover:text-white' 
                        : 'hover:bg-blue-50 text-gray-600 hover:text-gray-900'
                    }`}
                  >
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                      <FaEnvelope className={`w-4 xs:w-5 h-4 xs:h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div>
                  <h3 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Email</h3>
                      <p className={`text-xs xs:text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        ibrahimtuyizere2@gmail.com
                      </p>
                </div>
                  </a>

                  <div className="space-y-2">
                    <div className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                      isDarkMode 
                        ? 'hover:bg-gray-700/50 text-gray-300 hover:text-white' 
                        : 'hover:bg-blue-50 text-gray-600 hover:text-gray-900'
                    }`}>
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                        <FaPhone className={`w-4 xs:w-5 h-4 xs:h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div>
                  <h3 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Phone</h3>
                        <div className="space-y-1">
                          <a 
                            href="tel:+250798893468"
                            className={`text-xs xs:text-sm block ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                          >
                            +250 798893468
                          </a>
                          <a 
                            href="tel:+250725931245"
                            className={`text-xs xs:text-sm block ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                          >
                            +250 725931245
                          </a>
                        </div>
                      </div>
                </div>
              </div>

                  <div className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    isDarkMode 
                      ? 'hover:bg-gray-700/50 text-gray-300 hover:text-white' 
                      : 'hover:bg-blue-50 text-gray-600 hover:text-gray-900'
                  }`}>
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                      <FaMapMarkerAlt className={`w-4 xs:w-5 h-4 xs:h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div>
                  <h3 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Location</h3>
                      <p className={`text-xs xs:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Rwanda, Kigali, Kicukiro, Gatenga, KK595st
                      </p>
                </div>
              </div>
            </div>

                {/* Social Links */}
                <div className="space-y-4">
                  <a 
                    href="https://github.com/Tibrahi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                      isDarkMode 
                        ? 'hover:bg-gray-700/50 text-gray-300 hover:text-white' 
                        : 'hover:bg-blue-50 text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                      <FaGithub className={`w-4 xs:w-5 h-4 xs:h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <h3 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>GitHub</h3>
                      <p className={`text-xs xs:text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        @Tibrahi
                      </p>
                    </div>
                  </a>

                  <a 
                    href="https://linkedin.com/in/tuyizere-ibrahim-89ba8b275"
                      target="_blank"
                      rel="noopener noreferrer"
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                        isDarkMode
                        ? 'hover:bg-gray-700/50 text-gray-300 hover:text-white' 
                        : 'hover:bg-blue-50 text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                      <FaLinkedin className={`w-4 xs:w-5 h-4 xs:h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <h3 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>LinkedIn</h3>
                      <p className={`text-xs xs:text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        tuyizere-ibrahim
                      </p>
                    </div>
                  </a>

                  <a 
                    href="https://x.com/BaddestIbrah"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                      isDarkMode 
                        ? 'hover:bg-gray-700/50 text-gray-300 hover:text-white' 
                        : 'hover:bg-blue-50 text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                      <FaTwitter className={`w-4 xs:w-5 h-4 xs:h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <h3 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Twitter</h3>
                      <p className={`text-xs xs:text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        @BaddestIbrah
                      </p>
                    </div>
                  </a>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Contact 