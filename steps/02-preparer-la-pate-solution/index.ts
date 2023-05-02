import { mergeMap, retry, take } from 'rxjs';
import { AppleService, PiePastryService } from '../common';

const APPLE_PIES_ORDERED_COUNT = 11;

AppleService.getApples().subscribe(console.log);

PiePastryService.getPiePastries()
  .pipe(
    // we retry on errors
    retry(),
    // we transform each box as a stream of PiePastry
    // then mergeMap will transform every stream as one stream of PiePastry
    // this is equivalent to `mergeMap((box) => from(box.content))` as `mergeMap` is taking care of transforming arrays into streams
    mergeMap((box) => box.content),
    // we take only the needed PiePastry
    take(APPLE_PIES_ORDERED_COUNT),
  )
  .subscribe(console.log);
