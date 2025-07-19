import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface StyleConcept {
  description: string
  colors: string[]
  fontPairing: {
    heading: string
    body: string
    category: string
  }
  imagePrompts: string[]
}

export interface VibeBoard {
  id: string
  prompt: string
  aiConcept: string
  colors: string[]
  fontPairing: {
    heading: string
    body: string
    category: string
  }
  imageUrls: string[]
  createdAt: string
  updatedAt: string
}

export class MoodboardAIService {
  async generateStyleConcept(prompt: string): Promise<StyleConcept> {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are a professional design consultant that creates comprehensive style concepts for digital applications. 

You respond ONLY with valid JSON in this exact format:
{
  "description": "A detailed 2-3 sentence description of the visual style and mood",
  "colors": ["#hexcode1", "#hexcode2", "#hexcode3", "#hexcode4", "#hexcode5"],
  "fontPairing": {
    "heading": "Font Name",
    "body": "Font Name",
    "category": "modern/elegant/playful/bold/minimal"
  },
  "imagePrompts": ["prompt1", "prompt2", "prompt3"]
}

Rules:
- Colors must be 5 harmonious hex codes that work well together
- Use real Google Fonts names only
- Image prompts should be specific, descriptive, and suitable for DALL-E
- Keep image prompts under 100 characters each
- Make everything cohesive with the requested style`
          },
          {
            role: 'user',
            content: `Create a style concept for: ${prompt}`
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })

      const content = response.choices[0]?.message?.content
      if (!content) {
        throw new Error('No response from OpenAI')
      }

      return JSON.parse(content)
    } catch (error) {
      console.error('Error generating style concept:', error)
      throw new Error('Failed to generate style concept')
    }
  }

  async generateImage(prompt: string): Promise<string> {
    try {
      const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: `${prompt} --style modern, clean, high quality, professional design inspiration`,
        size: '1024x1024',
        quality: 'standard',
        n: 1
      })

      return response.data?.[0]?.url || ''
    } catch (error) {
      console.error('Error generating image:', error)
      return '' // Return empty string on error rather than throwing
    }
  }

  async generateMoodboard(prompt: string): Promise<Omit<VibeBoard, 'id' | 'createdAt' | 'updatedAt'>> {
    try {
      console.log('Generating style concept for:', prompt)
      
      // Generate style concept first
      const styleConcept = await this.generateStyleConcept(prompt)
      
      console.log('Style concept generated:', styleConcept)
      
      // Generate images concurrently
      const imagePromises = styleConcept.imagePrompts.map(imagePrompt => 
        this.generateImage(imagePrompt)
      )
      
      console.log('Generating images...')
      const imageResults = await Promise.allSettled(imagePromises)
      
      // Filter out failed image generations
      const imageUrls = imageResults
        .filter(result => result.status === 'fulfilled' && result.value !== '')
        .map(result => (result as PromiseFulfilledResult<string>).value)
      
      console.log('Generated images:', imageUrls.length)
      
      // If no images were generated successfully, provide fallback
      if (imageUrls.length === 0) {
        console.log('No images generated, using fallbacks')
        // You could add some placeholder images here if needed
      }

      return {
        prompt,
        aiConcept: styleConcept.description,
        colors: styleConcept.colors,
        fontPairing: styleConcept.fontPairing,
        imageUrls
      }
    } catch (error) {
      console.error('Error in generateMoodboard:', error)
      throw error
    }
  }
}

// Export singleton instance
export const aiService = new MoodboardAIService() 