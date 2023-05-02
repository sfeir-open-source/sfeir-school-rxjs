import { bufferCount, filter, mergeMap, retry, take } from 'rxjs';
import { AppleService, CompoteBakingService, CuttingMachineService, PiePastryService } from '../common';

const APPLE_PIES_ORDERED_COUNT = 11;

AppleService.getApples()
  .pipe(
    filter((apple) => !apple.rot),
    mergeMap(CuttingMachineService.cutApple),
  )
  .subscribe(console.log);

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

// TODO: Each pie plate must be filled
//  (use `PiePlateService.getPiePlate()` - be careful to import your own and not the correction one)
//  Note: To "fill" a pie plate, you have to set the `pastry` property of a `PiePlate`.
