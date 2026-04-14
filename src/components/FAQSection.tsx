'use client';

import React from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  items: FAQItem[];
}

export default React.memo(function FAQSection({ title, items }: FAQSectionProps) {
  return (
    <section id="faq" className="py-5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-[var(--foreground)] mb-4 tracking-tight">
            {title}
          </h2>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="card relative overflow-hidden group !min-h-0 !p-4 sm:!p-5">
              <div className="absolute top-0 right-0 opacity-5 group-hover:opacity-20 pointer-events-none transition-all duration-300">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 120 120"
                  className="text-[var(--primary)] group-hover:text-[var(--primary)] transition-colors duration-300"
                  fill="currentColor"
                >
                  <path d="M60 0C26.863 0 0 26.863 0 60s26.863 60 60 60 60-26.863 60-60S93.137 0 60 0zm0 110c-27.614 0-50-22.386-50-50S32.386 10 60 10s50 22.386 50 50-22.386 50-50 50z" />
                  <path d="M60 25c-10.493 0-19 8.507-19 19 0 2.761 2.239 5 5 5s5-2.239 5-5c0-4.963 4.037-9 9-9s9 4.037 9 9c0 4.418-3.582 8-8 8-2.761 0-5 2.239-5 5v8c0 2.761 2.239 5 5 5s5-2.239 5-5v-4.576C72.46 59.696 77 54.301 77 48c0-9.374-7.626-17-17-17z" />
                  <circle cx="60" cy="82" r="6" />
                </svg>
              </div>

              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-[var(--foreground)] dark:text-[var(--foreground)] mb-2">
                  {item.question}
                </h3>
                <p className="text-sm text-[var(--text-muted)] dark:text-[var(--text-muted)] leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
