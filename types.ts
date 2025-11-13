export enum PlantGrowthStage {
    Seedling = 'SEEDLING',
    Juvenile = 'JUVENILE',
    Mature = 'MATURE',
    Flowering = 'FLOWERING',
}

export enum PlantStatus {
    Harmonious = 'HARMONIOUS',
    Thirsty = 'THIRSTY',
    NeedsNutrients = 'NEEDS_NUTRIENTS',
    Pests = 'PESTS',
}

export enum TreatmentType {
    PureWater = 'PURE_WATER',
    NPKNutrients = 'NPK_NUTRIENTS',
    Pesticide = 'PESTICIDE',
}

export enum PlantTier {
    Tier1 = 'TIER_1',
    Tier2 = 'TIER_2',
}

export interface PlantData {
    name: string;
    tier: PlantTier;
    seedPrice: number;
    baseSalePrice: number;
    growthTimeHours: number; // Total hours to reach flowering
    stressTreatments: { [key in PlantStatus]?: TreatmentType };
}

export interface PlantInstance {
    id: string;
    tier: PlantTier;
    name: string;
    ap: number;
    status: PlantStatus;
    growthProgress: number;
    isMature: boolean;
    growthStage: PlantGrowthStage;
    description: string;
}

export enum ModalType {
    AuraSkop = 'AURA_SKOP',
    MixingStation = 'MIXING_STATION',
    Market = 'MARKET',
    Shop = 'SHOP',
}

export enum ViewType {
    PROPERTY = 'PROPERTY',
    GREENHOUSE = 'GREENHOUSE',
    TOWN = 'TOWN',
}

export type IngredientId = 'WATER_SOURCE' | 'NPK_POWDER' | 'NEEM_EXTRACT';

export interface Ingredient {
    id: IngredientId;
    name: string;
    price: number;
    icon: string;
}

export interface Recipe {
    id: TreatmentType;
    name: string;
    ingredients: IngredientId[];
    description: string;
    icon: string;
}

export interface GameState {
    koin: number;
    day: number;
    hour: number;
    plants: PlantInstance[];
    activeModal: ModalType | null;
    selectedPlantId: string | null;
    notifications: string[];
    inventory: { [key in IngredientId]?: number };
    knownRecipes: TreatmentType[];
    currentView: ViewType;
}
