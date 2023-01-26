import { retry, from, mergeMap, take } from 'rxjs';
import { AppleService, PiePastryService } from '../common';

const APPLE_PIES_ORDERED_COUNT = 11;

AppleService.getApples().subscribe((apple) => {
  console.log(apple);
});

PiePastryService.getPiePastrys$()
  .pipe(
    // we retry on errors
    retry(),
    // we transform each box as a stream of PiePastry
    // then mergeMap will transform every streams as one stream of PiePastry
    mergeMap((box) => from(box.load)),
    // we take only the needed PiePastry
    take(APPLE_PIES_ORDERED_COUNT)
  )
  .subscribe((boxOfPiePastries) => {
    console.log(boxOfPiePastries);
  });
