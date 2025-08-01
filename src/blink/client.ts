import { createClient as createBlinkClient } from '@blinkdotnew/sdk'

export const createClient = () => createBlinkClient({
  projectId: 'funnel-phrase-generator-linkedin-edition-ilfkalek',
  authRequired: true
})