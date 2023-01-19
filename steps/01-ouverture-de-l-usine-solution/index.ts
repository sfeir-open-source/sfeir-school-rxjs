import { AppleService, PiePastryService } from '../common';

AppleService.getApples$().subscribe((value) => {
  console.log(value);
});

PiePastryService.getPiePastrys$().subscribe((truckLoadedWithPiePastries) => {
  console.log(truckLoadedWithPiePastries);
});
