# VoteFlow-AI - Setup Checklist

Use this checklist to ensure your VoteFlow-AI project is properly configured and ready to run.

## Pre-Setup (5 minutes)

- [ ] Node.js >= 16 is installed
  ```bash
  node --version  # Should show v16+
  ```
- [ ] npm/pnpm is installed
  ```bash
  npm --version   # or pnpm --version
  ```
- [ ] You have Google Gemini API key
  - Get it here: https://aistudio.google.com/app/apikey
  - Save it somewhere safe

## Backend Setup (10 minutes)

- [ ] Navigate to backend folder
  ```bash
  cd backend
  ```

- [ ] Install dependencies
  ```bash
  npm install
  # or: pnpm install
  ```

- [ ] Create `.env` file
  ```bash
  cp .env.example .env
  ```

- [ ] Edit `backend/.env`
  - [ ] Set `GEMINI_API_KEY=your-api-key-here`
  - [ ] Verify `PORT=5000`
  - [ ] Set `NODE_ENV=development`

- [ ] Verify backend can start
  ```bash
  npm run dev
  ```
  - [ ] See: "[v0] Backend API running on http://localhost:5000"
  - [ ] Stop with Ctrl+C

## Frontend Setup (10 minutes)

- [ ] Navigate to frontend folder
  ```bash
  cd ../frontend
  ```

- [ ] Install dependencies
  ```bash
  npm install
  # or: pnpm install
  ```

- [ ] Create `.env.local` file
  ```bash
  cp .env.example .env.local
  ```

- [ ] Verify API URL is set
  - [ ] Check: `NEXT_PUBLIC_API_URL=http://localhost:5000`
  - [ ] This is already in .env.example

- [ ] Verify frontend can start
  ```bash
  npm run dev
  ```
  - [ ] See: "▲ Next.js 14.0.0"
  - [ ] See: "- Local: http://localhost:3000"
  - [ ] Stop with Ctrl+C

## Integration Test (5 minutes)

- [ ] Start backend in Terminal 1
  ```bash
  cd backend
  npm run dev
  ```
  - [ ] Wait for: "[v0] Backend API running..."

- [ ] Start frontend in Terminal 2
  ```bash
  cd frontend
  npm run dev
  ```
  - [ ] Wait for: "ready - started server on..."

- [ ] Open http://localhost:3000 in browser
  - [ ] Page loads without errors
  - [ ] See "VoteFlow-AI" header
  - [ ] See all sections (Timeline, Voters, FAQ, etc.)

- [ ] Test candidate search
  - [ ] Click "Search Candidates" or go to /candidate-ai
  - [ ] Type "healthcare"
  - [ ] See candidates with AI insights
  - [ ] Insights mention the search topic

- [ ] Check browser console (F12)
  - [ ] No red errors
  - [ ] No CORS warnings

- [ ] Check backend terminal
  - [ ] No error messages
  - [ ] Requests logged

## API Testing (5 minutes)

- [ ] Test health endpoint
  ```bash
  curl http://localhost:5000/health
  ```
  - [ ] Returns: `{"status":"API is running"...}`

- [ ] Test get candidates
  ```bash
  curl http://localhost:5000/api/candidates
  ```
  - [ ] Returns JSON array with candidates

- [ ] Test election timeline
  ```bash
  curl http://localhost:5000/api/election/timeline
  ```
  - [ ] Returns timeline events

- [ ] Test search with AI
  ```bash
  curl -X POST http://localhost:5000/api/search-candidates \
    -H "Content-Type: application/json" \
    -d '{"query": "education"}'
  ```
  - [ ] Returns candidates with aiInsight field

- [ ] Test myth buster
  ```bash
  curl -X POST http://localhost:5000/api/myth-buster \
    -H "Content-Type: application/json" \
    -d '{"myth": "Can I vote without ID?"}'
  ```
  - [ ] Returns debunked explanation

## Component Testing (5 minutes)

Test each component on http://localhost:3000:

