import {
  createModuleMassesReader,
  fuelAmountsForModule
} from './code';

const massReader = createModuleMassesReader('data.txt');

function* allFuelAmounts() {
  for (const moduleMass of massReader()) {
    yield* fuelAmountsForModule(moduleMass);
  }
}

console.log(
  'required fuel:',
  [...allFuelAmounts()].reduce((a, b) => a + b)
);
