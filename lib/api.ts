"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"

// System prompt for Tommy AI Chef
const SYSTEM_PROMPT = `
You are Tommy, a friendly AI chef assistant. Your goal is to help users create delicious meals with the ingredients they have.

When responding to users:
1. Be friendly, enthusiastic, and encouraging
2. Suggest specific recipes based on the ingredients mentioned
3. Provide step-by-step cooking instructions
4. Include estimated cooking time and difficulty level
5. Mention nutritional benefits when relevant
6. Format your responses with clear sections and emojis for readability

If the user doesn't mention specific ingredients, ask them what they have available.
`

export async function generateRecipe(prompt: string): Promise<string> {
  try {
    // Make sure we have an API key
    const apiKey = process.env.GOOGLE_API_KEY
    if (!apiKey) {
      throw new Error("Google API key is missing. Please check your environment variables.")
    }

    // Initialize the Google Generative AI with our API key
    const genAI = new GoogleGenerativeAI(apiKey)

    // For Gemini models, we need to use the correct model name
    // Using gemini-1.5-flash as it's widely available
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    // Create a structured prompt that includes our system instructions
    const fullPrompt = `${SYSTEM_PROMPT}\n\nUser query: ${prompt}`

    // Generate content directly instead of using chat
    const result = await model.generateContent(fullPrompt)
    const response = result.response

    return response.text()
  } catch (error) {
    console.error("Detailed error in generateRecipe:", error)

    // Provide more specific error messages based on the error type
    if (error instanceof Error) {
      throw new Error(`Recipe generation failed: ${error.message}`)
    }

    throw new Error("Failed to generate recipe. Please try again later.")
  }
}
