"use client";
import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Search } from 'lucide-react';
import wellsData from './data/wells.json';

const WellsMap = dynamic(() => import('../components/Map/WellsMap'), { 
  ssr: false,
  loading: () => <p>Loading Map...</p>
});

const normalizeText = (text: string) => {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const wells = useMemo(() => {
    return wellsData.map((well, index) => ({
      id: index + 1,
      kuyu_adi: well.kuyu_adi,
      lat: well.lat,
      lng: well.lng
    }));
  }, []);

  const filteredWells = useMemo(() => {
    if (!searchTerm) return wells;
    const normalizedSearch = normalizeText(searchTerm);
    return wells.filter(well => 
      normalizeText(well.kuyu_adi).includes(normalizedSearch)
    );
  }, [wells, searchTerm]);

  return (
    <main className="relative h-screen w-full">
      <div className="absolute top-4 left-4 z-[1000] w-72 md:w-96">
        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border border-gray-200">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <Search className="h-6 w-6" />
          </div>
          <input
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            id="search"
            placeholder="Search for a well..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="h-full w-full">
        <WellsMap wells={filteredWells} />
      </div>
    </main>
  );
}
