import React from 'react';
import { ModalType } from '../types';

interface TownViewProps {
    onOpenModal: (modal: ModalType) => void;
    onGoToProperty: () => void;
}

const Building: React.FC<{ onClick: () => void; label: string; icon: string; className?: string }> = ({ onClick, label, icon, className }) => (
    <div 
        onClick={onClick}
        className={`relative w-48 h-56 cursor-pointer group transition-transform duration-300 hover:scale-105 ${className}`}
        style={{ transformStyle: 'preserve-3d' }}
    >
        <div className="absolute inset-0 transform-gpu" style={{ transform: 'rotateX(60deg) rotateZ(-45deg)' }}>
            <div className="relative w-full h-full">
                {/* Roof */}
                <div className="absolute top-0 left-0 w-full h-full bg-slate-700 transform translate-z-32 shadow-2xl"></div>
                 {/* Front Wall */}
                <div className="absolute top-0 left-0 w-full h-32 bg-stone-100 transform origin-top-left -rotate-x-90 shadow-lg flex items-center justify-center p-4">
                     <div className="text-center text-gray-800">
                        <p className="text-5xl">{icon}</p>
                    </div>
                </div>
                 {/* Side Wall */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-stone-200 transform origin-bottom-left -rotate-y-90 shadow-lg"></div>

                <div className="absolute inset-0 flex items-center justify-center text-center text-white transform translate-z-32" style={{ transform: 'translateZ(128px)' }}>
                   <div>
                        <h2 className="text-xl font-bold">{label}</h2>
                        <p className="text-xs group-hover:underline">Click to Enter</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);


export const TownView: React.FC<TownViewProps> = ({ onOpenModal, onGoToProperty }) => {
    return (
        <div className="relative w-full h-full flex items-center justify-center space-x-16">
            <Building onClick={() => onOpenModal(ModalType.Shop)} label="Shop" icon="🛒" />
            <Building onClick={() => onOpenModal(ModalType.Market)} label="Market" icon="⚖️" />

             {/* Go Back Button */}
            <button 
                onClick={onGoToProperty} 
                className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-gray-800/70 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors shadow-lg backdrop-blur-sm"
            >
                Back to Property
            </button>
        </div>
    );
};
