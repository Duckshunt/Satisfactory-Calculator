import { getUserInputs } from './getUserInput';
import { calculationLogic } from './logic';

const input = getUserInputs();
console.log(input);
console.log(calculationLogic(input));
