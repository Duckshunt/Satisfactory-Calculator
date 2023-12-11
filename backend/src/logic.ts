import { getData, baseItems, userInputs, recipeStep, recipe, recipeItem, errorObject } from './dataStore';

// a very simple recipe chain, only supports a single branch, i.e. not multiple inputs
// and does not reeally contain any logic yet
// may need to change to a tree or graphical approach rather than list based idk
export const calculationLogic = (input: userInputs): errorObject | recipeStep[] => {
    const data = getData();

    // will contain all the crafting steps required
    const steps: recipeStep[] = [];

    let currentMaterial = input.itemName;
    let currentItemsPerMinRequired = input.itemsPerMin;

    // while the current material is not one of the base materials
    while (!baseItems.includes(currentMaterial)) {
        // find all recipes which produce the current material
        // and pick best one (not implemented yet)
        const recipes = data.recipes.filter((obj: recipe) => obj.products.find((inObj: recipeItem) => inObj.name === currentMaterial) !== undefined);

        if (recipes.length < 1) {
            return { error: 'no recipes' };
        }
        
        // this is where the logic needs to be updated, just choosing the first recipie at the moment
        const currentRecipe = recipes[0];
        const machineItemsPerMin = (60 / currentRecipe.timeTaken) * currentRecipe.products[0].count;

        const newRecipeStep: recipeStep = {
            ingredientsPerMinRequired: currentItemsPerMinRequired / currentRecipe.products[0].count * currentRecipe.ingredients[0].count,
            numberOfMachines: currentItemsPerMinRequired / machineItemsPerMin,
            recipe: currentRecipe,
        }

        steps.unshift(newRecipeStep);

        // need to update to support multiple materials
        currentMaterial = currentRecipe.ingredients[0].name;
        currentItemsPerMinRequired = newRecipeStep.ingredientsPerMinRequired;
    }

    return steps;
}