- [ ] **Timeline Component**
  - [ ] Shows 4 events with dates
  - [ ] Status badges visible
  - [ ] Alternating layout looks good
  - [ ] Responsive on mobile

- [ ] **Voter Cards (3 phases)**
  - [ ] Three cards display in grid
  - [ ] Gradient backgrounds visible
  - [ ] Key points listed
  - [ ] Icons show (📚, 📋, 🗳️)

- [ ] **FAQ Section**
  - [ ] Shows multiple Q&As
  - [ ] Can click to expand/collapse
  - [ ] Category filter buttons work
  - [ ] Answers are readable

- [ ] **EVM Visualizer**
  - [ ] Shows 5 steps
  - [ ] Can click steps to navigate
  - [ ] Previous/Next buttons work
  - [ ] Progress bar updates

- [ ] **Candidate Cards**
  - [ ] Shows 3 candidates
  - [ ] Party badges visible
  - [ ] Policies listed with checkmarks
  - [ ] Responsive grid

- [ ] **Navigation**
  - [ ] Header "VoteFlow-AI" visible
  - [ ] Nav links present
  - [ ] "Register to Vote" button visible

## Firebase Setup (Optional - 15 minutes)

Skip this if you don't need user accounts and reminders.

- [ ] Create Firebase project
  - [ ] Go to https://console.firebase.google.com
  - [ ] Click "Create project"
  - [ ] Name: "VoteFlow-AI"
  - [ ] Create

- [ ] Setup Authentication
  - [ ] Go to Authentication > Get started
  - [ ] Enable Email/Password
  - [ ] Save

- [ ] Create Firestore Database
  - [ ] Go to Firestore Database > Create database
  - [ ] Start in Test mode
  - [ ] Select location
  - [ ] Create

- [ ] Get Firebase Config
  - [ ] Go to Project Settings > Your apps
  - [ ] Copy web config
  - [ ] Add to `frontend/.env.local`:
    ```
    NEXT_PUBLIC_FIREBASE_API_KEY=...
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
    NEXT_PUBLIC_FIREBASE_APP_ID=...
    ```

- [ ] Get Service Account Key
  - [ ] Go to Project Settings > Service Accounts
  - [ ] Generate new private key
  - [ ] Add to `backend/.env`:
    ```
    FIREBASE_TYPE=service_account
    FIREBASE_PROJECT_ID=...
    FIREBASE_PRIVATE_KEY_ID=...
    FIREBASE_PRIVATE_KEY=...
    FIREBASE_CLIENT_EMAIL=...
    FIREBASE_CLIENT_ID=...
    ```

- [ ] Test Firebase
  - [ ] Restart backend: `npm run dev`
  - [ ] Check logs for "[v0] Firebase Admin initialized"
  - [ ] No errors in console

## Customization (As Needed)

Once everything works, customize:

- [ ] **Add Your Data**
  - [ ] Edit `backend/routes/candidates.js` - Add real candidates
  - [ ] Edit `backend/routes/election.js` - Add your election dates
  - [ ] Edit `frontend/app/page.tsx` - Change text and content

- [ ] **Change Colors**
  - [ ] Edit `frontend/tailwind.config.ts`
  - [ ] Update color values in theme

- [ ] **Modify Components**
  - [ ] Edit files in `frontend/app/components/`
  - [ ] Change styling and layout

- [ ] **Add More Policies**
  - [ ] Edit candidate policies in `candidates.js`
  - [ ] Update FAQ categories

## Troubleshooting Quick Fixes

### Backend won't start
```bash
# Kill process on 5000
lsof -i :5000
kill -9 <PID>

# Try again
npm run dev
```

### Frontend won't start
```bash
# Kill process on 3000
lsof -i :3000
kill -9 <PID>

# Clear cache
rm -rf .next
npm run dev
```

### API not working
- [ ] Backend running? Check Terminal 1
- [ ] Correct URL in `.env.local`?
- [ ] Try restarting both servers

