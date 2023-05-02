import { bufferCount, filter, mergeMap, retry, take } from 'rxjs';
import { AppleService, CompoteBakingService, CuttingMachineService, PiePastryService } from '../common';

const APPLE_PIES_ORDERED_COUNT = 11;

// without bonuses
AppleService.getApples()
  .pipe(
    filter((apple) => !apple.rot),
    mergeMap(CuttingMachineService.cutApple),
  )
  .subscribe(console.log);

// naive bonus (process 2 different apple streams)
AppleService.getApples()
  .pipe(
    filter((apple) => apple.rot),
    bufferCount(4),
    mergeMap(CompoteBakingService.bakeCompote),
  )
  .subscribe(console.log);

PiePastryService.getPiePastries()
  .pipe(
    retry(),
    mergeMap((box) => box.content),
    take(APPLE_PIES_ORDERED_COUNT),
  )
  .subscribe(console.log);
