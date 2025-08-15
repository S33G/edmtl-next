'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiArrowLeft, HiCheckCircle, HiSparkles, HiEye } from 'react-icons/hi2';

export default function WindowCleaningPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--background)] to-[var(--background-secondary)] dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-pulse text-[var(--primary)] dark:text-blue-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] to-[var(--background-secondary)] dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <div className="relative bg-gray-800/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm border-b border-[var(--border-light)] dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-300 dark:text-gray-400 hover:text-[var(--primary)] dark:hover:text-blue-400 transition-colors duration-200"
            >
              <HiArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="text-sm text-gray-300 dark:text-gray-400">
              Professional Window Cleaning
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-[var(--primary)]/10 dark:bg-blue-900/30 text-[var(--primary)] dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <HiSparkles className="w-4 h-4" />
            <span>Professional Window Cleaning</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-white mb-6">
            Crystal Clear Windows
          </h1>
          <p className="text-xl text-gray-300 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Professional window cleaning services for residential and commercial properties in Montreal.
            Our experienced team delivers streak-free results using professional equipment and techniques.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Interior Window Cleaning */}
          <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 p-8 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-[var(--primary)]/10 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
              <HiEye className="w-6 h-6 text-[var(--primary)] dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white dark:text-white mb-4">Interior Cleaning</h3>
            <p className="text-gray-300 dark:text-gray-300 mb-6">
              Complete interior window cleaning including frames, sills, and glass surfaces.
              We protect your furniture and floors while delivering spotless results.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-gray-300 dark:text-gray-300">
                <HiCheckCircle className="w-4 h-4 text-[var(--success)] dark:text-green-400 mr-2 flex-shrink-0" />
                Professional squeegee technique
              </li>
              <li className="flex items-center text-sm text-gray-300 dark:text-gray-300">
                <HiCheckCircle className="w-4 h-4 text-[var(--success)] dark:text-green-400 mr-2 flex-shrink-0" />
                Frame and sill cleaning
              </li>
              <li className="flex items-center text-sm text-gray-300 dark:text-gray-300">
                <HiCheckCircle className="w-4 h-4 text-[var(--success)] dark:text-green-400 mr-2 flex-shrink-0" />
                Furniture protection
              </li>
            </ul>
          </div>

          {/* Exterior Window Cleaning */}
                    {/* Exterior Window Cleaning */}
          <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 p-8 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-[var(--primary)]/10 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
              <HiSparkles className="w-6 h-6 text-[var(--primary)] dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white dark:text-white mb-4">Exterior Cleaning</h3>
            <p className="text-gray-300 dark:text-gray-300 mb-6">
              Professional exterior window cleaning using purified water systems and
              specialized equipment to remove dirt, grime, and environmental buildup.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-gray-300 dark:text-gray-300">
                <HiCheckCircle className="w-4 h-4 text-[var(--success)] dark:text-green-400 mr-2 flex-shrink-0" />
                Pure water cleaning system
              </li>
              <li className="flex items-center text-sm text-gray-300 dark:text-gray-300">
                <HiCheckCircle className="w-4 h-4 text-[var(--success)] dark:text-green-400 mr-2 flex-shrink-0" />
                Eco-friendly solutions
              </li>
              <li className="flex items-center text-sm text-gray-300 dark:text-gray-300">
                <HiCheckCircle className="w-4 h-4 text-[var(--success)] dark:text-green-400 mr-2 flex-shrink-0" />
                Streak-free results
              </li>
            </ul>
          </div>

          {/* Water-Fed Window Cleaning */}
          <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 p-8 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-[var(--primary)]/10 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-[var(--primary)] dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 8.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white dark:text-white mb-4">Water-Fed System</h3>
            <p className="text-gray-300 dark:text-gray-300 mb-6">
              Advanced water-fed pole system using purified water for streak-free cleaning.
              Ideal for high windows and provides longer-lasting cleanliness.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-gray-300 dark:text-gray-300">
                <HiCheckCircle className="w-4 h-4 text-[var(--success)] dark:text-green-400 mr-2 flex-shrink-0" />
                Purified water system
              </li>
              <li className="flex items-center text-sm text-gray-300 dark:text-gray-300">
                <HiCheckCircle className="w-4 h-4 text-[var(--success)] dark:text-green-400 mr-2 flex-shrink-0" />
                Reach up to 4 stories
              </li>
              <li className="flex items-center text-sm text-gray-300 dark:text-gray-300">
                <HiCheckCircle className="w-4 h-4 text-[var(--success)] dark:text-green-400 mr-2 flex-shrink-0" />
                Eco-friendly method
              </li>
            </ul>
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 p-8 mb-16">
          <h2 className="text-2xl font-bold text-white dark:text-white mb-8 text-center">Our Window Cleaning Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)]/10 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-[var(--primary)] dark:text-blue-400">1</span>
              </div>
              <h3 className="font-semibold text-white dark:text-white mb-2">Assessment</h3>
              <p className="text-sm text-gray-300 dark:text-gray-300">We assess your windows and determine the best cleaning method</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)]/10 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-[var(--primary)] dark:text-blue-400">2</span>
              </div>
              <h3 className="font-semibold text-white dark:text-white mb-2">Preparation</h3>
              <p className="text-sm text-gray-300 dark:text-gray-300">We protect your property and prepare our professional equipment</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)]/10 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-[var(--primary)] dark:text-blue-400">3</span>
              </div>
              <h3 className="font-semibold text-white dark:text-white mb-2">Cleaning</h3>
              <p className="text-sm text-gray-300 dark:text-gray-300">Professional cleaning using appropriate techniques and equipment</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)]/10 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-[var(--primary)] dark:text-blue-400">4</span>
              </div>
              <h3 className="font-semibold text-white dark:text-white mb-2">Inspection</h3>
              <p className="text-sm text-gray-300 dark:text-gray-300">Final quality check to ensure perfect, streak-free results</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 p-8">
            <h3 className="text-xl font-semibold text-white dark:text-white mb-6">Why Choose Our Window Cleaning?</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <HiCheckCircle className="w-5 h-5 text-[var(--success)] dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 dark:text-gray-300">Professional squeegee technique for streak-free results</span>
              </li>
              <li className="flex items-start">
                <HiCheckCircle className="w-5 h-5 text-[var(--success)] dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 dark:text-gray-300">Interior and exterior cleaning available</span>
              </li>
              <li className="flex items-start">
                <HiCheckCircle className="w-5 h-5 text-[var(--success)] dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 dark:text-gray-300">Water-fed pole system for high windows</span>
              </li>
              <li className="flex items-start">
                <HiCheckCircle className="w-5 h-5 text-[var(--success)] dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 dark:text-gray-300">Screen and frame cleaning included</span>
              </li>
              <li className="flex items-start">
                <HiCheckCircle className="w-5 h-5 text-[var(--success)] dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 dark:text-gray-300">Fully insured and experienced professionals</span>
              </li>
            </ul>
          </div>

          <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 p-8">
            <h3 className="text-xl font-semibold text-white dark:text-white mb-6">Service Areas</h3>
            <div className="space-y-4">
              <div className="flex items-center text-gray-300 dark:text-gray-300">
                <span className="w-2 h-2 bg-[var(--primary)] dark:bg-blue-400 rounded-full mr-3"></span>
                Residential properties
              </div>
              <div className="flex items-center text-gray-300 dark:text-gray-300">
                <span className="w-2 h-2 bg-[var(--primary)] dark:bg-blue-400 rounded-full mr-3"></span>
                Commercial buildings
              </div>
              <div className="flex items-center text-gray-300 dark:text-gray-300">
                <span className="w-2 h-2 bg-[var(--primary)] dark:bg-blue-400 rounded-full mr-3"></span>
                Multi-story buildings
              </div>
              <div className="flex items-center text-gray-300 dark:text-gray-300">
                <span className="w-2 h-2 bg-[var(--primary)] dark:bg-blue-400 rounded-full mr-3"></span>
                Retail storefronts
              </div>
              <div className="flex items-center text-gray-300 dark:text-gray-300">
                <span className="w-2 h-2 bg-[var(--primary)] dark:bg-blue-400 rounded-full mr-3"></span>
                Office buildings
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-[var(--primary)] to-blue-700 dark:from-blue-600 dark:to-blue-800 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready for Crystal Clear Windows?</h2>
          <p className="text-blue-100 dark:text-blue-200 mb-6 max-w-2xl mx-auto">
            Get a free quote for professional window cleaning services. We serve residential and commercial properties throughout Montreal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="bg-gray-800 text-white hover:bg-gray-700 dark:hover:bg-gray-600 px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
            >
              Get Free Quote
            </Link>
            <a
              href="tel:438-500-3099"
              className="bg-blue-800 text-white hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-800 px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
            >
              Call (438) 500-3099
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
