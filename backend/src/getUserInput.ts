import { getData, item, userInputs, rawMaterialsMapLimits } from './dataStore';
var prompt = require('prompt-sync')({sigint: true});

export const getUserInputs = (): userInputs => {
    const data = getData();
    console.log(data);

    let userInput: userInputs = {
        itemName: '',
        itemsPerMin: 0,
        maximise: false,
        rawMaterials: [],
    };

    let item = prompt('input the item to be produced: ');
    let itemObject = data.items.find((obj: item) => obj.name === item || obj.displayName === item);
    while (!itemObject) {
        item = prompt('please enter a valid item to be produced: ');
        itemObject = data.items.find((obj: item) => obj.name === item || obj.displayName === item);
    }
    console.log(itemObject);
    userInput.itemName = itemObject.name;

    // maximising not implemented yet
    const maximise = prompt('do you want the output to be maximised? (y/n) ');
    if (maximise === 'y' || maximise === 'yes') {
        userInput.maximise = true;
        userInput.itemsPerMin = -1;
    } else {
        userInput.maximise = false;
        let itemsPerMin = prompt('how many items per min? ');
        // missing error checking but not bothered
        userInput.itemsPerMin = parseInt(itemsPerMin);
    }

    userInput.rawMaterials = rawMaterialsMapLimits;

    return userInput;
}