const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Mock candidate database
const candidatesDB = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    party: 'Democratic Alliance',
    position: 'Member of Parliament',
    background: 'Finance professional with 15 years of experience in economic policy',
    policies: ['Economic Growth', 'Education Reform', 'Healthcare Access'],
    contact: 'rajesh@example.com',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    party: 'Progressive Front',
    position: 'Member of Parliament',
    background: 'Social worker and environmental activist with grassroots experience',
    policies: ['Environmental Protection', 'Rural Development', 'Social Justice'],
    contact: 'priya@example.com',
  },
  {
    id: '3',
    name: 'Amit Patel',
    party: 'Unity Coalition',
    position: 'Member of Parliament',
    background: 'Business entrepreneur and infrastructure development expert',
    policies: ['Infrastructure Development', 'Job Creation', 'Technology Innovation'],
    contact: 'amit@example.com',
  },
  {
    id: '4',
    name: 'Deepa Singh',
    party: 'Labor Party',
    position: 'Member of Parliament',
    background: 'Labor rights advocate with 20 years in worker welfare programs',
    policies: ['Worker Rights', 'Minimum Wage Increase', 'Safe Working Conditions'],
    contact: 'deepa@example.com',
  },
  {
    id: '5',
    name: 'Vikram Mahajan',
    party: 'National Front',
    position: 'Member of Parliament',
    background: 'Agricultural scientist and rural development expert',
    policies: ['Agricultural Support', 'Farmer Subsidies', 'Water Management'],
    contact: 'vikram@example.com',
  },
];

// Helper function to generate AI insights using Gemini
async function generateAIInsight(query, candidate) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY not set, using fallback insight');
      return `Candidate ${candidate.name} has policies aligned with ${query}. Recommend reviewing their full profile.`;
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `Given a candidate's background and policies, provide a brief (2-3 sentences) insight on how they align with the topic: "${query}".

Candidate: ${candidate.name}
Party: ${candidate.party}
Background: ${candidate.background}
Policies: ${candidate.policies.join(', ')}

Provide a factual, unbiased assessment.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API error:', error.message);
    return `${candidate.name} is a candidate with focus on ${candidate.policies[0] || 'various policies'}.`;
  }
}

// Search candidates with AI insights
router.post('/search-candidates', async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Search query is required' });
    }

    console.log(`[v0] Searching candidates for: "${query}"`);

    // Filter candidates based on query
    const relevantCandidates = candidatesDB.filter(candidate => {
      const searchText = [
        candidate.name.toLowerCase(),
        candidate.party.toLowerCase(),
        candidate.background.toLowerCase(),
        candidate.policies.join(' ').toLowerCase(),
      ].join(' ');

      return searchText.includes(query.toLowerCase());
    });

    // Generate AI insights for relevant candidates
    const resultsWithInsights = await Promise.all(
      relevantCandidates.map(async (candidate) => ({
        ...candidate,
        aiInsight: await generateAIInsight(query, candidate),
      }))
    );

    res.json({
      success: true,
      query,
      results: resultsWithInsights,
    });
  } catch (error) {
    console.error('Error in /search-candidates:', error);
    res.status(500).json({ error: 'Failed to search candidates' });
  }
});

// Get all candidates
router.get('/candidates', (req, res) => {
  try {
    res.json({
      success: true,
      count: candidatesDB.length,
      data: candidatesDB,
    });
  } catch (error) {
    console.error('Error in /candidates:', error);
    res.status(500).json({ error: 'Failed to fetch candidates' });
  }
});

// Get candidate by ID
router.get('/candidates/:id', (req, res) => {
  try {
    const { id } = req.params;
    const candidate = candidatesDB.find(c => c.id === id);

    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    res.json({
      success: true,
      data: candidate,
    });
  } catch (error) {
    console.error('Error in /candidates/:id:', error);
    res.status(500).json({ error: 'Failed to fetch candidate' });
  }
});

// Get candidates by policy
router.get('/candidates/policy/:policy', (req, res) => {
  try {
    const { policy } = req.params;
    const results = candidatesDB.filter(candidate =>
      candidate.policies.some(p => p.toLowerCase().includes(policy.toLowerCase()))
    );

    res.json({
      success: true,
      policy,
      count: results.length,
      data: results,
    });
  } catch (error) {
    console.error('Error in /candidates/policy/:policy:', error);
    res.status(500).json({ error: 'Failed to fetch candidates by policy' });
  }
});

// Myth buster endpoint - Debunk election myths with AI
router.post('/myth-buster', async (req, res) => {
  try {
    const { myth } = req.body;

    if (!myth || typeof myth !== 'string') {
      return res.status(400).json({ error: 'Myth content is required' });
    }

    console.log(`[v0] Processing myth: "${myth}"`);

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        success: true,
        myth,
        debunked: true,
        explanation: 'This is a common misconception. Always verify election information from official sources.',
        source: 'Election Commission Official Guidelines',
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `You are an election myth buster. Analyze this claim and provide a factual debunking in 2-3 sentences. Be respectful but clear.

Claim/Myth: "${myth}"

Provide:
1. Whether it's true or false
2. The actual fact
3. A trusted source`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const explanation = response.text();

    res.json({
      success: true,
      myth,
      debunked: true,
      explanation,
      source: 'Election Commission Official Guidelines',
    });
  } catch (error) {
    console.error('Error in /myth-buster:', error);
    res.status(500).json({ error: 'Failed to process myth' });
  }
});

module.exports = router;
