'use client';

import { HiMapPin, HiPhone, HiEnvelope, HiMap } from 'react-icons/hi2';
import siteConfig from '../../config/site.json';

interface GoogleMapEmbedProps {
  className?: string;
  height?: string;
  showTitle?: boolean;
}

export default function GoogleMapEmbed({
  className = "",
  height = "400px",
  showTitle = true
}: GoogleMapEmbedProps) {
  if (!siteConfig.contact.googleMapsUrl || siteConfig.contact.googleMapsUrl === 'PLACEHOLDER_FOR_GOOGLE_MAPS_URL') {
    return (
      <div className={`bg-gray-800 rounded-lg p-6 ${className}`}>
        <div className="text-center">
          <h3 className="text-xl font-bold text-yellow-400 mb-4">Find Us</h3>
          <div className="bg-gray-700 rounded-lg p-8" style={{ height }}>
            <div className="flex flex-col items-center justify-center h-full">
              <HiMapPin className="w-16 h-16 text-gray-500 mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">EDMTL Location</h4>
              <p className="text-gray-400 mb-4">Serving Montreal and surrounding areas</p>
              <p className="text-gray-300 mb-4">
                Montreal, Laval, Saint-Lazare, North/South Shore, Vaudreuil-Dorion
              </p>
              <div className="space-y-2">
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center px-4 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition-colors"
                >
                  <HiPhone className="w-4 h-4 mr-2" />
                  {siteConfig.contact.phone}
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center px-4 py-2 bg-gray-600 text-white font-semibold rounded hover:bg-gray-500 transition-colors"
                >
                  <HiEnvelope className="w-4 h-4 mr-2" />
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Extract the Google Maps embed URL from the main URL
  const getEmbedUrl = (mapsUrl: string): string => {
    try {
      // If it's already an embed URL, return as is
      if (mapsUrl.includes('embed')) {
        return mapsUrl;
      }

      // Extract place ID or coordinates from various Google Maps URL formats
      let embedUrl = 'https://www.google.com/maps/embed?pb=';

      // Try to extract place ID
      const placeIdMatch = mapsUrl.match(/place_id:([^&\s]+)/);
      if (placeIdMatch) {
        return `https://www.google.com/maps/embed/v1/place?key=${siteConfig.google.mapsApiKey}&q=place_id:${placeIdMatch[1]}`;
      }

      // Try to extract from /place/ URL format
      const placeMatch = mapsUrl.match(/\/place\/([^/]+)/);
      if (placeMatch) {
        const placeName = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
        return `https://www.google.com/maps/embed/v1/place?key=${siteConfig.google.mapsApiKey}&q=${encodeURIComponent(placeName)}`;
      }

      // Try to extract coordinates
      const coordMatch = mapsUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (coordMatch) {
        return `https://www.google.com/maps/embed/v1/view?key=${siteConfig.google.mapsApiKey}&center=${coordMatch[1]},${coordMatch[2]}&zoom=15`;
      }

      // Fallback: search for EDMTL
      return `https://www.google.com/maps/embed/v1/search?key=${siteConfig.google.mapsApiKey}&q=EDMTL+Montreal`;
    } catch (error) {
      // Fallback embed URL
      return `https://www.google.com/maps/embed/v1/search?key=${siteConfig.google.mapsApiKey}&q=EDMTL+Montreal`;
    }
  };

  const embedUrl = siteConfig.google.mapsApiKey !== 'PLACEHOLDER_FOR_GOOGLE_MAPS_API_KEY'
    ? getEmbedUrl(siteConfig.contact.googleMapsUrl)
    : null;

  return (
    <div className={`bg-gray-800 rounded-lg p-6 ${className}`}>
      {showTitle && (
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-yellow-400 mb-2">Find Us on Google Maps</h3>
          <p className="text-gray-300">Serving Montreal and surrounding areas</p>
        </div>
      )}

      <div className="rounded-lg overflow-hidden" style={{ height }}>
        {embedUrl ? (
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="EDMTL Location on Google Maps"
          />
        ) : (
          <div className="bg-gray-700 rounded-lg p-8 h-full flex flex-col items-center justify-center">
            <HiMap className="w-12 h-12 text-gray-500 mb-4" />
            <p className="text-gray-400 text-center mb-4">
              Google Maps integration available with API key
            </p>
            <a
              href={siteConfig.contact.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition-colors"
            >
              <HiMapPin className="w-4 h-4 mr-2" />
              Open in Google Maps
            </a>
          </div>
        )}
      </div>

      <div className="mt-4 text-center">
        <a
          href={siteConfig.contact.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition-colors"
        >
          <HiMapPin className="w-4 h-4 mr-2" />
          Get Directions
        </a>
      </div>
    </div>
  );
}
