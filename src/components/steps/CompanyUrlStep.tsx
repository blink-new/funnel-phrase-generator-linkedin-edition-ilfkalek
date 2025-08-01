import { FormStep } from '@/components/FormStep'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface CompanyUrlStepProps {
  value: string
  onChange: (value: string) => void
  onNext: () => void
  onPrev: () => void
}

export function CompanyUrlStep({ value, onChange, onNext, onPrev }: CompanyUrlStepProps) {
  return (
    <FormStep
      title="Company or product URL"
      subtitle="Optional - helps us create more precise and tailored example sentences"
      onNext={onNext}
      onPrev={onPrev}
      nextLabel="Continue"
    >
      <div className="space-y-4">
        <Label htmlFor="company-url" className="text-base font-medium">
          Website URL <span className="text-muted-foreground font-normal">(Optional)</span>
        </Label>
        <Input
          id="company-url"
          type="url"
          placeholder="https://yourcompany.com"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-lg py-6 px-4 text-center"
          autoFocus
        />
        <p className="text-sm text-muted-foreground text-center">
          We'll use this to better understand your brand and create more relevant examples
        </p>
      </div>
    </FormStep>
  )
}