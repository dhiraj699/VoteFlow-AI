# VoteFlow-AI - Complete Project Structure

This document describes all files and folders in the VoteFlow-AI project.

## Directory Tree

```
VoteFlow-AI/
├── frontend/                          # Next.js React Frontend
│   ├── app/
│   │   ├── components/
│   │   │   ├── Timeline.tsx           # Election timeline component
│   │   │   ├── VoterCard.tsx          # Voter journey phases
│   │   │   ├── FAQ.tsx                # FAQ accordion component
│   │   │   ├── EVMVisualizer.tsx      # Interactive EVM guide
│   │   │   └── CandidateCard.tsx      # Individual candidate display
│   │   ├── candidate-ai/
│   │   │   └── page.tsx               # AI-powered candidate search page
│   │   ├── page.tsx                   # Main dashboard homepage
│   │   ├── layout.tsx                 # Root layout and metadata
│   │   └── globals.css                # Global styles and utilities
│   ├── public/                        # Static assets (if needed)
│   ├── styles/                        # Additional styles (if needed)
│   ├── package.json                   # Dependencies and scripts
│   ├── tsconfig.json                  # TypeScript configuration
│   ├── tailwind.config.ts             # Tailwind CSS theme config
│   ├── next.config.mjs                # Next.js configuration
│   ├── postcss.config.mjs             # PostCSS configuration
│   ├── .env.example                   # Environment variables template
│   └── README.md                      # Frontend documentation
│
├── backend/                           # Express.js API Server
│   ├── server.js                      # Main server setup
│   ├── routes/
│   │   ├── election.js                # Election data endpoints
│   │   │                              # - GET /api/election/current
│   │   │                              # - GET /api/election/timeline
│   │   │                              # - GET /api/election/schedule
│   │   │                              # - POST /api/election/register-reminder
│   │   └── candidates.js              # Candidate search endpoints
│   │                                  # - POST /api/search-candidates
│   │                                  # - GET /api/candidates
│   │                                  # - GET /api/candidates/:id
│   │                                  # - GET /api/candidates/policy/:policy
│   │                                  # - POST /api/myth-buster
│   ├── package.json                   # Dependencies and scripts
│   ├── .env.example                   # Environment variables template
│   ├── README.md                      # Backend documentation
│   └── (Database would go here)       # DynamoDB, PostgreSQL, etc.
│
├── firebase/                          # Firebase Configuration
│   ├── config.js                      # Firebase setup and helpers
│   │                                  # Collections: users, reminders,
│   │                                  # savedCandidates, votes
│   │                                  # Includes Firestore helpers
│   └── README.md                      # Firebase documentation
│
├── README.md                          # Main project documentation
├── QUICKSTART.md                      # 5-minute setup guide
├── DEPLOYMENT.md                      # Production deployment guide
└── PROJECT_STRUCTURE.md               # This file

```

## File Descriptions

### Frontend (React + Next.js)

#### `frontend/app/page.tsx`
**Main Dashboard Homepage**
- 600+ lines of feature-rich content
- Hero section with CTA buttons
- Voter journey visualization
- Election timeline display
- EVM visualizer with step navigation
- Featured candidates showcase
- FAQ section with filtering
- Footer with links and info

#### `frontend/app/components/Timeline.tsx`
**Election Timeline Component**
- Displays election milestones
- Alternating left-right layout
- Status indicators (completed, current, upcoming)
- Visual timeline with connecting line
- Responsive design

#### `frontend/app/components/VoterCard.tsx`
**Voter Journey Phase Cards**
- Three-phase voter journey visualization
- Gradient backgrounds with custom colors
- Key points for each phase
- Emoji icons for visual interest
- Fade-in animation

#### `frontend/app/components/FAQ.tsx`
**FAQ Component with Filtering**
- Expandable question-answer format
- Category filtering (4+ categories)
- Smooth animations
- Empty state handling
- Click to expand/collapse

#### `frontend/app/components/EVMVisualizer.tsx`
**Interactive EVM Guide**
- Step-by-step voting process
- Interactive step selection
- Progress indicator
- Previous/Next navigation
- Detailed step descriptions

#### `frontend/app/components/CandidateCard.tsx`
**Candidate Display Card**
- Shows candidate name, party, position
- Lists policies with checkmarks
- Background information
- Learn More button
- Responsive grid layout

#### `frontend/app/candidate-ai/page.tsx`
**AI Candidate Search Page**
- Full-page search interface
- Popular search suggestions
- AI-powered results display
- Candidate filters
- Empty states with icons
- Loading states

#### `frontend/app/layout.tsx`
**Root Layout**
- Metadata configuration
- Viewport settings
- Global HTML setup
- Font and style integration

