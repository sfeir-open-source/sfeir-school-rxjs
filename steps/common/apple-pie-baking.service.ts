import { delay, Observable, of, throwError } from 'rxjs';
import { ApplePie, AppleSlice, Compote, PiePlate } from './models';

class ApplePieBakingServiceImpl {
  public bakeApplePie(piePastryInPlate: PiePlate, compote: Compote, appleSlices: AppleSlice[]): Observable<ApplePie> {
    if (!piePastryInPlate.pastry) {
      return throwError(() => new Error('No PiePastry in the PiePlate'));
    }
    if (appleSlices.length !== 64) {
      return throwError(() => new Error('64 apple slices are needed for a pie'));
    }
    return of<ApplePie>({ _type: 'ApplePie' }).pipe(delay(5_000));
  }
}

export const ApplePieBakingService = new ApplePieBakingServiceImpl();
