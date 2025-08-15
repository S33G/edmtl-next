# Google Maps & Reviews Integration Setup

## Required Google APIs

To enable Google Maps and Reviews functionality on your EDMTL website, you'll need:

1. **Google Maps Embed API** (for map display)
2. **Google Places API** (for reviews and business details)

## Setup Steps

### 1. Get Your Google Maps URL
- Go to [Google Maps](https://maps.google.com)
- Search for "EDMTL" or your business address
- Click on your business listing
- Click the "Share" button
- Copy the URL (it should look like: `https://maps.google.com/...`)

### 2. Get Your Place ID
- Use Google's [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
- Search for your business
- Copy the Place ID (format: `ChIJ...`)

### 3. Get Google API Keys
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable these APIs:
   - Maps Embed API
   - Places API
4. Create API credentials (API Key)
5. Restrict the key to your domain for security

### 4. Update Configuration

Edit `config/site.json` and replace the placeholder values:

```json
{
  "contact": {
    "googleMapsUrl": "YOUR_GOOGLE_MAPS_URL_HERE",
    "googlePlaceId": "YOUR_PLACE_ID_HERE"
  },
  "google": {
    "mapsApiKey": "YOUR_API_KEY_HERE",
    "placeId": "YOUR_PLACE_ID_HERE",
    "reviewsEnabled": true,
    "maxReviews": 5
  }
}
```

## Features Included

✅ **Google Maps Embed** - Interactive map showing your location
✅ **Google Reviews Display** - Shows recent customer reviews
✅ **Rating Display** - Shows your Google rating with stars
✅ **Fallback Content** - Works even without API keys (shows contact info)
✅ **Mobile Responsive** - Optimized for all devices
✅ **SEO Friendly** - Proper structured data for local business

## Current Status

🔄 **Placeholder Configuration** - Replace placeholder values with actual data
📧 **Contact Integration** - Links to phone and email already configured
🌍 **Multi-language Support** - Works with English/French versions
🎨 **Themed Design** - Matches your EDMTL brand colors

Once you provide the Google Maps URL and get the API keys set up, the integration will be fully functional!
