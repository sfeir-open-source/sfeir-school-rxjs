import { bufferCount, filter, map, mergeMap, retry, take, zipWith } from 'rxjs';
import { AppleService, BakingService, CuttingMachineService, PiePastryService } from '../common';
import { PiePlate } from '../common/models';
import { PiePlateService } from './pie-plate.service';

const APPLE_PIES_ORDERED_COUNT = 11;

// TODO: Bonus - Use an operator to turn the apple stream into a multicast so that the same apple stream can be used between slices and compote
AppleService.getApples()
  .pipe(
    filter((apple) => !apple.rot),
    mergeMap(CuttingMachineService.cutApple)
  )
  .subscribe(console.log);

AppleService.getApples()
  .pipe(
    filter((apple) => apple.rot),
    bufferCount(4),
    mergeMap(BakingService.bakeCompote)
  )
  .subscribe(console.log);

PiePastryService.getPiePastries()
  .pipe(
    retry(),
    mergeMap((box) => box.content),
    take(APPLE_PIES_ORDERED_COUNT),
    zipWith(PiePlateService.getPiePlate()),
    map(([piePastry, piePlate]): PiePlate => ({ ...piePlate, pastry: piePastry }))
  )
  .subscribe(console.log);

// TODO: combine the different ingredients and cook them together to obtain pies
