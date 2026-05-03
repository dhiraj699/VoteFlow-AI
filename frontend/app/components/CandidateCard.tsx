'use client'

interface Candidate {
  id: string;
  name: string;
  party: string;
  position: string;
  policies: string[];
  background: string;
  image?: string;
}

interface CandidateCardProps {
  candidate: Candidate;
}

export default function CandidateCard({ candidate }: CandidateCardProps) {
  return (
    <div className="card h-full flex flex-col">
      {candidate.image && (
        <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg mb-4 flex items-center justify-center text-4xl font-bold text-white">
          {candidate.image}
        </div>
      )}

      <div className="flex-1">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-slate-900">{candidate.name}</h3>
          <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
            {candidate.party}
          </span>
        </div>

        <p className="text-sm text-slate-500 font-medium mb-3">
          Candidate for {candidate.position}
        </p>

        <p className="text-slate-600 text-sm mb-4">
          {candidate.background}
        </p>

        {candidate.policies.length > 0 && (
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2">Key Policies:</h4>
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
      </div>

      <button className="mt-4 w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
        Learn More
      </button>
    </div>
  );
}
