import React, { useState } from 'react';
import { PlantTier, GameState, IngredientId } from '../types';
import { PLANT_CATALOG, INGREDIENTS } from '../constants';
import { Modal } from './Modal';

interface ShopModalProps {
    onBuyPlant: (tier: PlantTier) => void;
    onClose: () => void;
    gameState: GameState;
    setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

const SeedShop: React.FC<{ onBuyPlant: (tier: PlantTier) => void, koin: number }> = ({ onBuyPlant, koin }) => {
    const plantsForSale = Object.values(PLANT_CATALOG);
    return (
        <div className="space-y-4">
            {plantsForSale.map(plantData => {
                const canAfford = koin >= plantData.seedPrice;
                return (
                    <div key={plantData.tier} className="bg-gray-900/50 p-4 rounded-lg flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                           <img src={`https://picsum.photos/seed/${plantData.name}/100/100`} alt={`${plantData.name} seed`} className="w-16 h-16 rounded-md object-cover"/>
                            <div>
                                <h4 className="font-bold text-lg">{plantData.name} Seed</h4>
                                <p className="text-sm text-yellow-400">{plantData.seedPrice.toLocaleString()} K</p>
                            </div>
                        </div>
                        <button
                            onClick={() => onBuyPlant(plantData.tier)}
                            disabled={!canAfford}
                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                        >
                            Buy
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

const ApothecaryShop: React.FC<{ gameState: GameState, setGameState: React.Dispatch<React.SetStateAction<GameState>> }> = ({ gameState, setGameState }) => {
    const ingredientsForSale = Object.values(INGREDIENTS);

    const handleBuyIngredient = (ingId: IngredientId, price: number) => {
        if (gameState.koin >= price) {
            setGameState(prev => ({
                ...prev,
                koin: prev.koin - price,
                inventory: {
                    ...prev.inventory,
                    [ingId]: (prev.inventory[ingId] || 0) + 1,
                },
            }));
        }
    };

    return (
         <div className="space-y-4">
            {ingredientsForSale.map(ingredient => {
                const canAfford = gameState.koin >= ingredient.price;
                return (
                    <div key={ingredient.id} className="bg-gray-900/50 p-4 rounded-lg flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                           <span className="text-4xl bg-gray-700/50 p-3 rounded-lg">{ingredient.icon}</span>
                            <div>
                                <h4 className="font-bold text-lg">{ingredient.name}</h4>
                                <p className="text-sm text-yellow-400">{ingredient.price.toLocaleString()} K</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                             <span className="font-semibold text-lg">In Stock: {gameState.inventory[ingredient.id] || 0}</span>
                            <button
                                onClick={() => handleBuyIngredient(ingredient.id, ingredient.price)}
                                disabled={!canAfford}
                                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-500 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                            >
                                Buy
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export const ShopModal: React.FC<ShopModalProps> = ({ onBuyPlant, onClose, gameState, setGameState }) => {
    const [activeTab, setActiveTab] = useState<'seeds' | 'ingredients'>('seeds');

    return (
        <Modal title="The Veridian Exchange" onClose={onClose}>
            <div>
                <div className="flex border-b border-gray-700 mb-4">
                    <button 
                        onClick={() => setActiveTab('seeds')}
                        className={`px-4 py-2 text-lg font-semibold transition-colors ${activeTab === 'seeds' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400 hover:text-white'}`}
                    >
                        Seed Catalogue
                    </button>
                     <button 
                        onClick={() => setActiveTab('ingredients')}
                        className={`px-4 py-2 text-lg font-semibold transition-colors ${activeTab === 'ingredients' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400 hover:text-white'}`}
                    >
                        Apothecary
                    </button>
                </div>
                {activeTab === 'seeds' && <SeedShop onBuyPlant={onBuyPlant} koin={gameState.koin} />}
                {activeTab === 'ingredients' && <ApothecaryShop gameState={gameState} setGameState={setGameState} />}
            </div>
        </Modal>
    );
};
