
import React from 'react';
import { ModalType } from '../types';

// Define the props this component will receive from App.tsx
interface TownViewProps {
  onOpenModal: (modal: ModalType) => void;
  onGoToProperty: () => void;
}

export const TownView: React.FC<TownViewProps> = ({ onOpenModal, onGoToProperty }) => {
  return (
    // Isometric 3D stage container, consistent with PropertyView
    <div 
      className="w-[700px] h-[500px] relative transition-all duration-500" 
      style={{ transformStyle: 'preserve-3d', transform: 'rotateX(60deg) rotateZ(-45deg)' }}
    >
      {/* 1. Town Square Ground */}
      <div className="absolute w-full h-full bg-gray-500/80 rounded-2xl shadow-2xl from-gray-600 to-gray-500 bg-gradient-to-br">
      </div>

      {/* 2. Seed Shop & Apothecary (Opens ShopModal) */}
      <div 
        onClick={() => onOpenModal(ModalType.Shop)}
        className="absolute w-1/3 h-1/3 top-1/4 left-[10%] bg-blue-200/40 backdrop-blur-md rounded-xl shadow-lg cursor-pointer
                   border border-blue-100/30 transform-gpu translate-z-[60px]
                   flex flex-col items-center justify-center text-center p-4
                   hover:scale-110 hover:border-blue-100 transition-all duration-300"
      >
        <div className="text-4xl">🛍️</div>
        <div className="font-bold text-lg mt-2 text-blue-900">Seed Shop</div>
        <div className="text-sm text-blue-800/80">(Buy Seeds & Items)</div>
      </div>
      
      {/* 3. Auction House (Opens MarketModal) */}
      <div 
        onClick={() => onOpenModal(ModalType.Market)}
        className="absolute w-1/3 h-1/3 top-1/4 right-[10%] bg-red-200/40 backdrop-blur-md rounded-xl shadow-lg cursor-pointer
                   border border-red-100/30 transform-gpu translate-z-[60px]
                   flex flex-col items-center justify-center text-center p-4
                   hover:scale-110 hover:border-red-100 transition-all duration-300"
      >
        <div className="text-4xl">🏛️</div>
        <div className="font-bold text-lg mt-2 text-red-900">Auction House</div>
        <div className="text-sm text-red-800/80">(Sell Plants)</div>
      </div>
      
      {/* 4. Path Back to Property */}
      <div 
        onClick={onGoToProperty}
        className="absolute w-1/4 h-1/6 -bottom-4 left-1/3 bg-yellow-800/70 backdrop-blur-sm rounded-lg shadow-md cursor-pointer
                   border border-yellow-200/30 transform-gpu translate-z-[10px]
                   flex items-center justify-center text-center p-2
                   hover:scale-110 hover:border-yellow-200 transition-all duration-300"
      >
        <div className="font-semibold text-sm">To Property 🏡</div>
      </div>
      
    </div>
  );
};
