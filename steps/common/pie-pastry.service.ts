import { Observable, interval, map, mergeMap, of, throwError } from 'rxjs';
import { Box } from './models';

class PiePastryServiceImpl {
  private errorModulo = generateModulo();
  public getPiePastries(): Observable<Box> {
    return interval(4_000).pipe(
      map((): Box => ({ _type: 'Box', content: new Array(2).fill(null).map(() => ({ _type: 'PiePastry' })) })),
      mergeMap((box, index) => {
        if (index > 0 && index % this.errorModulo === 0) {
          this.errorModulo = generateModulo();
          return throwError(() => new Error('Oups empty box! 😡'));
        } else {
          return of(box);
        }
      }),
    );
  }
}

function generateModulo() {
  return 2 + Math.ceil(Math.random() * 3);
}

export const PiePastryService = new PiePastryServiceImpl();
