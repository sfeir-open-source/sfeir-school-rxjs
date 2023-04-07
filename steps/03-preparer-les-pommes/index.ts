import { retry, from, mergeMap, take } from 'rxjs';
import { AppleService, PiePastryService, CuttingMachineService, BakingService } from '../common';

const APPLE_PIES_ORDERED_COUNT = 11;

// TODO:
//  1. Retirer les pommes pourries
//  2. Couper les pommes en tranches (à l'aide de `CuttingMachineService.cutApple()`)
AppleService.getApples().subscribe((apple) => {
  console.log(apple);
});

// TODO: Bonus (à partir d'un stream de pommes séparé)
//  1. Ne prendre que les pommes pourries
//  2. Faire une compote (à l'aide de `BakingService.bakeCompote()`)
//  Note: Il faut 4 pommes pour faire une compote
AppleService.getApples();

PiePastryService.getPiePastries()
  .pipe(
    retry(),
    mergeMap((box) => from(box.content)),
    take(APPLE_PIES_ORDERED_COUNT)
  )
  .subscribe((boxOfPiePastries) => {
    console.log(boxOfPiePastries);
  });
