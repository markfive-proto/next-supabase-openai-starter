'use client'

import React from 'react'
import { PromptInput } from '../../components/forms/PromptInput'
import { MoodboardDisplay } from '../../components/moodboard/MoodboardDisplay'
import { useMoodboardGeneration } from '../../hooks/useMoodboardGeneration'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'

export default function GeneratePage() {
  const { board, isLoading, isSaving, error, generateBoard, saveBoard, canSave } = useMoodboardGeneration()

  const handleRegenerate = () => {
    if (board) {
      generateBoard(board.prompt)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Generate Your Vibe Board</h1>
        <p className="text-muted-foreground">
          Describe your app or project idea, and we'll create a complete visual direction with colors, typography, and imagery.
        </p>
      </div>

      {/* Prompt Input */}
      <div className="max-w-4xl mx-auto mb-8">
        <PromptInput 
          onGenerate={generateBoard} 
          isLoading={isLoading}
        />
      </div>

      {/* Error Display */}
      {error && (
        <Card className="max-w-4xl mx-auto mb-8 border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="text-red-800">
              <p className="font-medium">Error generating moodboard:</p>
              <p className="text-sm mt-1">{error}</p>
              {error.includes('quota') && (
                <p className="text-sm mt-2">
                  Please check your OpenAI billing and try again.
                </p>
              )}
              {error.includes('rate limit') && (
                <p className="text-sm mt-2">
                  Please wait a moment before trying again.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && (
        <Card className="max-w-4xl mx-auto mb-8">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-lg font-medium">Generating your vibe board...</p>
              <p className="text-sm text-muted-foreground mt-2">
                This may take 30-60 seconds as we create your color palette, select fonts, and generate custom images.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generated Board */}
      {board && !isLoading && (
        <div className="max-w-6xl mx-auto">
          <MoodboardDisplay 
            board={board} 
            onSave={saveBoard}
            onRegenerate={handleRegenerate}
            isSaving={isSaving}
            canSave={canSave}
          />
        </div>
      )}

      {/* Save Status Info */}
      {board && !canSave && (
        <Card className="max-w-4xl mx-auto mt-6 border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="text-yellow-800">
              <p className="font-medium">💡 Database Not Connected</p>
              <p className="text-sm mt-1">
                Your moodboard has been generated successfully! Saving is currently disabled since Supabase is not configured yet.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!board && !isLoading && !error && (
        <Card className="max-w-4xl mx-auto">
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">Ready to Create?</h3>
              <p className="text-muted-foreground mb-4">
                Enter a prompt above to generate your first AI-powered moodboard.
              </p>
              <div className="text-sm text-muted-foreground">
                <p>✨ AI-generated color palettes</p>
                <p>🎨 Custom DALL-E images</p>
                <p>📝 Curated font pairings</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 