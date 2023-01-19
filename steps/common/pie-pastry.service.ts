import { Observable, interval, map } from 'rxjs';
import { Box } from './models';

class PiePastryServiceImpl {
  public getPiePastrys$(): Observable<Box> {
    return interval(10_000).pipe(
      map(() => ({ _type: 'Box', load: new Array(2).fill(null).map(() => ({ _type: 'PiePastry' })) }))
    );
  }
}

export const PiePastryService = new PiePastryServiceImpl();
