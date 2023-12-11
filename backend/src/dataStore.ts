import fs from 'fs';

interface errorObject {
    error: string;
}

interface item {
    name: string;
    displayName: string;
}

interface recipeItem {
    name: string;
    displayName: string;
    count: number;
    liquid: boolean;
}

// add more things later such as a tier requirement or research requirement
interface recipe {
    name: string;
    displayName: string;
    timeTaken: number;
    ingredients: recipeItem[];
    products: recipeItem[];
    machine: string;
    alternate: boolean;
    FICSMAS: boolean;
    owned: boolean;
}

interface dataStore {
    recipes: recipe[];
    items: item[];
}

interface rawMaterial {
    name: string;
    available: number;
}

interface userInputs {
    // strict name
    itemName: string;
    // -1 when maximise true
    itemsPerMin: number;
    // maximise output from given inputs
    maximise: boolean;
    // section for which raw materials and recipies user has,
    // will probably update more when there is a frontend
    rawMaterials: rawMaterial[]
}

// update for multiple ingredients
interface recipeStep {
    ingredientsPerMinRequired: number;
    numberOfMachines: number;
    recipe: recipe;
}

// the maximum amount of each material on the starting map
const rawMaterialsMapLimits = [
    {
        name: 'bauxite',
        available: 9780,
    },
    {
        name: 'caterium-ore',
        available: 11040,
    },
    {
        name: 'coal',
        available: 30900,
    },
    {
        name: 'copper-ore',
        available: 28860,
    },
    {
        name: 'crude-oil',
        available: 11700,
    },
    {
        name: 'iron-ore',
        available: 70380,
    },
    {
        name: 'limestone',
        available: 52860,
    },
    {
        name: 'nitrogen-gas',
        available: 12000,
    },
    {
        name: 'raw-quartz',
        available: 10500,
    },
    {
        name: 'sulfur',
        available: 6840,
    },
    {
        name: 'uranium',
        available: 2100,
    },
    {
        name: 'water',
        available: 9007199254740991,
    },
]

// the base ingredients which all recipies build on
const baseItems = [
    'bauxite',
    'caterium-ore',
    'coal',
    'copper-ore',
    'crude-oil',
    'iron-ore',
    'limestone',
    'nitrogen-gas',
    'raw-quartz',
    'sulfur',
    'uranium',
    'water',
]


// read data.json file into datastore
const getData = () => {
    const data = JSON.parse(fs.readFileSync('./data.json',
    { encoding: 'utf8', flag: 'r' }));
    return data;
}

export { 
    dataStore, 
    getData, 
    baseItems, 
    userInputs, 
    rawMaterialsMapLimits, 
    item, 
    recipeStep,
    recipe,
    recipeItem,
    errorObject,
}