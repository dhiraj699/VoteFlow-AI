# VoteFlow-AI - Quick Start Guide

Get VoteFlow-AI running locally in 5 minutes.

## Prerequisites

- Node.js >= 16 installed
- Google Gemini API key (free) from https://aistudio.google.com/app/apikey
- Two terminal windows

## Step 1: Get Your API Key

1. Go to https://aistudio.google.com/app/apikey
2. Click "Create API key"
3. Copy the API key

## Step 2: Setup Backend

In **Terminal 1**:

```bash
cd backend
npm install
```

Create `.env` file in the `backend` folder:

```
PORT=5000
GEMINI_API_KEY=your_api_key_here
NODE_ENV=development
```

Start backend:

```bash
npm run dev
```

You should see:
```
[v0] Backend API running on http://localhost:5000
```

## Step 3: Setup Frontend

In **Terminal 2**:

```bash
cd frontend
npm install
```

Create `.env.local` file in the `frontend` folder (optional - already configured):

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start frontend:

```bash
npm run dev
```

You should see:
```
▲ Next.js 14.0.0
- Local:        http://localhost:3000
```

## Step 4: Open in Browser

Visit: **http://localhost:3000**

You should see the VoteFlow-AI homepage with:
- Election Timeline
- Voter Journey phases
- EVM Visualizer
- Candidate cards
- FAQ section

## Try Features

### 1. Explore the Main Dashboard
- Scroll through the election timeline
- View the three phases of voter journey
- Learn about EVM process

### 2. Search Candidates with AI
1. Click **"Search Candidates"** button or go to http://localhost:3000/candidate-ai
2. Type a policy or interest (e.g., "healthcare", "education", "environment")
3. See AI-powered candidate insights powered by Gemini

### 3. Read FAQs
- Scroll to FAQ section
- Click on any question to expand
- Filter by category (Eligibility, Registration, Voting, EVM)

## Troubleshooting

### Backend Won't Start
```bash
# Kill process on port 5000
lsof -i :5000
kill -9 <PID>

# Try again
npm run dev
```

### Frontend Won't Start
```bash
# Kill process on port 3000
lsof -i :3000
kill -9 <PID>

# Clear cache and try again
rm -rf .next
npm run dev
```

### Candidate Search Not Working
1. Verify Gemini API key is correct in `backend/.env`
2. Check backend is running on http://localhost:5000
3. Open browser console (F12) for error messages
4. Check backend terminal for error logs

### CORS Errors
- Make sure backend is running
- Check `NEXT_PUBLIC_API_URL=http://localhost:5000` in frontend `.env.local`
- Restart both frontend and backend

## Next Steps

### Customize Your Data
Edit `backend/routes/candidates.js` and `backend/routes/election.js` to add:
- Real candidate information
- Actual election dates
- Your state/region data

### Add Firebase (Optional)
To enable user reminders and saved candidates:
1. Follow setup in `firebase/README.md`
2. Add Firebase environment variables
3. Implement auth components

### Deploy
When ready to deploy:
- Frontend: Use Vercel, Netlify, or Railway
- Backend: Use Heroku, Railway, Render, or AWS
- See `README.md` for deployment instructions

## File Structure Quick Reference

```
VoteFlow-AI/
├── frontend/
│   ├── app/
│   │   ├── page.tsx              # Main dashboard
│   │   ├── candidate-ai/         # AI search page
│   │   └── components/           # Reusable components
│   └── .env.example
├── backend/
│   ├── server.js                 # Main server
│   ├── routes/
│   │   ├── election.js           # Election data
│   │   └── candidates.js         # Candidate & AI
│   └── .env.example
└── README.md                      # Full documentation
```

## Useful Commands

```bash
# Frontend development
cd frontend && npm run dev

# Backend development
cd backend && npm run dev

# Build frontend for production
cd frontend && npm run build

# Start frontend production server
cd frontend && npm run start

# Backend production mode
cd backend && npm start
```

## API Endpoints (Quick Reference)

```bash
# Get candidates
curl http://localhost:5000/api/candidates

# Search with AI
curl -X POST http://localhost:5000/api/search-candidates \
  -H "Content-Type: application/json" \
  -d '{"query": "healthcare"}'

# Get election timeline
curl http://localhost:5000/api/election/timeline

# Test API health
curl http://localhost:5000/health
```

## What Each Component Does

- **Timeline** - Shows election schedule and milestones
- **VoterCard** - Three phases of voter journey
- **FAQ** - Frequently asked questions with filtering
- **EVMVisualizer** - Interactive EVM voting guide
- **CandidateCard** - Display individual candidate info
- **CandidateSearch** - AI-powered candidate discovery

## Key Features Demo

1. **AI Candidate Search** - Type "healthcare" and see Gemini generate insights
2. **Interactive Timeline** - Visual election schedule
3. **Responsive Design** - Works on mobile, tablet, desktop
4. **No Vercel Dependencies** - Pure Next.js, React, and Tailwind CSS
5. **Custom Components** - Built from scratch, fully customizable

## Learning Resources

- Next.js: https://nextjs.org/docs
- Express.js: https://expressjs.com/
- Tailwind CSS: https://tailwindcss.com/docs
- Google Generative AI: https://ai.google.dev/
- Firebase: https://firebase.google.com/docs

## Tips

1. **Check the console** - Press F12 in browser for errors
2. **Read terminal output** - Backend logs show what's happening
3. **Modify freely** - Change colors, text, add features
4. **Test API directly** - Use curl commands to test backend
5. **Keep .env files** - Never commit them, only .env.example

## Common Customizations

### Change Colors
Edit `frontend/tailwind.config.ts`:
```typescript
colors: {
  primary: '#your-color',
  secondary: '#your-color',
}
```

### Add More Candidates
Edit `backend/routes/candidates.js` - Add to `candidatesDB` array

### Modify Timeline
Edit `backend/routes/election.js` - Update `electionData.timeline`

### Change Component Text
Edit files in `frontend/app/components/` - Modify JSX content

## Support & Help

- Check `README.md` for detailed documentation
- See `backend/README.md` for API details
- Check `firebase/README.md` for database setup
- Look at error messages in browser console or backend terminal

---

**Ready?** Open http://localhost:3000 and start exploring!

Need more help? Read the full `README.md`
