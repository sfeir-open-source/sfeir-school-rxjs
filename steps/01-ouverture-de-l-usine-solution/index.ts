import { AppleService, PiePastryService } from '../common';

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
