import { AppleService, PiePastryService } from '../common';

AppleService.getApples().subscribe((apple) => {
  console.log(apple);
});

PiePastryService.getPiePastries().subscribe({
  next(boxOfPiePastries) {
    console.log(boxOfPiePastries);
  },
  error(error) {
    console.error(error);
  },
});
