"use client"; // pour s'assurer que c'est côté client
import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function RecenterMap({ position }) {
  const map = useMap();

  useEffect(() => {
    if (map && position) {
      map.setView(position, map.getZoom(), { animate: true });
    }
  }, [position, map]);

  return null;
}
