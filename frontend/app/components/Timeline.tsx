'use client'

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface TimelineProps {
  events: TimelineEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
          Election Timeline
        </h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-cyan-400"></div>
          
          {/* Timeline events */}
          <div className="space-y-12">
            {events.map((event, index) => (
              <div
                key={event.id}
                className={`relative ${index % 2 === 0 ? 'ml-auto pl-8 w-1/2' : 'mr-auto pr-8 w-1/2'}`}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute top-0 ${
                    index % 2 === 0 ? '-right-8' : '-left-8'
                  } w-16 h-16 rounded-full flex items-center justify-center font-bold text-white ${
                    event.status === 'completed'
                      ? 'bg-green-500'
                      : event.status === 'current'
                      ? 'bg-blue-600 ring-4 ring-blue-300'
                      : 'bg-slate-400'
                  }`}
                >
                  {index + 1}
                </div>

                {/* Content card */}
                <div className="card">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-blue-600">
                      {event.date}
                    </span>
                    <span className={`badge ${
                      event.status === 'completed'
                        ? 'badge-success'
                        : event.status === 'current'
                        ? 'badge-primary'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-slate-900">
                    {event.title}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
