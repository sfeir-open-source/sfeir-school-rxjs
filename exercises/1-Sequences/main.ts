import {
  getModuleMasses,
  getRequiredFuel,
  getTotalRequiredFuel
} from './code';

const masses = getModuleMasses('data.txt');

const requiredFuel = getRequiredFuel(masses);
console.log('required fuel:', requiredFuel);

const accumulatedFuel = getTotalRequiredFuel(masses);
console.log('required accumulated fuel:', accumulatedFuel);
