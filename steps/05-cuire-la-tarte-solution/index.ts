import { bufferCount, retry, from, mergeMap, take, filter, zipWith, map, share, zip, tap } from 'rxjs';
import { PiePlateService } from './pie-plate.service';
import { AppleService, BakingService, CuttingMachineService, PiePastryService } from '../common';
import { PiePlate } from '../common/models';

const APPLE_PIES_ORDERED_COUNT = 11;

const apples$ = AppleService.getApples().pipe(share());
const appleSlices$ = apples$.pipe(
  filter((apple) => !apple.rot),
  mergeMap((apple) => from(CuttingMachineService.cutApple(apple))),
  bufferCount(64),
  tap(console.log)
);

const compote$ = apples$.pipe(
  filter((apple) => apple.rot),
  bufferCount(4),
  mergeMap((apples) => BakingService.bakeCompote(apples)),
  tap(console.log)
);

const piePastryInPlate$ = PiePastryService.getPiePastries().pipe(
  retry(),
  mergeMap((box) => from(box.content)),
  take(APPLE_PIES_ORDERED_COUNT),
  zipWith(PiePlateService.getPiePlate()),
  map(([piePastry, piePlate]): PiePlate => ({ ...piePlate, pastry: piePastry })),
  tap(console.log)
);

zip(piePastryInPlate$, compote$, appleSlices$)
  .pipe(
    mergeMap(([piePastryInPlate, compote, appleSlices]) =>
      BakingService.bakeApplePie(piePastryInPlate, compote, appleSlices)
    )
  )
  .subscribe((applePie) => console.log('Apple Pie', applePie));
