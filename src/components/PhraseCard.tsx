import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, RotateCcw, Check, ExternalLink } from 'lucide-react'
import { GeneratedPhrase } from '../types/form'

interface PhraseCardProps {
  phrase: GeneratedPhrase
  index: number
  onRegenerate: (phraseId: string) => void
  isRegenerating?: boolean
}

export default function PhraseCard({ phrase, index, onRegenerate, isRegenerating = false }: PhraseCardProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(fieldName)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const copyAllContent = async () => {
    const content = `
Branded Phrase: ${phrase.brandedPhrase}

Meaning: ${phrase.meaning}

LinkedIn Example: ${phrase.linkedinExample}

Pro Tip: ${phrase.proTip}${phrase.cta ? `\n\nCTA: ${phrase.cta}` : ''}
    `.trim()

    await copyToClipboard(content, 'all')
  }

  const CopyButton = ({ text, fieldName, className = "" }: { text: string; fieldName: string; className?: string }) => (
    <button
      onClick={() => copyToClipboard(text, fieldName)}
      className={`p-2 text-gray-400 hover:text-[#D84E89] transition-all duration-200 rounded-lg hover:bg-gray-50 hover:scale-110 ${className}`}
      title={`Copy ${fieldName}`}
    >
      {copiedField === fieldName ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <h3 className="text-xl font-bold bg-gradient-to-r from-[#D84E89] to-[#F3735D] bg-clip-text text-transparent">
              {phrase.brandedPhrase}
            </h3>
            <CopyButton text={phrase.brandedPhrase} fieldName="phrase" className="ml-2" />
          </div>
          <span className="text-sm text-gray-500 font-medium">Phrase #{index + 1}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={copyAllContent}
            className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200 flex items-center hover:scale-105"
            title="Copy all content"
          >
            {copiedField === 'all' ? (
              <>
                <Check className="w-4 h-4 mr-1 text-green-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-1" />
                Copy All
              </>
            )}
          </button>
          
          <button
            onClick={() => onRegenerate(phrase.id)}
            disabled={isRegenerating}
            className="p-2 text-gray-400 hover:text-[#D84E89] transition-all duration-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 hover:scale-110"
            title="Regenerate this phrase"
          >
            <RotateCcw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Meaning */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-800">Meaning</h4>
            <CopyButton text={phrase.meaning} fieldName="meaning" />
          </div>
          <p className="text-gray-600 leading-relaxed">{phrase.meaning}</p>
        </div>

        {/* LinkedIn Example */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-800">LinkedIn Example</h4>
            <CopyButton text={phrase.linkedinExample} fieldName="example" />
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg hover:bg-blue-100 transition-colors duration-200">
            <p className="text-gray-700 italic">"{phrase.linkedinExample}"</p>
          </div>
        </div>

        {/* Pro Tip */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-800">Pro Tip</h4>
            <CopyButton text={phrase.proTip} fieldName="tip" />
          </div>
          <div className="bg-gradient-to-r from-[#D84E89]/10 to-[#F3735D]/10 border border-[#D84E89]/20 p-4 rounded-lg hover:from-[#D84E89]/15 hover:to-[#F3735D]/15 transition-all duration-200">
            <p className="text-gray-700">{phrase.proTip}</p>
          </div>
        </div>

        {/* CTA */}
        {phrase.cta && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-800">Call to Action</h4>
              <CopyButton text={phrase.cta} fieldName="cta" />
            </div>
            <button className="bg-gradient-to-r from-[#D84E89] to-[#F3735D] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center">
              {phrase.cta}
              <ExternalLink className="w-4 h-4 ml-2" />
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Ready for LinkedIn campaigns</span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            ✓ Brand Hero Positioned
          </span>
        </div>
      </div>
    </motion.div>
  )
}