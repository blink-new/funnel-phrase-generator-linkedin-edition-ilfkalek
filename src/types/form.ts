export interface FormData {
  // The Hero (Your Company & Product)
  companyName: string
  productName: string
  productDescription: string
  companyUrl: string

  // The Audience (Campaign Context)
  funnelStage: string
  personaJobRole: string
  industry: string
  customIndustry: string
  keyPainPoint: string
  toneOfVoice: string

  // The Output (Customization)
  phraseStyle: string
  phraseQuantity: string
  includeCTA: boolean
}

export interface GeneratedPhrase {
  id: string
  brandedPhrase: string
  meaning: string
  linkedinExample: string
  proTip: string
  cta?: string
}

export const FUNNEL_STAGES = [
  'Awareness',
  'Consideration', 
  'Conversion'
]

export const INDUSTRIES = [
  'SaaS',
  'EdTech',
  'E-commerce',
  'HR Tech',
  'B2B Services',
  'HealthTech',
  'Cybersecurity',
  'Nonprofit',
  'Startup',
  'Enterprise',
  'Other...'
]

export const TONE_OPTIONS = [
  'Bold & Confident',
  'Empathetic & Understanding',
  'Quirky & Fun',
  'Frustration-to-Hope',
  'Friendly & Professional',
  'Humorous',
  'Inspiring'
]

export const PHRASE_STYLES = [
  { value: 'Branded Neologism', label: 'Branded Neologism', description: 'Short, clever invented words (e.g., "Wix-tory")' },
  { value: 'Descriptive Tagline', label: 'Descriptive Tagline', description: 'Longer marketing slogans (5-10 words)' }
]

export const PHRASE_QUANTITIES = [
  { value: '1-2', label: '1–2 phrases' },
  { value: '5-10', label: '5–10 phrases' }
]