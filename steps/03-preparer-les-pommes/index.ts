import { mergeMap, retry, take } from 'rxjs';
import { AppleService, PiePastryService, CuttingMachineService, CompoteBakingService } from '../common';

const APPLE_PIES_ORDERED_COUNT = 11;

// TODO:
//  1. remove the rotten apples
//  2. cut the apples into slices (using `CuttingMachineService.cutApple()`)
AppleService.getApples().subscribe(console.log);

// TODO: Bonus (from a separate apple stream)
//  1. take only the rotten apples
//  2. make a compote (using `CompoteBakingService.bakeCompote()`)
//  Note: You need 4 apples to make a compote
AppleService.getApples();

PiePastryService.getPiePastries()
  .pipe(
    retry(),
    mergeMap((box) => box.content),
    take(APPLE_PIES_ORDERED_COUNT),
  )
  .subscribe(console.log);
