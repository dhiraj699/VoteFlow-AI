'use client'

import { useState } from 'react';

interface EVMStep {
  id: string;
  step: number;
  title: string;
  description: string;
}

interface EVMVisualizerProps {
  steps: EVMStep[];
}

export default function EVMVisualizer({ steps }: EVMVisualizerProps) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="py-12 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 gradient-text">
          How EVM Works
        </h2>
        <p className="text-center text-slate-600 mb-12">
          Understand the Electronic Voting Machine process step by step
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.step - 1)}
              className={`p-4 rounded-lg font-semibold transition-all ${
                activeStep === step.step - 1
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
              }`}
            >
              <div className="text-2xl mb-2">Step {step.step}</div>
              <div className="text-sm">{step.title}</div>
            </button>
          ))}
        </div>

        {/* Active step detail */}
        <div className="card">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold">
                {steps[activeStep].step}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {steps[activeStep].title}
              </h3>
              <p className="text-slate-600 mb-4">
                {steps[activeStep].description}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className="px-4 py-2 bg-slate-200 text-slate-900 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300"
                >
                  ← Previous
                </button>
                <button
                  onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                  disabled={activeStep === steps.length - 1}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-8">
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-all ${
                  index <= activeStep ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
