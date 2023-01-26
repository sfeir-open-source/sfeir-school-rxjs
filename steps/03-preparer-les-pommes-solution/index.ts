import { bufferCount, retry, from, mergeMap, take, filter } from 'rxjs';
import { AppleService, BakingService, CuttingMachineService, PiePastryService } from '../common';

const APPLE_PIES_ORDERED_COUNT = 11;

// without bonuses
AppleService.getApples()
  .pipe(
    filter((apple) => !apple.rot),
    mergeMap((apple) => from(CuttingMachineService.cutApple(apple)))
  )
  .subscribe((appleSlices) => console.log(appleSlices));

// naive bonus (process 2 differents apple steams)
AppleService.getApples()
  .pipe(
    filter((apple) => apple.rot),
    bufferCount(4),
    mergeMap((apples) => BakingService.bakeCompote(apples))
  )
  .subscribe((compote) => console.log(compote));

PiePastryService.getPiePastrys$()
  .pipe(
    retry(),
    mergeMap((box) => from(box.load)),
    take(APPLE_PIES_ORDERED_COUNT)
  )
  .subscribe((boxOfPiePastries) => {
    console.log(boxOfPiePastries);
  });
