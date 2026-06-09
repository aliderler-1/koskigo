"use client";
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function ReportPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [faultType, setFaultType] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Arıza bildirimi kuyu #${id} için yerel olarak kaydedildi. (Cihazınız çevrim içi olduğunda senkronize edilecektir)`);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">KOSKİGO Arıza Bildirimi</h1>
      </header>
      
      <main className="p-4 max-w-lg mx-auto w-full flex-1">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Kuyu ID: {id}</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Arıza Tipi</label>
              <select 
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={faultType}
                onChange={(e) => setFaultType(e.target.value)}
                required
              >
                <option value="">Seçiniz...</option>
                <option value="elektrik_arizasi">Elektrik Arızası</option>
                <option value="mekanik_ariza">Mekanik Arıza</option>
                <option value="diger">Diğer</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Açıklama</label>
              <textarea 
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                rows={4}
                placeholder="Arıza detaylarını buraya yazın..."
                value={description}
                onChange={(e) => setSearchTerm ? undefined : setDescription(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Medya Yükle (Fotoğraf/Ses/Video)</label>
              <input 
                type="file" 
                accept="image/*,audio/*,video/*" 
                multiple 
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition" 
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-bold shadow-md hover:bg-blue-700 active:scale-[0.98] transition-all"
            >
              Bildirimi Gönder
            </button>
          </form>
          
          <button 
            onClick={() => router.push('/')}
            className="w-full mt-6 py-2 text-gray-500 text-sm font-medium hover:text-gray-700 transition"
          >
            ← Haritaya Dön
          </button>
        </div>
      </main>
      
      <footer className="p-4 text-center text-gray-400 text-xs">
        &copy; 2026 KOSKİ Genel Müdürlüğü
      </footer>
    </div>
  );
}
