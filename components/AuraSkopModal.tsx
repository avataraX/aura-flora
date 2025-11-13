import React from 'react';
import { PlantInstance } from '../types';
import { STATUS_DETAILS } from '../constants';
import { Modal } from './Modal';
import { WaveformChart } from './WaveformChart';

interface AuraSkopModalProps {
    plant: PlantInstance;
    onClose: () => void;
}

export const AuraSkopModal: React.FC<AuraSkopModalProps> = ({ plant, onClose }) => {
    const statusInfo = STATUS_DETAILS[plant.status];

    return (
        <Modal title="Aura-Skop Analysis" onClose={onClose}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <img src={`https://picsum.photos/seed/${plant.id}-${plant.growthStage}/600/400`} alt={plant.name} className="rounded-lg shadow-lg w-full h-64 object-cover" />
                    <div className="mt-4 p-4 bg-gray-900/50 rounded-lg">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-xl text-white">{plant.name}</h3>
                            <p className="text-sm text-gray-300 capitalize">{plant.growthStage.toLowerCase()}</p>
                        </div>
                        <p className="text-sm text-gray-400 mt-2 italic">{plant.description}</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="bg-gray-900/50 p-4 rounded-lg">
                        <h4 className="text-lg font-semibold text-purple-300">Aura Points</h4>
                        <p className="text-3xl font-bold text-white">{plant.ap} <span className="text-xl">AP</span></p>
                         <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                            <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${(plant.ap / 500) * 100}%` }}></div>
                        </div>
                    </div>
                     <div className="bg-gray-900/50 p-4 rounded-lg">
                        <h4 className="text-lg font-semibold text-teal-300">Resonance Analysis</h4>
                        <p className={`font-bold text-xl ${statusInfo.color}`}>{statusInfo.description}</p>
                        <p className="text-sm text-gray-300 mt-1">"{statusInfo.sound}"</p>
                    </div>
                    <div className="bg-gray-900/50 p-4 rounded-lg h-40">
                         <h4 className="text-lg font-semibold text-gray-300 mb-2">Ultrasonic Waveform</h4>
                         <WaveformChart data={statusInfo.waveformData} color={statusInfo.waveColor} />
                    </div>
                </div>
            </div>
        </Modal>
    );
};
