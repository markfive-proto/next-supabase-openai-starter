# VibeBoard Setup Guide

This guide will help you set up and run the VibeBoard project locally.

## Prerequisites

- Node.js 18+ and npm
- Supabase account
- OpenAI API account

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy the environment example file and fill in your credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_PROJECT_ID=your_project_id

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup

#### Option A: Using Supabase CLI (Recommended)

1. Install Supabase CLI:
```bash
npm install -g supabase
```

2. Login to Supabase:
```bash
supabase login
```

3. Link your project:
```bash
supabase link --project-ref your_project_id
```

4. Push the database schema:
```bash
supabase db push
```

5. Generate TypeScript types:
```bash
npm run generate:types
```

#### Option B: Manual Setup

1. Go to your Supabase dashboard
2. Run the SQL from `supabase/migrations/001_initial_schema.sql` in the SQL editor

### 4. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app!

## 🔧 Getting Your API Keys

### Supabase Setup

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > API
4. Copy your Project URL and anon public key
5. Copy your service_role secret key (for server-side operations)

### OpenAI Setup

1. Go to [platform.openai.com](https://platform.openai.com)
2. Create an API key
3. Make sure you have credits available for DALL-E 3 image generation

## 📁 Project Structure

```
/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── api/            # API routes
│   │   ├── generate/       # Generate moodboard page
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/          # React components
│   │   ├── ui/             # Shadcn/ui components
│   │   ├── forms/          # Form components
│   │   └── moodboard/      # Moodboard-specific components
│   ├── lib/                # Utilities and configurations
│   │   ├── supabase.ts     # Supabase client
│   │   ├── openai.ts       # OpenAI client & AI service
│   │   └── utils.ts        # Utility functions
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript type definitions
│   └── styles/             # Global styles
├── public/                 # Static assets
├── supabase/              # Supabase migrations
└── .cursor/               # Cursor AI rules
```

## 🎯 Key Features

- **AI Moodboard Generation**: Generate color palettes, images, and typography from text prompts
- **Real-time Preview**: See your moodboard as it's generated
- **Save & Share**: Save boards to database (anonymous for MVP)
- **Responsive Design**: Works on desktop and mobile
- **Type Safety**: Full TypeScript implementation

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Generate Supabase types
npm run generate:types
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in your deployment platform:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `NEXT_PUBLIC_APP_URL` (your production URL)

## 🐛 Troubleshooting

### Common Issues

1. **TypeScript errors about missing modules**: Make sure all dependencies are installed with `npm install`

2. **Supabase connection issues**: 
   - Check your environment variables
   - Ensure your Supabase project is active
   - Verify your API keys are correct

3. **OpenAI API errors**:
   - Check your API key is valid
   - Ensure you have sufficient credits
   - Verify your API key has access to GPT-4 and DALL-E 3

4. **Build errors**:
   - Run `npm run lint` to check for linting issues
   - Ensure all TypeScript types are properly defined

### Getting Help

- Check the [Next.js documentation](https://nextjs.org/docs)
- Review [Supabase documentation](https://supabase.com/docs)
- Check [OpenAI API documentation](https://platform.openai.com/docs)

## 📋 Next Steps

After setup, you can:

1. Test the moodboard generation flow
2. Customize the color schemes and typography
3. Add authentication (for Phase 2)
4. Implement user projects and board management
5. Add export functionality for design tokens

Happy coding! 🎨 