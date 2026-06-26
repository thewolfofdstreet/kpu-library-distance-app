import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.css";

const kpuLibrary = {
  name: "KPU Surrey Library",
  lat: 49.1339,
  lng: -122.8713
};

const userIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const libraryIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

function distanceInKm(a, b) {
  const earthRadius = 6371;
  const toRad = (value) => (value * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return earthRadius * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function FitMap({ userLocation }) {
  const map = useMap();

  useEffect(() => {
    if (!userLocation) return;
    map.fitBounds(
      [
        [userLocation.lat, userLocation.lng],
        [kpuLibrary.lat, kpuLibrary.lng]
      ],
      { padding: [45, 45] }
    );
  }, [map, userLocation]);

  return null;
}

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [message, setMessage] = useState("Ready to measure your trip to the library.");

  const distance = useMemo(() => {
    if (!userLocation) return null;
    return distanceInKm(userLocation, kpuLibrary).toFixed(2);
  }, [userLocation]);

  function findMyLocation() {
    if (!navigator.geolocation) {
      setMessage("Your browser does not support location services.");
      return;
    }

    setMessage("Getting your location...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setMessage("Location found. The blue route line shows the straight-line distance.");
      },
      () => setMessage("Location permission was blocked or unavailable.")
    );
  }

  const line = userLocation
    ? [
        [userLocation.lat, userLocation.lng],
        [kpuLibrary.lat, kpuLibrary.lng]
      ]
    : [];

  return (
    <main className="app">
      <section className="panel">
        <div className="brand">
          <div className="logoMark">K</div>
          <div>
            <p className="eyebrow">INFO 4235 Midterm</p>
            <h1>Campus Library Locator</h1>
          </div>
        </div>

        <div className="routeBox">
          <div className="routePoint">
            <span className="dot userDot"></span>
            <div>
              <span>Start</span>
              <strong>{userLocation ? "Your location" : "Waiting for location"}</strong>
            </div>
          </div>
          <div className="routeLine"></div>
          <div className="routePoint">
            <span className="dot libraryDot"></span>
            <div>
              <span>Finish</span>
              <strong>{kpuLibrary.name}</strong>
            </div>
          </div>
        </div>

        <div className="result">
          <span>Straight-line distance</span>
          <strong>{distance ? `${distance} km` : "-- km"}</strong>
        </div>

        <p className="status">{message}</p>

        <button onClick={findMyLocation}>Use My Location</button>

        <div className="coords">
          <div>
            <span>Library</span>
            <strong>{kpuLibrary.lat.toFixed(4)}, {kpuLibrary.lng.toFixed(4)}</strong>
          </div>
          <div>
            <span>You</span>
            <strong>
              {userLocation
                ? `${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`
                : "Not found yet"}
            </strong>
          </div>
        </div>
      </section>

      <section className="mapWrap" aria-label="Map showing user location and KPU Surrey Library">
        <MapContainer center={[kpuLibrary.lat, kpuLibrary.lng]} zoom={13} scrollWheelZoom className="map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[kpuLibrary.lat, kpuLibrary.lng]} icon={libraryIcon}>
            <Popup>KPU Surrey Library</Popup>
          </Marker>

          {userLocation && (
            <>
              <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                <Popup>Your current location</Popup>
              </Marker>
              <Polyline positions={line} color="#0f766e" weight={5} />
              <FitMap userLocation={userLocation} />
            </>
          )}
        </MapContainer>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
