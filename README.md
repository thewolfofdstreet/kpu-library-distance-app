# KPU Surrey Library Distance App

This is a simple React web app for INFO 4235. It uses the browser's location feature to show the user's current location on a map and calculate the distance to the KPU Surrey Library in kilometers.

## Live App

[https://kpu-library-distance-app.vercel.app/](https://kpu-library-distance-app.vercel.app/)

## Architecture

```mermaid
flowchart LR
    A[User opens Vercel URL] --> B[Vercel Hosting]
    B --> C[React + Vite App]

    C --> D[Browser Geolocation API]
    D --> E[User Latitude and Longitude]

    C --> F[React Leaflet Map Component]
    F --> G[Leaflet Library]
    G --> H[OpenStreetMap Tile Server]

    C --> I[KPU Surrey Library Coordinates]
    E --> J[Haversine Distance Calculator]
    I --> J

    J --> K[Distance in Kilometers]
    F --> L[Map Markers and Route Line]

    K --> M[Distance Display on Page]
    L --> M
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
