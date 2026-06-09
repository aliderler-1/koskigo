"use client";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

interface Well {
  id: number;
  kuyu_adi: string;
  lat: number;
  lng: number;
}

export default function WellsMap({ wells }: { wells: Well[] }) {
  const [icon, setIcon] = useState<L.Icon | null>(null);

  useEffect(() => {
    const DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    setIcon(DefaultIcon);
  }, []);

  return (
    <MapContainer 
      center={[37.8714, 32.4846]} 
      zoom={11} 
      className="h-full w-full outline-none"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {wells.map(well => (
        <Marker key={well.id} position={[well.lat, well.lng]} icon={icon || undefined}>
          <Popup>
            <div className="p-1">
              <strong className="text-gray-900 text-base">{well.kuyu_adi}</strong>
              <div className="mt-2">
                <a 
                  href={`/report/${well.id}`} 
                  className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm font-semibold no-underline inline-block hover:bg-blue-700"
                >
                  Arıza Bildir
                </a>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
