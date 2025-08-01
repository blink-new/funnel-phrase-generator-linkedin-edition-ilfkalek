import { FormStep } from '@/components/FormStep'
import { Label } from '@/components/ui/label'
import { TONE_OPTIONS } from '@/types/form'
import { motion } from 'framer-motion'

interface ToneStepProps {
  value: string
  onChange: (value: string) => void
  onNext: () => void
  onPrev: () => void
}

export function ToneStep({ value, onChange, onNext, onPrev }: ToneStepProps) {
  return (
    <FormStep
      title="What tone of voice?"
      subtitle="Choose the emotional approach that best fits your brand and audience"
      onNext={onNext}
      onPrev={onPrev}
      nextDisabled={!value}
    >
      <div className="space-y-6">
        <Label className="text-base font-medium">Tone of Voice</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {TONE_OPTIONS.map((tone, index) => (
            <motion.button
              key={tone}
              type="button"
              onClick={() => onChange(tone)}
              className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                value === tone
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-medium text-lg">{tone}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {getToneDescription(tone)}
              </div>
            </motion.button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground text-center">
          This will shape the emotional intelligence of your phrases
        </p>
      </div>
    </FormStep>
  )
}

function getToneDescription(tone: string): string {
  const descriptions = {
    'Bold': 'Confident and assertive messaging',
    'Empathetic': 'Understanding and compassionate',
    'Quirky': 'Playful and unconventional',
    'Frustration-to-Hope': 'Acknowledges pain, offers solution',
    'Friendly but Professional': 'Approachable yet credible',
    'Humorous (Light)': 'Gentle wit and charm',
    'Humorous (Bold)': 'Strong humor and personality',
    'Inspiring': 'Motivational and uplifting'
  }
  return descriptions[tone as keyof typeof descriptions] || ''
}