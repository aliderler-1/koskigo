"use client";
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Search } from 'lucide-react';

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

function MapController({ center }: { center: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 15);
    }
  }, [center, map]);
  return null;
}

export default function WellsMap({ wells }: { wells: Well[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCenter, setSelectedCenter] = useState<[number, number] | null>(null);

  const filteredWells = wells.filter(well => 
    well.kuyu_adi.toLowerCase().includes(searchQuery.toLowerCase()) ||
    well.id.toString() === searchQuery
  );

  const handleSelectWell = (well: Well) => {
    setSelectedCenter([well.lat, well.lng]);
    setSearchQuery("");
  };

  return (
    <div className="relative h-full w-full">
      {/* Search Bar Overlay */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-md">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
          <div className="flex items-center px-3 py-2">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search well name or ID..."
              className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-gray-900 placeholder-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {searchQuery && (
            <div className="max-h-[300px] overflow-y-auto border-t border-gray-100 bg-white text-black">
              {filteredWells.length > 0 ? (
                filteredWells.map(well => (
                  <button
                    key={well.id}
                    className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-none"
                    onClick={() => handleSelectWell(well)}
                  >
                    <div className="font-semibold text-gray-800">{well.kuyu_adi}</div>
                    <div className="text-xs text-gray-500 flex justify-between mt-0.5">
                      <span>ID: {well.id}</span>
                      <span>{well.lat.toFixed(4)}, {well.lng.toFixed(4)}</span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-4 text-center text-gray-500 text-sm italic">
                  No wells found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <MapContainer 
        center={[37.8714, 32.4846]} 
        zoom={11} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapController center={selectedCenter} />
        {wells.map(well => (
          <Marker key={well.id} position={[well.lat, well.lng]}>
            <Popup>
              <div className="p-1 text-black">
                <h3 className="font-bold text-gray-900">{well.kuyu_adi}</h3>
                <p className="text-xs text-gray-600 mb-2">ID: {well.id}</p>
                <a 
                  href={`/report/${well.id}`} 
                  className="block text-center bg-blue-600 text-white text-xs font-semibold py-1.5 px-3 rounded hover:bg-blue-700 transition-colors"
                >
                  Report Fault
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
