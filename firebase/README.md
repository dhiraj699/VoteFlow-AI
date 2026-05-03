# Firebase Integration for VoteFlow-AI

Firebase configuration and setup for user authentication, Firestore database, and reminder notifications.

## What You Get

Firebase provides:
- **Authentication** - User login/signup
- **Firestore Database** - Store user data, reminders, saved candidates
- **Real-time Sync** - Live updates across devices
- **Security Rules** - Row-level security for user data
- **Email Integration** - Send election reminders

## Setup Steps

### 1. Create Firebase Project

1. Go to https://console.firebase.google.com
2. Click "Add project"
3. Enter project name: `VoteFlow-AI`
4. Disable Google Analytics (optional)
5. Create project

### 2. Setup Authentication

1. In Firebase Console, go to **Authentication**
2. Click **Get started**
3. Enable **Email/Password** sign-in method
4. Save

### 3. Create Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Start in **Test mode** (for development)
4. Select location nearest to you
5. Create database

### 4. Get Firebase Credentials

#### For Frontend:
1. Go to **Project Settings** (gear icon)
2. Under "Your apps", click web icon
3. Copy the configuration object
4. Paste in `frontend/.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
```

#### For Backend (Admin):
1. Go to **Project Settings** > **Service Accounts**
2. Click **Generate new private key**
3. Save the JSON file
4. Update `backend/.env` with values from the JSON:

```
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=key-id
FIREBASE_PRIVATE_KEY=private-key-content
FIREBASE_CLIENT_EMAIL=service-account-email
FIREBASE_CLIENT_ID=client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
```

## Database Collections

### Users
Stores user profile information.

```
users/{userId}
├── email: string
├── displayName: string
├── createdAt: timestamp
└── updatedAt: timestamp
```

### Reminders
Stores election reminders for users.

```
reminders/{reminderId}
├── userId: string
├── topic: string (voter_registration, voting_day, etc)
├── email: string
├── createdAt: timestamp
├── nextReminder: timestamp
└── isActive: boolean
```

### Saved Candidates
Stores user's saved/liked candidates.

```
savedCandidates/{documentId}
├── userId: string
├── candidateId: string
├── candidateName: string
├── savedAt: timestamp
└── notes: string (optional)
```

### Votes
Records of user votes (anonymized).

```
votes/{voteId}
├── userId: string
├── electionId: string
├── votedAt: timestamp
├── constituency: string
└── status: string (pending, cast, verified)
```

## Security Rules

### Test Mode (Development)
Allows anyone to read/write (NOT for production).

### Secure Mode (Production)
Use these security rules. In Firebase Console:
1. Go to **Firestore Database** > **Rules**
2. Replace with rules from `config.js`

The rules ensure:
- Users can only access their own data
- Write operations require authentication
- No unauthorized cross-user access

## Initialization Code

### Backend - Initialize Firebase Admin

```javascript
const { admin } = require('../firebase/config');
const { firestoreHelpers } = require('../firebase/config');

// Add user
await firestoreHelpers.addUser(userId, {
  email: user.email,
  displayName: user.displayName,
});

// Add reminder
await firestoreHelpers.addReminder(userId, {
  topic: 'voting_day',
  email: user.email,
});

// Get user reminders
const reminders = await firestoreHelpers.getUserReminders(userId);
```

### Frontend - Initialize Firebase

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
```

## Usage Examples

### Register User

```javascript
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase/config';

const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Sign up error:', error);
  }
};
```

### Add Reminder

```javascript
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase/config';

const addReminder = async (userId, topic) => {
  try {
    await addDoc(collection(db, 'reminders'), {
      userId,
      topic,
      email: user.email,
      createdAt: new Date(),
      isActive: true,
    });
  } catch (error) {
    console.error('Add reminder error:', error);
  }
};
```

### Save Candidate

```javascript
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase/config';

const saveCandidate = async (userId, candidateId, candidateName) => {
  try {
    await addDoc(collection(db, 'savedCandidates'), {
      userId,
      candidateId,
      candidateName,
      savedAt: new Date(),
    });
  } catch (error) {
    console.error('Save candidate error:', error);
  }
};
```

### Get User's Saved Candidates

```javascript
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase/config';

const getSavedCandidates = async (userId) => {
  try {
    const q = query(
      collection(db, 'savedCandidates'),
      where('userId', '==', userId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error('Get saved candidates error:', error);
  }
};
```

## Email Notifications (Cloud Functions)

### Setup Cloud Functions

1. In Firebase Console, go to **Functions**
2. Create new function:

```javascript
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password',
  },
});

exports.sendReminderEmail = functions.pubsub
  .schedule('every day 09:00')
  .timeZone('Asia/Kolkata')
  .onRun(async (context) => {
    const db = admin.firestore();
    const reminders = await db
      .collection('reminders')
      .where('isActive', '==', true)
      .get();

    for (const doc of reminders.docs) {
      const reminder = doc.data();
      
      const mailOptions = {
        from: 'your-email@gmail.com',
        to: reminder.email,
        subject: 'Election Reminder - VoteFlow-AI',
        html: `
          <h2>Hello!</h2>
          <p>This is your reminder about the upcoming election.</p>
          <p>Topic: ${reminder.topic}</p>
          <a href="https://voteflow-ai.com">Visit VoteFlow-AI</a>
        `,
      };

      await transporter.sendMail(mailOptions);
    }
  });
```

## Troubleshooting

### Firebase Not Initializing
- Check environment variables are set correctly
- Verify project ID matches
- Check network connectivity

### Authentication Fails
- Enable Email/Password in Firebase Console
- Check credentials are correct
- Clear browser cache and cookies

### Firestore Errors
- Verify database is created
- Check security rules
- Ensure user is authenticated

### No Write Permissions
- Update security rules to allow writes
- Check user authentication status
- Verify user ID in security rules

## Monitoring

### Firebase Console

Monitor your app:
1. Go to **Analytics** - Track user engagement
2. Go to **Database** > **Realtime** - Monitor data changes
3. Go to **Functions** - Check logs
4. Go to **Performance** - Track app performance

### Debug Issues

Enable Firebase debug logging:

```javascript
// Frontend
import { initializeApp } from 'firebase/app';
import { getFirestore, enableLogging } from 'firebase/firestore';

enableLogging(true);
```

## Scaling to Production

Before going live:

1. **Change Security Rules**
   - Update from Test Mode to Secure Mode
   - Use proper RLS

2. **Enable Authentication**
   - Setup additional sign-in methods
   - Configure email templates

3. **Setup Cloud Functions**
   - Deploy reminder notifications
   - Implement email sending

4. **Performance**
   - Add Firestore indexes
   - Optimize queries
   - Enable caching

5. **Monitoring**
   - Setup alerts
   - Monitor costs
   - Review logs regularly

## Cost Management

Firebase Free Tier includes:
- 1 GB storage
- 50,000 reads/day
- 20,000 writes/day
- 20,000 deletes/day

Monitor usage:
1. Go to **Project Settings** > **Usage**
2. Set billing alerts
3. Optimize queries to reduce reads

## Documentation

- Firebase Official Docs: https://firebase.google.com/docs
- Firestore Guide: https://firebase.google.com/docs/firestore
- Firebase SDK: https://firebase.google.com/docs/web/setup

---

**Last Updated**: 2024
**Version**: 1.0.0
