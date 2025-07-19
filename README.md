# VibeBoard 🎨

> AI-powered moodboard generator for developers and creators

VibeBoard helps you generate beautiful design inspiration from simple text prompts. Transform your app ideas into cohesive visual directions with AI-generated color palettes, images, and typography suggestions.

## 🚀 What is VibeBoard?

**The Problem**: Design is a creative bottleneck for many developers and founders. Even with the right product idea, making it look good is hard. Most lack the intuition for picking harmonious colors, images, and visual directions that match their app's "vibe."

**The Solution**: VibeBoard generates comprehensive moodboards from a single text prompt, giving you instant visual direction for your projects.

## ✨ Features (Phase 1 MVP)

- **🎨 AI Moodboard Generation**: Generate color palettes, images, and font pairings from text prompts
- **🖼️ Image Generation**: 3 AI-generated images via DALL·E that match your concept
- **🎯 Color Palettes**: 5-color harmonious palettes tailored to your vibe
- **🔤 Font Pairing**: Typography suggestions from Google Fonts
- **💾 Board Saving**: Save and organize your generated moodboards
- **👤 Anonymous Support**: Create boards without signing up (MVP focus)

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router) + React + TypeScript
- **Styling**: TailwindCSS + Shadcn/ui components
- **Backend**: Supabase (Database + Auth + Storage)
- **AI**: OpenAI API (GPT-4 for concepts + DALL·E for images)
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx        # Home page with CTA
│   │   ├── generate/       # Moodboard generation flow
│   │   └── api/            # API routes for AI generation
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Shadcn/ui components
│   │   ├── forms/          # Form components
│   │   └── moodboard/      # Moodboard-specific components
│   ├── lib/                # Utilities and configurations
│   │   ├── supabase.ts     # Supabase client setup
│   │   ├── openai.ts       # OpenAI client and prompts
│   │   └── utils.ts        # Utility functions
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript type definitions
│   └── styles/             # Global styles and Tailwind config
├── public/                 # Static assets
├── supabase/              # Database migrations and types
└── .cursor/rules/         # Cursor AI development rules
```

## 🗄️ Database Schema

```sql
-- Vibe Boards (MVP Core Table)
CREATE TABLE vibe_boards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NULL, -- NULL for anonymous users
  prompt TEXT NOT NULL,
  colors JSONB NOT NULL,              -- Array of hex color codes
  font_pairing JSONB NOT NULL,        -- Font names and categories
  image_urls JSONB NOT NULL,          -- Array of generated image URLs
  ai_concept TEXT,                    -- AI-generated style description
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects (Future Phase)
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account and project
- OpenAI API account

### 1. Clone and Install

```bash
git clone <repository-url>
cd aimoodboard
npm install
```

### 2. Environment Setup

Create `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup

```bash
# Initialize Supabase locally (optional)
npx supabase init

# Run migrations
npx supabase db push

# Generate TypeScript types
npm run generate:types
```

### 4. Development

```bash
npm run dev
```

Visit `http://localhost:3000` to see your app!

## 📖 Usage

### Basic Flow

1. **Home Page**: Enter your app/project idea (e.g., "Minimal AI dashboard for doctors")
2. **AI Generation**: Wait 5-10 seconds for AI to generate your moodboard
3. **Preview**: View your color palette, images, and font suggestions
4. **Save**: Optionally save to your account or continue as anonymous user
5. **Iterate**: Regenerate or tweak elements as needed

### API Endpoints

- `POST /api/generate-moodboard` - Main moodboard generation
- `POST /api/generate-image` - Individual image generation  
- `POST /api/save-board` - Save board to database

## 🎯 Target Audience

- **Vibe coders**: AI + code-first creators
- **Indie makers**: Solo entrepreneurs building products
- **Hackathon participants**: Need quick visual direction
- **Early designers**: Learning design fundamentals
- **UX workshop students**: Exploring design concepts

## 📈 Success Metrics

- 80% of users complete board generation
- 50% of users save a board
- Average generation time < 5 seconds
- Collect 100+ real user prompts for AI improvement

## 🔮 Future Phases

### Phase 2: Design Starter Kit Generator
- Export TailwindCSS tokens
- Component style previews
- Figma-ready style kits

### Phase 3: Board Customization & Remixing  
- Color palette editor
- AI re-suggestion engine
- Version history

### Phase 4: Collaboration & Sharing
- Public board sharing
- Team collaboration
- Inspiration gallery

## ⚠️ Known Limitations (MVP)

- 1 free moodboard per day for anonymous users
- Basic color palette generation (no advanced color theory)
- Limited font pairing algorithms
- No real-time collaboration yet
- AI generation can occasionally fail or timeout

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following the Cursor rules in `.cursor/rules/`
4. Test your changes
5. Commit and push: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📝 License

This project is licensed under the MIT License. See `LICENSE` for details.

## 🙏 Acknowledgments

- OpenAI for powerful AI APIs
- Supabase for seamless backend infrastructure
- Next.js team for the excellent framework
- Tailwind CSS for rapid styling
- Shadcn for beautiful UI components

---

**Ready to build your vibe?** 🚀

Start with: `npm run dev` and visit `http://localhost:3000` 