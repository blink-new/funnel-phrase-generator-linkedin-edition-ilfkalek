import { FormStep } from '@/components/FormStep'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface PainPointStepProps {
  value: string
  onChange: (value: string) => void
  onNext: () => void
  onPrev: () => void
}

export function PainPointStep({ value, onChange, onNext, onPrev }: PainPointStepProps) {
  const remainingChars = 200 - value.length

  return (
    <FormStep
      title="What's their key pain point?"
      subtitle="What real-world frustration does your target persona face daily?"
      onNext={onNext}
      onPrev={onPrev}
      nextDisabled={!value.trim() || value.length > 200}
    >
      <div className="space-y-4">
        <Label htmlFor="pain-point" className="text-base font-medium">
          Key Pain Point
        </Label>
        <Textarea
          id="pain-point"
          placeholder="e.g., Can't launch content without dev support"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-lg py-4 px-4 min-h-[120px] resize-none"
          maxLength={200}
          autoFocus
        />
        <div className="flex justify-between items-center text-sm">
          <p className="text-muted-foreground">
            Be specific about their frustration
          </p>
          <span className={`font-medium ${remainingChars < 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
            {remainingChars} characters remaining
          </span>
        </div>
      </div>
    </FormStep>
  )
}