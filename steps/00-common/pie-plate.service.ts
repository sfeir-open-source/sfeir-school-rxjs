import { interval, map } from 'rxjs';
import type { PiePlate } from './models.ts';

class PiePlateServiceImpl {
  getPiePlate() {
    return interval(1_000).pipe(map((): PiePlate => ({ _type: 'PiePlate' })));
  }
}

export const PiePlateService = new PiePlateServiceImpl();
