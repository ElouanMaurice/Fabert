import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import RecenterMap from "./RecenterMap"; // le fichier ci-dessus

const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

export default function AchatDetailMap({ lat, lng, address }) {
  const [isClient, setIsClient] = useState(false);
  const [markerIcon, setMarkerIcon] = useState(null);
  const [position, setPosition] = useState([46.159, -1.35]); // fallback

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
    if (!lat || !lng) return;
    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);
    if (!isNaN(parsedLat) && !isNaN(parsedLng)) setPosition([parsedLat, parsedLng]);
  }, [lat, lng]);

  if (!isClient || !markerIcon) return null;

  return (
    <div style={{ width: "100%", maxWidth: "900px", height: "400px", margin: "20px auto", borderRadius: "8px", overflow: "hidden", boxShadow: "0 0 10px rgba(0,0,0,0.2)" }}>
      <MapContainer center={position} zoom={15} style={{ width: "100%", height: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={position} icon={markerIcon}>
          <Popup>{address || "Adresse non disponible"}</Popup>
        </Marker>
        <RecenterMap position={position} />
      </MapContainer>
    </div>
  );
}
