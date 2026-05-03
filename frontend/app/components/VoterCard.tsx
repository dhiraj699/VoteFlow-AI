'use client'

interface VoterPhase {
  phase: string;
  title: string;
  description: string;
  icon: string;
  tips: string[];
}

interface VoterCardProps {
  phase: VoterPhase;
  index: number;
}

export default function VoterCard({ phase, index }: VoterCardProps) {
  const colors = [
    'from-blue-400 to-blue-600',
    'from-purple-400 to-purple-600',
    'from-cyan-400 to-cyan-600',
  ];

  return (
    <div className="fade-in">
      <div className={`bg-gradient-to-br ${colors[index % colors.length]} rounded-xl p-8 text-white shadow-lg mb-6`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="inline-block bg-white bg-opacity-30 px-3 py-1 rounded-full text-sm font-semibold mb-2">
              Phase {index + 1}
            </span>
            <h3 className="text-2xl font-bold">{phase.title}</h3>
          </div>
          <span className="text-4xl">{phase.icon}</span>
        </div>
        
        <p className="text-white text-opacity-90 mb-6">
          {phase.description}
        </p>

        <div className="bg-white bg-opacity-20 rounded-lg p-4">
          <h4 className="font-semibold mb-3 flex items-center">
            <span className="inline-block w-2 h-2 bg-white rounded-full mr-2"></span>
            Key Points:
          </h4>
          <ul className="space-y-2">
            {phase.tips.map((tip, tipIndex) => (
              <li key={tipIndex} className="text-sm text-white text-opacity-90 flex items-start">
                <span className="mr-2">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
