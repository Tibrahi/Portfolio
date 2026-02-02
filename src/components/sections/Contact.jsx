import React, { useState } from 'react'
// REMOVED: import emailjs (Not needed for this method)
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, 
  FaGithub, FaLinkedin, FaTimes, FaCopy, 
  FaExternalLinkAlt, FaCheck, FaExclamationTriangle 
} from 'react-icons/fa'

const Contact = ({ isDarkMode }) => {
  // --- CONFIGURATION ---
  const MY_EMAIL = 'ibrahimtuyizere2@gmail.com'
  const PHONE_NUMBERS = ['+250 798893468', '+250 725931245']
  const LOCATION = {
    title: 'Kigali, Rwanda',
    subtitle: 'Kicukiro, Gatenga, KK595st',
    // Uses Google Maps Universal Search Link
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Kicukiro+Gatenga+KK595st+Kigali+Rwanda'
  }

  // --- STATE MANAGEMENT ---
  const [activePopup, setActivePopup] = useState(null)
  const [copyStatus, setCopyStatus] = useState(null)
  
  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
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

  // --- NEW: MAILTO REDIRECT METHOD ---
  const handleMailtoRedirect = (e) => {
    e.preventDefault()
    setStatus({ type: 'loading', msg: 'Redirecting to your email client...' })

    // 1. Construct the email body
    const emailBody = `
Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}

-------------------------
Sent via Portfolio Contact Form
    `.trim()

    // 2. Encode for URL (Safety)
    const subjectEncoded = encodeURIComponent(formData.subject)
    const bodyEncoded = encodeURIComponent(emailBody)

    // 3. Create the Mailto Link
    const mailtoLink = `mailto:${MY_EMAIL}?subject=${subjectEncoded}&body=${bodyEncoded}`

    // 4. Execute Redirect (Simulate "Sending")
    setTimeout(() => {
      window.location.href = mailtoLink
      
      // 5. Update UI to Success state
      setStatus({ type: 'success', msg: 'Email client opened! Please hit Send there.' })
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // 6. Close modal after brief delay
      setTimeout(() => {
        clearStatus()
        setActivePopup(null)
      }, 3000)
    }, 1000) // Small delay for UX feel
  }

  // --- SUB-COMPONENTS ---

  const TriggerCard = ({ icon: Icon, label, colorClass, onClick, delay }) => (
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

  const Modal = ({ isOpen, onClose, title, children }) => {
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
          icon={FaPaperPlane} label="Message" delay="0"
          colorClass={isDarkMode ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'}
          onClick={() => setActivePopup('message')} 
        />
        
        <TriggerCard 
          icon={FaEnvelope} label="Email" delay="100"
          colorClass={isDarkMode ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-600'}
          onClick={() => setActivePopup('email')} 
        />

        <TriggerCard 
          icon={FaPhone} label="Phone" delay="200"
          colorClass={isDarkMode ? 'bg-orange-600/20 text-orange-400' : 'bg-orange-100 text-orange-600'}
          onClick={() => setActivePopup('phone')} 
        />

        <TriggerCard 
          icon={FaMapMarkerAlt} label="Location" delay="300"
          colorClass={isDarkMode ? 'bg-red-600/20 text-red-400' : 'bg-red-100 text-red-600'}
          onClick={() => setActivePopup('location')} 
        />

        <TriggerCard 
          icon={FaGithub} label="GitHub" delay="400"
          colorClass={isDarkMode ? 'bg-gray-600/20 text-gray-300' : 'bg-gray-200 text-gray-800'}
          onClick={() => window.open('https://github.com/Tibrahi', '_blank')} 
        />

        <TriggerCard 
          icon={FaLinkedin} label="LinkedIn" delay="500"
          colorClass={isDarkMode ? 'bg-blue-800/20 text-blue-300' : 'bg-blue-50 text-blue-700'}
          onClick={() => window.open('https://linkedin.com/in/tuyizere-ibrahim-89ba8b275', '_blank')} 
        />
      </div>

      {/* --- POPUP 1: CONTACT FORM (REDIRECT METHOD) --- */}
      <Modal 
        isOpen={activePopup === 'message'} 
        onClose={() => { setActivePopup(null); clearStatus(); }}
        title="Compose Message"
      >
        <form onSubmit={handleMailtoRedirect} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input 
              className={`w-full p-3 rounded-xl border outline-none focus:ring-2 transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 focus:ring-blue-500' : 'bg-gray-50 border-gray-200 focus:ring-blue-500'}`}
              placeholder="Name" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            <input 
              className={`w-full p-3 rounded-xl border outline-none focus:ring-2 transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 focus:ring-blue-500' : 'bg-gray-50 border-gray-200 focus:ring-blue-500'}`}
              placeholder="Your Email" 
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <input 
            className={`w-full p-3 rounded-xl border outline-none focus:ring-2 transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 focus:ring-blue-500' : 'bg-gray-50 border-gray-200 focus:ring-blue-500'}`}
            placeholder="Subject" 
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
            required
          />
          <textarea 
            className={`w-full p-3 rounded-xl border outline-none focus:ring-2 transition-all resize-none ${isDarkMode ? 'bg-gray-700 border-gray-600 focus:ring-blue-500' : 'bg-gray-50 border-gray-200 focus:ring-blue-500'}`}
            placeholder="Write your message here..." 
            rows="4"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            required
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
              status.type === 'success' 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-blue-100 text-blue-700 border border-blue-200'
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
              {copyStatus === MY_EMAIL ? <FaCheck className="text-green-500"/> : <FaCopy />} 
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
                  {copyStatus === phone ? <FaCheck className="text-green-500"/> : <FaCopy />}
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
      >
        <div className="text-center space-y-4">
          <div className="h-48 w-full bg-gray-200 rounded-xl overflow-hidden relative">
            {/* Background Map Placeholder */}
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