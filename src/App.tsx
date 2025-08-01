import { useState, useEffect } from 'react'
import { createClient } from './blink/client'
import { FormData, GeneratedPhrase } from './types/form'
import SinglePageForm from './components/SinglePageForm'
import ResultsDisplay from './components/ResultsDisplay'

const blink = createClient()

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [phrases, setPhrases] = useState<GeneratedPhrase[]>([])
  
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    productName: '',
    productDescription: '',
    companyUrl: '',
    funnelStage: '',
    personaJobRole: '',
    industry: '',
    customIndustry: '',
    keyPainPoint: '',
    toneOfVoice: '',
    phraseStyle: '',
    phraseQuantity: '',
    includeCTA: false
  })

  // Auth state management
  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  const generatePhrases = async () => {
    setIsGenerating(true)
    setPhrases([]) // Clear previous results
    
    try {
      const industry = formData.industry === 'Other...' ? formData.customIndustry : formData.industry
      const phraseCount = formData.phraseQuantity === '1-2' ? 2 : 8
      
      // Create the AI prompt with enhanced creative lexicon and style guidance
      const brandName = formData.productName || formData.companyName
      const prompt = `
You are an expert LinkedIn copywriter specializing in emotionally intelligent, branded campaign phrases that are strategic, human-centric, and tied to specific business outcomes.

CREATIVE MODEL: Generate phrases that are not just clever, but are strategic, human-centric, and tied to a specific business outcome. Model your creativity after these enhanced examples:

EMPOWERMENT & AUTONOMY EXAMPLES:
- The Wix-Factor: The power to launch projects with speed and autonomy.
- Slack-celerate: To empower teams with instant communication and decision-making speed.

SPEED & EFFICIENCY EXAMPLES:
- Wix-by: To build and launch so quickly, it feels unreal.
- Udem-o-mentum: The rapid increase in a team's skill and productivity during a project-based learning sprint.

POSITIVE OUTCOME & SUCCESS EXAMPLES:
- Wix-tory: A decisive and successful project win.
- Udemy-fied: The state of being fully skilled and project-ready after completing a targeted learning path.

EASE & SIMPLICITY EXAMPLES:
- Wix-perience: A frictionless and enjoyable user process.
- Udemystify: To make a complex subject simple and easy to understand through a practical course.

PAIN POINT & FRUSTRATION (NEGATIVE EXAMPLES TO AVOID):
- "That's Not Wixable": A project blocked by technical limitations. [AVOID - This associates the brand with limitations]

MANDATORY TONE DIRECTIVE: The selected Tone of Voice (${formData.toneOfVoice}) is the most important stylistic filter and must dictate the entire mood of the output. It should influence the choice of verbs, adjectives, and the overall framing of the message. For example, an Inspiring tone should use aspirational, visionary language about future potential, while an Empathetic tone should use more caring and understanding language about current struggles.

MANDATORY GLOBAL RULE: Each generated phrase card MUST be completely unique. DO NOT repeat sentences, core ideas, or exact phrasing between cards. Each card must offer distinct value and approach.

COMPANY CONTEXT:
- Company Name: ${formData.companyName}
- Product Name: ${formData.productName || 'Not provided'}
- Primary Brand for Phrases: ${brandName}
- Description: ${formData.productDescription}
- URL: ${formData.companyUrl || 'Not provided'}

TARGET AUDIENCE:
- Funnel Stage: ${formData.funnelStage}
- Persona: ${formData.personaJobRole} in ${industry}
- Pain Point: ${formData.keyPainPoint}
- Tone: ${formData.toneOfVoice}

PHRASE STYLE REQUIREMENT:
- Selected Style: ${formData.phraseStyle}
${formData.phraseStyle === 'Branded Neologism' ? 
  '- FORMAT: Create short, clever neologisms (ideally single invented words) by blending the brand name with concept words (e.g., Wix + Victory = Wix-tory). DO NOT generate long taglines or descriptive sentences.' :
  '- FORMAT: Create slightly longer, more descriptive marketing slogans or taglines (5-10 words) that capture the essence of the product\'s value proposition in a compelling sentence.'
}

CRITICAL REQUIREMENTS - FOLLOW THESE HARD RULES:

1. HERO RULE: The brand (${brandName}) is ALWAYS the hero. Phrases must have positive, empowering, solution-oriented connotations.

2. NO NEGATIVITY RULE: NEVER associate branded phrases with pain points, failure, or frustration. Avoid phrases like "Pain-Pal" or any negative wordplay.

3. BRAND PRIORITIZATION: ${formData.productName ? 
  `PRIORITIZE the Product Name "${formData.productName}" for wordplay as it is more specific to the campaign. Only use the Company Name "${formData.companyName}" if it creates a better phrase.` :
  `Use the Company Name "${formData.companyName}" for branded wordplay.`
}

4. PHRASE STYLE ENFORCEMENT: The "Branded Phrase" field MUST follow the ${formData.phraseStyle} format exactly as specified above. The phrase itself should reflect the chosen Tone of Voice (e.g., an Inspiring phrase should feel visionary; a Quirky phrase should feel playful).

5. FALLBACK: If clever branded wordplay isn't possible with the chosen style, create high-impact, emotionally resonant phrases that position the brand as the solution hero without direct wordplay.

6. LINKEDIN EXAMPLE SENTENCE - NON-NEGOTIABLE CORE DIRECTIVE: Generate a hook-style, LinkedIn-ready example. The sentence MUST transform the user's first-person Key Pain Point into a direct, third-person question or statement aimed at the target audience. It must address the core frustration in a way that speaks to the reader, not as the reader. The entire sentence, from the hook to the outcome, must be written in the selected Tone of Voice (${formData.toneOfVoice}).

7. TRANSFORMATION LOGIC: Convert "${formData.keyPainPoint}" into a direct, third-person question or statement. For example, if the pain point is "Our sales team is stuck chasing cold leads," the sentence must be "Is your sales team stuck chasing cold leads? With [Branded Phrase], you can..."
   
   SELF-CORRECTION CHECK: Before finalizing the sentence, ask yourself: "Have I successfully converted the user's internal complaint into a direct outward-facing marketing question or statement?" If no, rewrite it until it does.

8. PRO TIP MANDATORY RULE: MUST be explicitly tailored to "${formData.personaJobRole}". Start the sentence by directly addressing the persona (e.g., "For a ${formData.personaJobRole}, the key is to...") and provide strategic advice that mentions goals, tools, or workflows relevant to their specific role.

9. UNIQUENESS ENFORCEMENT: Ensure each of the ${phraseCount} cards has completely different approaches, angles, and phrasing. No repetition allowed.

10. CTA GENERATION: ${formData.includeCTA ? `Include a ${formData.funnelStage.toLowerCase()}-stage aligned CTA (e.g., "Download the Guide" for Awareness, "See Use Cases" for Consideration, "Book a Demo" for Conversion). Each CTA must be unique.` : 'Do not include CTAs'}

For each phrase, provide:
- brandedPhrase: The ${formData.phraseStyle} following the format requirements (always positive, hero-positioning, must be unique from other cards)
- meaning: Short explanation of what it conveys (must be unique from other cards)
- linkedinExample: Hook-style LinkedIn post example that DIRECTLY addresses the exact pain point "${formData.keyPainPoint}" and positions the branded phrase as the solution (must be unique from other cards)
- proTip: Strategic advice starting with "For a ${formData.personaJobRole}, the key is to..." tied to their role-specific challenges (must be unique from other cards)
${formData.includeCTA ? '- cta: Funnel-stage aligned call to action (must be unique from other cards)' : ''}

Generate exactly ${phraseCount} completely unique, creative phrases that make ${brandName} the hero and directly solve the exact pain point "${formData.keyPainPoint}".
      `

      const { object } = await blink.ai.generateObject({
        prompt,
        schema: {
          type: 'object',
          properties: {
            phrases: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  brandedPhrase: { type: 'string' },
                  meaning: { type: 'string' },
                  linkedinExample: { type: 'string' },
                  proTip: { type: 'string' },
                  ...(formData.includeCTA && { cta: { type: 'string' } })
                },
                required: ['brandedPhrase', 'meaning', 'linkedinExample', 'proTip']
              }
            }
          },
          required: ['phrases']
        }
      })

      // Transform the response into GeneratedPhrase objects
      const generatedPhrases: GeneratedPhrase[] = object.phrases.map((phrase: any, index: number) => ({
        id: `phrase-${Date.now()}-${index}`,
        brandedPhrase: phrase.brandedPhrase,
        meaning: phrase.meaning,
        linkedinExample: phrase.linkedinExample,
        proTip: phrase.proTip,
        ...(phrase.cta && { cta: phrase.cta })
      }))

      setPhrases(generatedPhrases)
    } catch (error) {
      console.error('Error generating phrases:', error)
      // You could add error handling UI here
    } finally {
      setIsGenerating(false)
    }
  }

  const regenerateAllPhrases = () => {
    generatePhrases()
  }

  const regeneratePhrase = async (phraseId: string) => {
    try {
      const industry = formData.industry === 'Other...' ? formData.customIndustry : formData.industry
      const brandName = formData.productName || formData.companyName
      
      const prompt = `
Generate 1 new branded phrase following the same CRITICAL REQUIREMENTS and enhanced creative model:

CREATIVE MODEL: Generate phrases that are strategic, human-centric, and tied to specific business outcomes. Model your creativity after these enhanced examples:

EMPOWERMENT & AUTONOMY EXAMPLES:
- The Wix-Factor: The power to launch projects with speed and autonomy.
- Slack-celerate: To empower teams with instant communication and decision-making speed.

SPEED & EFFICIENCY EXAMPLES:
- Wix-by: To build and launch so quickly, it feels unreal.
- Udem-o-mentum: The rapid increase in a team's skill and productivity during a project-based learning sprint.

POSITIVE OUTCOME & SUCCESS EXAMPLES:
- Wix-tory: A decisive and successful project win.
- Udemy-fied: The state of being fully skilled and project-ready after completing a targeted learning path.

EASE & SIMPLICITY EXAMPLES:
- Wix-perience: A frictionless and enjoyable user process.
- Udemystify: To make a complex subject simple and easy to understand through a practical course.

MANDATORY TONE DIRECTIVE: The selected Tone of Voice (${formData.toneOfVoice}) is the most important stylistic filter and must dictate the entire mood of the output. It should influence the choice of verbs, adjectives, and the overall framing of the message.

MANDATORY GLOBAL RULE: This phrase card MUST be completely unique from any existing phrases. DO NOT repeat sentences, core ideas, or exact phrasing.

COMPANY CONTEXT:
- Company Name: ${formData.companyName}
- Product Name: ${formData.productName || 'Not provided'}
- Primary Brand for Phrases: ${brandName}
- Description: ${formData.productDescription}

TARGET AUDIENCE:
- Funnel Stage: ${formData.funnelStage}
- Persona: ${formData.personaJobRole} in ${industry}
- Pain Point: ${formData.keyPainPoint}
- Tone: ${formData.toneOfVoice}

PHRASE STYLE REQUIREMENT:
- Selected Style: ${formData.phraseStyle}
${formData.phraseStyle === 'Branded Neologism' ? 
  '- FORMAT: Create short, clever neologisms (ideally single invented words) by blending the brand name with concept words (e.g., Wix + Victory = Wix-tory). DO NOT generate long taglines or descriptive sentences.' :
  '- FORMAT: Create slightly longer, more descriptive marketing slogans or taglines (5-10 words) that capture the essence of the product\'s value proposition in a compelling sentence.'
}

CRITICAL REQUIREMENTS:
1. HERO RULE: ${brandName} is ALWAYS the hero with positive, empowering connotations
2. NO NEGATIVITY: Never associate branded phrases with pain points or negative wordplay
3. BRAND PRIORITIZATION: ${formData.productName ? 
  `PRIORITIZE the Product Name "${formData.productName}" for wordplay as it is more specific to the campaign. Only use the Company Name "${formData.companyName}" if it creates a better phrase.` :
  `Use the Company Name "${formData.companyName}" for branded wordplay.`
}
4. PHRASE STYLE ENFORCEMENT: The "Branded Phrase" field MUST follow the ${formData.phraseStyle} format exactly as specified above. The phrase itself should reflect the chosen Tone of Voice (e.g., an Inspiring phrase should feel visionary; a Quirky phrase should feel playful).
5. LINKEDIN EXAMPLE SENTENCE - NON-NEGOTIABLE CORE DIRECTIVE: Generate a hook-style, LinkedIn-ready example. The sentence MUST transform the user's first-person Key Pain Point into a direct, third-person question or statement aimed at the target audience. It must address the core frustration in a way that speaks to the reader, not as the reader. The entire sentence, from the hook to the outcome, must be written in the selected Tone of Voice (${formData.toneOfVoice}).
6. TRANSFORMATION LOGIC: Convert "${formData.keyPainPoint}" into a direct, third-person question or statement. For example, if the pain point is "Our sales team is stuck chasing cold leads," the sentence must be "Is your sales team stuck chasing cold leads? With [Branded Phrase], you can..."
7. SELF-CORRECTION CHECK: Ask yourself: "Have I successfully converted the user's internal complaint into a direct outward-facing marketing question or statement?" If no, rewrite it.
8. PRO TIP MANDATORY RULE: MUST start with "For a ${formData.personaJobRole}, the key is to..." and provide strategic advice mentioning goals, tools, or workflows relevant to their specific role.

Create a completely different phrase than the existing ones, following all hero positioning and pain point addressing requirements.
      `

      const { object } = await blink.ai.generateObject({
        prompt,
        schema: {
          type: 'object',
          properties: {
            brandedPhrase: { type: 'string' },
            meaning: { type: 'string' },
            linkedinExample: { type: 'string' },
            proTip: { type: 'string' },
            ...(formData.includeCTA && { cta: { type: 'string' } })
          },
          required: ['brandedPhrase', 'meaning', 'linkedinExample', 'proTip']
        }
      })

      // Replace the specific phrase
      setPhrases(prevPhrases => 
        prevPhrases.map(phrase => 
          phrase.id === phraseId 
            ? {
                id: `phrase-${Date.now()}`,
                brandedPhrase: object.brandedPhrase,
                meaning: object.meaning,
                linkedinExample: object.linkedinExample,
                proTip: object.proTip,
                ...(object.cta && { cta: object.cta })
              }
            : phrase
        )
      )
    } catch (error) {
      console.error('Error regenerating phrase:', error)
    }
  }

  const exportPhrases = () => {
    const content = phrases.map((phrase, index) => `
PHRASE ${index + 1}: ${phrase.brandedPhrase}

Meaning: ${phrase.meaning}

LinkedIn Example: ${phrase.linkedinExample}

Pro Tip: ${phrase.proTip}${phrase.cta ? `\n\nCTA: ${phrase.cta}` : ''}

${'='.repeat(50)}
    `).join('\n')

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${formData.companyName}-linkedin-phrases.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            HeroPhrases
          </h1>
          <p className="text-xl text-gray-500 font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Funnel Phrase Generator – LinkedIn Edition</p>
          <p className="text-gray-500 mb-8">
            Sign in to generate strategic, emotionally intelligent LinkedIn campaign phrases that position your company as the hero
          </p>
          <button
            onClick={() => blink.auth.login()}
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200 hover:scale-105"
          >
            Sign In to Continue
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <SinglePageForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={generatePhrases}
        isLoading={isGenerating}
      />
      
      <ResultsDisplay
        phrases={phrases}
        isLoading={isGenerating}
        onRegenerateAll={regenerateAllPhrases}
        onRegeneratePhrase={regeneratePhrase}
        onExport={exportPhrases}
        formData={formData}
      />
    </div>
  )
}

export default App