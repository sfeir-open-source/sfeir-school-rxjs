import { AppleService, BakingService, PiePastryService } from '../common';

const APPLE_PIES_ORDERED_COUNT = 11;

AppleService.getApples().subscribe((apple) => {
  console.log(apple);
});

PiePastryService.getPiePastrys$().subscribe({
  next(boxOfPiePastries) {
    console.log(boxOfPiePastries);
  },
  error(error) {
    console.error(error);
  },
});
