import { fuelUpper, createModuleMassesGetter } from './code';

const getModuleMasses = createModuleMassesGetter('data.txt');
const masses = getModuleMasses();
const requiredFuel = fuelUpper(masses);

console.log('required fuel: ', requiredFuel);
