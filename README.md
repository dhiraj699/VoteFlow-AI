# VoteFlow-AI - Electoral Awareness Platform

An interactive, AI-powered electoral platform designed to empower voters with information, educate them about the election process, and facilitate candidate research.

## Project Structure

```
VoteFlow-AI/
├── frontend/                 # Next.js React application
│   ├── app/
│   │   ├── components/       # Reusable React components
│   │   │   ├── Timeline.tsx
│   │   │   ├── VoterCard.tsx
│   │   │   ├── FAQ.tsx
│   │   │   ├── EVMVisualizer.tsx
│   │   │   └── CandidateCard.tsx
│   │   ├── candidate-ai/     # AI-powered candidate search
│   │   ├── page.tsx          # Main dashboard
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── next.config.mjs
│   └── .env.example          # Environment variable template
│
├── backend/                  # Express.js API server
│   ├── server.js             # Main server configuration
│   ├── routes/
│   │   ├── election.js       # Election timeline and schedules
│   │   └── candidates.js     # Candidate search and Gemini AI
│   ├── package.json
│   ├── .env.example          # Environment variable template
│   └── README.md
│
├── firebase/                 # Firebase configuration
│   ├── config.js             # Firebase initialization and helpers
│   └── README.md
│
└── README.md                 # This file
```

## Features

### 1. **Interactive Election Timeline**
   - Visualize election schedule and key dates
   - Track current and upcoming phases
   - Real-time status updates

### 2. **Three-Phase Voter Journey**
   - Awareness Phase: Learn about elections
   - Preparation Phase: Register and prepare
   - Voting Phase: Cast your vote

### 3. **EVM Visualizer**
   - Step-by-step guide to Electronic Voting Machines
   - Interactive learning experience
   - Educational content about voting process

### 4. **AI-Powered Candidate Search**
   - Search candidates by policies or interests
   - Google Gemini API integration for intelligent insights
   - Find candidates aligned with your values

### 5. **Comprehensive FAQ**
   - Categorized frequently asked questions
   - Expandable Q&A format
   - Easy filtering by category

### 6. **Myth Buster**
   - AI-powered election myth debunking
   - Fact-checking with AI assistance
   - Educational content

### 7. **User Reminders**
   - Register for election reminders
   - Firebase-powered notification system
   - Email alerts for important dates

## Tech Stack

### Frontend
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom built (no Vercel defaults)
- **API Client**: Fetch API / Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: JavaScript
- **AI Integration**: Google Gemini API
- **Database**: Firebase Firestore (optional)

### Infrastructure
- **Authentication**: Firebase Auth (optional)
- **Database**: Firebase Firestore (optional)
- **API**: Express REST API

## Setup Instructions

