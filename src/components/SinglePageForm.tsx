import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2, RotateCcw } from 'lucide-react'
import { FormData, FUNNEL_STAGES, INDUSTRIES, TONE_OPTIONS, PHRASE_STYLES, PHRASE_QUANTITIES } from '../types/form'

interface SinglePageFormProps {
  formData: FormData
  setFormData: (data: FormData) => void
  onSubmit: () => void
  isLoading: boolean
}

export default function SinglePageForm({ formData, setFormData, onSubmit, isLoading }: SinglePageFormProps) {
  const [isFormValid, setIsFormValid] = useState(false)

  // Check form validity
  useEffect(() => {
    const requiredFields = [
      formData.companyName,
      formData.productDescription,
      formData.funnelStage,
      formData.personaJobRole,
      formData.industry !== 'Other...' ? formData.industry : formData.customIndustry,
      formData.keyPainPoint,
      formData.toneOfVoice,
      formData.phraseStyle,
      formData.phraseQuantity
    ]

    const isValid = requiredFields.every(field => field && field.trim().length > 0) &&
                   formData.keyPainPoint.length >= 15 &&
                   formData.keyPainPoint.length <= 200 &&
                   formData.productDescription.length <= 400

    setIsFormValid(isValid)
  }, [formData])

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData({ ...formData, [field]: value })
  }

  const clearForm = () => {
    setFormData({
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
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isFormValid && !isLoading) {
      onSubmit()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="text-center mb-8">
        {/* Header Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <img 
            src="/HeroPhrases2.jpg" 
            alt="HeroPhrases - A funnel phrase generator for LinkedIn by Jennifer Deutsch" 
            className="hero-banner-responsive mx-auto w-full h-auto opacity-90 drop-shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </motion.div>
        
        <h1 className="text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
          HeroPhrases
        </h1>
        <p className="text-xl text-gray-500 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Funnel Phrase Generator – LinkedIn Edition</p>
        <p className="text-gray-500 mt-2">Build a no-code app that helps marketers generate emotionally intelligent, branded campaign phrases. The company is always the hero, and the output is strategic, polished, and ready for a LinkedIn post.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: The Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-all duration-300"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="bg-gradient-to-r from-[#D84E89] to-[#F3735D] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
            The Hero (Your Company & Product)
          </h2>

          <div className="space-y-6">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => updateFormData('companyName', e.target.value)}
                placeholder="e.g., Wix, Slack, HubSpot"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D84E89] focus:border-transparent transition-all duration-200 hover:border-gray-400 hover:shadow-sm"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Your company or organization name.
              </p>
            </div>

            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name <span className="text-gray-400">(Optional)</span>
              </label>
              <input
                type="text"
                value={formData.productName}
                onChange={(e) => updateFormData('productName', e.target.value)}
                placeholder="e.g., Wix Editor, Slack Connect, HubSpot CRM"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D84E89] focus:border-transparent transition-all duration-200 hover:border-gray-400 hover:shadow-sm"
              />
              <p className="text-sm text-gray-500 mt-1">
                If provided, this will be prioritized for branded phrase creation over the company name.
              </p>
            </div>

            {/* Product Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product or Solution Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.productDescription}
                onChange={(e) => updateFormData('productDescription', e.target.value)}
                placeholder="A no-code website builder for agile marketing teams to launch landing pages quickly and feel empowered."
                maxLength={400}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D84E89] focus:border-transparent transition-all duration-200 hover:border-gray-400 hover:shadow-sm resize-none"
                required
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Briefly describe what your product helps users achieve. The AI will use keywords from here.</span>
                <span className={formData.productDescription.length > 360 ? 'text-orange-500 font-medium' : ''}>
                  {formData.productDescription.length}/400
                </span>
              </div>
            </div>

            {/* Company URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company or Product URL <span className="text-gray-400">(Optional)</span>
              </label>
              <input
                type="url"
                value={formData.companyUrl}
                onChange={(e) => updateFormData('companyUrl', e.target.value)}
                placeholder="https://yourbrand.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D84E89] focus:border-transparent transition-all duration-200 hover:border-gray-400 hover:shadow-sm"
              />
              <p className="text-sm text-gray-500 mt-1">
                Provide your website (e.g., https://yourbrand.com) for more tailored phrases.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Section 2: The Audience */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-all duration-300"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="bg-gradient-to-r from-[#D84E89] to-[#F3735D] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
            The Audience (Campaign Context)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Funnel Stage */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Funnel Stage <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.funnelStage}
                onChange={(e) => updateFormData('funnelStage', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D84E89] focus:border-transparent transition-all duration-200 hover:border-gray-400 hover:shadow-sm"
                required
              >
                <option value="">Select funnel stage</option>
                {FUNNEL_STAGES.map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>

            {/* Persona Job Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Persona Job Role <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.personaJobRole}
                onChange={(e) => updateFormData('personaJobRole', e.target.value)}
                placeholder="e.g., Marketing Director, Head of HR"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D84E89] focus:border-transparent transition-all duration-200 hover:border-gray-400 hover:shadow-sm"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Who are you targeting? (e.g., Marketing Director, Head of HR)
              </p>
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.industry}
                onChange={(e) => updateFormData('industry', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D84E89] focus:border-transparent transition-all duration-200 hover:border-gray-400 hover:shadow-sm"
                required
              >
                <option value="">Select industry</option>
                {INDUSTRIES.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
              {formData.industry === 'Other...' && (
                <motion.input
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  type="text"
                  value={formData.customIndustry}
                  onChange={(e) => updateFormData('customIndustry', e.target.value)}
                  placeholder="Enter your industry"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D84E89] focus:border-transparent transition-all duration-200 hover:border-gray-400 hover:shadow-sm mt-2"
                  required
                />
              )}
            </div>

            {/* Tone of Voice */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tone of Voice <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.toneOfVoice}
                onChange={(e) => updateFormData('toneOfVoice', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D84E89] focus:border-transparent transition-all duration-200 hover:border-gray-400 hover:shadow-sm"
                required
              >
                <option value="">Select tone</option>
                {TONE_OPTIONS.map(tone => (
                  <option key={tone} value={tone}>{tone}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Key Pain Point */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Key Pain Point <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.keyPainPoint}
              onChange={(e) => updateFormData('keyPainPoint', e.target.value)}
              placeholder="Can't launch campaign pages without waiting for IT support, which kills our momentum."
              maxLength={200}
              minLength={15}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D84E89] focus:border-transparent transition-all duration-200 hover:border-gray-400 hover:shadow-sm resize-none"
              required
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>Describe a real-world frustration your persona faces that your product solves.</span>
              <span className={
                formData.keyPainPoint.length < 15 
                  ? 'text-red-500 font-medium' 
                  : formData.keyPainPoint.length > 180 
                    ? 'text-orange-500 font-medium' 
                    : ''
              }>
                {formData.keyPainPoint.length}/200 (min 15)
              </span>
            </div>
          </div>
        </motion.section>

        {/* Section 3: The Output */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-all duration-300"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="bg-gradient-to-r from-[#D84E89] to-[#F3735D] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</span>
            The Output (Customization)
          </h2>

          <div className="space-y-6">
            {/* Phrase Style */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Phrase Style <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {PHRASE_STYLES.map(option => (
                  <label key={option.value} className="flex items-start cursor-pointer group p-3 border border-gray-200 rounded-lg hover:border-[#D84E89] hover:bg-gray-50 transition-all duration-200">
                    <input
                      type="radio"
                      name="phraseStyle"
                      value={option.value}
                      checked={formData.phraseStyle === option.value}
                      onChange={(e) => updateFormData('phraseStyle', e.target.value)}
                      className="w-4 h-4 text-[#D84E89] border-gray-300 focus:ring-[#D84E89] focus:ring-2 mt-1"
                      required
                    />
                    <div className="ml-3">
                      <span className="text-gray-800 font-medium group-hover:text-gray-900 transition-colors">
                        {option.label}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        {option.description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phrase Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How Many Phrases? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {PHRASE_QUANTITIES.map(option => (
                    <label key={option.value} className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="phraseQuantity"
                        value={option.value}
                        checked={formData.phraseQuantity === option.value}
                        onChange={(e) => updateFormData('phraseQuantity', e.target.value)}
                        className="w-4 h-4 text-[#D84E89] border-gray-300 focus:ring-[#D84E89] focus:ring-2"
                        required
                      />
                      <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Include CTA */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Include CTA?
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => updateFormData('includeCTA', !formData.includeCTA)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D84E89] focus:ring-offset-2 hover:scale-105 ${
                      formData.includeCTA ? 'bg-gradient-to-r from-[#D84E89] to-[#F3735D]' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        formData.includeCTA ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className="ml-3 text-gray-700 font-medium">
                    {formData.includeCTA ? 'Yes' : 'No'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  If ON, auto-generate a funnel-stage aligned Call to Action
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Form Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-between items-center"
        >
          <button
            type="button"
            onClick={clearForm}
            className="flex items-center text-gray-500 hover:text-gray-700 transition-colors hover:scale-105 duration-200"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Clear Form
          </button>

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`px-8 py-4 rounded-lg font-semibold text-white transition-all duration-200 flex items-center ${
              isFormValid && !isLoading
                ? 'bg-purple-600 hover:bg-purple-700 hover:shadow-lg hover:scale-105 cursor-pointer hover:shadow-purple-500/25'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating Phrases...
              </>
            ) : (
              'Generate Phrases'
            )}
          </button>
        </motion.div>
      </form>
    </motion.div>
  )
}