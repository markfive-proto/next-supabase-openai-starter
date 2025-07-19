import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'VibeBoard - AI Moodboard Generator',
  description: 'Generate beautiful design inspiration from simple text prompts. Create color palettes, images, and typography suggestions for your projects.',
  keywords: ['moodboard', 'design', 'AI', 'colors', 'typography', 'inspiration'],
  authors: [{ name: 'VibeBoard Team' }],
  openGraph: {
    title: 'VibeBoard - AI Moodboard Generator',
    description: 'Generate beautiful design inspiration from simple text prompts.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VibeBoard - AI Moodboard Generator',
    description: 'Generate beautiful design inspiration from simple text prompts.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          <header className="border-b">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">V</span>
                  </div>
                  <h1 className="text-xl font-bold">VibeBoard</h1>
                </div>
                <nav className="hidden md:flex items-center space-x-6">
                  <a href="/" className="text-sm text-muted-foreground hover:text-foreground">
                    Home
                  </a>
                  <a href="/generate" className="text-sm text-muted-foreground hover:text-foreground">
                    Generate
                  </a>
                </nav>
              </div>
            </div>
          </header>
          <main>{children}</main>
          <footer className="border-t mt-12">
            <div className="container mx-auto px-4 py-6">
              <div className="text-center text-sm text-muted-foreground">
                <p>&copy; 2024 VibeBoard. Built with ❤️ for creators.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
} 