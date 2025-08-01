import { FormStep } from '@/components/FormStep'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface ProductDescriptionStepProps {
  value: string
  onChange: (value: string) => void
  onNext: () => void
  onPrev: () => void
}

export function ProductDescriptionStep({ value, onChange, onNext, onPrev }: ProductDescriptionStepProps) {
  const remainingChars = 180 - value.length

  return (
    <FormStep
      title="Describe your product or solution"
      subtitle="What does it help solve? Keep it concise and focused."
      onNext={onNext}
      onPrev={onPrev}
      nextDisabled={!value.trim() || value.length > 180}
    >
      <div className="space-y-4">
        <Label htmlFor="product-description" className="text-base font-medium">
          Product/Solution Description
        </Label>
        <Textarea
          id="product-description"
          placeholder="e.g., A no-code website builder for fast, professional campaigns"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-lg py-4 px-4 min-h-[120px] resize-none"
          maxLength={180}
          autoFocus
        />
        <div className="flex justify-between items-center text-sm">
          <p className="text-muted-foreground">
            Be specific about the value you provide
          </p>
          <span className={`font-medium ${remainingChars < 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
            {remainingChars} characters remaining
          </span>
        </div>
      </div>
    </FormStep>
  )
}