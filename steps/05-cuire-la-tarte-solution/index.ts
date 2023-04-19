import { bufferCount, filter, map, mergeMap, retry, share, take, tap, zip, zipWith } from 'rxjs';
import { AppleService, BakingService, CuttingMachineService, PiePastryService } from '../common';
import { PiePlate } from '../common/models';
import { PiePlateService } from './pie-plate.service';

const APPLE_PIES_ORDERED_COUNT = 11;

const apples$ = AppleService.getApples().pipe(share());

const appleSlices$ = apples$.pipe(
  filter((apple) => !apple.rot),
  mergeMap(CuttingMachineService.cutApple),
  bufferCount(64),
  tap(console.log)
);

const compote$ = apples$.pipe(
  filter((apple) => apple.rot),
  bufferCount(4),
  mergeMap(BakingService.bakeCompote),
  tap(console.log)
);

const piePastryInPlate$ = PiePastryService.getPiePastries().pipe(
  retry(),
  mergeMap((box) => box.content),
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
