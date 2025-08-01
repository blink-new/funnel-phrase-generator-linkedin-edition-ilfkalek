import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { PhraseCard } from '@/components/PhraseCard'
import { GeneratedPhrase } from '@/types/form'
import { RefreshCw, ArrowLeft, Download } from 'lucide-react'

interface ResultsPageProps {
  phrases: GeneratedPhrase[]
  onRegenerate: () => void
  onStartOver: () => void
  isGenerating: boolean
}

export function ResultsPage({ phrases, onRegenerate, onStartOver, isGenerating }: ResultsPageProps) {
  const exportPhrases = () => {
    const content = phrases.map((phrase, index) => {
      return `PHRASE ${index + 1}:
Branded Phrase: ${phrase.brandedPhrase}
Meaning: ${phrase.meaning}
Example Sentence: "${phrase.exampleSentence}"
Pro Tip: ${phrase.proTip}${phrase.cta ? `\nCTA: ${phrase.cta}` : ''}

---

`
    }).join('')

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'linkedin-campaign-phrases.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Your LinkedIn Campaign Phrases
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Emotionally intelligent, branded phrases ready for your LinkedIn campaigns
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-wrap justify-center gap-4 mb-8"
      >
        <Button
          onClick={onRegenerate}
          disabled={isGenerating}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          {isGenerating ? 'Generating...' : 'Regenerate Phrases'}
        </Button>
        
        <Button
          variant="outline"
          onClick={exportPhrases}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export All
        </Button>
        
        <Button
          variant="outline"
          onClick={onStartOver}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Start Over
        </Button>
      </motion.div>

      {/* Loading State */}
      {isGenerating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="inline-flex items-center gap-3 text-lg text-muted-foreground">
            <RefreshCw className="w-5 h-5 animate-spin" />
            Crafting your emotionally intelligent phrases...
          </div>
        </motion.div>
      )}

      {/* Phrases Grid */}
      {!isGenerating && phrases.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-6"
        >
          {phrases.map((phrase, index) => (
            <PhraseCard
              key={index}
              phrase={phrase}
              index={index}
            />
          ))}
        </motion.div>
      )}

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-center mt-12 pt-8 border-t border-border"
      >
        <p className="text-sm text-muted-foreground">
          Ready to dominate LinkedIn? Use these phrases to create campaigns that resonate.
        </p>
      </motion.div>
    </motion.div>
  )
}