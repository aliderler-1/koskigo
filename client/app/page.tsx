import dynamic from 'next/dynamic';

const WellsMap = dynamic(() => import('../components/Map/WellsMap'), { 
  ssr: false,
  loading: () => <p>Loading Map...</p>
});

export default function Home() {
  const mockWells = [
    { id: 1, kuyu_adi: "Kuyu 1", lat: 37.8714, lng: 32.4846 },
    { id: 2, kuyu_adi: "Kuyu 2", lat: 37.8814, lng: 32.4946 }
  ];

  return (
    <main>
      <div className="h-screen w-full">
        <WellsMap wells={mockWells} />
      </div>
    </main>
  );
}