### Gemini API errors
- [ ] API key set correctly?
- [ ] Key valid? Check at https://aistudio.google.com/app/apikey
- [ ] Restart backend

### CORS errors in browser console
- [ ] Backend running?
- [ ] Check `NEXT_PUBLIC_API_URL=http://localhost:5000`
- [ ] Restart frontend

### Components not styling
- [ ] Tailwind CSS processing?
- [ ] Check `tailwind.config.ts`
- [ ] Restart dev server

## Production Checklist

When ready to deploy:

- [ ] **Finalize Data**
  - [ ] Real election dates set
  - [ ] Real candidates added
  - [ ] All content reviewed

- [ ] **Security**
  - [ ] API key removed from code
  - [ ] Environment variables set
  - [ ] No secrets in git

- [ ] **Testing**
  - [ ] All features work
  - [ ] No console errors
  - [ ] Responsive on mobile
  - [ ] API endpoints tested

- [ ] **Choose Hosting**
  - [ ] Frontend: Vercel, Netlify, or Railway?
  - [ ] Backend: Railway, Heroku, or Render?
  - [ ] Database: Firebase or other?

- [ ] **Deploy Frontend**
  - [ ] Follow DEPLOYMENT.md
  - [ ] Set environment variables
  - [ ] Test production URL

- [ ] **Deploy Backend**
  - [ ] Follow DEPLOYMENT.md
  - [ ] Update frontend API URL
  - [ ] Verify API works

- [ ] **Post-Launch**
  - [ ] Monitor error logs
  - [ ] Check performance
  - [ ] Plan updates

## Project Structure

Verify you have all files:

```
VoteFlow-AI/
├── frontend/
│   ├── app/
│   │   ├── components/
│   │   │   ├── Timeline.tsx
│   │   │   ├── VoterCard.tsx
│   │   │   ├── FAQ.tsx
│   │   │   ├── EVMVisualizer.tsx
│   │   │   └── CandidateCard.tsx
│   │   ├── candidate-ai/page.tsx
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── next.config.mjs
│   └── .env.example
├── backend/
│   ├── server.js
│   ├── routes/
│   │   ├── election.js
│   │   └── candidates.js
│   ├── package.json
│   └── .env.example
├── firebase/
│   ├── config.js
│   └── README.md
├── README.md
├── QUICKSTART.md
├── DEPLOYMENT.md
└── PROJECT_STRUCTURE.md
```

- [ ] All frontend files present
- [ ] All backend files present
- [ ] Firebase config present
- [ ] All documentation files present

## Final Verification

- [ ] `npm install` works in frontend
- [ ] `npm install` works in backend
- [ ] Frontend runs: `npm run dev`
- [ ] Backend runs: `npm run dev`
- [ ] Browser loads http://localhost:3000
- [ ] API responds at http://localhost:5000/health
- [ ] No errors in console
- [ ] No errors in terminal

## Documentation Review

- [ ] Read README.md
- [ ] Read QUICKSTART.md
- [ ] Read PROJECT_STRUCTURE.md
- [ ] Bookmark DEPLOYMENT.md for later

## Success!

If all checkboxes are complete:
- ✅ VoteFlow-AI is fully setup
- ✅ Everything is running locally
- ✅ You're ready to customize
- ✅ You can deploy whenever ready

## Quick Commands Reference

```bash
# Backend
cd backend
npm install
npm run dev          # development
npm start            # production

# Frontend
cd frontend
npm install
npm run dev          # development
npm run build        # build
npm run start        # production

# Quick test
curl http://localhost:5000/health
curl http://localhost:5000/api/candidates
```

## Need Help?

1. Check README.md for detailed docs
2. Check QUICKSTART.md for quick fixes
3. Check backend/README.md for API docs
4. Check firebase/README.md for database setup
5. Check DEPLOYMENT.md when ready to launch

---

**Status**: Ready to use this checklist!
**Time Estimate**: 30-45 minutes for complete setup (including Firebase)
**Note**: Firebase is optional - works fine without it!

Last Updated: 2024
