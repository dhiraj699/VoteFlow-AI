'use client'

import { useState } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(items.map(item => item.category)))];
  
  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 gradient-text">
          Frequently Asked Questions
        </h2>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {filteredItems.map(item => (
            <div key={item.id} className="card">
              <button
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                className="w-full text-left flex items-center justify-between hover:opacity-75 transition-opacity"
              >
                <h3 className="font-semibold text-slate-900 flex-1">
                  {item.question}
                </h3>
                <span className={`ml-4 text-blue-600 transition-transform ${
                  expandedId === item.id ? 'rotate-180' : ''
                }`}>
                  ▼
                </span>
              </button>

              {/* Expanded content */}
              {expandedId === item.id && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-8">
            <p className="text-slate-500">No FAQs found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
