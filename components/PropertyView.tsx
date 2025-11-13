import React from 'react';

// Menentukan prop yang akan diterima komponen ini dari App.tsx
interface PropertyViewProps {
  onEnterGreenhouse: () => void;
  onGoToTown: () => void;
}

export const PropertyView: React.FC<PropertyViewProps> = ({ onEnterGreenhouse, onGoToTown }) => {
  return (
    // Kontainer ini akan menciptakan ilusi panggung 3D isometrik
    // Kelas "transform-style-preserve-3d" penting di sini
    <div 
      className="w-[600px] h-[400px] relative transition-all duration-500" 
      style={{ transformStyle: 'preserve-3d', transform: 'rotateX(60deg) rotateZ(-45deg)' }}
    >
      {/* 1. Tanah Properti */}
      <div className="absolute w-full h-full bg-green-700/80 rounded-2xl shadow-2xl flex items-center justify-center">
        <span className="text-xl font-bold opacity-30 transform-gpu rotate-90">Aura Flora Property</span>
      </div>

      {/* 2. Bangunan Greenhouse (Dapat Diklik) */}
      {/* Kita menggunakan translateZ untuk membuatnya "muncul" dari tanah */}
      <div 
        onClick={onEnterGreenhouse}
        className="absolute w-1/2 h-1/2 top-1/4 left-1/4 bg-white/20 backdrop-blur-md rounded-xl shadow-lg cursor-pointer
                   border border-white/30 transform-gpu translate-z-[50px]
                   flex flex-col items-center justify-center text-center p-4
                   hover:scale-110 hover:border-white transition-all duration-300"
      >
        <div className="text-3xl">🏛️</div>
        <div className="font-bold text-lg mt-2">Greenhouse</div>
        <div className="text-sm opacity-80">(Enter)</div>
      </div>

      {/* 3. Jalan Menuju Kota (Dapat Diklik) */}
      {/* Ini ditempatkan di "belakang" (secara visual) properti */}
      <div 
        onClick={onGoToTown}
        className="absolute w-1/4 h-1/6 -top-2 left-1/3 bg-yellow-800/70 backdrop-blur-sm rounded-lg shadow-md cursor-pointer
                   border border-yellow-200/30 transform-gpu translate-z-[10px]
                   flex items-center justify-center text-center p-2
                   hover:scale-110 hover:border-yellow-200 transition-all duration-300"
      >
        <div className="font-semibold text-sm">To Town 🏙️</div>
      </div>
      
    </div>
  );
};