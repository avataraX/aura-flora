import React from 'react';

interface PlantSlotProps {
    onClick: () => void;
}

export const PlantSlot: React.FC<PlantSlotProps> = ({ onClick }) => {
    return (
        <div
            className="relative group w-32 h-32 flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110"
            onClick={onClick}
            title="Empty Slot - Go to Shop"
            style={{ transformStyle: 'preserve-3d' }}
        >
            <div className="absolute w-full h-full transform-gpu" style={{ transform: 'rotateZ(45deg) rotateX(-60deg)' }}>
                 {/* Pot */}
                 <div className="absolute bottom-0 w-24 h-24 bg-stone-500/50 left-1/2 -translate-x-1/2 rounded-t-full border-2 border-dashed border-stone-400">
                    <div className="absolute top-0 w-full h-6 bg-stone-600/50 rounded-t-full"></div>
                </div>
                 {/* Pot shadow */}
                <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-28 h-4 bg-black/30 rounded-full blur-sm"></div>

                {/* Plus Icon */}
                 <div className="absolute inset-0 flex items-center justify-center text-4xl text-stone-400 group-hover:text-green-400 transition-colors duration-300">
                    +
                </div>
            </div>
        </div>
    );
};
