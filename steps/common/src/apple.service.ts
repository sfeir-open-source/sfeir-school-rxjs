import { randomValue } from './random.utils';
import { Observable, interval, map } from 'rxjs';

export interface Apple {
  color: 'red' | 'green';
  rot: boolean;
}

class AppleServiceImpl {
public getApples$(): Observable<Apple> {
    return interval(1000).pipe(
      map(() => ({ color: randomValue({ red: 60, green: 40 }), rot: randomValue({ false: 60, true: 40 }) === 'true' }))
    );
  }
}

export const AppleService = new AppleServiceImpl();