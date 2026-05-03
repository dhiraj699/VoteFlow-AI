# VoteFlow-AI - Deployment Guide

Deploy VoteFlow-AI frontend and backend to production.

## Overview

- **Frontend**: Deploy to Vercel, Netlify, or Railway
- **Backend**: Deploy to Heroku, Railway, Render, or AWS
- **Database**: Firebase (automatic) or your own database

## Frontend Deployment

### Option 1: Vercel (Recommended)

Vercel is the creator of Next.js and offers seamless deployment.

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
cd frontend
vercel
```

3. **Follow prompts**
   - Link to Git repository (GitHub, GitLab, Bitbucket)
   - Set project name
   - Set `NEXT_PUBLIC_API_URL` to your backend URL

4. **Set Environment Variables**
   - Go to Vercel Dashboard
   - Project → Settings → Environment Variables
   - Add:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-api.com
   NEXT_PUBLIC_FIREBASE_API_KEY=your-key
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
   ```

5. **Your site is live!**
   ```
   https://voteflow-ai.vercel.app
   ```

### Option 2: Netlify

1. **Connect Repository**
   - Go to https://netlify.com
   - Click "New site from Git"
   - Connect GitHub/GitLab/Bitbucket

2. **Configure Build**
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/.next`

3. **Set Environment Variables**
   - Site settings → Build & deploy → Environment
   - Add `NEXT_PUBLIC_API_URL` and Firebase variables

4. **Deploy**
   - Click "Deploy site"

### Option 3: Railway

1. **Create Account** - https://railway.app

2. **Connect Git**
   - New Project → GitHub
   - Select repository

3. **Configure**
   - Set Root Directory: `frontend`
   - Add environment variables

4. **Deploy** - Automatic on push

### Option 4: Docker + Any Cloud

**Create Dockerfile in frontend:**

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["serve", "-s", ".next", "-l", "3000"]
```

Build and push:
```bash
docker build -t voteflow-frontend .
docker tag voteflow-frontend your-registry/voteflow-frontend:latest
docker push your-registry/voteflow-frontend:latest
```

## Backend Deployment

### Option 1: Railway (Easiest)

1. **Create Account** - https://railway.app

2. **Connect Git**
   - New Project → GitHub
   - Select repository

3. **Configure**
   - Set Root Directory: `backend`
   - Add environment variables:
     ```
     GEMINI_API_KEY=your-key
     FIREBASE_PROJECT_ID=your-project
     NODE_ENV=production
     ```

4. **Deploy** - Automatic on push
   ```
   Your API: https://your-backend.railway.app
   ```

### Option 2: Heroku

1. **Install Heroku CLI**
```bash
npm install -g heroku
```

2. **Login**
```bash
heroku login
```

3. **Create App**
```bash
cd backend
heroku create voteflow-ai-backend
```

4. **Set Config Variables**
```bash
heroku config:set GEMINI_API_KEY=your-key
heroku config:set NODE_ENV=production
```

5. **Deploy**
```bash
git push heroku main
```

6. **View Logs**
```bash
heroku logs --tail
```

Your API: `https://voteflow-ai-backend.herokuapp.com`

### Option 3: Render

1. **Go to https://render.com**

2. **New Web Service**
   - Connect GitHub
   - Select backend repo/directory

3. **Configure**
   - Build: `npm install`
   - Start: `npm start`
   - Environment: Production
   - Plan: Free/Paid

4. **Add Environment Variables**
   - GEMINI_API_KEY
   - NODE_ENV=production

5. **Create** - Automatic deployment

Your API: `https://voteflow-backend.onrender.com`

### Option 4: AWS EC2

1. **Launch EC2 Instance**
   - Choose Node.js AMI
   - Configure security groups

2. **SSH into Instance**
```bash
ssh -i your-key.pem ec2-user@your-instance.compute.amazonaws.com
```

3. **Setup Node.js**
```bash
sudo yum update
sudo yum install nodejs npm
```

4. **Clone and Deploy**
```bash
git clone your-repo.git
cd backend
npm install
npm start
```

5. **Use Process Manager (PM2)**
```bash
sudo npm install -g pm2
pm2 start server.js --name "voteflow-api"
pm2 startup
pm2 save
```

Your API: `http://your-instance-ip:5000`

### Option 5: Docker + Any Cloud

**Create Dockerfile in backend:**

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

Build and push:
```bash
docker build -t voteflow-backend .
docker tag voteflow-backend your-registry/voteflow-backend:latest
docker push your-registry/voteflow-backend:latest
```

## Database Deployment

### Firebase (Recommended)

No additional steps needed - Firebase is cloud-hosted.

1. Create Firebase project: https://console.firebase.google.com
2. Use credentials in environment variables
3. Firebase handles scaling automatically

### AWS DynamoDB / RDS

If using AWS:

1. **Create DynamoDB table** or **RDS instance**
2. Get connection credentials
3. Add to backend environment variables
4. Update backend code to use AWS SDK

### Cloud Firestore

Already setup if using Firebase.

## Environment Variables Checklist

