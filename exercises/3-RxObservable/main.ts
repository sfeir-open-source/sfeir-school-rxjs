import {
  getModuleMasses,
  getRequiredFuel,
  getTotalRequiredFuel
} from './code';

const masses = getModuleMasses('data.txt');

getRequiredFuel(masses)
  .toPromise()
  .then(f => console.log('required fuel:', f));

getTotalRequiredFuel(masses)
  .toPromise()
  .then(f => console.log('required accumulated fuel:', f));
