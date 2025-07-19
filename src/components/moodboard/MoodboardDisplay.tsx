import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { VibeBoard } from '../../lib/openai'

interface MoodboardDisplayProps {
  board: VibeBoard
  onSave?: () => void
  onRegenerate?: () => void
  isSaving?: boolean
  canSave?: boolean
  className?: string
}

export function MoodboardDisplay({ 
  board, 
  onSave, 
  onRegenerate,
  isSaving = false,
  canSave = false,
  className 
}: MoodboardDisplayProps) {
  const openGoogleFonts = (fontName: string) => {
    const encodedFont = encodeURIComponent(fontName)
    window.open(`https://fonts.google.com/specimen/${encodedFont.replace(' ', '+')}`, '_blank')
  }

  return (
    <div className={className}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Vibe Board</h2>
          <p className="text-muted-foreground">Generated from: &ldquo;{board.prompt}&rdquo;</p>
        </div>
        <div className="flex gap-2">
          {onRegenerate && (
            <Button variant="outline" onClick={onRegenerate}>
              Regenerate
            </Button>
          )}
          {onSave && (
            <Button 
              onClick={onSave} 
              disabled={!canSave || isSaving}
              title={!canSave ? "Saving is currently disabled" : ""}
            >
              {isSaving ? 'Saving...' : 'Save Board'}
            </Button>
          )}
        </div>
      </div>

      {/* AI Concept */}
      {board.aiConcept && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Design Concept</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{board.aiConcept}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Color Palette */}
        <Card>
          <CardHeader>
            <CardTitle>Color Palette</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex gap-2">
                {board.colors.map((color, index) => (
                  <div
                    key={index}
                    className="flex-1 aspect-square rounded-lg border border-gray-200"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                {board.colors.map((color, index) => (
                  <code key={index} className="px-2 py-1 bg-gray-100 rounded text-xs">
                    {color.toUpperCase()}
                  </code>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Typography */}
        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Heading Font</div>
                <div className="text-xl font-semibold">{board.fontPairing.heading}</div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openGoogleFonts(board.fontPairing.heading)}
                >
                  View on Google Fonts
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Body Font</div>
                <div className="text-base">{board.fontPairing.body}</div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openGoogleFonts(board.fontPairing.body)}
                >
                  View on Google Fonts
                </Button>
              </div>
              
              <div className="mt-3">
                <span className="inline-block px-2 py-1 bg-gray-100 rounded text-xs text-muted-foreground capitalize">
                  {board.fontPairing.category}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Images */}
      {board.imageUrls.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Visual Inspiration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {board.imageUrls.map((url, index) => (
                <div key={index} className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={url}
                    alt={`Generated image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No images fallback */}
      {board.imageUrls.length === 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Visual Inspiration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <p>Images are being generated... This may take a moment.</p>
              <p className="text-sm mt-2">Try regenerating if no images appear.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 