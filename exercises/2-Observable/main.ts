import { readLines, map } from './code';
import { getRequiredFuelForMass } from '../lib';

const toFuel = map(getRequiredFuelForMass);
const fuel = toFuel(readLines('data.txt'));

let sum = 0;
fuel.subscribe({
  next(amount) {
    sum += amount;
  },
  complete() {
    console.log('required fuel:', sum);
  }
});
