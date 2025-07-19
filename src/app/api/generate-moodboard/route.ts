import { NextRequest, NextResponse } from 'next/server'
import { aiService } from '../../../lib/openai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt } = body

    // Validate the prompt
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Prompt is required and must be a string' },
        { status: 400 }
      )
    }

    if (prompt.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Prompt cannot be empty' },
        { status: 400 }
      )
    }

    if (prompt.length > 500) {
      return NextResponse.json(
        { success: false, error: 'Prompt is too long (max 500 characters)' },
        { status: 400 }
      )
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'OpenAI API key is not configured' },
        { status: 500 }
      )
    }

    console.log('Processing moodboard generation request:', { prompt: prompt.substring(0, 100) + '...' })

    // Generate the moodboard
    const moodboardData = await aiService.generateMoodboard(prompt.trim())

    // Add temporary ID and timestamps for the response
    const moodboard = {
      id: `temp-${Date.now()}`,
      ...moodboardData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    console.log('Moodboard generated successfully:', {
      id: moodboard.id,
      colorsCount: moodboard.colors.length,
      imagesCount: moodboard.imageUrls.length,
      fontPairing: moodboard.fontPairing.category
    })

    return NextResponse.json({
      success: true,
      data: moodboard
    })

  } catch (error) {
    console.error('Error generating moodboard:', error)
    
    // Provide more specific error messages
    let errorMessage = 'Failed to generate moodboard'
    let statusCode = 500

    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        errorMessage = 'OpenAI API configuration error'
        statusCode = 500
      } else if (error.message.includes('quota') || error.message.includes('billing')) {
        errorMessage = 'OpenAI API quota exceeded. Please check your billing.'
        statusCode = 429
      } else if (error.message.includes('rate limit')) {
        errorMessage = 'Too many requests. Please try again in a moment.'
        statusCode = 429
      } else {
        errorMessage = error.message || 'Failed to generate moodboard'
      }
    }

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: statusCode }
    )
  }
} 