import { readLines, makeObservable } from './code';

const fuelForMass = (mass: number) =>
  Math.max(Math.floor(mass / 3) - 2, 0);

const fuelAmounts = makeObservable<number>(observer => {
  readLines('data.txt').subscribe({
    next(moduleMass) {
      let current = moduleMass;
      while ((current = fuelForMass(current)) > 0) {
        observer.next(current);
      }
    },
    complete() {
      observer.complete();
    }
  });
});

let fuel = 0;
fuelAmounts.subscribe({
  next(amount) {
    fuel += amount;
  },
  complete() {
    console.log('required fuel:', fuel);
  }
});
