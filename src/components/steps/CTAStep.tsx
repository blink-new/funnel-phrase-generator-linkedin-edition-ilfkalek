import { FormStep } from '@/components/FormStep'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { motion } from 'framer-motion'

interface CTAStepProps {
  value: boolean
  onChange: (value: boolean) => void
  onNext: () => void
  onPrev: () => void
}

export function CTAStep({ value, onChange, onNext, onPrev }: CTAStepProps) {
  return (
    <FormStep
      title="Include call-to-action?"
      subtitle="We can auto-generate funnel-stage aligned CTAs like 'Download the Guide'"
      onNext={onNext}
      onPrev={onPrev}
      nextLabel="Generate Phrases"
    >
      <div className="space-y-8">
        <motion.div 
          className="flex items-center justify-center space-x-4 p-8 rounded-lg border-2 border-dashed border-border"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Label htmlFor="include-cta" className="text-lg font-medium cursor-pointer">
            Include CTA in phrases
          </Label>
          <Switch
            id="include-cta"
            checked={value}
            onCheckedChange={onChange}
            className="scale-125"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="text-center space-y-4"
        >
          <div className="text-sm text-muted-foreground">
            {value ? (
              <div className="space-y-2">
                <p className="text-accent font-medium">✓ CTAs will be included</p>
                <p>We'll generate relevant calls-to-action that align with your funnel stage</p>
              </div>
            ) : (
              <div className="space-y-2">
                <p>CTAs will not be included</p>
                <p>Focus purely on the branded phrases and messaging</p>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="bg-muted/30 rounded-lg p-6 text-center"
        >
          <p className="text-sm text-muted-foreground">
            🎉 Ready to generate your LinkedIn campaign phrases!
          </p>
        </motion.div>
      </div>
    </FormStep>
  )
}