### Frontend (.env.local or Vercel settings)
- [ ] `NEXT_PUBLIC_API_URL` - Backend API URL
- [ ] `NEXT_PUBLIC_FIREBASE_API_KEY`
- [ ] `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- [ ] `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_APP_ID`

### Backend (.env)
- [ ] `GEMINI_API_KEY` - Google Generative AI key
- [ ] `PORT` - 5000 or configured port
- [ ] `NODE_ENV` - production
- [ ] `FIREBASE_PROJECT_ID` - Optional
- [ ] `FIREBASE_PRIVATE_KEY` - Optional

## Domain Setup

### Frontend Domain
1. Get domain from GoDaddy, Namecheap, etc.
2. Point DNS to your hosting:
   - Vercel: Add domain in settings
   - Netlify: Add domain in settings
   - Railway: Configure custom domain

### Backend Domain
1. Get separate domain or subdomain (api.yourdomain.com)
2. Point to backend hosting
3. Update `NEXT_PUBLIC_API_URL` in frontend

### Example
```
Frontend: https://voteflow-ai.com (Vercel)
Backend: https://api.voteflow-ai.com (Railway)
```

## SSL/HTTPS

All recommended platforms (Vercel, Railway, Netlify) provide **free SSL certificates** automatically.

## Monitoring & Logging

### Vercel
- Dashboard shows deployment status
- Real-time logs: `vercel logs <deployment-url>`

### Railway
- Dashboard with CPU, memory, storage graphs
- Real-time logs in dashboard

### Heroku
```bash
heroku logs --tail
heroku logs --tail --app your-app
```

### Render
- Dashboard shows build and deploy logs
- Runtime logs visible in dashboard

## Continuous Deployment

### GitHub → Vercel
1. Connect GitHub account
2. Select repository
3. Auto-deploys on every push to main

### GitHub → Railway
1. Connect GitHub
2. Auto-deploys on every push

### GitHub → Heroku
```bash
git remote add heroku https://git.heroku.com/your-app.git
git push heroku main  # Deploys automatically
```

## Performance Optimization

### Frontend
1. **Image Optimization** - Next.js optimizes images automatically
2. **Code Splitting** - Already configured
3. **Caching** - Configure in Vercel settings
4. **CDN** - Vercel/Netlify includes global CDN

### Backend
1. **Connection Pooling** - For databases
2. **Caching** - Use Upstash Redis (optional)
3. **Rate Limiting** - Add express-rate-limit
4. **Compression** - Add compression middleware

Add to backend/server.js:
```javascript
const compression = require('compression');
app.use(compression());

const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);
```

## Security Checklist

- [ ] Remove sensitive data from code
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS/SSL
- [ ] Set strong CORS policies
- [ ] Validate all user inputs
- [ ] Use security headers
- [ ] Enable rate limiting
- [ ] Regular security audits
- [ ] Keep dependencies updated

## Backup & Recovery

### Firebase Backup
Firebase has automatic daily backups. Access in console.

### Custom Database Backup
Set up automated backups with your cloud provider.

### Code Backup
Using GitHub for version control provides backup.

## Scaling

### If Traffic Increases

**Frontend**:
- Vercel/Netlify: Auto-scales with CDN
- No action needed

**Backend**:
- Railway/Render: Upgrade plan
- Heroku: Increase dynos
- AWS: Use Auto Scaling

## Testing Production

After deployment:

1. **Test Frontend**
   - Visit your domain
   - Check all pages load
   - Test API calls

2. **Test Backend**
   ```bash
   curl https://api.yourdomain.com/health
   curl -X POST https://api.yourdomain.com/api/search-candidates \
     -H "Content-Type: application/json" \
     -d '{"query": "healthcare"}'
   ```

3. **Test Features**
   - Search candidates
   - View timeline
   - Read FAQs
   - All interactions

## Troubleshooting

### Frontend Not Loading
- Check domain DNS
- Verify environment variables
- Check build logs in dashboard

### API Not Responding
- Verify backend is running
- Check API URL in frontend env vars
- Check backend error logs
- Verify CORS settings

### API Key Errors
- Verify key is set in environment
- Check key has correct permissions
- Try regenerating key

### Database Connection Issues
- Verify connection string
- Check credentials
- Verify database is accessible
- Check security groups/firewall

## Cost Estimates

### Free Options
- **Frontend**: Vercel free (10k deployments/month)
- **Backend**: Railway free ($5/month)
- **Database**: Firebase free tier (1GB)

### Paid Options
- **Frontend**: Vercel Pro ($20/month)
- **Backend**: Railway Pro ($7-30/month)
- **Database**: Firebase paid (pay-as-you-go)

Total: $27-50/month for small to medium apps

## Post-Deployment Checklist

- [ ] Test all features in production
- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Set up monitoring/alerts
- [ ] Document deployment process
- [ ] Setup backup schedule
- [ ] Plan scaling strategy
- [ ] Train team on deployment
- [ ] Create rollback plan
- [ ] Schedule regular updates

---

**Last Updated**: 2024
**Version**: 1.0.0

For help with specific platforms, check their official documentation.
