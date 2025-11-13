
import React from 'react';
import { PlantInstance } from '../types';
import { PLANT_CATALOG, AP_INITIAL } from '../constants';
import { Modal } from './Modal';

interface MarketModalProps {
    plants: PlantInstance[];
    onSellPlant: (plantId: string) => void;
    onClose: () => void;
}

export const MarketModal: React.FC<MarketModalProps> = ({ plants, onSellPlant, onClose }) => {
    
    const calculateSalePrice = (plant: PlantInstance): number => {
        const plantData = PLANT_CATALOG[plant.tier];
        return Math.floor(plantData.baseSalePrice * (plant.ap / AP_INITIAL));
    };

    return (
        <Modal title="Collector's Market" onClose={onClose}>
            {plants.length === 0 ? (
                <p className="text-center text-gray-400">You have no mature plants to sell. Keep nurturing!</p>
            ) : (
                <div className="space-y-4">
                    {plants.map(plant => (
                        <div key={plant.id} className="bg-gray-900/50 p-4 rounded-lg flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <img src={`https://picsum.photos/seed/${plant.id}/100/100`} alt={plant.name} className="w-16 h-16 rounded-md object-cover"/>
                                <div>
                                    <h4 className="font-bold text-lg">{plant.name}</h4>
                                    <p className="text-sm text-purple-300">{plant.ap} AP</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-semibold text-yellow-400">{calculateSalePrice(plant).toLocaleString()} K</p>
                                <button 
                                    onClick={() => onSellPlant(plant.id)}
                                    className="mt-1 bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-500 transition-colors"
                                >
                                    Sell
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Modal>
    );
};
