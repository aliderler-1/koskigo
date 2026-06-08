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
    alert(`Report submitted locally for Well ID: ${id}. (Offline sync enabled)`);
    router.push('/');
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Arıza Bildirimi: Kuyu #{id}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Arıza Tipi</label>
          <select 
            className="w-full border p-2 rounded"
            value={faultType}
            onChange={(e) => setFaultType(e.target.value)}
            required
          >
            <option value="">Seçiniz...</option>
            <option value="pompa">Pompa Arızası</option>
            <option value="elektrik">Elektrik Kesintisi</option>
            <option value="kirlilik">Su Kirliliği</option>
            <option value="diger">Diğer</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Açıklama</label>
          <textarea 
            className="w-full border p-2 rounded"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Medya Yükle (Fotoğraf/Ses/Video)</label>
          <input type="file" accept="image/*,audio/*,video/*" multiple className="block w-full text-sm" />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Bildirimi Gönder
        </button>
      </form>
      <button 
        onClick={() => router.push('/')}
        className="w-full mt-4 text-gray-500 text-sm underline"
      >
        Haritaya Dön
      </button>
    </div>
  );
}
