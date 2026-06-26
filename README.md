# KPU Surrey Library Distance App

This is a simple React web app for INFO 4235. It uses the browser's location feature to show the user's current location on a map and calculate the distance to the KPU Surrey Library in kilometers.

## Architecture

```mermaid
flowchart TD
    A[User Browser] --> B[React App on Vercel]
    B --> C[Browser Geolocation API]
    B --> D[React Leaflet Map]
    D --> E[OpenStreetMap Tiles]
    B --> F[Haversine Distance Formula]
    F --> G[Distance to KPU Surrey Library]
```

## Tech Stack

- React
- Vite
- React Leaflet
- Leaflet
- OpenStreetMap
- Vercel

## How To Run Locally

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal.

## Notes

- The app does not need an API key.
- Location permission must be allowed in the browser.
- Distance is calculated in kilometers using the Haversine formula.
