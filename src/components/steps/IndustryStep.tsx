import { FormStep } from '@/components/FormStep'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { INDUSTRY_OPTIONS } from '@/types/form'
import { useState } from 'react'

interface IndustryStepProps {
  value: string
  onChange: (value: string) => void
  onNext: () => void
  onPrev: () => void
}

export function IndustryStep({ value, onChange, onNext, onPrev }: IndustryStepProps) {
  const [isCustom, setIsCustom] = useState(!INDUSTRY_OPTIONS.includes(value as any) && value !== '')

  const handleSelectChange = (selectedValue: string) => {
    if (selectedValue === 'Other') {
      setIsCustom(true)
      onChange('')
    } else {
      setIsCustom(false)
      onChange(selectedValue)
    }
  }

  return (
    <FormStep
      title="What industry are you in?"
      subtitle="This helps us understand your market and create industry-relevant phrases"
      onNext={onNext}
      onPrev={onPrev}
      nextDisabled={!value.trim()}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <Label className="text-base font-medium">Industry</Label>
          {!isCustom ? (
            <Select value={value} onValueChange={handleSelectChange}>
              <SelectTrigger className="text-lg py-6 px-4">
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                {INDUSTRY_OPTIONS.map((industry) => (
                  <SelectItem key={industry} value={industry} className="text-lg py-3">
                    {industry}
                  </SelectItem>
                ))}
                <SelectItem value="Other" className="text-lg py-3">
                  Other (specify)
                </SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <div className="space-y-3">
              <Input
                type="text"
                placeholder="Enter your industry"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="text-lg py-6 px-4"
                autoFocus
              />
              <button
                type="button"
                onClick={() => {
                  setIsCustom(false)
                  onChange('')
                }}
                className="text-sm text-primary hover:underline"
              >
                ← Choose from list instead
              </button>
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground text-center">
          We'll tailor the language to fit your industry context
        </p>
      </div>
    </FormStep>
  )
}