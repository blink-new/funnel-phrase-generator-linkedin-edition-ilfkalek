import { FormStep } from '@/components/FormStep'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface CompanyNameStepProps {
  value: string
  onChange: (value: string) => void
  onNext: () => void
  onPrev?: () => void
}

export function CompanyNameStep({ value, onChange, onNext, onPrev }: CompanyNameStepProps) {
  return (
    <FormStep
      title="What's your company or product name?"
      subtitle="We'll use this to create branded phrases like 'Slack-tastic' or 'Wix-perience'"
      onNext={onNext}
      onPrev={onPrev}
      nextDisabled={!value.trim()}
      showPrev={false}
    >
      <div className="space-y-4">
        <Label htmlFor="company-name" className="text-base font-medium">
          Company or Product Name
        </Label>
        <Input
          id="company-name"
          type="text"
          placeholder="e.g., Wix, Slack, HubSpot"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-lg py-6 px-4 text-center"
          autoFocus
        />
        <p className="text-sm text-muted-foreground text-center">
          This will be the hero of your LinkedIn campaigns
        </p>
      </div>
    </FormStep>
  )
}