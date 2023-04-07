import { bufferCount, retry, from, mergeMap, take, filter } from 'rxjs';
import { AppleService, BakingService, CuttingMachineService, PiePastryService } from '../common';

const APPLE_PIES_ORDERED_COUNT = 11;

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
    take(APPLE_PIES_ORDERED_COUNT)
  )
  .subscribe((boxOfPiePastries) => {
    console.log(boxOfPiePastries);
  });

// TODO: Chaque pâte à tarte doit être foncé
//  (utiliser `PiePlateService.getPiePlate()` - attention à importer le votre et pas celui de la correction)
//  Note: Pour "foncer" une pâte à tarte, il faut définir la propriété `pastry` d'un `PiePlate`
