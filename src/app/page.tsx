import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          AI-Powered Moodboard Generator
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Transform your app ideas into beautiful visual directions. Generate harmonious color palettes, 
          curated images, and typography suggestions from simple text prompts.
        </p>
        <Link href="/generate">
          <Button size="lg" className="text-lg px-8 py-6">
            Start With a Vibe
          </Button>
        </Link>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-orange-400 rounded-lg"></div>
              Color Palettes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Get harmonious 5-color palettes tailored to your project's vibe and aesthetic goals.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg"></div>
              AI Images
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Generate 3 unique images that perfectly capture your project's visual direction and mood.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-teal-400 rounded-lg"></div>
              Typography
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Discover perfect Google Font pairings that match your project's personality and style.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* How It Works */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">
              1
            </div>
            <h3 className="font-semibold mb-2">Describe Your Project</h3>
            <p className="text-sm text-muted-foreground">
              Enter a simple description of your app or project idea.
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">
              2
            </div>
            <h3 className="font-semibold mb-2">AI Generation</h3>
            <p className="text-sm text-muted-foreground">
              Our AI analyzes your prompt and generates visual elements.
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">
              3
            </div>
            <h3 className="font-semibold mb-2">Review Your Board</h3>
            <p className="text-sm text-muted-foreground">
              Get colors, images, and fonts perfectly matched to your vibe.
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">
              4
            </div>
            <h3 className="font-semibold mb-2">Save & Use</h3>
            <p className="text-sm text-muted-foreground">
              Save your moodboard and use it to guide your design process.
            </p>
          </div>
        </div>
      </div>

      {/* Target Audience */}
      <Card className="mb-16">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Perfect for Creators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div>
              <div className="text-2xl mb-2">👨‍💻</div>
              <p className="text-sm font-medium">Vibe Coders</p>
            </div>
            <div>
              <div className="text-2xl mb-2">🚀</div>
              <p className="text-sm font-medium">Indie Makers</p>
            </div>
            <div>
              <div className="text-2xl mb-2">⚡</div>
              <p className="text-sm font-medium">Hackathon Teams</p>
            </div>
            <div>
              <div className="text-2xl mb-2">🎨</div>
              <p className="text-sm font-medium">Early Designers</p>
            </div>
            <div>
              <div className="text-2xl mb-2">📚</div>
              <p className="text-sm font-medium">UX Students</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <div className="text-center">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Build Your Vibe?</h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of creators who've transformed their ideas into beautiful visual directions.
            </p>
            <Link href="/generate">
              <Button size="lg" className="text-lg px-8 py-6">
                Generate Your First Moodboard
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-4">
              Free to use • No signup required • AI-powered
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 