import { useState } from 'react'

interface DataGuidance {
  howToObtain: string
  source: string
  sourceUrl: string
}

interface Question {
  id: string
  text: string
  type: 'boolean' | 'percentage' | 'number' | 'text' | 'choice'
  unit?: string
  choices?: string[]
  weight: number
  guidance?: DataGuidance
}

interface QuestionWithGuidanceProps {
  question: Question
  index: number
  value?: any
  hasData?: boolean
  onResponseChange: (hasData: boolean, value?: any) => void
}

export default function QuestionWithGuidance({ 
  question, 
  index, 
  value, 
  hasData,
  onResponseChange 
}: QuestionWithGuidanceProps) {
  const handleHasDataChange = (hasDataResponse: boolean) => {
    if (hasDataResponse) {
      onResponseChange(true, value)
    } else {
      onResponseChange(false, undefined)
    }
  }

  const handleValueChange = (newValue: any) => {
    onResponseChange(true, newValue)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 hover:shadow-xl transition-all"
         style={{ borderLeftColor: hasData ? '#10b981' : '#e5e7eb' }}>
      
      {/* Question Header */}
      <div className="flex items-start mb-4">
        <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 shadow-md">
          {index + 1}
        </span>
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-900 mb-2">{question.text}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {question.unit && (
              <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                📊 Unité: {question.unit}
              </span>
            )}
            {question.weight > 1 && (
              <span className="inline-flex items-center px-3 py-1 bg-orange-50 text-orange-700 text-xs font-medium rounded-full">
                ⭐ Question prioritaire (×{question.weight})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Étape 1: Disposez-vous de cette donnée ? */}
      <div className="mb-4 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <p className="text-sm font-semibold text-indigo-900 mb-3">
          📋 Disposez-vous de cette donnée pour votre entreprise ?
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => handleHasDataChange(true)}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all font-semibold ${
              hasData === true
                ? 'bg-gradient-to-r from-green-500 to-green-600 border-green-600 text-white shadow-lg'
                : 'border-gray-300 hover:border-green-400 hover:bg-green-50 bg-white text-gray-700'
            }`}
          >
            ✓ OUI
          </button>
          <button
            type="button"
            onClick={() => handleHasDataChange(false)}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all font-semibold ${
              hasData === false
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 border-amber-600 text-white shadow-lg'
                : 'border-gray-300 hover:border-amber-400 hover:bg-amber-50 bg-white text-gray-700'
            }`}
          >
            ℹ️ NON
          </button>
        </div>
      </div>

      {/* Étape 2a: Si OUI, saisir la valeur */}
      {hasData === true && (
        <div className="animate-fadeIn">
          {question.type === 'boolean' && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sélectionnez votre réponse :
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => handleValueChange(true)}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all font-semibold ${
                    value === true
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 bg-white'
                  }`}
                >
                  Oui
                </button>
                <button
                  type="button"
                  onClick={() => handleValueChange(false)}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all font-semibold ${
                    value === false
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 bg-white'
                  }`}
                >
                  Non
                </button>
              </div>
            </div>
          )}

          {question.type === 'percentage' && (
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Saisissez le pourcentage :
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={value || ''}
                onChange={(e) => handleValueChange(parseFloat(e.target.value) || 0)}
                className="w-full px-6 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder="0 - 100"
              />
              <span className="absolute right-6 top-11 text-gray-400 font-bold text-lg">%</span>
            </div>
          )}

          {question.type === 'number' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Saisissez la valeur {question.unit ? `(${question.unit})` : ''} :
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={value || ''}
                onChange={(e) => handleValueChange(parseFloat(e.target.value) || 0)}
                className="w-full px-6 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder={question.unit || 'Entrez une valeur'}
              />
            </div>
          )}

          {question.type === 'text' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Saisissez votre réponse :
              </label>
              <input
                type="text"
                value={value || ''}
                onChange={(e) => handleValueChange(e.target.value)}
                className="w-full px-6 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder="Votre réponse"
              />
            </div>
          )}

          {question.type === 'choice' && question.choices && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sélectionnez une option :
              </label>
              <select
                value={value || ''}
                onChange={(e) => handleValueChange(e.target.value)}
                className="w-full px-6 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              >
                <option value="">-- Sélectionnez --</option>
                {question.choices.map((choice) => (
                  <option key={choice} value={choice}>{choice}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {/* Étape 2b: Si NON, afficher comment obtenir la donnée */}
      {hasData === false && question.guidance && (
        <div className="animate-fadeIn bg-amber-50 border-2 border-amber-200 rounded-lg p-5">
          <div className="flex items-start mb-3">
            <span className="text-2xl mr-3">💡</span>
            <div className="flex-1">
              <h4 className="font-semibold text-amber-900 mb-2">Comment obtenir cette donnée ?</h4>
              <p className="text-sm text-amber-800 mb-4 leading-relaxed">
                {question.guidance.howToObtain}
              </p>
              
              <div className="bg-white rounded-lg p-4 border border-amber-300">
                <p className="text-xs font-semibold text-amber-900 mb-2">
                  📚 Source recommandée :
                </p>
                <a
                  href={question.guidance.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {question.guidance.source} →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
