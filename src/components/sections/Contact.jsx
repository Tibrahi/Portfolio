import React, { useState, useEffect } from 'react'
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane,
  FaGithub, FaLinkedin, FaTimes, FaCopy,
  FaExternalLinkAlt, FaCheck, FaExclamationTriangle
} from 'react-icons/fa'

// --- SUB-COMPONENTS (Moved OUTSIDE to fix focus/render bug) ---
const TriggerCard = ({ icon: Icon, label, colorClass, onClick, delay, isDarkMode }) => (
  <button
    onClick={onClick}
    className={`relative group flex flex-col items-center justify-center p-6 rounded-3xl border shadow-xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 ${
      isDarkMode
        ? 'bg-gray-800 border-gray-700 hover:bg-gray-750'
        : 'bg-white border-white hover:bg-gray-50'
    }`}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className={`p-4 rounded-full mb-3 transition-transform duration-300 group-hover:rotate-12 ${colorClass}`}>
      <Icon className="text-2xl" />
    </div>
    <span className={`font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{label}</span>
    <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${colorClass.replace('bg-', 'bg-')}`}></div>
  </button>
)

const Modal = ({ isOpen, onClose, title, children, isDarkMode }) => {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      ></div>
      <div className={`relative w-full max-w-md transform transition-all animate-bounce-in rounded-3xl shadow-2xl overflow-hidden ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}>
        <div className="flex justify-between items-center p-6 border-b border-gray-200/10">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-500/20 transition-colors">
            <FaTimes />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

// --- MAIN COMPONENT ---
const Contact = ({ isDarkMode }) => {
  // --- CONFIGURATION ---
  const MY_EMAIL = 'ibrahimtuyizere2@gmail.com'
  const PHONE_NUMBERS = ['+250 798893468', '+250 725931245']
  const LOCATION = {
    title: 'Kigali, Rwanda',
    subtitle: 'Kicukiro, Gatenga, KK595st',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Kicukiro+Gatenga+KK595st+Kigali+Rwanda'
  }

  // --- STATE MANAGEMENT ---
  const [activePopup, setActivePopup] = useState(null)
  const [copyStatus, setCopyStatus] = useState(null)

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    senderEmail: '', // Renamed for clarity
    receiverEmail: MY_EMAIL, // New Receiver (Defaults to Owner)
    subject: '',
    message: ''
  })

  // Error/Animation State
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: null, msg: null })

  // --- ACTIONS ---

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopyStatus(text)
    setTimeout(() => setCopyStatus(null), 2000)
  }

  const clearStatus = () => {
    setStatus({ type: null, msg: null })
  }

  // Simple Validation Logic
  const validateForm = () => {
    let tempErrors = {}
    let isValid = true

    if (!formData.name.trim()) tempErrors.name = true
    if (!formData.senderEmail.trim() || !/\S+@\S+\.\S+/.test(formData.senderEmail)) tempErrors.senderEmail = true
    if (!formData.receiverEmail.trim() || !/\S+@\S+\.\S+/.test(formData.receiverEmail)) tempErrors.receiverEmail = true
    if (!formData.subject.trim()) tempErrors.subject = true
    if (!formData.message.trim()) tempErrors.message = true

    setErrors(tempErrors)
    isValid = Object.keys(tempErrors).length === 0
    
    // Clear errors after animation plays (1s) so user can try again
    if (!isValid) {
      setTimeout(() => setErrors({}), 1000)
    }

    return isValid
  }

  // --- NEW: MAILTO REDIRECT METHOD ---
  const handleMailtoRedirect = (e) => {
    e.preventDefault()

    // 1. Validate Form First
    if (!validateForm()) {
      setStatus({ type: 'error', msg: 'Please check the highlighted fields!' })
      return
    }

    setStatus({ type: 'loading', msg: 'Redirecting to your email client...' })

    // 2. Construct the email body
    const emailBody = `
From: ${formData.name} (${formData.senderEmail})
To: ${formData.receiverEmail}

Message:
${formData.message}

-------------------------
Sent via Portfolio Contact Form
    `.trim()

    // 3. Encode for URL (Safety)
    const subjectEncoded = encodeURIComponent(formData.subject)
    const bodyEncoded = encodeURIComponent(emailBody)

    // 4. Create the Mailto Link (Uses dynamic receiver now)
    const mailtoLink = `mailto:${formData.receiverEmail}?subject=${subjectEncoded}&body=${bodyEncoded}`

    // 5. Execute Redirect (Simulate "Sending")
    setTimeout(() => {
      window.location.href = mailtoLink

      // 6. Update UI to Success state
      setStatus({ type: 'success', msg: 'Email client opened! Please hit Send there.' })
      setFormData({ 
        name: '', 
        senderEmail: '', 
        receiverEmail: MY_EMAIL, // Reset to default
        subject: '', 
        message: '' 
      })

      // 7. Close modal after brief delay
      setTimeout(() => {
        clearStatus()
        setActivePopup(null)
      }, 3000)
    }, 1000)
  }

  // Helper function for input classes with error handling
  const getInputClass = (fieldName) => {
    const baseClass = `w-full p-3 rounded-xl border outline-none focus:ring-2 transition-all duration-200`
    const themeClass = isDarkMode 
      ? 'bg-gray-700 border-gray-600 focus:ring-blue-500' 
      : 'bg-gray-50 border-gray-200 focus:ring-blue-500'
    
    // Bounce/Shake animation on error
    if (errors[fieldName]) {
      return `${baseClass} ${themeClass} border-red-500 ring-2 ring-red-500 animate-bounce`
    }
    return `${baseClass} ${themeClass}`
  }

  // --- RENDER ---
  return (
    <div className={`min-h-screen relative flex flex-col items-center pt-24 pb-12 overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>

      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-[10%] left-[10%] w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob ${isDarkMode ? 'bg-blue-600' : 'bg-blue-300'}`}></div>
        <div className={`absolute bottom-[10%] right-[10%] w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 ${isDarkMode ? 'bg-purple-600' : 'bg-purple-300'}`}></div>
        <div className={`absolute top-[40%] left-[40%] w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 ${isDarkMode ? 'bg-pink-600' : 'bg-pink-300'}`}></div>
      </div>

      <div className="relative z-10 text-center mb-12 animate-fade-in-up px-4">
        <h1 className={`text-4xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r ${isDarkMode ? 'from-blue-400 to-purple-500' : 'from-blue-600 to-purple-600'}`}>
          Get in Touch
        </h1>
        <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Click an icon below to interact
        </p>
      </div>

      {/* --- THE GRID HUB --- */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-3xl px-4 pb-12">
        <TriggerCard
          icon={FaPaperPlane} label="Message" delay="0" isDarkMode={isDarkMode}
          colorClass={isDarkMode ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'}
          onClick={() => setActivePopup('message')}
        />
        <TriggerCard
          icon={FaEnvelope} label="Email" delay="100" isDarkMode={isDarkMode}
          colorClass={isDarkMode ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-600'}
          onClick={() => setActivePopup('email')}
        />
        <TriggerCard
          icon={FaPhone} label="Phone" delay="200" isDarkMode={isDarkMode}
          colorClass={isDarkMode ? 'bg-orange-600/20 text-orange-400' : 'bg-orange-100 text-orange-600'}
          onClick={() => setActivePopup('phone')}
        />
        <TriggerCard
          icon={FaMapMarkerAlt} label="Location" delay="300" isDarkMode={isDarkMode}
          colorClass={isDarkMode ? 'bg-red-600/20 text-red-400' : 'bg-red-100 text-red-600'}
          onClick={() => setActivePopup('location')}
        />
        <TriggerCard
          icon={FaGithub} label="GitHub" delay="400" isDarkMode={isDarkMode}
          colorClass={isDarkMode ? 'bg-gray-600/20 text-gray-300' : 'bg-gray-200 text-gray-800'}
          onClick={() => window.open('https://github.com/Tibrahi', '_blank')}
        />
        <TriggerCard
          icon={FaLinkedin} label="LinkedIn" delay="500" isDarkMode={isDarkMode}
          colorClass={isDarkMode ? 'bg-blue-800/20 text-blue-300' : 'bg-blue-50 text-blue-700'}
          onClick={() => window.open('https://linkedin.com/in/tuyizere-ibrahim-89ba8b275', '_blank')}
        />
      </div>

      {/* --- POPUP 1: CONTACT FORM (UPDATED WITH RECEIVER & VALIDATION) --- */}
      <Modal
        isOpen={activePopup === 'message'}
        onClose={() => { setActivePopup(null); clearStatus(); setErrors({}); }}
        title="Compose Message"
        isDarkMode={isDarkMode}
      >
        <form onSubmit={handleMailtoRedirect} className="space-y-4">
          
          {/* Receiver Field (New) */}
          <div>
            <label className={`text-xs uppercase font-bold ml-1 mb-1 block ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>To (Receiver)</label>
            <input
              className={getInputClass('receiverEmail')}
              placeholder="Receiver Email"
              type="email"
              value={formData.receiverEmail}
              onChange={(e) => setFormData({ ...formData, receiverEmail: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                className={getInputClass('name')}
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <input
                className={getInputClass('senderEmail')}
                placeholder="Your Email"
                type="email"
                value={formData.senderEmail}
                onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
              />
            </div>
          </div>

          <input
            className={getInputClass('subject')}
            placeholder="Subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          />

          <textarea
            className={`${getInputClass('message')} resize-none`}
            placeholder="Write your message here..."
            rows="4"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />

          <button
            type="submit"
            disabled={status.type === 'loading'}
            className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-95 ${
              status.type === 'loading' ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30'
            }`}
          >
            {status.type === 'loading' ? 'Opening Mail App...' : <><FaPaperPlane /> Prepare Email</>}
          </button>

          {status.msg && (
            <div className={`mt-4 p-3 rounded-lg flex items-center gap-3 text-sm animate-fade-in ${
              status.type === 'success' || status.type === 'loading'
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-red-100 text-red-700 border border-red-200' // Changed to red for error
            }`}>
              {status.type === 'success' ? <FaCheck /> : <FaExclamationTriangle />}
              <span className="flex-1">{status.msg}</span>
              <button type="button" onClick={clearStatus} className="p-1 hover:bg-black/10 rounded-full">
                <FaTimes />
              </button>
            </div>
          )}
        </form>
      </Modal>

      {/* --- POPUP 2: EMAIL INFO --- */}
      <Modal
        isOpen={activePopup === 'email'}
        onClose={() => setActivePopup(null)}
        title="Email Me"
        isDarkMode={isDarkMode}
      >
        <div className="space-y-4 text-center">
          <div className="p-4 rounded-xl bg-green-500/10 text-green-500 mx-auto w-fit">
            <FaEnvelope className="text-4xl" />
          </div>
          <p className={`text-lg font-mono p-2 rounded ${isDarkMode ? 'bg-black/20' : 'bg-gray-100'}`}>
            {MY_EMAIL}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleCopy(MY_EMAIL)}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl font-medium transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {copyStatus === MY_EMAIL ? <FaCheck className="text-green-500" /> : <FaCopy />}
              {copyStatus === MY_EMAIL ? 'Copied' : 'Copy'}
            </button>

            <a
              href={`mailto:${MY_EMAIL}`}
              className="flex items-center justify-center gap-2 p-3 rounded-xl font-medium bg-green-600 text-white hover:bg-green-700 transition-colors shadow-lg shadow-green-500/30"
            >
              <FaExternalLinkAlt /> Open App
            </a>
          </div>
        </div>
      </Modal>

      {/* --- POPUP 3: PHONE INFO --- */}
      <Modal
        isOpen={activePopup === 'phone'}
        onClose={() => setActivePopup(null)}
        title="Call Me"
        isDarkMode={isDarkMode}
      >
        <div className="space-y-4">
          {PHONE_NUMBERS.map((phone, idx) => (
            <div key={idx} className={`flex items-center justify-between p-4 rounded-xl ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50 border border-gray-100'}`}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                  <FaPhone />
                </div>
                <span className="font-mono text-sm sm:text-base">{phone}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(phone)}
                  className="p-2 hover:bg-gray-500/20 rounded-lg transition-colors"
                  title="Copy"
                >
                  {copyStatus === phone ? <FaCheck className="text-green-500" /> : <FaCopy />}
                </button>
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md"
                  title="Call"
                >
                  <FaPhone />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* --- POPUP 4: LOCATION INFO --- */}
      <Modal
        isOpen={activePopup === 'location'}
        onClose={() => setActivePopup(null)}
        title="My Location"
        isDarkMode={isDarkMode}
      >
        <div className="text-center space-y-4">
          <div className="h-48 w-full bg-gray-200 rounded-xl overflow-hidden relative">
            <div className={`absolute inset-0 flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-blue-100'}`}>
              <FaMapMarkerAlt className="text-4xl text-red-500 animate-bounce" />
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg">{LOCATION.title}</h4>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{LOCATION.subtitle}</p>
          </div>
          <a
            href={LOCATION.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
          >
            Open in Google Maps
          </a>
        </div>
      </Modal>

    </div>
  )
}

export default Contact