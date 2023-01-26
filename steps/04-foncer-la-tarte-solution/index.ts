import { bufferCount, retry, from, mergeMap, take, filter, zipWith, map, share } from 'rxjs';
import { PiePlateService } from './pie-plate.service';
import { AppleService, BakingService, CuttingMachineService, PiePastryService } from '../common';
import { PiePlate } from '../common/models';

const APPLE_PIES_ORDERED_COUNT = 11;

const apples$ = AppleService.getApples$().pipe(share());
apples$
  .pipe(
    filter((apple) => !apple.rot),
    mergeMap((apple) => from(CuttingMachineService.cutApple(apple)))
  )
  .subscribe((appleSlices) => console.log(appleSlices));

apples$
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
    take(APPLE_PIES_ORDERED_COUNT),
    zipWith(PiePlateService.getPiePlate()),
    map(([piePastry, piePlate]): PiePlate => ({ ...piePlate, pastry: piePastry }))
  )
  .subscribe((piePastryInPlate) => {
    console.log(piePastryInPlate);
  });
