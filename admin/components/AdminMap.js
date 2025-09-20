import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Composants Leaflet en SSR false
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

export default function AchatDetailMap({ lat, lng, address }) {
  const [isClient, setIsClient] = useState(false);
  const [markerIcon, setMarkerIcon] = useState(null);
  const mapRef = useRef(null);

const position = lat && lng ? [parseFloat(lat), parseFloat(lng)] : null;

  useEffect(() => {
    setIsClient(true);
    const L = require("leaflet");
    setMarkerIcon(new L.Icon({
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    }));
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    const timer = setTimeout(() => mapRef.current.invalidateSize(), 300);
    return () => clearTimeout(timer);
  }, [isClient, position]);

if (!isClient || !markerIcon || !position) return null;

  return (
    <div style={{ width: "100%", maxWidth: "900px", height: "400px", margin: "20px auto", borderRadius: "8px", overflow: "hidden", boxShadow: "0 0 10px rgba(0,0,0,0.2)" }}>
    <MapContainer center={position} zoom={15} style={{ width: '100%', height: '100%' }}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
  <Marker position={position} icon={markerIcon}>
    <Popup>{address || "Adresse non disponible"}</Popup>
  </Marker>
</MapContainer>
    </div>
  );
}
