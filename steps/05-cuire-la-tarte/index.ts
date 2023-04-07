import { bufferCount, filter, from, map, mergeMap, retry, take, zipWith } from 'rxjs';
import { AppleService, BakingService, CuttingMachineService, PiePastryService } from '../common';
import { PiePlate } from '../common/models';
import { PiePlateService } from './pie-plate.service';

const APPLE_PIES_ORDERED_COUNT = 11;

// TODO: Bonus - Utiliser un opérateur pour transformer le stream de pomme en multicast pour pouvoir utiliser le même flux de pomme entre les tranches et la compote
AppleService.getApples()
  .pipe(
    filter((apple) => !apple.rot),
    mergeMap((apple) => from(CuttingMachineService.cutApple(apple)))
  )
  .subscribe((appleSlices) => console.log(appleSlices));

AppleService.getApples()
  .pipe(
    filter((apple) => apple.rot),
    bufferCount(4),
    mergeMap((apples) => BakingService.bakeCompote(apples))
  )
  .subscribe((compote) => console.log(compote));

PiePastryService.getPiePastries()
  .pipe(
    retry(),
    mergeMap((box) => from(box.content)),
    take(APPLE_PIES_ORDERED_COUNT),
    zipWith(PiePlateService.getPiePlate()),
    map(([piePastry, piePlate]): PiePlate => ({ ...piePlate, pastry: piePastry }))
  )
  .subscribe((piePastryInPlate) => {
    console.log(piePastryInPlate);
  });

// TODO: combiner les différents ingrédients pour les cuire ensemble pour obtenir des tartes
