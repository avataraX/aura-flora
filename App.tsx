import React, { useState, useEffect, useCallback } from 'react';
import { GameState, PlantInstance, PlantStatus, TreatmentType, ModalType, PlantTier, PlantGrowthStage, Recipe, IngredientId, ViewType } from './types';
import { PLANT_CATALOG, INITIAL_KOIN, AP_INITIAL, AP_GAIN, AP_LOSS_WRONG_TREATMENT, AP_LOSS_STRESSED, PLANT_STRESS_CHANCE_PER_TICK, GAME_TICK_MS, GROWTH_THRESHOLDS, RECIPES } from './constants';
import { Header } from './components/Header';
import { PropertyView } from './components/PropertyView';
import { TownView } from './components/TownView';
import { GreenhouseView } from './components/GreenhouseView';
import { AuraSkopModal } from './components/AuraSkopModal';
import { MixingStationModal } from './components/MixingStationModal';
import { MarketModal } from './components/MarketModal';
import { ShopModal } from './components/ShopModal';
import { generatePlantDescription } from './services/geminiService';

const getGrowthStage = (plant: PlantInstance): PlantGrowthStage => {
    const thresholds = GROWTH_THRESHOLDS[plant.tier];
    if (plant.growthProgress >= thresholds[PlantGrowthStage.Flowering]) return PlantGrowthStage.Flowering;
    if (plant.growthProgress >= thresholds[PlantGrowthStage.Mature]) return PlantGrowthStage.Mature;
    if (plant.growthProgress >= thresholds[PlantGrowthStage.Juvenile]) return PlantGrowthStage.Juvenile;
    return PlantGrowthStage.Seedling;
};

