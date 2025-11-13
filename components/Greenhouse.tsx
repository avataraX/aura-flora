import React from 'react';
import { PlantInstance, ModalType } from '../types';
import { Plant } from './Plant';
import { PlantSlot } from './PlantSlot';

interface GreenhouseViewProps {
    plants: PlantInstance[];
    onSelectPlant: (plantId: string) => void;
    onExit: () => void;
    onOpenMixingStation: () => void;
    onOpenShop: () => void;
}

const PLANT_POSITIONS = [
    { top: '20%', left: '25%' },
    { top: '20%', left: '55%' },
    { top: '50%', left: '25%' },
    { top: '50%', left: '55%' },
];

export const GreenhouseView: React.FC<GreenhouseViewProps> = ({ plants, onSelectPlant, onExit, onOpenMixingStation, onOpenShop }) => {
    return (
        <div className="relative w-[800px] h-[600px] transition-all duration-500" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(60deg) rotateZ(-45deg)' }}>
            {/* Floor */}
            <div className="absolute inset-0 bg-stone-200/90 backdrop-blur-sm shadow-inner transform-gpu"></div>
            {/* Back Wall */}
            <div className="absolute bottom-0 left-0 w-full h-48 bg-stone-300/80 transform origin-bottom-left -rotate-y-90"></div>
             {/* Left Wall */}
            <div className="absolute top-0 left-0 w-full h-48 bg-stone-300/70 transform origin-top-left -rotate-x-90"></div>
            
            <div className="absolute inset-0">
                {PLANT_POSITIONS.map((pos, index) => {
                    const plant = plants[index];
                    return plant ? (
                         <div key={plant.id} className="absolute" style={{ ...pos, transform: 'translate(-50%, -50%)' }}>
                            <Plant plant={plant} onSelectPlant={onSelectPlant} />
                        </div>
                    ) : (
                        <div key={`slot-${index}`} className="absolute" style={{ ...pos, transform: 'translate(-50%, -50%)' }}>
                            <PlantSlot onClick={onOpenShop} />
                        </div>
                    )
                })}

                {/* Mixing Station */}
                <div 
                    onClick={onOpenMixingStation}
                    className="absolute top-[80%] left-[15%] w-48 h-24 bg-slate-600 rounded-md shadow-lg cursor-pointer group transform -translate-x-1/2 -translate-y-1/2 hover:bg-slate-500 transition-colors"
                >
                    <div className="w-full h-full flex items-center justify-center text-white text-center p-2 transform-gpu" style={{ transform: 'rotateZ(45deg) rotateX(-60deg)' }}>
                        <div>
                        <p className="text-4xl">🧪</p>
                        <p className="font-bold">Mixing Station</p>
                        </div>
                    </div>
                </div>

                 {/* Exit */}
                <button 
                    onClick={onExit}
                    className="absolute top-[85%] left-[85%] w-24 h-24 bg-red-800/80 rounded-full shadow-lg cursor-pointer group transform -translate-x-1/2 -translate-y-1/2 hover:bg-red-700 transition-colors"
                >
                     <div className="w-full h-full flex items-center justify-center text-white text-center p-2 transform-gpu" style={{ transform: 'rotateZ(45deg) rotateX(-60deg)' }}>
                        <p className="font-bold text-lg">Exit</p>
                    </div>
                </button>
            </div>
        </div>
    );
};
