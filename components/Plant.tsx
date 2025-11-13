import React from 'react';
import { PlantInstance, PlantStatus, PlantGrowthStage } from '../types';
import { STATUS_DETAILS } from '../constants';

interface PlantProps {
    plant: PlantInstance;
    onSelectPlant: (plantId: string) => void;
}

const PlantStatusIndicator: React.FC<{ status: PlantStatus }> = ({ status }) => {
    if (status === PlantStatus.Harmonious) return null;
    const statusInfo = STATUS_DETAILS[status];
    const icon = status === PlantStatus.Thirsty ? '💧' : status === PlantStatus.NeedsNutrients ? '🌿' : '🐞';
    
    return (
        <div className="absolute -top-4 -right-4 z-20" title={statusInfo.description}>
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-2xl animate-bounce shadow-lg">
                {icon}
            </div>
        </div>
    );
};

const getPlantSizeClass = (stage: PlantGrowthStage): string => {
    switch (stage) {
        case PlantGrowthStage.Seedling: return 'h-12 w-12 bottom-12';
        case PlantGrowthStage.Juvenile: return 'h-20 w-20 bottom-12';
        case PlantGrowthStage.Mature: return 'h-28 w-28 bottom-12';
        case PlantGrowthStage.Flowering: return 'h-32 w-32 bottom-12';
        default: return 'h-12 w-12 bottom-12';
    }
}


export const Plant: React.FC<PlantProps> = ({ plant, onSelectPlant }) => {
    const isStressed = plant.status !== PlantStatus.Harmonious;
    
    const plantSize = getPlantSizeClass(plant.growthStage);
    const matureGlowEffect = plant.isMature ? 'drop-shadow-[0_0_15px_rgba(252,211,77,0.7)]' : 'drop-shadow-2xl';

    return (
        <div 
            className="relative group w-32 h-32 flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110"
            onClick={() => onSelectPlant(plant.id)}
            style={{ transformStyle: 'preserve-3d' }}
        >
            <div className="absolute w-full h-full transform-gpu" style={{ transform: 'rotateZ(45deg) rotateX(-60deg)' }}>
                {/* Tooltip */}
                 <div className="absolute bottom-full mb-2 w-max left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 border border-gray-700 text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30">
                    {plant.name}: <span className="font-bold text-purple-300">{plant.ap} AP</span>
                </div>

                {isStressed && <PlantStatusIndicator status={plant.status} />}
                
                 {plant.isMature && (
                    <div className="absolute -top-4 -left-4 z-20" title="Mature Plant">
                        <span className="text-4xl text-yellow-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
                            ⚜️
                        </span>
                    </div>
                 )}

                {/* Plant Image */}
                <img 
                    src={`https://picsum.photos/seed/${plant.id}-${plant.growthStage}/200`} 
                    alt={plant.name} 
                    className={`absolute left-1/2 -translate-x-1/2 object-contain ${plantSize} ${matureGlowEffect} transition-all duration-500`}
                    style={{ imageRendering: 'pixelated' }}
                />

                {/* Pot */}
                 <div className="absolute bottom-0 w-24 h-24 bg-terracotta-500 left-1/2 -translate-x-1/2 rounded-t-full" style={{ background: '#A0522D' }}>
                    <div className="absolute top-0 w-full h-6 bg-terracotta-700 rounded-t-full" style={{ background: '#8B4513' }}></div>
                </div>

                {/* Pot shadow */}
                <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-28 h-4 bg-black/30 rounded-full blur-sm"></div>
            </div>
        </div>
    );
};