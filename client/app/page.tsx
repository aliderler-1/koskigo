"use client";
import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Search } from 'lucide-react';
import wellsData from './data/wells.json';

const WellsMap = dynamic(() => import('../components/Map/WellsMap'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen w-full bg-gray-50">
      <p className="text-gray-500 font-medium">Harita Yükleniyor...</p>
    </div>
  )
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
    <main className="relative h-screen w-full bg-gray-100 flex flex-col">
      <header className="absolute top-0 left-0 right-0 z-[1001] p-4 flex justify-center pointer-events-none">
        <div className="w-full max-w-md pointer-events-auto">
          <div className="relative flex items-center w-full h-12 rounded-xl shadow-lg bg-white overflow-hidden border border-gray-200">
            <div className="grid place-items-center h-full w-12 text-gray-400">
              <Search className="h-5 w-5" />
            </div>
            <input
              className="peer h-full w-full outline-none text-base text-gray-700 pr-4"
              type="text"
              id="search"
              placeholder="Kuyu ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="flex-1 w-full">
        <WellsMap wells={filteredWells} />
      </div>
    </main>
  );
}
