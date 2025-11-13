import React, { useState } from 'react';
import { PlantInstance, TreatmentType, GameState } from '../types';
import { Modal } from './Modal';
import { RECIPES, INGREDIENTS } from '../constants';

interface MixingStationModalProps {
    plants: PlantInstance[];
    onApplyTreatment: (plantId: string, treatment: TreatmentType) => void;
    onClose: () => void;
    gameState: GameState;
}

export const MixingStationModal: React.FC<MixingStationModalProps> = ({ plants, onApplyTreatment, onClose, gameState }) => {
    const [selectedPlantId, setSelectedPlantId] = useState<string | null>(plants.length > 0 ? plants[0].id : null);

    const selectedPlant = plants.find(p => p.id === selectedPlantId);

    return (
        <Modal title="Mixing Station" onClose={onClose}>
            {plants.length === 0 ? (
                <p className="text-center text-gray-400">All your plants are in perfect harmony!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-semibold mb-2 text-green-300">Select Stressed Plant</h3>
                        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                            {plants.map(plant => (
                                <button
                                    key={plant.id}
                                    onClick={() => setSelectedPlantId(plant.id)}
                                    className={`w-full text-left p-3 rounded-lg transition-colors ${selectedPlantId === plant.id ? 'bg-teal-500/20 text-white' : 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300'}`}
                                >
                                    {plant.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        {selectedPlant ? (
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-green-300">Craft Treatment for <span className="text-white">{selectedPlant.name}</span></h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {gameState.knownRecipes.map(recipeId => {
                                        const recipe = RECIPES[recipeId];
                                        const canCraft = recipe.ingredients.every(ingId => (gameState.inventory[ingId] || 0) >= 1);
                                        return (
                                            <button 
                                                key={recipe.id}
                                                onClick={() => onApplyTreatment(selectedPlant.id, recipe.id)}
                                                disabled={!canCraft}
                                                className="bg-gray-700 p-4 rounded-lg text-left hover:bg-teal-600/50 hover:border-teal-500 border border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <p className="font-semibold">{recipe.name}</p>
                                                    <span className="text-2xl">{recipe.icon}</span>
                                                </div>
                                                <p className="text-xs text-gray-400 mt-1">{recipe.description}</p>
                                                <div className="mt-3 border-t border-gray-600 pt-2 text-xs">
                                                    <p className="font-semibold mb-1">Requires:</p>
                                                    {recipe.ingredients.map(ingId => {
                                                        const ingredient = INGREDIENTS[ingId];
                                                        const hasAmount = (gameState.inventory[ingId] || 0);
                                                        return (
                                                            <p key={ingId} className={`flex justify-between ${hasAmount > 0 ? 'text-gray-300' : 'text-red-400'}`}>
                                                                <span>{ingredient.name}</span>
                                                                <span>{hasAmount} / 1</span>
                                                            </p>
                                                        )
                                                    })}
                                                </div>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        ) : (
                            <p className="text-center text-gray-400">Select a plant to treat.</p>
                        )}
                    </div>
                </div>
            )}
        </Modal>
    );
};
