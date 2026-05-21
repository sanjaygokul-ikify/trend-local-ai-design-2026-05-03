import { Design } from './design.js'
import { AI } from './ai.js'
import { UI } from './ui.js'

class LocalAiDesign {
  constructor() {
    this.design = new Design()
    this.ai = new AI()
    this.ui = null // Will be initialized after DOM is ready
  }

  async init() {
    try {
      await this.design.init()
      await this.ai.init()
      
      // UI requires DOM to be loaded
      this.ui = new UI(this.design)
      await this.ui.init()
      
      console.log("Application initialized successfully")
    } catch (error) {
      console.error('Initialization error:', error)
      throw error
    }
  }

  async run() {
    try {
      const designData = await this.design.getData()
      if (!designData) {
        throw new Error('Design data is empty or null');
      }
      const aiSuggestions = await this.ai.getSuggestions(designData)
      if (!aiSuggestions || !Array.isArray(aiSuggestions)) {
        throw new Error('AI suggestions are invalid');
      }
      await this.ui.render(aiSuggestions)
    } catch (error) {
      console.error('Runtime error:', error)
      throw error
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  const app = new LocalAiDesign()
  await app.init()
  await app.run()
})
