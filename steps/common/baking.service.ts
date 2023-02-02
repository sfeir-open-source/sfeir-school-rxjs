import { delay, Observable, of, throwError } from 'rxjs';
import { Apple, ApplePie, AppleSlice, Compote, PiePlate } from './models';

class BakingServiceImpl {
  public bakeCompote(apples: Apple[]): Observable<Compote> {
    if (apples.length !== 4) {
      return throwError(() => new Error('Cannot make compote without 4 apples'));
    }
    return of<Compote>({ _type: 'Compote' }).pipe(delay(5_000));
  }

  public bakeApplePie(piePastryInPlate: PiePlate, compote: Compote, appleSlices: AppleSlice[]): Observable<ApplePie> {
    // TODO
    return null!;
  }
}

export const BakingService = new BakingServiceImpl();
