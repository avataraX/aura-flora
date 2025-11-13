
import React from 'react';

interface HeaderProps {
    koin: number;
    day: number;
    hour: number;
}

export const Header: React.FC<HeaderProps> = ({ koin, day, hour }) => {
    const formattedHour = hour.toString().padStart(2, '0');
    return (
        <header className="bg-black/30 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-700">
            <div className="container mx-auto flex justify-between items-center text-white">
                <div className="text-xl font-bold">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-400">Aura Flora</h1>
                    <p className="text-sm text-gray-400">Resonance Collector</p>
                </div>
                <div className="flex space-x-6 items-center text-lg">
                    <div className="text-center">
                        <span className="text-yellow-400 font-semibold">{koin.toLocaleString()} K</span>
                        <p className="text-xs text-gray-400">Koin</p>
                    </div>
                     <div className="text-center">
                        <span className="font-semibold">{`Day ${day}`}</span>
                        <p className="text-xs text-gray-400">{`${formattedHour}:00`}</p>
                    </div>
                </div>
            </div>
        </header>
    );
};
