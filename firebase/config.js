// Firebase Configuration for VoteFlow-AI
// Add your Firebase credentials from Firebase Console

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "YOUR_SENDER_ID",
  appId: process.env.FIREBASE_APP_ID || "YOUR_APP_ID",
};

// Export for frontend
if (typeof window !== 'undefined') {
  // Browser environment
  module.exports = firebaseConfig;
}

// Export for Node.js/backend
const admin = require('firebase-admin');

// Initialize Firebase Admin (requires service account key)
const initializeFirebaseAdmin = () => {
  try {
    if (!admin.apps.length) {
      const serviceAccountKey = {
        type: process.env.FIREBASE_TYPE || "service_account",
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI || "https://accounts.google.com/o/oauth2/auth",
        token_uri: process.env.FIREBASE_TOKEN_URI || "https://oauth2.googleapis.com/token",
      };

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountKey),
        databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
      });

      console.log('Firebase Admin initialized');
    }
  } catch (error) {
    console.warn('Firebase Admin initialization skipped:', error.message);
  }
};

// Firestore collection schemas
const collections = {
  users: {
    docId: 'userId',
    fields: {
      email: 'string',
      displayName: 'string',
      createdAt: 'timestamp',
      updatedAt: 'timestamp',
    },
  },
  reminders: {
    docId: 'reminderId',
    fields: {
      userId: 'string',
      topic: 'string',
      email: 'string',
      createdAt: 'timestamp',
      nextReminder: 'timestamp',
      isActive: 'boolean',
    },
  },
  savedCandidates: {
    docId: 'documentId',
    fields: {
      userId: 'string',
      candidateId: 'string',
      candidateName: 'string',
      savedAt: 'timestamp',
      notes: 'string',
    },
  },
  votes: {
    docId: 'voteId',
    fields: {
      userId: 'string',
      electionId: 'string',
      votedAt: 'timestamp',
      constituency: 'string',
      status: 'string', // 'pending', 'cast', 'verified'
    },
  },
};

// Firestore helper functions
const firestoreHelpers = {
  // Add user
  addUser: async (userId, userData) => {
    try {
      const db = admin.firestore();
      await db.collection('users').doc(userId).set({
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log(`User added: ${userId}`);
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  },

  // Add reminder
  addReminder: async (userId, reminderData) => {
    try {
      const db = admin.firestore();
      await db.collection('reminders').add({
        userId,
        ...reminderData,
        createdAt: new Date(),
        isActive: true,
      });
      console.log(`Reminder added for user: ${userId}`);
    } catch (error) {
      console.error('Error adding reminder:', error);
      throw error;
    }
  },

  // Get user reminders
  getUserReminders: async (userId) => {
    try {
      const db = admin.firestore();
      const snapshot = await db
        .collection('reminders')
        .where('userId', '==', userId)
        .where('isActive', '==', true)
        .get();
      
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching reminders:', error);
      throw error;
    }
  },

  // Save candidate
  saveCandidatePreference: async (userId, candidateId, candidateName) => {
    try {
      const db = admin.firestore();
      await db.collection('savedCandidates').add({
        userId,
        candidateId,
        candidateName,
        savedAt: new Date(),
      });
      console.log(`Candidate saved for user: ${userId}`);
    } catch (error) {
      console.error('Error saving candidate:', error);
      throw error;
    }
  },

  // Record vote
  recordVote: async (userId, electionId, constituency) => {
    try {
      const db = admin.firestore();
      await db.collection('votes').add({
        userId,
        electionId,
        constituency,
        votedAt: new Date(),
        status: 'cast',
      });
      console.log(`Vote recorded for user: ${userId}`);
    } catch (error) {
      console.error('Error recording vote:', error);
      throw error;
    }
  },
};

// Security Rules Template (paste in Firestore console)
const firestoreSecurityRules = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    match /reminders/{document=**} {
      allow read, write: if request.auth.uid == resource.data.userId;
      allow create: if request.auth.uid == request.resource.data.userId;
    }

    match /savedCandidates/{document=**} {
      allow read, write: if request.auth.uid == resource.data.userId;
      allow create: if request.auth.uid == request.resource.data.userId;
    }

    match /votes/{document=**} {
      allow read, write: if request.auth.uid == resource.data.userId;
      allow create: if request.auth.uid == request.resource.data.userId;
    }
  }
}
`;

module.exports = {
  firebaseConfig,
  initializeFirebaseAdmin,
  collections,
  firestoreHelpers,
  firestoreSecurityRules,
  admin,
};
