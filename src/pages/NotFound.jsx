import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-9xl font-bold text-gray-200">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mt-4">Halaman Tidak Ditemukan</h2>
      <p className="text-gray-500 mt-2 mb-8">
        Sepertinya kamu tersesat di dalam pikiran sendiri.
      </p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        Kembali ke Home
      </Link>
    </div>
  );
}