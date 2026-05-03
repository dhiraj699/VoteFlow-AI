const express = require('express');
const router = express.Router();

// Mock election data - In production, this would come from a database
const electionData = {
  currentElection: {
    id: 'election-2024',
    name: 'General Election 2024',
    date: '2024-11-01',
    constituencies: 543,
    eligibleVoters: 900000000,
    status: 'ongoing',
  },
  timeline: [
    {
      id: 'timeline-1',
      date: '2024-10-05',
      title: 'Campaign Registration Opens',
      description: 'Political parties begin registration for upcoming elections',
      status: 'completed',
    },
    {
      id: 'timeline-2',
      date: '2024-10-20',
      title: 'Voter Registration Deadline',
      description: 'Last date to register as a voter for the election',
      status: 'current',
    },
    {
      id: 'timeline-3',
      date: '2024-11-01',
      title: 'Election Day',
      description: 'Voting begins. Make your choice!',
      status: 'upcoming',
    },
    {
      id: 'timeline-4',
      date: '2024-11-15',
      title: 'Results Declaration',
      description: 'Official election results will be announced',
      status: 'upcoming',
    },
  ],
  schedule: {
    phase1: {
      name: 'Phase 1',
      states: ['Uttar Pradesh', 'Bihar'],
      date: '2024-11-01',
    },
    phase2: {
      name: 'Phase 2',
      states: ['Maharashtra', 'Gujarat'],
      date: '2024-11-08',
    },
    phase3: {
      name: 'Phase 3',
      states: ['Karnataka', 'Tamil Nadu'],
      date: '2024-11-15',
    },
  },
};

// Get current election info
router.get('/election/current', (req, res) => {
  try {
    res.json({
      success: true,
      data: electionData.currentElection,
    });
  } catch (error) {
    console.error('[v0] Error in /election/current:', error);
    res.status(500).json({ error: 'Failed to fetch election data' });
  }
});

// Get election timeline
router.get('/election/timeline', (req, res) => {
  try {
    res.json({
      success: true,
      data: electionData.timeline,
    });
  } catch (error) {
    console.error('[v0] Error in /election/timeline:', error);
    res.status(500).json({ error: 'Failed to fetch timeline' });
  }
});

// Get election schedule
router.get('/election/schedule', (req, res) => {
  try {
    res.json({
      success: true,
      data: electionData.schedule,
    });
  } catch (error) {
    console.error('[v0] Error in /election/schedule:', error);
    res.status(500).json({ error: 'Failed to fetch schedule' });
  }
});

// Register voter reminder
router.post('/election/register-reminder', (req, res) => {
  try {
    const { email, topic } = req.body;

    if (!email || !topic) {
      return res.status(400).json({ error: 'Email and topic are required' });
    }

    console.log(`[v0] Reminder registered for ${email} on topic: ${topic}`);

    // In production, this would save to Firebase/database
    res.json({
      success: true,
      message: 'Reminder registered successfully',
      reminder: { email, topic, registeredAt: new Date().toISOString() },
    });
  } catch (error) {
    console.error('[v0] Error in /election/register-reminder:', error);
    res.status(500).json({ error: 'Failed to register reminder' });
  }
});

module.exports = router;
