# Movie.ai
Movie.ai is a full-stack movie discovery and review platform, allowing users to search and discover movies, submit ratings and reviews, and report inappropriate reviews. This platform also includes an AI-powered moderation system using Google Gemini to classify and flag user reviews, supporting admins to make decisions.

## Live Demo
- Vercel: https://movie-ai-eta.vercel.app/
- AWS Amplify: https://main.d65imgxp8iknh.amplifyapp.com/

## Features
- Movie search and discovery  
- Movie list and details  
- Ratings and reviews  
- Reporting and moderation  
- AI-powered review classification (Gemini)

## Tech Stack
- Next.js 
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- Supabase
- TMDB API
- Gemini API

## Project Structure
```text
src/
  app/            # Next.js App Router pages and layouts
  components/     # Reusable UI components
  actions/        # Server actions for mutations
  lib/            # Utilities, API helpers, and database logic
  generated/      # Generated Prisma client and types
prisma/           # Prisma schema and migrations
```

## Getting Started
### 1. Install dependencies
```bash
npm install
```
### 2. Configure environment variables
Create a .env file in the project root and add:
```env
DATABASE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
TMDB_API_KEY=
ADMIN_EMAIL=
```
### 3. Run database migrations
```bash
npx prisma migrate dev
```

### 4. Start the development server
```bash
npm run dev
```
## Database
This project uses Prisma with PostgreSQL.
```bash
npx prisma migrate dev
npx prisma generate
npx prisma studio
```

## Authentication
Authentication is handled with Supabase.
Admin access is controlled by the `ADMIN_EMAIL` environment variable.

This project can be deployed on both Vercel and AWS.

## Deployment
This project is deployed on both Vercel and AWS Amplify.

To deploy:
- Connect the repository to the platform (Vercel or AWS Amplify)
- Configure environment variables
- Deploy







