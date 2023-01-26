import { retry, from, mergeMap, take } from 'rxjs';
import { AppleService, PiePastryService } from '../common';

const APPLE_PIES_ORDERED_COUNT = 11;

AppleService.getApples().subscribe((apple) => {
  console.log(apple);
});

PiePastryService.getPiePastrys$()
  .pipe(
    retry(),
    mergeMap((box) => from(box.load)),
    take(APPLE_PIES_ORDERED_COUNT)
  )
  .subscribe((boxOfPiePastries) => {
    console.log(boxOfPiePastries);
  });
