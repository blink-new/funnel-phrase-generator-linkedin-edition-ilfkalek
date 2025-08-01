import { motion } from 'framer-motion'
import { Download, RotateCcw } from 'lucide-react'
import { GeneratedPhrase, FormData } from '../types/form'
import PhraseCard from './PhraseCard'
import LoadingCards from './LoadingCards'

interface ResultsDisplayProps {
  phrases: GeneratedPhrase[]
  isLoading: boolean
  onRegenerateAll: () => void
  onRegeneratePhrase: (phraseId: string) => void
  onExport: () => void
  formData: FormData
}

export default function ResultsDisplay({ 
  phrases, 
  isLoading, 
  onRegenerateAll, 
  onRegeneratePhrase, 
  onExport, 
  formData 
}: ResultsDisplayProps) {
  // Don't show anything if no phrases and not loading
  if (!isLoading && phrases.length === 0) {
    return null
  }

  const expectedPhraseCount = formData.phraseQuantity === '1-2' ? 2 : 8

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6 mt-8"
    >
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#D84E89] to-[#F3735D] bg-clip-text text-transparent">
            {isLoading ? 'Generating Your Phrases...' : 'Your LinkedIn Phrases'}
          </h2>
          <p className="text-gray-600 mt-1">
            {isLoading 
              ? `Creating ${expectedPhraseCount} branded phrases for ${formData.companyName}` 
              : `${phrases.length} emotionally intelligent phrases ready for LinkedIn campaigns`
            }
          </p>
        </div>

        {/* Action Buttons - Only show when we have results */}
        {!isLoading && phrases.length > 0 && (
          <div className="flex items-center space-x-3">
            <button
              onClick={onExport}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200 flex items-center hover:scale-105"
              title="Export all phrases"
            >
              <Download className="w-4 h-4 mr-2" />
              Export All
            </button>
            
            <button
              onClick={onRegenerateAll}
              className="px-4 py-2 bg-gradient-to-r from-[#D84E89] to-[#F3735D] text-white rounded-lg transition-all duration-200 flex items-center hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25"
              title="Regenerate all phrases"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Regenerate All
            </button>
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-3"></div>
              <span className="text-blue-700 font-medium">
                AI is crafting your branded phrases...
              </span>
            </div>
          </div>
          <LoadingCards count={expectedPhraseCount} />
        </div>
      )}

      {/* Results */}
      {!isLoading && phrases.length > 0 && (
        <div className="space-y-6">
          {phrases.map((phrase, index) => (
            <PhraseCard
              key={phrase.id}
              phrase={phrase}
              index={index}
              onRegenerate={onRegeneratePhrase}
            />
          ))}

          {/* Results Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: phrases.length * 0.1 + 0.2 }}
            className="text-center py-8 border-t border-gray-200"
          >
            <div className="bg-gradient-to-r from-[#D84E89]/10 to-[#F3735D]/10 border border-[#D84E89]/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                🎉 Your LinkedIn Campaign Phrases Are Ready!
              </h3>
              <p className="text-gray-600 mb-4">
                Each phrase positions <strong>{formData.companyName}</strong> as the hero with positive, empowering messaging.
                Copy individual elements or export everything for your LinkedIn campaigns.
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-sm">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  ✓ Brand Hero Positioned
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  ✓ Emotionally Intelligent
                </span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                  ✓ LinkedIn Optimized
                </span>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                  ✓ {formData.toneOfVoice} Tone
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}