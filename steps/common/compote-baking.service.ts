import { delay, Observable, of, throwError } from 'rxjs';
import { Apple, Compote } from './models';

class CompoteBakingServiceImpl {
  public bakeCompote(apples: Apple[]): Observable<Compote> {
    if (apples.length !== 4) {
      return throwError(() => new Error('Cannot make compote without 4 apples'));
    }
    return of<Compote>({ _type: 'Compote' }).pipe(delay(2_000));
  }
}

export const CompoteBakingService = new CompoteBakingServiceImpl();