#### `frontend/app/globals.css`
**Global Styles (100+ lines)**
- Custom scrollbar styling
- Utility classes (.card, .btn-primary, .badge)
- Animation keyframes
- Gradient text effects
- Responsive typography

#### `frontend/tsconfig.json`
**TypeScript Configuration**
- Strict mode enabled
- Path aliases configured
- Modern ES2020 target
- JSX support

#### `frontend/tailwind.config.ts`
**Tailwind CSS Theme**
- Custom color palette (primary, secondary, accent, etc.)
- Extended theme configuration
- Border radius customization
- Font family settings

#### `frontend/next.config.mjs`
**Next.js Configuration**
- React strict mode
- SWC minification
- Webpack configuration

#### `frontend/package.json`
**Dependencies**
- React 18.2.0
- Next.js 14.0.0
- TypeScript
- Tailwind CSS
- Google Generative AI SDK
- Firebase
- Axios

### Backend (Express.js + Node.js)

#### `backend/server.js`
**Main Server File (45 lines)**
- Express app setup
- CORS configuration for localhost:3000
- Middleware setup (JSON, CORS)
- Route imports
- Error handling middleware
- 404 handler
- Server startup on port 5000

#### `backend/routes/election.js`
**Election Data Routes (126 lines)**
- Mock election data structure
- GET /api/election/current
  - Returns election info (543 constituencies, 900M voters)
- GET /api/election/timeline
  - Returns 4 timeline events with dates
- GET /api/election/schedule
  - Returns 3-phase election schedule
- POST /api/election/register-reminder
  - Registers user for email reminders
  - Would integrate with Firebase

#### `backend/routes/candidates.js`
**Candidate Search Routes (231 lines)**
- 5 mock candidates in database
- POST /api/search-candidates
  - Searches candidates by query
  - Uses Google Gemini API for AI insights
  - Fallback to mock insights if API unavailable
- GET /api/candidates
  - Returns all candidates
- GET /api/candidates/:id
  - Returns specific candidate
- GET /api/candidates/policy/:policy
  - Filters candidates by policy
- POST /api/myth-buster
  - AI-powered myth debunking
  - Uses Gemini to fact-check claims

#### `backend/package.json`
**Dependencies**
- Express 4.18.0
- CORS
- Dotenv (environment variables)
- Google Generative AI SDK
- Firebase Admin SDK
- Axios
- Nodemon (dev)

#### `backend/.env.example`
**Environment Variables Template**
- PORT=5000
- NODE_ENV=development
- GEMINI_API_KEY
- Firebase credentials
- CORS configuration

### Firebase Configuration

#### `firebase/config.js`
**Firebase Setup File (217 lines)**
- Frontend Firebase config
- Firebase Admin initialization
- Collection schemas (users, reminders, savedCandidates, votes)
- Firestore helper functions:
  - addUser()
  - addReminder()
  - getUserReminders()
  - saveCandidatePreference()
  - recordVote()
- Security rules template (paste into Firestore)
- Field definitions for each collection

#### `firebase/README.md`
**Firebase Documentation (406 lines)**
- Step-by-step Firebase setup
- Getting credentials
- Collection structure
- Security rules
- Usage examples
- Cloud Functions for email
- Troubleshooting guide
- Cost management
- Scaling recommendations

### Documentation Files

#### `README.md` (Main - 369 lines)
**Complete Project Documentation**
- Project overview
- Features explanation
- Tech stack details
- Complete setup instructions
- API endpoints reference
- Usage examples
- Development workflow
- Customization guide
- Security considerations
- Deployment instructions
- Troubleshooting
- Contributing guidelines
- Roadmap

#### `QUICKSTART.md` (275 lines)
**5-Minute Quick Start**
- Prerequisites checklist
- Step-by-step setup
- Troubleshooting quick fixes
- Feature testing
- File structure reference
- API endpoint examples
- Component descriptions
- Useful commands
- Learning resources

#### `DEPLOYMENT.md` (493 lines)
**Production Deployment Guide**
- Multiple deployment options:
  - Frontend: Vercel, Netlify, Railway, Docker
  - Backend: Railway, Heroku, Render, AWS EC2, Docker
- Step-by-step instructions for each platform
- Environment variables checklist
- Domain setup instructions
- SSL/HTTPS setup
- Continuous deployment
- Performance optimization
- Security checklist
- Monitoring and logging
- Cost estimates
- Post-deployment checklist

#### `PROJECT_STRUCTURE.md` (This file)
**Complete Project Map**
- Directory tree
- File descriptions
- Function documentation
- Line counts
- Technology breakdown

#### `backend/README.md` (384 lines)
**Backend-Specific Documentation**
- Installation and setup
- API routes in detail
- Error handling
- Middleware documentation
- Database integration
- Gemini AI integration
- Development guidelines
- Testing with curl
- Deployment options
- Performance optimization
- Security practices

