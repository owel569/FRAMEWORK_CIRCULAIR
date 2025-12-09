import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { API_URL } from '../config'

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<any[]>([
    { type: 'bot', text: 'Bonjour ! 👋 Je suis votre assistant ISO 59000. Je peux répondre à toutes vos questions sur l\'économie circulaire et vous guider dans votre évaluation. Comment puis-je vous aider ?', timestamp: new Date() }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [autoReadEnabled, setAutoReadEnabled] = useState(true)
  const [continuousMode, setContinuousMode] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    if (isOpen) {
      loadSuggestions()
    }
  }, [isOpen])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  // Lecture automatique des réponses du bot
  useEffect(() => {
    if (autoReadEnabled && messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.type === 'bot' && !isTyping) {
        setTimeout(() => {
          speakText(lastMessage.text)
        }, 500) // Petit délai pour l'UX
      }
    }
  }, [messages, isTyping, autoReadEnabled])

  useEffect(() => {
    // Initialiser la reconnaissance vocale
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = 'fr-FR'

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInput(transcript)
        setIsListening(false)
      }

      recognitionRef.current.onerror = () => {
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }

    // Initialiser la synthèse vocale
    synthRef.current = window.speechSynthesis

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel()
      }
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const detectLanguage = (text: string): string => {
    const hasArabic = /[\u0600-\u06FF]/.test(text)
    const hasFrenchChars = /[éèêëàâäùûüôöïîç]/i.test(text)
    const hasEnglish = /[A-Za-z]/.test(text)

    if (hasArabic) return 'ar-SA'
    if (hasFrenchChars) return 'fr-FR'
    if (hasEnglish && !hasFrenchChars) return 'en-US'

    return 'fr-FR' // Par défaut
  }

  const loadSuggestions = async () => {
    try {
      const response = await axios.get(`${API_URL}/chatbot/suggestions`)
      setSuggestions(response.data.suggestions)
    } catch (error) {
      console.error('Erreur chargement suggestions:', error)
    }
  }

  const handleSend = async (questionText?: string) => {
    const question = questionText || input
    if (!question.trim()) return

    const userMessage = { type: 'user', text: question, timestamp: new Date() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)
    setIsTyping(true)
    setShowSuggestions(false)

    try {
      const response = await axios.post(`${API_URL}/chatbot/ask`, {
        question: question,
      })
      
      setTimeout(() => {
        setIsTyping(false)
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: response.data.answer,
          confidence: response.data.confidence,
          category: response.data.category,
          timestamp: new Date()
        }])
      }, 800)
    } catch (error) {
      setIsTyping(false)
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: '😔 Désolé, une erreur est survenue. Veuillez réessayer dans quelques instants.', 
        timestamp: new Date()
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion)
  }

  const toggleListening = () => {
    // Arrêter toute lecture en cours avant d'écouter
    if (isSpeaking) {
      stopSpeaking()
    }

    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start()
        setIsListening(true)
      } else {
        alert('La reconnaissance vocale n\'est pas supportée par votre navigateur. Veuillez utiliser Chrome, Edge ou Safari.')
      }
    }
  }

  const startListening = () => {
    if (isSpeaking) {
      stopSpeaking()
    }
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const stopListeningManual = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const speakText = (text: string) => {
    if (!synthRef.current) {
      alert('La synthèse vocale n\'est pas supportée par votre navigateur.')
      return
    }

    // Arrêter toute lecture en cours
    synthRef.current.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = detectLanguage(text) // Détection automatique
    utterance.rate = 0.9
    utterance.pitch = 1

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => {
      setIsSpeaking(false)
      
      // Mode conversation continue
      if (continuousMode && autoReadEnabled) {
        setTimeout(() => {
          if (!isListening) {
            startListening()
          }
        }, 2000) // Attendre 2 secondes avant de réécouter
      }
    }
    utterance.onerror = () => setIsSpeaking(false)

    synthRef.current.speak(utterance)
  }

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel()
      setIsSpeaking(false)
    }
  }

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-circular-blue to-circular-blue-dark hover:from-circular-blue-dark hover:to-circular-blue text-white rounded-full p-5 shadow-2xl hover:shadow-3xl transition-all duration-300 z-50 transform hover:scale-110 animate-bounce"
          style={{ animationDuration: '3s' }}
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-circular-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-circular-green"></span>
          </span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[420px] bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden transform transition-all duration-300 animate-slideUp" style={{ height: '600px' }}>
          <div className="bg-gradient-to-r from-circular-blue via-circular-blue-dark to-circular-blue text-white p-5 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Assistant ISO 59000</h3>
                <p className="text-xs text-white/80 flex items-center">
                  <span className="w-2 h-2 bg-circular-green rounded-full mr-2 animate-pulse"></span>
                  En ligne
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setAutoReadEnabled(!autoReadEnabled)}
                className="hover:bg-white/20 rounded-full p-2 transition-all duration-200"
                title={autoReadEnabled ? "Désactiver lecture auto" : "Activer lecture auto"}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {autoReadEnabled ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  )}
                </svg>
              </button>
              <button
                onClick={() => setContinuousMode(!continuousMode)}
                className={`hover:bg-white/20 rounded-full p-2 transition-all duration-200 ${continuousMode ? 'bg-white/30' : ''}`}
                title={continuousMode ? "Désactiver mode continu" : "Activer mode continu"}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button 
                onClick={() => setIsOpen(false)} 
                className="hover:bg-white/20 rounded-full p-2 transition-all duration-200 hover:rotate-90"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                <div className={`flex ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2 max-w-[85%]`}>
                  {msg.type === 'bot' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-circular-blue to-circular-blue-dark rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-sm">🤖</span>
                    </div>
                  )}
                  <div className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`px-4 py-3 rounded-2xl shadow-md ${
                      msg.type === 'user' 
                        ? 'bg-gradient-to-r from-circular-blue to-circular-blue-dark text-white rounded-br-none' 
                        : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                      {msg.type === 'bot' && (
                        <button
                          onClick={() => speakText(msg.text)}
                          className="mt-2 text-xs text-circular-blue hover:text-circular-blue-dark flex items-center gap-1 transition-colors"
                          title="Écouter la réponse"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                          </svg>
                          Écouter
                        </button>
                      )}
                    </div>
                    <span className="text-xs text-gray-400 mt-1 px-2">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                  {msg.type === 'user' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-circular-green to-circular-green-dark rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-sm">👤</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start animate-fadeIn">
                <div className="flex items-end space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-circular-blue to-circular-blue-dark rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="text-sm">🤖</span>
                  </div>
                  <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl border border-gray-100 shadow-md">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-circular-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-circular-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-circular-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showSuggestions && messages.length === 1 && suggestions.length > 0 && (
              <div className="space-y-2 animate-fadeIn">
                <p className="text-xs text-gray-500 font-medium px-2">💡 Questions suggérées :</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.slice(0, 4).map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-2 bg-white border-2 border-circular-blue/30 text-circular-blue-dark rounded-xl text-xs font-medium hover:bg-circular-blue hover:text-white hover:border-circular-blue transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-100 bg-white">
            {isSpeaking && (
              <div className="mb-2 flex items-center justify-between bg-circular-blue/10 px-3 py-2 rounded-lg">
                <span className="text-xs text-circular-blue-dark flex items-center gap-2">
                  <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                  </svg>
                  Lecture en cours...
                </span>
                <button
                  onClick={stopSpeaking}
                  className="text-xs text-red-600 hover:text-red-700 font-medium"
                >
                  Arrêter
                </button>
              </div>
            )}
            {isListening && (
              <div className="mb-2 flex items-center justify-center bg-red-50 px-3 py-2 rounded-lg">
                <span className="text-xs text-red-600 flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-1 h-4 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '600ms' }}></div>
                    <div className="w-1 h-6 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '100ms', animationDuration: '600ms' }}></div>
                    <div className="w-1 h-8 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '200ms', animationDuration: '600ms' }}></div>
                    <div className="w-1 h-6 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms', animationDuration: '600ms' }}></div>
                    <div className="w-1 h-4 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '400ms', animationDuration: '600ms' }}></div>
                  </div>
                  J'écoute...
                </span>
              </div>
            )}
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !loading && handleSend()}
                placeholder={isListening ? "🎤 Parlez maintenant..." : "Tapez votre question..."}
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-circular-blue focus:border-circular-blue transition-all duration-200 text-sm"
              />
              <button
                onClick={toggleListening}
                onMouseDown={startListening}
                onMouseUp={stopListeningManual}
                onMouseLeave={stopListeningManual}
                onTouchStart={startListening}
                onTouchEnd={stopListeningManual}
                disabled={loading}
                className={`px-4 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 relative ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                title="Cliquer OU maintenir pour parler"
              >
                {isListening && (
                  <span className="absolute inset-0 rounded-xl bg-red-400 animate-ping opacity-75"></span>
                )}
                <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                </svg>
              </button>
              <button 
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="bg-gradient-to-r from-circular-blue to-circular-blue-dark hover:from-circular-blue-dark hover:to-circular-blue text-white px-5 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </>
  )
}
