import React, { useState, useEffect } from 'react'
import { 
  FaFigma, 
  FaCodeBranch, 
  FaClock, 
  FaCheckCircle, 
  FaPlayCircle, 
  FaChevronLeft, 
  FaChevronRight,
  FaSync
} from 'react-icons/fa' 

const Design = ({ isDarkMode }) => {
  // --- STATE MANAGEMENT ---
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Lazy Load State for Iframes
  const [loadedEmbeds, setLoadedEmbeds] = useState({});

  // --- MOCK DATA (Fallback) ---
  // In a real scenario, you would host this array as a .json file on GitHub (Gist or Repo)
  // and fetch it using the URL.
  const MOCK_DB = [
    {
      id: 1,
      title: 'Maidlink',
      description: 'Service connection platform connecting households with professional help.',
      category: 'Web Design',
      figmaLink: 'https://www.figma.com/design/rWGDaOqDxj0WoEbdqF5hmJ/Maidlink?m=auto&t=So1Oj6OHJ2MIj1Oo-6',
      embedLink: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FrWGDaOqDxj0WoEbdqF5hmJ%2FMaidlink',
      status: 'completed',
      lastUpdated: '2024-02-10'
    },
    {
      id: 2,
      title: 'Igitree',
      description: 'Digital platform focused on growth and environmental tracking.',
      category: 'Web Design',
      figmaLink: 'https://www.figma.com/design/bV180n1Sd2axqkJrnEEjss/igitree?m=auto&t=So1Oj6OHJ2MIj1Oo-6',
      embedLink: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FbV180n1Sd2axqkJrnEEjss%2Figitree',
      status: 'completed',
      lastUpdated: '2024-01-15'
    },
    {
      id: 3,
      title: 'Umudugudu Connect',
      description: 'Community engagement platform for local connectivity and updates.',
      category: 'Web Design',
      figmaLink: 'https://www.figma.com/design/PvRrhuUZes6sjsAjb5TY4A/Umudugu-connect?m=auto&t=So1Oj6OHJ2MIj1Oo-6',
      embedLink: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FPvRrhuUZes6sjsAjb5TY4A%2FUmudugu-connect',
      status: 'in-progress',
      lastUpdated: '2024-03-01'
    },
    {
      id: 4,
      title: 'Sawapay',
      description: 'Fintech mobile application design for seamless payments and transfers.',
      category: 'Mobile Design',
      figmaLink: 'https://www.figma.com/design/qkwCvVuhl0j0qBLEakwBNO/Sawapay_Design?m=auto&t=So1Oj6OHJ2MIj1Oo-6',
      embedLink: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FqkwCvVuhl0j0qBLEakwBNO%2FSawapay_Design',
      status: 'completed',
      lastUpdated: '2023-11-20'
    },
    {
      id: 5,
      title: 'We Donate',
      description: 'Charity and volunteering platform connecting donors with causes.',
      category: 'Web Design',
      figmaLink: 'https://www.figma.com/design/Cf3gkh0KAAUqNFsUywKiqw/WeDonateTime?m=auto&t=So1Oj6OHJ2MIj1Oo-6',
      embedLink: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FCf3gkh0KAAUqNFsUywKiqw%2FWeDonateTime',
      status: 'under-construction',
      lastUpdated: '2024-03-05'
    },
    {
      id: 6,
      title: 'Equalynk',
      description: 'Social impact platform promoting equality and resource sharing.',
      category: 'Mobile Design',
      figmaLink: 'https://www.figma.com/design/aHnKAbZc4SQIujxoE7w9jM/Equalynk?m=auto&t=So1Oj6OHJ2MIj1Oo-6',
      embedLink: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FaHnKAbZc4SQIujxoE7w9jM%2FEqualynk',
      status: 'completed',
      lastUpdated: '2023-12-12'
    },
    // Adding dummy data to demonstrate pagination
    {
      id: 7,
      title: 'Future Dashboard',
      description: 'Next-gen analytics dashboard for enterprise users.',
      category: 'Web Design',
      figmaLink: '#',
      embedLink: '',
      status: 'in-progress',
      lastUpdated: '2024-03-10'
    }
  ];

  // --- FETCH LOGIC ---
  const fetchDesigns = async () => {
    setLoading(true);
    setError(null);
    try {
      // -----------------------------------------------------------
      // REAL TIME SETUP INSTRUCTIONS:
      // 1. Upload your 'MOCK_DB' array as a 'designs.json' file to a GitHub Gist or Repo.
      // 2. Click "Raw" on GitHub to get the raw URL.
      // 3. Uncomment the fetch below and use that URL.
      // -----------------------------------------------------------
      
      // const response = await fetch('YOUR_GITHUB_RAW_JSON_URL_HERE');
      // if (!response.ok) throw new Error('Failed to fetch designs');
      // const data = await response.json();
      
      // --- SIMULATING NETWORK REQUEST (Remove this block when using real API) ---
      await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5s fake delay
      const data = MOCK_DB; 
      // ------------------------------------------------------------------------

      // Sort by status or ID if needed
      setDesigns(data);
    } catch (err) {
      setError('Failed to load design portfolio. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesigns();
  }, []);

  // --- PAGINATION LOGIC ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDesigns = designs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(designs.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // --- HANDLERS ---
  const handleLoadEmbed = (id) => {
    setLoadedEmbeds(prev => ({ ...prev, [id]: true }));
  };

  // --- HELPERS ---
  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return isDarkMode ? 'bg-green-600' : 'bg-green-500'
      case 'in-progress': return isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
      case 'under-construction': return isDarkMode ? 'bg-yellow-600' : 'bg-yellow-500'
      default: return isDarkMode ? 'bg-gray-600' : 'bg-gray-500'
    }
  }

  const getStatusText = (status) => {
    switch(status) {
      case 'completed': return 'Completed'
      case 'in-progress': return 'In Progress'
      case 'under-construction': return 'Building'
      default: return 'Unknown'
    }
  }

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Web Design': return isDarkMode ? 'bg-indigo-600' : 'bg-indigo-500'
      case 'Mobile Design': return isDarkMode ? 'bg-pink-600' : 'bg-pink-500'
      default: return isDarkMode ? 'bg-gray-600' : 'bg-gray-500'
    }
  }

  return (
    <div className="p-2 xs:p-4 sm:p-6 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 xs:mb-8">
        <div>
          <h1 className={`text-xl xs:text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            ✨ My Live Figma Portfolio
          </h1>
          <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Real-time fetching from design repository
          </p>
        </div>
        
        <button 
          onClick={fetchDesigns}
          className={`mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-purple-400' : 'bg-white hover:bg-gray-100 text-purple-600'} shadow-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
        >
          <FaSync className={`${loading ? 'animate-spin' : ''}`} />
          Refresh Data
        </button>
      </div>
      
      {/* Content Area */}
      {loading ? (
        // PROFESSIONAL SKELETON LOADER
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`rounded-xl h-[400px] animate-pulse ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className={`h-56 w-full rounded-t-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
              <div className="p-4 space-y-3">
                <div className={`h-6 w-3/4 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                <div className={`h-4 w-full rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                <div className={`h-4 w-2/3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        // ERROR STATE
        <div className="text-center py-20">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={fetchDesigns} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Try Again</button>
        </div>
      ) : (
        // LOADED DATA
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8 mb-8">
            {currentDesigns.map((design) => {
              const isLoaded = loadedEmbeds[design.id];
              return (
                <div 
                  key={design.id}
                  className={`rounded-xl shadow-lg border relative flex flex-col
                  ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
                  hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}>
                  
                  {/* Design Preview */}
                  <div className="w-full h-56 rounded-t-xl overflow-hidden relative shrink-0">
                    
                    {!isLoaded && (
                      <div className={`w-full h-full flex flex-col items-center justify-center p-4 cursor-pointer transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                           onClick={() => handleLoadEmbed(design.id)}
                           role="button"
                           aria-label={`Load live preview for ${design.title}`}>
                        <FaPlayCircle className={`text-5xl mb-3 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                        <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Live Preview</p>
                      </div>
                    )}
                    
                    {isLoaded && design.embedLink && (
                      <iframe 
                        src={design.embedLink} 
                        title={`${design.title} Live Preview`}
                        className="w-full h-full border-none"
                        allowFullScreen
                        loading="eager" 
                      ></iframe>
                    )}

                    {/* Fallback image if no embed link exists */}
                    {isLoaded && !design.embedLink && (
                        <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-gray-900 text-gray-500' : 'bg-gray-100 text-gray-400'}`}>
                            <span>No Preview Available</span>
                        </div>
                    )}

                    <div className="absolute top-0 right-0 z-10 p-2">
                      <span className={`${getStatusColor(design.status)} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md`}>
                        {getStatusText(design.status)}
                      </span>
                    </div>
                    <div className="absolute top-0 left-0 z-10 p-2">
                      <span className={`${getCategoryColor(design.category)} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md`}>
                        {design.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 xs:p-5 flex flex-col flex-grow">
                    <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {design.title}
                    </h3>
                    <p className={`text-sm mb-4 flex-grow ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {design.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700 mt-auto">
                      <a 
                        href={design.figmaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 text-sm font-medium ${
                          isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'
                        } transition-colors`}
                      >
                        <FaFigma className="text-base" />
                        View File
                      </a>
                      {design.lastUpdated && (
                        <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            Updated: {design.lastUpdated}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mb-12">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg border ${isDarkMode ? 'border-gray-700 text-white hover:bg-gray-700' : 'border-gray-200 text-gray-700 hover:bg-gray-100'} disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
                >
                    <FaChevronLeft />
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`w-10 h-10 rounded-lg font-medium transition-all
                        ${currentPage === index + 1 
                            ? (isDarkMode ? 'bg-purple-600 text-white' : 'bg-purple-600 text-white') 
                            : (isDarkMode ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200')
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg border ${isDarkMode ? 'border-gray-700 text-white hover:bg-gray-700' : 'border-gray-200 text-gray-700 hover:bg-gray-100'} disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
                >
                    <FaChevronRight />
                </button>
            </div>
          )}
        </>
      )}

      {/* Statistics Cards - Calculated from FULL dataset */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`rounded-xl shadow-lg p-6 flex flex-col items-start ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <FaCodeBranch className={`text-4xl mb-3 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Total Designs</h2>
          <p className={`text-4xl font-extrabold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'} mt-1`}>
            {designs.length}
          </p>
        </div>

        <div className={`rounded-xl shadow-lg p-6 flex flex-col items-start ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <FaCheckCircle className={`text-4xl mb-3 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Completed</h2>
          <p className={`text-4xl font-extrabold ${isDarkMode ? 'text-green-400' : 'text-green-600'} mt-1`}>
            {designs.filter(d => d.status === 'completed').length}
          </p>
        </div>

        <div className={`rounded-xl shadow-lg p-6 flex flex-col items-start ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <FaClock className={`text-4xl mb-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>In Progress</h2>
          <p className={`text-4xl font-extrabold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mt-1`}>
            {designs.filter(d => d.status === 'in-progress').length}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Design