# VoteFlow-AI Backend

Express.js REST API server for VoteFlow-AI electoral platform with Google Gemini AI integration.

## Getting Started

### Installation

```bash
npm install
# or
pnpm install
```

### Configuration

Create `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Required environment variables:
- `GEMINI_API_KEY` - Get from https://aistudio.google.com/app/apikey
- `PORT` - Server port (default: 5000)

Optional:
- Firebase admin credentials for user reminders

### Running the Server

Development mode:
```bash
npm run dev
# requires: npm install -D nodemon
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Routes

### Election Routes (`/api/election`)

#### Get Current Election
```bash
GET /api/election/current
```
Returns current election information, eligible voters, and status.

#### Get Election Timeline
```bash
GET /api/election/timeline
```
Returns all election events with dates and status.

#### Get Election Schedule
```bash
GET /api/election/schedule
```
Returns election phases and state-wise schedule.

#### Register Reminder
```bash
POST /api/election/register-reminder
Headers: Content-Type: application/json

Body:
{
  "email": "user@example.com",
  "topic": "voter_registration"
}
```

### Candidate Routes (`/api`)

#### AI-Powered Candidate Search
```bash
POST /api/search-candidates
Headers: Content-Type: application/json

Body:
{
  "query": "healthcare policy"
}

Response:
{
  "success": true,
  "query": "healthcare policy",
  "results": [
    {
      "id": "1",
      "name": "Candidate Name",
      "party": "Party Name",
      "position": "Member of Parliament",
      "policies": ["Healthcare Access", ...],
      "background": "...",
      "aiInsight": "AI-generated insight about candidate..."
    },
    ...
  ]
}
```

#### Get All Candidates
```bash
GET /api/candidates
```
Returns list of all candidates.

#### Get Candidate by ID
```bash
GET /api/candidates/:id
```
Returns specific candidate details.

#### Get Candidates by Policy
```bash
GET /api/candidates/policy/:policy
```
Returns candidates matching specific policy area.

Example:
```bash
GET /api/candidates/policy/healthcare
```

#### Myth Buster
```bash
POST /api/myth-buster
Headers: Content-Type: application/json

Body:
{
  "myth": "Can I vote without an ID?"
}

Response:
{
  "success": true,
  "myth": "Can I vote without an ID?",
  "debunked": true,
  "explanation": "AI-generated explanation...",
  "source": "Election Commission Official Guidelines"
}
```

## Error Handling

All errors follow this format:
```json
{
  "error": "Error message description"
}
```

HTTP Status Codes:
- `200` - Success
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Server Error

## Middleware

### CORS
Enabled for frontend on `http://localhost:3000` and `http://localhost:3001`

### Body Parser
Configured for JSON payloads up to 1MB

### Error Handler
Custom error handling middleware for consistent error responses

## Database Integration

### Firebase Firestore (Optional)

The server can integrate with Firebase Firestore for:
- User registration
- Reminder management
- Saved candidates
- Vote tracking

Enable by setting Firebase environment variables.

### Collections

See `firebase/config.js` for collection schemas:
- `users` - User profiles
- `reminders` - Email reminders
- `savedCandidates` - User-saved candidates
- `votes` - Vote records

## Gemini AI Integration

### Features

1. **Candidate Search with AI Insights**
   - Searches candidates by query
   - Generates AI insights about candidate alignment

2. **Myth Buster**
   - Analyzes election myths
   - Provides factual corrections
   - Cites official sources

### Model
- Model: `gemini-pro`
- Provider: Google Generative AI

### Error Handling
If API key is not set, endpoints return mock data with fallback messages.

## Development

### Project Structure
```
backend/
├── server.js           # Main server setup
├── routes/
│   ├── election.js     # Election endpoints
│   └── candidates.js   # Candidate endpoints
├── package.json
├── .env.example
└── README.md
```

### Adding New Routes

1. Create new file in `routes/` directory
2. Import and use in `server.js`:
```javascript
const newRoutes = require('./routes/new-route');
app.use('/api', newRoutes);
```

3. Export router from route file:
```javascript
module.exports = router;
```

### Debugging

Enable debug logging:
```javascript
console.log('Debug message:', data);
```

Check logs in terminal where server is running.

## Testing

### Manual Testing with curl

```bash
# Test health check
curl http://localhost:5000/health

# Test candidate search
curl -X POST http://localhost:5000/api/search-candidates \
  -H "Content-Type: application/json" \
  -d '{"query": "education"}'

# Test myth buster
curl -X POST http://localhost:5000/api/myth-buster \
  -H "Content-Type: application/json" \
  -d '{"myth": "Sample myth here"}'
```

## Deployment

### Heroku
```bash
git init
git add .
git commit -m "Deploy to Heroku"
heroku create your-app-name
git push heroku main
```

### Railway
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically on push

### Docker

Create `Dockerfile`:
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t voteflow-backend .
docker run -p 5000:5000 --env-file .env voteflow-backend
```

## Performance Optimization

1. **Connection Pooling** - Firebase/database connections are reused
2. **Request Validation** - Early validation prevents unnecessary processing
3. **Error Handling** - Graceful error handling prevents crashes
4. **Caching** - Consider implementing caching for frequent queries

## Security

1. **API Key Protection**
   - Store `GEMINI_API_KEY` in environment variables
   - Never commit `.env` file

2. **Input Validation**
   - All inputs are validated before processing
   - Prevent SQL injection and XSS attacks

3. **CORS Configuration**
   - Whitelist specific frontend domains
   - Restrict in production

4. **Rate Limiting** (Recommended)
   - Implement rate limiting for production
   - Prevent API abuse

## Troubleshooting

### Port 5000 Already in Use
```bash
# Find process
lsof -i :5000

# Kill process
kill -9 <PID>

# Or use different port
PORT=5001 npm start
```

### Gemini API Not Working
- Verify API key in `.env`
- Check API quotas in Google Cloud Console
- Ensure `@google/generative-ai` is installed

### CORS Issues
- Check frontend URL in CORS configuration
- Ensure backend is running
- Check browser console for specific errors

### Firebase Connection Issues
- Verify service account credentials
- Check Firestore database is created
- Review security rules

## Contributing

To improve the backend:
1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## Support

For issues:
- Check error messages in terminal
- Review API response status codes
- Enable debug logging
- Check environment variables are set

---

**Last Updated**: 2024
**Version**: 1.0.0
