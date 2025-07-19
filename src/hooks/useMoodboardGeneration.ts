import { useState } from 'react'
import { VibeBoard } from '../lib/openai'

interface UseMoodboardGenerationReturn {
  board: VibeBoard | null
  isLoading: boolean
  isSaving: boolean
  error: string | null
  generateBoard: (prompt: string) => Promise<void>
  saveBoard: () => Promise<void>
  canSave: boolean
}

export function useMoodboardGeneration(): UseMoodboardGenerationReturn {
  const [board, setBoard] = useState<VibeBoard | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check if Supabase is configured by checking for environment variables
  const canSave = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const generateBoard = async (prompt: string) => {
    if (!prompt.trim()) {
      setError('Please enter a prompt')
      return
    }

    setIsLoading(true)
    setError(null)
    setBoard(null)

    try {
      console.log('Generating moodboard for prompt:', prompt)
      
      const response = await fetch('/api/generate-moodboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate moodboard')
      }

      console.log('Moodboard generated successfully:', data.data)
      setBoard(data.data)
      setError(null)

    } catch (err) {
      console.error('Error generating moodboard:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate moodboard'
      setError(errorMessage)
      setBoard(null)
    } finally {
      setIsLoading(false)
    }
  }

  const saveBoard = async () => {
    if (!board) {
      setError('No board to save')
      return
    }

    if (!canSave) {
      setError('Saving is currently disabled (Supabase not configured)')
      return
    }

    setIsSaving(true)
    setError(null)

    try {
      const response = await fetch('/api/save-board', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(board),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to save board')
      }

      // Update board with saved ID if returned
      if (data.data && data.data.id) {
        setBoard({ ...board, id: data.data.id })
      }

    } catch (err) {
      console.error('Error saving board:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to save board'
      setError(errorMessage)
    } finally {
      setIsSaving(false)
    }
  }

  return {
    board,
    isLoading,
    isSaving,
    error,
    generateBoard,
    saveBoard,
    canSave
  }
} 