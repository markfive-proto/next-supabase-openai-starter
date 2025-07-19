import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { Card, CardContent } from '../ui/card'

interface PromptInputProps {
  onGenerate: (prompt: string) => void
  isLoading: boolean
  className?: string
}

const examplePrompts = [
  "Minimal AI dashboard for doctors",
  "Playful food delivery app for college students",
  "Elegant finance app for luxury brands",
  "Bold fitness tracker for athletes",
  "Cozy reading app for book lovers"
]

export function PromptInput({ onGenerate, isLoading, className }: PromptInputProps) {
  const [prompt, setPrompt] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (prompt.trim() && !isLoading) {
      onGenerate(prompt.trim())
    }
  }

  const useExample = (example: string) => {
    setPrompt(example)
  }

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="prompt" className="text-sm font-medium">
              Describe your project or app idea
            </label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Minimal AI dashboard for doctors"
              className="min-h-[100px] resize-none"
              disabled={isLoading}
            />
          </div>

          <Button 
            type="submit" 
            size="lg" 
            className="w-full"
            disabled={!prompt.trim() || isLoading}
          >
            {isLoading ? 'Generating Your Vibe...' : 'Start With a Vibe'}
          </Button>
        </form>

        <div className="mt-6">
          <p className="text-sm text-muted-foreground mb-3">
            Need inspiration? Try one of these:
          </p>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => useExample(example)}
                disabled={isLoading}
                className="text-xs"
              >
                {example}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 