const App: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>({
        koin: INITIAL_KOIN,
        day: 1,
        hour: 8,
        plants: [],
        activeModal: null,
        selectedPlantId: null,
        notifications: [],
        inventory: {
            'WATER_SOURCE': 10,
            'NPK_POWDER': 10,
            'NEEM_EXTRACT': 5,
        },
        knownRecipes: [TreatmentType.PureWater, TreatmentType.NPKNutrients, TreatmentType.Pesticide],
        currentView: ViewType.PROPERTY,
    });

    const advanceTime = useCallback(() => {
        setGameState(prev => {
            const newHour = prev.hour + 1;
            const newDay = newHour >= 24 ? prev.day + 1 : prev.day;
            const currentHour = newHour % 24;

            const updatedPlants = prev.plants.map(plant => {
                let newPlant = { ...plant };
                
                if (newPlant.growthStage !== PlantGrowthStage.Flowering) {
                    newPlant.growthProgress += 1;
                    newPlant.growthStage = getGrowthStage(newPlant);
                    newPlant.isMature = newPlant.growthStage === PlantGrowthStage.Mature || newPlant.growthStage === PlantGrowthStage.Flowering;
                }

                if (newPlant.status !== PlantStatus.Harmonious) {
                    newPlant.ap = Math.max(0, plant.ap - AP_LOSS_STRESSED);
                } else if (Math.random() < PLANT_STRESS_CHANCE_PER_TICK) {
                    const possibleStresses = Object.keys(PLANT_CATALOG[plant.tier].stressTreatments) as PlantStatus[];
                    newPlant.status = possibleStresses[Math.floor(Math.random() * possibleStresses.length)];
                }

                return newPlant;
            });
            
            return { ...prev, day: newDay, hour: currentHour, plants: updatedPlants };
        });
    }, []);

    useEffect(() => {
        const gameLoop = setInterval(advanceTime, GAME_TICK_MS);
        return () => clearInterval(gameLoop);
    }, [advanceTime]);

    const handleSelectPlant = (plantId: string) => {
        setGameState(prev => ({ ...prev, selectedPlantId: plantId, activeModal: ModalType.AuraSkop }));
    };

    const handleCloseModal = () => {
        setGameState(prev => ({ ...prev, activeModal: null, selectedPlantId: null }));
    };

    const handleOpenModal = (modal: ModalType) => {
        setGameState(prev => ({ ...prev, activeModal: modal }));
    };

    const navigateTo = (view: ViewType) => {
        setGameState(prev => ({ ...prev, currentView: view }));
    }
    
    const addNotification = (message: string) => {
        console.log(message);
    };

    const handleCraftAndApplyTreatment = (plantId: string, recipeId: TreatmentType) => {
        const recipe = RECIPES[recipeId];
        if (!recipe) return;

        setGameState(prev => {
            const hasIngredients = recipe.ingredients.every(ingId => (prev.inventory[ingId] || 0) >= 1);
            if (!hasIngredients) {
                addNotification("Not enough ingredients!");
                return prev;
            }

            const plants = [...prev.plants];
            const plantIndex = plants.findIndex(p => p.id === plantId);
            if (plantIndex === -1) return prev;
            
            const newInventory = { ...prev.inventory };
            recipe.ingredients.forEach(ingId => {
                newInventory[ingId] = (newInventory[ingId] || 0) - 1;
            });

            const plant = { ...plants[plantIndex] };
            const plantData = PLANT_CATALOG[plant.tier];
            const correctTreatment = plantData.stressTreatments[plant.status];

            if (recipe.id === correctTreatment) {
                plant.ap += AP_GAIN;
                plant.status = PlantStatus.Harmonious;
                addNotification(`Correct Treatment! +${AP_GAIN} AP for ${plant.name}.`);
            } else {
                plant.ap = Math.max(0, plant.ap - AP_LOSS_WRONG_TREATMENT);
                addNotification(`Wrong Treatment! -${AP_LOSS_WRONG_TREATMENT} AP for ${plant.name}.`);
            }
            plants[plantIndex] = plant;
            return { ...prev, plants, inventory: newInventory, activeModal: null };
        });
    };
    
    const handleBuyPlant = async (tier: PlantTier) => {
        const plantData = PLANT_CATALOG[tier];
        if (gameState.koin >= plantData.seedPrice && gameState.plants.length < 4) {
            const newPlant: PlantInstance = {
                id: `plant-${Date.now()}`,
                tier: tier,
                name: plantData.name,
                ap: AP_INITIAL,
                status: PlantStatus.Harmonious,
                growthProgress: 0,
                isMature: false,
                growthStage: PlantGrowthStage.Seedling,
                description: "Generating description..."
            };
            
            setGameState(prev => ({
                ...prev,
                koin: prev.koin - plantData.seedPrice,
                plants: [...prev.plants, newPlant],
            }));

            const desc = await generatePlantDescription(plantData.name);
            setGameState(prev => ({
                ...prev,
                plants: prev.plants.map(p => p.id === newPlant.id ? {...p, description: desc} : p)
            }));

        } else if (gameState.plants.length >= 4) {
            addNotification("Your greenhouse is full!");
        } else {
            addNotification("Not enough Koin!");
        }
    };
    
    const handleSellPlant = (plantId: string) => {
        setGameState(prev => {
            const plant = prev.plants.find(p => p.id === plantId);
            if (!plant || !plant.isMature) return prev;

            const plantData = PLANT_CATALOG[plant.tier];
            const salePrice = Math.floor(plantData.baseSalePrice * (plant.ap / AP_INITIAL));

            return {
                ...prev,
                koin: prev.koin + salePrice,
                plants: prev.plants.filter(p => p.id !== plantId),
            };
        });
    };
    
    const renderCurrentView = () => {
        switch(gameState.currentView) {
            case ViewType.PROPERTY:
                return <PropertyView onEnterGreenhouse={() => navigateTo(ViewType.GREENHOUSE)} onGoToTown={() => navigateTo(ViewType.TOWN)} />;
            case ViewType.GREENHOUSE:
                return <GreenhouseView 
                            plants={gameState.plants} 
                            onSelectPlant={handleSelectPlant} 
                            onExit={() => navigateTo(ViewType.PROPERTY)}
                            onOpenMixingStation={() => handleOpenModal(ModalType.MixingStation)}
                            onOpenShop={() => handleOpenModal(ModalType.Shop)}
                        />;
            case ViewType.TOWN:
                return <TownView onOpenModal={handleOpenModal} onGoToProperty={() => navigateTo(ViewType.PROPERTY)} />;
            default:
                return <PropertyView onEnterGreenhouse={() => navigateTo(ViewType.GREENHOUSE)} onGoToTown={() => navigateTo(ViewType.TOWN)} />;
        }
    }

    const selectedPlant = gameState.plants.find(p => p.id === gameState.selectedPlantId);

    return (
        <div className="min-h-screen font-sans p-4 flex flex-col overflow-hidden">
            <Header koin={gameState.koin} day={gameState.day} hour={gameState.hour} />
            <main className="flex-grow flex items-center justify-center container mx-auto my-8 perspective-[1000px]">
                {renderCurrentView()}
            </main>

            {gameState.activeModal === ModalType.AuraSkop && selectedPlant && (
                <AuraSkopModal plant={selectedPlant} onClose={handleCloseModal} />
            )}
            {gameState.activeModal === ModalType.MixingStation && (
                <MixingStationModal
                    plants={gameState.plants.filter(p => p.status !== PlantStatus.Harmonious)}
                    onApplyTreatment={handleCraftAndApplyTreatment}
                    onClose={handleCloseModal}
                    gameState={gameState}
                />
            )}
            {gameState.activeModal === ModalType.Market && (
                <MarketModal 
                    plants={gameState.plants.filter(p => p.isMature)} 
                    onSellPlant={handleSellPlant} 
                    onClose={handleCloseModal} 
                />
            )}
            {gameState.activeModal === ModalType.Shop && (
                <ShopModal 
                    onBuyPlant={handleBuyPlant} 
                    onClose={handleCloseModal} 
                    setGameState={setGameState}
                    gameState={gameState}
                />
            )}
        </div>
    );
};

export default App;