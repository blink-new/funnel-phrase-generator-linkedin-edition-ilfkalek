import { FormStep } from '@/components/FormStep'
import { Label } from '@/components/ui/label'
import { QUANTITY_OPTIONS } from '@/types/form'
import { motion } from 'framer-motion'

interface QuantityStepProps {
  value: string
  onChange: (value: string) => void
  onNext: () => void
  onPrev: () => void
}

export function QuantityStep({ value, onChange, onNext, onPrev }: QuantityStepProps) {
  return (
    <FormStep
      title="How many phrases do you want?"
      subtitle="Choose the quantity that fits your campaign needs"
      onNext={onNext}
      onPrev={onPrev}
      nextDisabled={!value}
    >
      <div className="space-y-6">
        <Label className="text-base font-medium">Phrase Quantity</Label>
        <div className="space-y-4">
          {QUANTITY_OPTIONS.map((option, index) => (
            <motion.button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`w-full p-6 rounded-lg border-2 text-left transition-all duration-200 ${
                value === option.value
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-semibold text-xl mb-2">{option.label}</div>
              <div className="text-muted-foreground">
                {option.value === '1-2' 
                  ? 'Perfect for testing a concept or quick inspiration'
                  : 'Build a comprehensive library of campaign phrases'
                }
              </div>
            </motion.button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground text-center">
          You can always generate more phrases later
        </p>
      </div>
    </FormStep>
  )
}