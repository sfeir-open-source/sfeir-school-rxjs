import { interval, map } from 'rxjs';
import { PiePlate } from './models';

class PiePlateServiceImpl {
  getPiePlate() {
    return interval(1_000).pipe(map((): PiePlate => ({ _type: 'PiePlate' })));
  }
}

export const PiePlateService = new PiePlateServiceImpl();
