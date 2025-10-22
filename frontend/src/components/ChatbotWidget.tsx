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
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      loadSuggestions()
    }
  }, [isOpen])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
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
            <button 
              onClick={() => setIsOpen(false)} 
              className="hover:bg-white/20 rounded-full p-2 transition-all duration-200 hover:rotate-90"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
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
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !loading && handleSend()}
                placeholder="Tapez votre question..."
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-circular-blue focus:border-circular-blue transition-all duration-200 text-sm"
              />
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
