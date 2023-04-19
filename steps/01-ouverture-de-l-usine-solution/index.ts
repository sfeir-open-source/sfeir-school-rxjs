import { AppleService, PiePastryService } from '../common';

AppleService.getApples().subscribe(console.log);

PiePastryService.getPiePastries().subscribe({
  next: console.log,
  error: console.error,
});
