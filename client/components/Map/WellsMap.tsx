"use client";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default leaflet icons in Next.js
const DefaultIcon = L.icon({
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});
L.Marker.prototype.options.icon = DefaultIcon;

interface Well {
  id: number;
  kuyu_adi: string;
  lat: number;
  lng: number;
}

export default function WellsMap({ wells }: { wells: Well[] }) {
  return (
    <MapContainer center={[37.8714, 32.4846]} zoom={11} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {wells.map(well => (
        <Marker key={well.id} position={[well.lat, well.lng]}>
          <Popup>
            <strong>{well.kuyu_adi}</strong> <br />
            <a href={`/report/${well.id}`} className="text-blue-500">Report Fault</a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}