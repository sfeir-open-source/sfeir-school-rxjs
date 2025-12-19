import { AppleService, PiePastryService } from '00-common';

AppleService.getApples().subscribe(console.log);

PiePastryService.getPiePastries().subscribe({
  next: console.log,
  error: console.error,
});