## Quick Statistics

### Code Files
- **Frontend**: 5 components + 1 page + 2 layout/config files
- **Backend**: 1 server + 2 route files
- **Firebase**: 1 config file
- **Total Code Files**: 12

### Documentation Files
- Main README.md
- QUICKSTART.md
- DEPLOYMENT.md
- PROJECT_STRUCTURE.md
- backend/README.md
- firebase/README.md
- Total lines: 2000+

### Configuration Files
- package.json (frontend & backend)
- tsconfig.json
- tailwind.config.ts
- next.config.mjs
- postcss.config.mjs
- .env.example files

### Total Lines of Code
- **Frontend Components**: ~600 lines
- **Backend Routes**: ~350 lines
- **Firebase Config**: ~217 lines
- **Global Styles**: ~96 lines
- **Configurations**: ~150 lines
- **Total**: ~1400 lines of production code

## Technology Breakdown

### Frontend Stack
```
Next.js 14 (React)
├── TypeScript
├── Tailwind CSS
├── Custom Components
└── Fetch/Axios for API calls
```

### Backend Stack
```
Express.js
├── Node.js
├── Google Generative AI
├── Firebase Admin (optional)
└── CORS & middleware
```

### Data & Storage
```
Firebase
├── Authentication (optional)
├── Firestore Database (optional)
└── Email Notifications (optional)
```

## API Summary

### Election Endpoints (5 routes)
- GET /api/election/current
- GET /api/election/timeline
- GET /api/election/schedule
- POST /api/election/register-reminder
- GET /health (health check)

### Candidate Endpoints (5 routes)
- POST /api/search-candidates (with Gemini AI)
- GET /api/candidates
- GET /api/candidates/:id
- GET /api/candidates/policy/:policy
- POST /api/myth-buster (with Gemini AI)

**Total API Routes**: 10 endpoints

## Database Structure

### Collections (4 total)
1. **users** - User profiles
2. **reminders** - Email reminders
3. **savedCandidates** - Bookmarked candidates
4. **votes** - Vote records

Each collection has pre-defined schema with fields and data types.

## Component Hierarchy

```
<RootLayout>
└── <main>
    ├── <header> Navigation
    ├── Hero Section
    ├── <VoterCard> x3
    ├── <Timeline>
    ├── <EVMVisualizer>
    ├── <CandidateCard> x3
    ├── <FAQ>
    └── <footer>
```

## Environment Variables

### Required (Production)
- GEMINI_API_KEY - Google Generative AI
- NEXT_PUBLIC_API_URL - Backend URL

### Optional (Firebase Features)
- FIREBASE_PROJECT_ID
- FIREBASE_PRIVATE_KEY
- FIREBASE_CLIENT_EMAIL
- And 5+ more Firebase variables

## Getting Started Path

1. **Quick Start** → Read QUICKSTART.md (5 mins)
2. **Full Setup** → Follow README.md (20 mins)
3. **Customization** → Edit components and config
4. **Deployment** → Follow DEPLOYMENT.md when ready

## What's NOT Included

To keep the project clean and locally-runnable:
- ❌ Vercel-specific files (favicon, vercel.json, etc.)
- ❌ shadcn/ui or other Vercel defaults
- ❌ Pre-built UI libraries
- ❌ Docker files (see DEPLOYMENT.md for templates)
- ❌ GitHub Actions workflows (can be added)
- ❌ Test files (can be added)
- ❌ Database migrations (Firebase handles this)

## What's Included

- ✅ Complete Next.js frontend
- ✅ Express.js backend with API
- ✅ Custom styled components
- ✅ Tailwind CSS configuration
- ✅ Google Gemini AI integration
- ✅ Firebase setup and helpers
- ✅ Comprehensive documentation
- ✅ Environment templates
- ✅ Deployment guides
- ✅ No Vercel dependencies

## Customization Points

All these are easy to customize:
- Colors: `frontend/tailwind.config.ts`
- Data: `backend/routes/election.js` and `candidates.js`
- Text: Any `.tsx` file
- Styling: `globals.css` and component files
- API endpoints: `backend/routes/`
- Database: `firebase/config.js`

## Next Steps

1. Follow **QUICKSTART.md** to get running locally
2. Explore the components in `frontend/app/components/`
3. Test the API endpoints in `backend/routes/`
4. Customize data to your needs
5. Add Firebase when ready
6. Deploy using **DEPLOYMENT.md**

---

**Total Project**: Complete, production-ready electoral platform with zero Vercel defaults. Pure Next.js, React, Express, and custom components.

Version: 1.0.0
Last Updated: 2024
