'use client'

import { useState } from 'react';
import Timeline from './components/Timeline';
import VoterCard from './components/VoterCard';
import FAQ from './components/FAQ';
import EVMVisualizer from './components/EVMVisualizer';
import CandidateCard from './components/CandidateCard';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');

  const timelineEvents = [
    {
      id: '1',
      date: 'Oct 5, 2024',
      title: 'Campaign Registration Opens',
      description: 'Political parties begin registration for upcoming elections',
      status: 'completed' as const,
    },
    {
      id: '2',
      date: 'Oct 20, 2024',
      title: 'Voter Registration Deadline',
      description: 'Last date to register as a voter for the election',
      status: 'current' as const,
    },
    {
      id: '3',
      date: 'Nov 1, 2024',
      title: 'Election Day',
      description: 'Voting begins. Make your choice!',
      status: 'upcoming' as const,
    },
    {
      id: '4',
      date: 'Nov 15, 2024',
      title: 'Results Declaration',
      description: 'Official election results will be announced',
      status: 'upcoming' as const,
    },
  ];

  const voterPhases = [
    {
      phase: '1',
      title: 'Awareness Phase',
      description: 'Learn about the election timeline, candidates, and voting process',
      icon: '📚',
      tips: [
        'Read about election guidelines and schedules',
        'Understand your voting rights and responsibilities',
        'Research candidates and their policies',
      ],
    },
    {
      phase: '2',
      title: 'Preparation Phase',
      description: 'Register as a voter and prepare for election day',
      icon: '📋',
      tips: [
        'Check voter registration status online',
        'Learn how to use Electronic Voting Machines (EVM)',
        'Plan your election day logistics',
      ],
    },
    {
      phase: '3',
      title: 'Voting Phase',
      description: 'Cast your vote and fulfill your civic duty',
      icon: '🗳️',
      tips: [
        'Arrive at polling station on time',
        'Bring required identification documents',
        'Follow polling guidelines and vote independently',
      ],
    },
  ];

  const faqItems = [
    {
      id: '1',
      question: 'Who is eligible to vote?',
      answer: 'Any Indian citizen aged 18 years or above who is not otherwise disqualified by law can vote. You must be registered as a voter in the constituency where you want to vote.',
      category: 'Eligibility',
    },
    {
      id: '2',
      question: 'How do I register as a voter?',
      answer: 'You can register as a voter by submitting Form 6 to the Registrar of Voters in your area. You can apply online at the Election Commission website or in person at your local election office.',
      category: 'Registration',
    },
    {
      id: '3',
      question: 'What documents do I need to bring?',
      answer: 'Bring any valid ID proof like Aadhaar, Passport, Driving License, or Voter ID card. You may also need to provide your voter ID number or registration details.',
      category: 'Voting',
    },
    {
      id: '4',
      question: 'How does the EVM work?',
      answer: 'The Electronic Voting Machine displays candidate names and symbols. You simply press the button next to your chosen candidate. Your vote is recorded digitally and securely.',
      category: 'EVM',
    },
    {
      id: '5',
      question: 'Can I vote if I live outside my constituency?',
      answer: 'Yes, you can request an absent voter slip or vote through postal ballot if you are unable to reach your polling station. Check with your local election office for details.',
      category: 'Voting',
    },
    {
      id: '6',
      question: 'Is my vote confidential?',
      answer: 'Yes, voting is completely confidential. No one can know whom you voted for. Your vote is recorded independently and securely.',
      category: 'Voting',
    },
  ];

  const evmSteps = [
    {
      id: '1',
      step: 1,
      title: 'Enter Polling Station',
      description: 'Arrive at your designated polling station with valid ID proof. The election officer will verify your details and mark your attendance.',
    },
    {
      id: '2',
      step: 2,
      title: 'Verify Details',
      description: 'Your name and voter ID will be verified against the voter roll. You will receive an acknowledgment token.',
    },
    {
      id: '3',
      step: 3,
      title: 'Proceed to Voting Booth',
      description: 'Move to the designated voting booth. The booth officials will explain how to use the EVM.',
    },
    {
      id: '4',
      step: 4,
      title: 'Cast Your Vote',
      description: 'Press the button next to your preferred candidate. A beep will confirm your vote has been recorded.',
    },
    {
      id: '5',
      step: 5,
      title: 'Get Voter Slip',
      description: 'Receive your voter acknowledgment slip. Your voting process is now complete.',
    },
  ];

  const candidates = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      party: 'Democratic Alliance',
      position: 'Member of Parliament',
      background: 'Finance professional with 15 years of experience in economic policy',
      policies: ['Economic Growth', 'Education Reform', 'Healthcare Access'],
      image: '🏛️',
    },
    {
      id: '2',
      name: 'Priya Sharma',
      party: 'Progressive Front',
      position: 'Member of Parliament',
      background: 'Social worker and environmental activist with grassroots experience',
      policies: ['Environmental Protection', 'Rural Development', 'Social Justice'],
      image: '🌍',
    },
    {
      id: '3',
      name: 'Amit Patel',
      party: 'Unity Coalition',
      position: 'Member of Parliament',
      background: 'Business entrepreneur and infrastructure development expert',
      policies: ['Infrastructure Development', 'Job Creation', 'Technology Innovation'],
      image: '🏗️',
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <nav className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold gradient-text">VoteFlow-AI</span>
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#overview" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Overview</a>
            <a href="#timeline" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Timeline</a>
            <a href="#candidates" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Candidates</a>
            <a href="#faq" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">FAQs</a>
          </div>
          <button className="btn-primary">Register to Vote</button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-20 px-4">
        <div className="container max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Empower Your Vote</h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-50">
            Learn about elections, understand candidates, and make informed voting decisions with AI-powered insights
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors">
              Start Learning
            </button>
            <button className="px-8 py-3 bg-blue-700 text-white border-2 border-white rounded-lg font-bold hover:bg-blue-800 transition-colors">
              Search Candidates
            </button>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Your Voter Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {voterPhases.map((phase, idx) => (
              <VoterCard key={phase.phase} phase={phase} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-16 px-4 bg-slate-50">
        <Timeline events={timelineEvents} />
      </section>

      {/* EVM Visualizer Section */}
      <section className="py-16 px-4">
        <EVMVisualizer steps={evmSteps} />
      </section>

      {/* Candidates Section */}
      <section id="candidates" className="py-16 px-4 bg-slate-50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Featured Candidates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {candidates.map(candidate => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4">
        <FAQ items={faqItems} />
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">VoteFlow-AI</h3>
              <p className="text-slate-400 text-sm">Empowering voters with information and technology</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Election Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Candidates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Voter Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">EVM Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-slate-400 text-sm mb-2">Email: info@voteflow-ai.com</p>
              <p className="text-slate-400 text-sm">Phone: +91-XXXX-XXX-XXXX</p>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2024 VoteFlow-AI. All rights reserved. | Promoting Electoral Awareness</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