### Prerequisites
- Node.js >= 16
- npm or yarn or pnpm
- Google Gemini API key (from https://aistudio.google.com/app/apikey)
- Firebase project (optional, for reminders)

### 1. Clone or Download the Project

```bash
cd VoteFlow-AI
```

### 2. Setup Backend

```bash
cd backend
npm install
# or
pnpm install
```

Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

Edit `.env` and add your:
- `GEMINI_API_KEY` from Google AI Studio
- Firebase credentials (optional)

Start the backend server:
```bash
npm run dev
# or
node server.js
```

The backend will run on `http://localhost:5000`

### 3. Setup Frontend

In a new terminal, from the project root:

```bash
cd frontend
npm install
# or
pnpm install
```

Create `.env.local` file from `.env.example`:
```bash
cp .env.example .env.local
```

The `NEXT_PUBLIC_API_URL` should already point to `http://localhost:5000`

Start the frontend development server:
```bash
npm run dev
# or
pnpm dev
```

The frontend will run on `http://localhost:3000`

### 4. Firebase Setup (Optional)

To enable user reminders and saved candidates:

1. Create a Firebase project: https://console.firebase.google.com
2. Enable Firestore Database
3. Copy your credentials to backend `.env`
4. Copy your web config to frontend `.env.local`
5. Implement authentication in your Firebase project

## API Endpoints

### Election Routes (`/api/election`)

- `GET /api/election/current` - Get current election info
- `GET /api/election/timeline` - Get election timeline
- `GET /api/election/schedule` - Get election schedule by phases
- `POST /api/election/register-reminder` - Register for reminders

### Candidate Routes (`/api`)

- `POST /api/search-candidates` - AI-powered candidate search
- `GET /api/candidates` - Get all candidates
- `GET /api/candidates/:id` - Get candidate by ID
- `GET /api/candidates/policy/:policy` - Get candidates by policy
- `POST /api/myth-buster` - Debunk election myths using AI

### Health Check

- `GET /health` - API health status

## Usage Examples

### Search Candidates with AI

```bash
curl -X POST http://localhost:5000/api/search-candidates \
  -H "Content-Type: application/json" \
  -d '{"query": "healthcare policy"}'
```

### Get Election Timeline

```bash
curl http://localhost:5000/api/election/timeline
```

### Myth Buster

```bash
curl -X POST http://localhost:5000/api/myth-buster \
  -H "Content-Type: application/json" \
  -d '{"myth": "Can I vote without an ID?"}'
```

## Development Workflow

### Frontend Development
```bash
cd frontend
pnpm dev
```

### Backend Development
```bash
cd backend
pnpm dev  # requires nodemon
```

### Build for Production

**Frontend:**
```bash
cd frontend
npm run build
npm run start
```

**Backend:**
```bash
cd backend
npm start
```

## Customization

### Add More Candidates
Edit `backend/routes/candidates.js` - Update the `candidatesDB` array with real candidate data.

### Customize Styling
Edit `frontend/tailwind.config.ts` to change colors and theme:
```typescript
colors: {
  primary: '#your-color',
  secondary: '#your-color',
  // ... more colors
}
```

### Modify Election Data
Edit `backend/routes/election.js` to update timelines and schedules with real election data.

### Change Component Styles
Edit individual component files in `frontend/app/components/` - all use Tailwind CSS classes.

## Security Considerations

1. **Keep API keys secure** - Never commit `.env` files
2. **Validate all inputs** - Server-side validation for API requests
3. **Use HTTPS in production** - Configure CORS properly
4. **Firebase Security Rules** - See `firebase/config.js` for example RLS

## Deployment

### Deploy Frontend to Vercel

```bash
cd frontend
npm install -g vercel
vercel
```

### Deploy Backend to Heroku/Railway

```bash
cd backend
# Follow hosting platform's instructions
```

### Firebase Hosting (Optional)

```bash
npm install -g firebase-tools
firebase init
firebase deploy
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -i :5000
kill -9 <PID>

# Or use different port
PORT=5001 npm start
```

### CORS Errors
Ensure backend is running and `NEXT_PUBLIC_API_URL` in frontend points to correct backend URL.

### Gemini API Errors
- Verify API key is valid
- Check quota and billing in Google Cloud Console
- Ensure API is enabled in your GCP project

### Firebase Errors
- Check service account credentials
- Verify Firestore database is created
- Review security rules in Firebase Console

## Contributing

To contribute to VoteFlow-AI:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues and questions:
- Check existing GitHub issues
- Create a new issue with detailed description
- Include environment details and error messages

## Roadmap

- [ ] Real integration with Election Commission API
- [ ] SMS-based reminders
- [ ] Mobile app (React Native)
- [ ] Blockchain-based vote verification
- [ ] Multilingual support
- [ ] Advanced candidate comparison tool
- [ ] Live election results dashboard
- [ ] Integration with voter registration systems

## Team

VoteFlow-AI was built to promote electoral literacy and increase voter participation.

---

**Last Updated**: 2024
**Version**: 1.0.0
