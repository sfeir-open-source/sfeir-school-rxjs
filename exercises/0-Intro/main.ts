import { fuelUpper, getModuleMasses } from './code';

const masses = getModuleMasses();
const requiredFuel = fuelUpper(masses);

console.log('required fuel: ', requiredFuel);
