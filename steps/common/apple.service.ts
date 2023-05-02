import { Observable, interval, map } from 'rxjs';
import { randomValue } from './random.utils';
import { Apple } from './models';

class AppleServiceImpl {
  public getApples(): Observable<Apple> {
    return interval(1000).pipe(
      map(() => ({
        _type: 'Apple',
        color: randomValue({ red: 70, green: 30 }),
        rot: randomValue({ false: 60, true: 40 }) === 'true',
      })),
    );
  }
}

export const AppleService = new AppleServiceImpl();
