import React, { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { 
  FaEnvelope, FaGithub, FaLinkedin, FaTwitter, 
  FaPaperPlane, FaTimes, FaCopy, FaCheckCircle, 
  FaMapMarkerAlt, FaPhone 
} from 'react-icons/fa'

const Contact = ({ isDarkMode }) => {
  // State for Modal (The Popup)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // State for Form Data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [status, setStatus] = useState({ type: null, message: null })
  const [copiedField, setCopiedField] = useState(null)

  // --- 1. ROBUST EMAIL LOGIC (Fixing the error) ---
  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ type: 'loading', message: 'Sending your message...' })

    const serviceId = 'service_1ufqts8'
    const templateId = 'template_diahb1s'
    const publicKey = 'ZUrx5yuwUN5c538nb' //

    // Create a plain object to send (Stable fix for React)
    const templateParams = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_name: 'Ibrahim' // Standard EmailJS variable
    }

    try {
      // Using .send() instead of .sendForm() to prevent DOM reference errors
      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey)

      if (response.status === 200) {
        setStatus({ type: 'success', message: 'Message sent successfully!' })
        setFormData({ name: '', email: '', subject: '', message: '' })
        
        // Close modal after success (optional)
        setTimeout(() => {
          setIsModalOpen(false)
          setStatus({ type: null, message: null })
        }, 2000)
      } else {
        throw new Error('Email service failed')
      }
    } catch (error) {
      console.error('EmailJS Error:', error)
      setStatus({ 
        type: 'error', 
        message: 'Failed to send. Please check your internet or try email directly.' 
      })
    }
  }

  // --- 2. INTERACTION HANDLERS ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  // --- 3. UI COMPONENTS ---
  
  return (
    <div className={`min-h-screen relative flex flex-col items-center justify-center p-4 overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob ${isDarkMode ? 'bg-blue-600' : 'bg-blue-300'}`}></div>
        <div className={`absolute bottom-20 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 ${isDarkMode ? 'bg-purple-600' : 'bg-purple-300'}`}></div>
      </div>

      <div className="relative z-10 max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${isDarkMode ? 'from-blue-400 to-purple-500' : 'from-blue-600 to-purple-600'}`}>
            Let's Connect
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Choose how you want to reach out. Click a card to interact.
          </p>
        </div>

        {/* --- THE GRID OF "POP UPS" / INTERACTIVE CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. The Message Launcher (Triggers Modal) */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className={`group col-span-1 md:col-span-2 lg:col-span-1 row-span-2 p-8 rounded-3xl text-left transition-all duration-300 transform hover:scale-[1.02] shadow-xl border ${
              isDarkMode 
                ? 'bg-gradient-to-br from-blue-600 to-blue-800 border-blue-500/30 text-white' 
                : 'bg-gradient-to-br from-blue-500 to-blue-700 border-blue-400 text-white'
            }`}
          >
            <div className="h-full flex flex-col justify-between">
              <div>
                <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                  <FaPaperPlane className="text-xl text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Send a Message</h3>
                <p className="text-blue-100 text-sm">Got a project? Fill out the form and I'll get back to you asap.</p>
              </div>
              <div className="mt-8 flex items-center gap-2 font-semibold group-hover:gap-4 transition-all">
                Open Form <span>→</span>
              </div>
            </div>
          </button>

          {/* 2. Email Card (Click to Copy) */}
          <div 
            onClick={() => handleCopy('ibrahimtuyizere2@gmail.com', 'email')}
            className={`cursor-pointer p-6 rounded-3xl shadow-lg border transition-all duration-300 hover:scale-[1.02] ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-white'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${isDarkMode ? 'bg-gray-700 text-green-400' : 'bg-green-50 text-green-600'}`}>
                <FaEnvelope className="text-xl" />
              </div>
              {copiedField === 'email' && <span className="text-xs font-bold text-green-500 animate-fade-in-up">Copied!</span>}
            </div>
            <h3 className={`text-lg font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Email Me</h3>
            <p className={`text-sm truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>ibrahimtuyizere2@gmail.com</p>
          </div>

          {/* 3. Phone Card (Click to Copy) */}
          <div 
            onClick={() => handleCopy('+250798893468', 'phone')}
            className={`cursor-pointer p-6 rounded-3xl shadow-lg border transition-all duration-300 hover:scale-[1.02] ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-white'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${isDarkMode ? 'bg-gray-700 text-orange-400' : 'bg-orange-50 text-orange-600'}`}>
                <FaPhone className="text-xl" />
              </div>
              {copiedField === 'phone' && <span className="text-xs font-bold text-green-500 animate-fade-in-up">Copied!</span>}
            </div>
            <h3 className={`text-lg font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Call Me</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>+250 798893468</p>
          </div>

          {/* 4. Social Links Row */}
          <div className={`md:col-span-2 p-6 rounded-3xl shadow-lg border flex items-center justify-around ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-white'
          }`}>
            <SocialLink href="https://github.com/Tibrahi" icon={FaGithub} label="GitHub" isDarkMode={isDarkMode} />
            <SocialLink href="https://linkedin.com/in/tuyizere-ibrahim-89ba8b275" icon={FaLinkedin} label="LinkedIn" isDarkMode={isDarkMode} />
            <SocialLink href="https://x.com/BaddestIbrah" icon={FaTwitter} label="Twitter" isDarkMode={isDarkMode} />
            <SocialLink href="https://maps.google.com/?q=Kigali,Rwanda" icon={FaMapMarkerAlt} label="Location" isDarkMode={isDarkMode} />
          </div>

        </div>
      </div>

      {/* --- THE MODAL / POPUP FORM --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Blur */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className={`relative w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden transform transition-all animate-bounce-in ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            
            {/* Modal Header */}
            <div className={`px-6 py-4 flex justify-between items-center border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Write a Message</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" name="name" placeholder="Name" required 
                  value={formData.name} onChange={handleChange}
                  className={`w-full p-3 rounded-xl outline-none border transition-all focus:ring-2 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-50 border-gray-200 focus:ring-blue-500'
                  }`}
                />
                <input 
                  type="email" name="email" placeholder="Email" required 
                  value={formData.email} onChange={handleChange}
                  className={`w-full p-3 rounded-xl outline-none border transition-all focus:ring-2 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-50 border-gray-200 focus:ring-blue-500'
                  }`}
                />
              </div>
              <input 
                type="text" name="subject" placeholder="Subject" required 
                value={formData.subject} onChange={handleChange}
                className={`w-full p-3 rounded-xl outline-none border transition-all focus:ring-2 ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-50 border-gray-200 focus:ring-blue-500'
                }`}
              />
              <textarea 
                name="message" rows="4" placeholder="Your message..." required 
                value={formData.message} onChange={handleChange}
                className={`w-full p-3 rounded-xl outline-none border transition-all focus:ring-2 resize-none ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-50 border-gray-200 focus:ring-blue-500'
                }`}
              ></textarea>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={status.type === 'loading'}
                className={`w-full py-3 rounded-xl font-bold text-white transition-all transform active:scale-95 ${
                  status.type === 'loading' ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30'
                }`}
              >
                {status.type === 'loading' ? 'Sending...' : 'Send Message'}
              </button>

              {/* Status Message */}
              {status.message && (
                <div className={`text-center text-sm font-medium mt-2 ${
                  status.type === 'success' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {status.message}
                </div>
              )}
            </form>
          </div>
        </div>
      )}

    </div>
  )
}

// Small Helper for Social Icons
const SocialLink = ({ href, icon: Icon, label, isDarkMode }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className={`flex flex-col items-center gap-2 transition-transform hover:-translate-y-1 group`}
  >
    <div className={`p-3 rounded-full transition-colors ${
      isDarkMode ? 'bg-gray-700 group-hover:bg-blue-600 text-white' : 'bg-gray-100 group-hover:bg-blue-500 text-gray-600 group-hover:text-white'
    }`}>
      <Icon className="text-xl" />
    </div>
    <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{label}</span>
  </a>
)

export default Contact