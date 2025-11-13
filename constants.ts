import { PlantData, PlantStatus, PlantTier, TreatmentType, PlantGrowthStage, IngredientId, Ingredient, Recipe } from './types';

export const INITIAL_KOIN = 5000;
export const AP_INITIAL = 300;
export const AP_GAIN = 50;
export const AP_LOSS_WRONG_TREATMENT = 25;
export const AP_LOSS_STRESSED = 5;
export const PLANT_STRESS_CHANCE_PER_TICK = 0.15;
export const GAME_TICK_MS = 2000; // 2 seconds per in-game hour

export const PLANT_CATALOG: { [key in PlantTier]: PlantData } = {
    [PlantTier.Tier1]: {
        name: 'Monstera Albo',
        tier: PlantTier.Tier1,
        seedPrice: 1000,
        baseSalePrice: 2500,
        growthTimeHours: 48, // 2 days
        stressTreatments: {
            [PlantStatus.Thirsty]: TreatmentType.PureWater,
            [PlantStatus.NeedsNutrients]: TreatmentType.NPKNutrients,
            [PlantStatus.Pests]: TreatmentType.Pesticide,
        },
    },
    [PlantTier.Tier2]: {
        name: 'Juliet Rose',
        tier: PlantTier.Tier2,
        seedPrice: 8000,
        baseSalePrice: 20000,
        growthTimeHours: 96, // 4 days
        stressTreatments: {
            [PlantStatus.Thirsty]: TreatmentType.PureWater,
            [PlantStatus.NeedsNutrients]: TreatmentType.NPKNutrients,
            [PlantStatus.Pests]: TreatmentType.Pesticide,
        },
    },
};

export const GROWTH_THRESHOLDS: { [key in PlantTier]: { [key in PlantGrowthStage]: number } } = {
    [PlantTier.Tier1]: {
        [PlantGrowthStage.Seedling]: 0,
        [PlantGrowthStage.Juvenile]: 12,
        [PlantGrowthStage.Mature]: 36,
        [PlantGrowthStage.Flowering]: 48,
    },
    [PlantTier.Tier2]: {
        [PlantGrowthStage.Seedling]: 0,
        [PlantGrowthStage.Juvenile]: 24,
        [PlantGrowthStage.Mature]: 72,
        [PlantGrowthStage.Flowering]: 96,
    },
};

export const STATUS_DETAILS: { [key in PlantStatus]: { color: string; waveColor: string; description: string; sound: string; waveformData: { hour: number; freq: number }[] } } = {
    [PlantStatus.Harmonious]: {
        color: 'text-green-400',
        waveColor: '#4ade80',
        description: 'Harmonious',
        sound: 'A gentle, soothing hum in C Major.',
        waveformData: Array.from({ length: 10 }, (_, i) => ({ hour: i, freq: Math.sin(i * 0.8) * 10 + 50 })),
    },
    [PlantStatus.Thirsty]: {
        color: 'text-orange-400',
        waveColor: '#fb923c',
        description: 'Thirsty (Dehydrated)',
        sound: 'Sharp, rapid "click-click" sounds disrupting the harmony.',
        waveformData: Array.from({ length: 10 }, (_, i) => ({ hour: i, freq: (Math.random() > 0.7 ? 80 : 20) })),
    },
    [PlantStatus.NeedsNutrients]: {
        color: 'text-yellow-400',
        waveColor: '#facc15',
        description: 'Needs Nutrients',
        sound: 'A low, murky rumble that muddies the base frequency.',
        waveformData: Array.from({ length: 10 }, (_, i) => ({ hour: i, freq: Math.random() * 20 + 10 })),
    },
    [PlantStatus.Pests]: {
        color: 'text-purple-400',
        waveColor: '#c084fc',
        description: 'Pest Infestation',
        sound: 'A high-pitched, static-like hiss overlays the harmony.',
        waveformData: Array.from({ length: 10 }, (_, i) => ({ hour: i, freq: Math.sin(i * 2) * 5 + 90 })),
    },
};

export const INGREDIENTS: { [key in IngredientId]: Ingredient } = {
    'WATER_SOURCE': { id: 'WATER_SOURCE', name: 'Distilled Water', price: 50, icon: '💧' },
    'NPK_POWDER': { id: 'NPK_POWDER', name: 'NPK Powder', price: 75, icon: '🌿' },
    'NEEM_EXTRACT': { id: 'NEEM_EXTRACT', name: 'Neem Extract', price: 150, icon: '🐞' },
};

export const RECIPES: { [key in TreatmentType]: Recipe } = {
    [TreatmentType.PureWater]: {
        id: TreatmentType.PureWater,
        name: 'Hydration Solution',
        ingredients: ['WATER_SOURCE'],
        description: 'Cures Thirst.',
        icon: '💧'
    },
    [TreatmentType.NPKNutrients]: {
        id: TreatmentType.NPKNutrients,
        name: 'Balanced Nutrients',
        ingredients: ['NPK_POWDER'],
        description: 'Cures nutrient deficiency.',
        icon: '🌿'
    },
    [TreatmentType.Pesticide]: {
        id: TreatmentType.Pesticide,
        name: 'Natural Pesticide',
        ingredients: ['NEEM_EXTRACT'],
        description: 'Cures pest infestations.',
        icon: '🐞'
    },
};
