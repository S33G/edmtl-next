'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowLeft, HiCheckCircle, HiWrenchScrewdriver, HiHomeModern, HiShieldCheck } from 'react-icons/hi2';

export default function GutterServicesPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] to-[var(--background-secondary)] dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="relative bg-[var(--background)]/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-[var(--border-light)] dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center space-x-2 text-[var(--text-muted)] dark:text-gray-400 hover:text-[var(--primary)] dark:hover:text-blue-400 transition-colors duration-200"
            >
              <HiArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="text-sm text-[var(--text-muted)] dark:text-gray-400">
              Professional Gutter Services
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-[var(--primary)]/10 dark:bg-blue-900/30 text-[var(--primary)] dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <HiHomeModern className="w-4 h-4" />
            <span>Professional Gutter Services</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] dark:text-white mb-6">
            Complete Gutter Solutions
          </h1>
          <p className="text-xl text-[var(--text-muted)] dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Protect your home with professional gutter cleaning, maintenance, and installation services.
            Prevent water damage and maintain your property's integrity year-round.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Gutter Cleaning */}
          <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-[var(--primary)]/10 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[var(--primary)] dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[var(--foreground)] dark:text-white mb-3">Gutter Cleaning</h3>
            <p className="text-[var(--text-muted)] dark:text-gray-300 text-sm">
              Complete removal of debris, leaves, and buildup. Hand cleaning ensures thorough results and proper water flow.
            </p>
          </div>

          {/* Exterior Cleaning */}
          <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-[var(--primary)]/10 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
              <HiHomeModern className="w-6 h-6 text-[var(--primary)] dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--foreground)] dark:text-white mb-3">Exterior Cleaning</h3>
            <p className="text-[var(--text-muted)] dark:text-gray-300 text-sm">
              Professional cleaning of gutter exteriors to remove grime, moss, and stains. Keeps your home looking fresh and well-maintained.
            </p>
          </div>

          {/* Repairs & Blockages */}
          <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-[var(--primary)]/10 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
              <HiWrenchScrewdriver className="w-6 h-6 text-[var(--primary)] dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--foreground)] dark:text-white mb-3">Repairs & Blockages</h3>
            <p className="text-[var(--text-muted)] dark:text-gray-300 text-sm">
              Professional blockage removal and minor repairs. We can remove downspouts, clear them, and reinstall for optimal flow.
            </p>
          </div>

          {/* Gutter Guards */}
          <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-[var(--primary)]/10 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
              <HiShieldCheck className="w-6 h-6 text-[var(--primary)] dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--foreground)] dark:text-white mb-3">Gutter Guards</h3>
            <p className="text-[var(--text-muted)] dark:text-gray-300 text-sm">
              Professional gutter guard installation. We recommend EasyOn Gutter Guard® as the best solution for most homes.
            </p>
          </div>
        </div>

        {/* Detailed Services */}
        <div className="space-y-12 mb-16">
          {/* Gutter Cleaning */}
          <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[var(--foreground)] dark:text-white mb-6">Professional Gutter Cleaning</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-[var(--text-muted)] dark:text-gray-300 mb-6">
                    Our comprehensive gutter cleaning service includes complete debris removal, downspout cleaning,
                    and testing of water flow. We hand-clean gutters to ensure thorough results and identify any
                    potential issues before they become major problems.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-muted)] dark:text-gray-300">Complete debris and leaf removal</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-muted)] dark:text-gray-300">Downspout cleaning and testing</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-muted)] dark:text-gray-300">Hand cleaning for thorough results</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-muted)] dark:text-gray-300">Property protection and cleanup</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-[var(--foreground)] dark:text-white mb-4">Signs You Need Gutter Cleaning</h3>
                  <ul className="space-y-2 text-sm text-[var(--text-muted)] dark:text-gray-300">
                    <li>• Water overflowing from gutters during rain</li>
                    <li>• Visible debris or plant growth in gutters</li>
                    <li>• Sagging or pulling away from the house</li>
                    <li>• Water stains on exterior walls</li>
                    <li>• Insects or pests around gutters</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Exterior Gutter Cleaning */}
          <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[var(--foreground)] dark:text-white mb-6">Exterior Gutter Cleaning</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-[var(--text-muted)] dark:text-gray-300 mb-6">
                    In certain cases, the exterior surface of gutters can become covered in grime or moss.
                    If left untreated for long periods, they can become permanently stained. Professional
                    exterior cleaning keeps your home looking new and well-maintained.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-muted)] dark:text-gray-300">Removes grime and moss buildup</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-muted)] dark:text-gray-300">Prevents permanent staining</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-muted)] dark:text-gray-300">Improves curb appeal</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-muted)] dark:text-gray-300">Safe and effective methods</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-[var(--foreground)] dark:text-white mb-4">Benefits of Exterior Cleaning</h3>
                  <ul className="space-y-2 text-sm text-[var(--text-muted)] dark:text-gray-300">
                    <li>• Maintains home's appearance and value</li>
                    <li>• Prevents costly replacement due to staining</li>
                    <li>• Removes unsightly moss and algae</li>
                    <li>• Professional results that last longer</li>
                    <li>• Complements overall home maintenance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Blockages & Repairs */}
          <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[var(--foreground)] dark:text-white mb-6">Blockages & Repairs</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-[var(--text-muted)] dark:text-gray-300 mb-6">
                    When gutter maintenance is ignored, debris can become impacted and create serious blockages.
                    We're capable of removing downspouts, clearing impacted blockages, and reinstalling them.
                    However, regular maintenance is the only way to prevent this costly problem.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-muted)] dark:text-gray-300">Downspout removal and cleaning</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-muted)] dark:text-gray-300">Impacted blockage removal</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-muted)] dark:text-gray-300">Professional reinstallation</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-muted)] dark:text-gray-300">Water flow testing</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h3 className="font-semibold text-red-900 mb-4">⚠️ Warning Signs of Blockages</h3>
                  <ul className="space-y-2 text-sm text-red-800">
                    <li>• Water overflowing during rain</li>
                    <li>• Gurgling sounds from downspouts</li>
                    <li>• Water pooling around foundation</li>
                    <li>• Ice dams in winter</li>
                    <li>• Visible water damage on exterior walls</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Gutter Guard Installation */}
          <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[var(--foreground)] dark:text-white mb-6">Gutter Guard Installation</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-[var(--text-muted)] dark:text-gray-300 mb-6">
                    If you've considered installing gutter guards, contact us for a free assessment. Properties
                    with lots of tree cover are prone to debris clogging, and proper gutter guards can dramatically
                    reduce maintenance frequency. We recommend EasyOn Gutter Guard® as the best solution for most homes.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-muted)] dark:text-gray-300">Free property assessment</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-muted)] dark:text-gray-300">EasyOn Gutter Guard® installation</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-muted)] dark:text-gray-300">Dramatically reduce maintenance</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-muted)] dark:text-gray-300">Professional installation guarantee</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="font-semibold text-green-900 mb-4">✓ Benefits of Gutter Guards</h3>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>• Reduced cleaning frequency</li>
                    <li>• Prevention of debris buildup</li>
                    <li>• Extended gutter system life</li>
                    <li>• Improved water flow efficiency</li>
                    <li>• Long-term cost savings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Protect Your Home with Professional Gutter Services</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Don't wait until water damage occurs. Get a free assessment and quote for our comprehensive gutter services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="bg-white text-[var(--primary)] dark:text-blue-400 hover:bg-gray-50 px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
            >
              Get Free Assessment
            </Link>
            <a
              href="tel:438-500-3099"
              className="bg-blue-800 text-white hover:bg-blue-900 px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
            >
              Call (438) 500-3099
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
