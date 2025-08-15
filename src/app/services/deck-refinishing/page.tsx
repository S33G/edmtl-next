'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowLeft, HiCheckCircle, HiPaintBrush, HiSparkles, HiBeaker, HiWrenchScrewdriver } from 'react-icons/hi2';

export default function DeckRefinishingPage() {
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
      <div className="relative bg-gray-900/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-[var(--border-light)] dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-300 dark:text-gray-300 hover:text-[var(--primary)] dark:hover:text-blue-400 transition-colors duration-200"
            >
              <HiArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="text-sm text-gray-300 dark:text-gray-400">
              Professional Deck Refinishing
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-[var(--primary)]/10 dark:bg-blue-900/30 text-[var(--primary)] dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <HiPaintBrush className="w-4 h-4" />
            <span>Professional Deck Refinishing</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-white mb-6">
            Deck Restoration & Refinishing
          </h1>
          <p className="text-xl text-gray-300 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Bring your wooden deck back to its full potential. Most people neglect this expensive feature and are left with
            grey, weathered wood. With proper treatment, you can save thousands by avoiding deck replacement.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Chemical Brightening */}
          <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-[var(--primary)]/10 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
              <HiBeaker className="w-6 h-6 text-[var(--primary)] dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white dark:text-white mb-3">Chemical Brightening</h3>
            <p className="text-gray-300 dark:text-gray-300 text-sm">
              Cost-effective way to recover color from mildly weathered deck surfaces using professional brightening treatments.
            </p>
          </div>

          {/* Waterproofing */}
          <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-[var(--primary)]/10 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[var(--primary)] dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white dark:text-white mb-3">Waterproofing</h3>
            <p className="text-gray-300 dark:text-gray-300 text-sm">
              Clear waterproofing sealant that protects wood from water damage and UV fade without changing the natural color.
            </p>
          </div>

          {/* Sanding Preparation */}
          <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-[var(--primary)]/10 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
              <HiWrenchScrewdriver className="w-6 h-6 text-[var(--primary)] dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white dark:text-white mb-3">Sanding Prep</h3>
            <p className="text-gray-300 dark:text-gray-300 text-sm">
              Thorough sanding preparation including hard-to-reach areas for proper stain adhesion and uniform finish.
            </p>
          </div>

          {/* Stain Application */}
          <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-[var(--primary)]/10 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
              <HiPaintBrush className="w-6 h-6 text-[var(--primary)] dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white dark:text-white mb-3">Stain Application</h3>
            <p className="text-gray-300 dark:text-gray-300 text-sm">
              Professional stain and timber oil application in various colors and transparencies to protect and beautify your deck.
            </p>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-white dark:text-white mb-6 text-center">Why Refinish Instead of Replace?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-semibold text-white dark:text-white mb-2">Save Thousands</h3>
              <p className="text-sm text-gray-300 dark:text-gray-300">With lumber and labor costs, a new deck is a significant purchase. Refinishing costs a fraction of replacement.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-semibold text-white dark:text-white mb-2">Prevent Rot</h3>
              <p className="text-sm text-gray-300 dark:text-gray-300">After many years, outdoor wood will rot if left untreated. Regular treatment prevents this expensive problem.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="font-semibold text-white dark:text-white mb-2">Restore Beauty</h3>
              <p className="text-sm text-gray-300 dark:text-gray-300">Transform grey, weathered wood back to a vibrant, attractive living space that adds value to your home.</p>
            </div>
          </div>
        </div>

        {/* Detailed Services */}
        <div className="space-y-12 mb-16">
          {/* Chemical Brightening */}
          <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white dark:text-white mb-6">Chemical Brightening</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-300 dark:text-gray-300 mb-6">
                    Applying deck brightener is a cost-effective way to recover some color from a mildly weathered deck surface.
                    Accompanied with a low-PSI pressure washer, this method can significantly improve the look of a deck surface with ease.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">Cost-effective color recovery</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">Professional brightening chemicals</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">Low-pressure washing application</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">Significant improvement with minimal effort</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-black dark:text-white mb-4">Best For:</h3>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>• Mildly weathered wood surfaces</li>
                    <li>• Budget-conscious homeowners</li>
                    <li>• Quick improvement projects</li>
                    <li>• Maintenance between major refinishing</li>
                    <li>• Testing before full restoration</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Waterproofing Treatment */}
          <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white dark:text-white mb-6">Waterproofing Treatment</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-300 dark:text-gray-300 mb-6">
                    To preserve the natural look of a deck without altering the finish, a waterproofing sealant is the best option.
                    This clear liquid prevents the wood from absorbing water and protects against UV fade, similar to stain but
                    without changing the color of the wood.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">Preserves natural wood appearance</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">Prevents water absorption</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">UV fade protection</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">Quick application with paint roller</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="font-semibold text-blue-900 mb-4">Key Advantages:</h3>
                  <ul className="space-y-2 text-sm text-[var(--primary)] dark:text-blue-400">
                    <li>• Only option that doesn't change wood color</li>
                    <li>• Requires only one coat application</li>
                    <li>• Faster application than stain</li>
                    <li>• Maintains natural wood grain visibility</li>
                    <li>• Effective weather protection</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sanding Preparation */}
          <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white dark:text-white mb-6">Sanding Preparation</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-300 dark:text-gray-300 mb-6">
                    To stain a deck, the most important step is properly sanding the entire surface. For the stain to properly
                    adhere and for a uniform finish, no corners can be cut. We use detail sanders and dremels to sand every
                    hard-to-reach area. Sanding is labor-intensive but worth the effort for a smooth, even finish.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">Complete surface sanding</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">Detail sanders for tight areas</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">Dremel tools for intricate spaces</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">Ensures proper stain adhesion</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <h3 className="font-semibold text-amber-900 mb-4">Why Proper Sanding Matters:</h3>
                  <ul className="space-y-2 text-sm text-amber-800">
                    <li>• Essential for stain adhesion</li>
                    <li>• Creates uniform surface texture</li>
                    <li>• Removes old, weathered wood fibers</li>
                    <li>• Prevents blotchy, uneven staining</li>
                    <li>• Foundation for professional results</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Stain Application */}
          <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white dark:text-white mb-6">Stain Application</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-300 dark:text-gray-300 mb-6">
                    Whether it's to protect the wood from rotting, revitalize faded color, or just looking for a change -
                    refinishing a deck with stain or timber oil is key to a fresh, vibrant living space. At EDM, we work
                    closely with our clients to help find the ideal method and products for every project.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">Protects wood from rot and weather</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">Revitalizes faded wood color</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">Multiple transparency options</span>
                    </li>
                    <li className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-300">Custom color consultation</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="font-semibold text-green-900 mb-4">Stain Options:</h3>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li><strong>Translucent:</strong> Shows wood grain, natural colors</li>
                    <li><strong>Semi-transparent:</strong> Some wood detail, enhanced color</li>
                    <li><strong>Solid:</strong> Complete color coverage, numerous options</li>
                    <li><strong>Timber Oil:</strong> Deep penetration, natural enhancement</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Timeline */}
        <div className="bg-[var(--background-tertiary)] dark:bg-gray-800 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-gray-700 p-8 mb-16">
          <h2 className="text-2xl font-bold text-white dark:text-white mb-8 text-center">Our Deck Refinishing Process</h2>
          <div className="grid md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)]/10 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-[var(--primary)] dark:text-blue-400">1</span>
              </div>
              <h3 className="font-semibold text-white dark:text-white mb-2">Assessment</h3>
              <p className="text-sm text-gray-300 dark:text-gray-300">Evaluate deck condition and determine best treatment method</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)]/10 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-[var(--primary)] dark:text-blue-400">2</span>
              </div>
              <h3 className="font-semibold text-white dark:text-white mb-2">Cleaning</h3>
              <p className="text-sm text-gray-300 dark:text-gray-300">Deep clean and prepare surface for treatment</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)]/10 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-[var(--primary)] dark:text-blue-400">3</span>
              </div>
              <h3 className="font-semibold text-white dark:text-white mb-2">Sanding</h3>
              <p className="text-sm text-gray-300 dark:text-gray-300">Thorough sanding including all detail areas</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)]/10 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-[var(--primary)] dark:text-blue-400">4</span>
              </div>
              <h3 className="font-semibold text-white dark:text-white mb-2">Treatment</h3>
              <p className="text-sm text-gray-300 dark:text-gray-300">Apply chosen stain, sealant, or waterproofing</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)]/10 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-[var(--primary)] dark:text-blue-400">5</span>
              </div>
              <h3 className="font-semibold text-white dark:text-white mb-2">Final Inspection</h3>
              <p className="text-sm text-gray-300 dark:text-gray-300">Quality check and cleanup for perfect results</p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Restore Your Deck?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Don't replace when you can restore! Get a free assessment and quote for professional deck refinishing services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="bg-gray-800 text-white dark:text-blue-400 hover:bg-gray-700 px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
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
