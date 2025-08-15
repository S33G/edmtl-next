'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { HiStar, HiMapPin } from 'react-icons/hi2';
import siteConfig from '../../config/site.json';

interface GoogleReview {
  author_name: string;
  author_url?: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface GooglePlaceDetails {
  name: string;
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
}

export default function GoogleReviews() {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [placeData, setPlaceData] = useState<GooglePlaceDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGoogleReviews = async () => {
      try {
        // Check if Google Places API is available
        if (!window.google) {
          setError('Google Places API not loaded');
          setLoading(false);
          return;
        }

        const service = new window.google.maps.places.PlacesService(
          document.createElement('div')
        );

        const request = {
          placeId: siteConfig.google.placeId,
          fields: ['name', 'rating', 'user_ratings_total', 'reviews']
        };

        service.getDetails(request, (place: unknown, status: unknown) => {
          setLoading(false);
          if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
            const placeResult = place as {
              name?: string;
              rating?: number;
              user_ratings_total?: number;
              reviews?: Array<{
                author_name: string;
                author_url?: string;
                language: string;
                rating: number;
                text: string;
                time: number;
                relative_time_description: string;
                profile_photo_url: string;
              }>;
            };
            setPlaceData({
              name: placeResult.name || '',
              rating: placeResult.rating || 0,
              user_ratings_total: placeResult.user_ratings_total || 0,
              reviews: placeResult.reviews || []
            });
            setReviews(placeResult.reviews?.slice(0, siteConfig.google.maxReviews) || []);
          } else {
            setError(`Failed to fetch reviews: ${status}`);
          }
        });
      } catch {
        setError('Error loading Google Reviews');
        setLoading(false);
      }
    };

    // Load Google Places API if not already loaded
    if (!window.google && siteConfig.google.mapsApiKey !== 'PLACEHOLDER_FOR_GOOGLE_MAPS_API_KEY') {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${siteConfig.google.mapsApiKey}&libraries=places`;
      script.async = true;
      script.onload = fetchGoogleReviews;
      script.onerror = () => {
        setError('Failed to load Google Places API');
        setLoading(false);
      };
      document.head.appendChild(script);
    } else if (window.google) {
      fetchGoogleReviews();
    } else {
      setLoading(false);
    }
  }, []);

  if (!siteConfig.google.reviewsEnabled) {
    return null;
  }

  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card text-center">
        <h3 className="text-2xl font-semibold text-[var(--foreground)] dark:text-white mb-4">Google Reviews</h3>
        <div className="flex justify-center items-center mb-4">
          <div className="flex items-center">
            <span className="text-3xl font-bold text-blue-600 mr-2">5.0</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <HiStar key={star} className="w-5 h-5 text-yellow-400" />
              ))}
            </div>
          </div>
        </div>
        <p className="text-[var(--text-muted)] dark:text-gray-300 mb-6">
          Check out our excellent reviews on Google Maps!
        </p>
        <a
          href={siteConfig.contact.googleMapsUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center"
        >
          <HiMapPin className="mr-2 text-lg" />
          View on Google Maps
        </a>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold text-[var(--foreground)] dark:text-white mb-4">Google Reviews</h3>
        {placeData && (
          <div className="flex justify-center items-center mb-4">
            <div className="flex items-center">
              <span className="text-3xl font-bold text-blue-600 mr-2">
                {placeData.rating.toFixed(1)}
              </span>
              <div className="flex mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <HiStar
                    key={star}
                    className={`text-xl ${
                      star <= placeData.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[var(--text-muted)] dark:text-gray-400">
                ({placeData.user_ratings_total} reviews)
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4 mb-6">
        {reviews.map((review, index) => (
          <div key={index} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
            <div className="flex items-start space-x-3">
              <Image
                src={review.profile_photo_url}
                alt={review.author_name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-black dark:text-white">{review.author_name}</h4>
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <HiStar
                          key={star}
                          className={`text-sm ${
                            star <= review.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {review.relative_time_description}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{review.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <a
          href={siteConfig.contact.googleMapsUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center"
        >
          <HiMapPin className="mr-2 text-lg" />
          View All Reviews on Google Maps
        </a>
      </div>
    </div>
  );
}

// Extend the Window interface to include google
declare global {
  interface Window {
    google: {
      maps: {
        places: {
          PlacesService: new (map: HTMLElement) => {
            getDetails: (request: unknown, callback: (place: unknown, status: unknown) => void) => void;
          };
          PlacesServiceStatus: {
            OK: unknown;
          };
        };
      };
    };
  }
}
