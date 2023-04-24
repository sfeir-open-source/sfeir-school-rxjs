import { AppleService, CompoteBakingService, PiePastryService } from '../common';

const APPLE_PIES_ORDERED_COUNT = 11;

AppleService.getApples().subscribe(console.log);

// TODO:
//  1. retry to subscribe to the pie pastries box stream if an error is emitted
//  2. turn the pie pastries box stream into a pie pastrie stream (open the boxes)
//  3. take the number of pie pastries defined in APPLE_PIES_ORDERED_COUNT
PiePastryService.getPiePastries().subscribe({
  next: console.log,
  error: console.error,
});
