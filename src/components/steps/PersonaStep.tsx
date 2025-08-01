import { FormStep } from '@/components/FormStep'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface PersonaStepProps {
  value: string
  onChange: (value: string) => void
  onNext: () => void
  onPrev: () => void
}

export function PersonaStep({ value, onChange, onNext, onPrev }: PersonaStepProps) {
  return (
    <FormStep
      title="Who are you targeting?"
      subtitle="What's their job role or position? This helps us craft the right tone."
      onNext={onNext}
      onPrev={onPrev}
      nextDisabled={!value.trim()}
    >
      <div className="space-y-4">
        <Label htmlFor="persona-role" className="text-base font-medium">
          Target Persona Job Role
        </Label>
        <Input
          id="persona-role"
          type="text"
          placeholder="e.g., Head of Content, Marketing Manager, CEO"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-lg py-6 px-4 text-center"
          autoFocus
        />
        <p className="text-sm text-muted-foreground text-center">
          Think about who will resonate most with your message
        </p>
      </div>
    </FormStep>
  )
}