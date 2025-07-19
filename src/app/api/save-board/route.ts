import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { VibeBoard } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const body: VibeBoard = await request.json()
    const { prompt, aiConcept, colors, fontPairing, imageUrls } = body

    // Validate required fields
    if (!prompt || !colors || !fontPairing || !imageUrls) {
      return NextResponse.json(
        { success: false, error: 'Missing required board data' },
        { status: 400 }
      )
    }

    // For MVP: Allow anonymous saves (user_id will be null)
    // In future phases, get user from auth headers

    const boardData = {
      prompt,
      ai_concept: aiConcept,
      colors,
      font_pairing: fontPairing,
      image_urls: imageUrls,
      user_id: null, // Anonymous for MVP
    }

    // Save to Supabase
    const { data, error } = await supabase
      .from('vibe_boards')
      .insert(boardData)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to save board to database' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        id: data.id,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      },
      message: 'Board saved successfully'
    })

  } catch (error) {
    console.error('Error saving board:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save board' },
      { status: 500 }
    )
  }
} 