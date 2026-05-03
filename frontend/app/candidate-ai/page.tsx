'use client'

import { useState } from 'react';
import CandidateCard from '../components/CandidateCard';

interface SearchResult {
  id: string;
  name: string;
  party: string;
  position: string;
  policies: string[];
  background: string;
  aiInsight: string;
}

export default function CandidateAIPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/search-candidates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });

      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      setResults(data.results || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <nav className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold gradient-text">VoteFlow-AI</a>
          <a href="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">← Back to Home</a>
        </nav>
      </header>

      {/* Search Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">AI-Powered Candidate Search</h1>
          <p className="text-xl text-blue-50 mb-8">
            Use artificial intelligence to discover candidates aligned with your values and interests
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g., 'healthcare policy', 'education', 'environment'"
              className="flex-1 px-6 py-3 rounded-lg text-slate-900 placeholder-slate-500 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>

          {/* Popular searches */}
          <div className="text-blue-50">
            <p className="text-sm mb-3">Popular searches:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Healthcare', 'Education', 'Climate Change', 'Economy', 'Jobs'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag);
                    const form = document.querySelector('form') as HTMLFormElement;
                    if (form) form.dispatchEvent(new Event('submit', { bubbles: true }));
                  }}
                  className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-sm font-medium transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          {error && (
            <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-800 rounded-lg">
              <p className="font-semibold">Search Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2 gradient-text">
                Results for: {searchQuery}
              </h2>
              <p className="text-slate-600 mb-6">
                Found {results.length} candidate{results.length !== 1 ? 's' : ''} matching your search
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {results.map((candidate) => (
                  <div key={candidate.id} className="card">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{candidate.name}</h3>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold mb-4">
                      {candidate.party}
                    </span>
                    
                    <p className="text-sm text-slate-500 font-medium mb-3">
                      {candidate.position}
                    </p>

                    <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-xs font-semibold text-blue-900 mb-2">AI Insight:</p>
                      <p className="text-xs text-blue-800">{candidate.aiInsight}</p>
                    </div>

                    <p className="text-slate-600 text-sm mb-4">
                      {candidate.background}
                    </p>

                    {candidate.policies.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-xs font-bold text-slate-900 mb-2">Key Policies:</h4>
                        <ul className="space-y-1">
                          {candidate.policies.map((policy, idx) => (
                            <li key={idx} className="text-xs text-slate-600 flex items-start">
                              <span className="mr-2 text-blue-600">✓</span>
                              <span>{policy}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <button className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      View Full Profile
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!searchQuery && !results.length && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Start Searching</h2>
              <p className="text-slate-600">Enter a topic or policy interest to find matching candidates</p>
            </div>
          )}

          {searchQuery && results.length === 0 && !loading && !error && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✨</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">No Results Found</h2>
              <p className="text-slate-600">Try different keywords to find more candidates</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 mt-16">
        <div className="container max-w-6xl mx-auto text-center text-slate-400 text-sm">
          <p>&copy; 2024 VoteFlow-AI. Empowering voters with AI-powered insights.</p>
        </div>
      </footer>
    </main>
  );
}
