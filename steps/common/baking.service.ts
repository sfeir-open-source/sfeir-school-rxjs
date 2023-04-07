import { delay, Observable, of, throwError } from 'rxjs';
import { Apple, ApplePie, AppleSlice, Compote, PiePlate } from './models';

class BakingServiceImpl {
  public bakeCompote(apples: Apple[]): Observable<Compote> {
    if (apples.length !== 4) {
      return throwError(() => new Error('Cannot make compote without 4 apples'));
    }
    return of<Compote>({ _type: 'Compote' }).pipe(delay(2_000));
  }

  public bakeApplePie(piePastryInPlate: PiePlate, compote: Compote, appleSlices: AppleSlice[]): Observable<ApplePie> {
    // TODO: Lab5
    //  1. Après 5s (le temps de cuisson), la méthode doit renvoyer une ApplePie
    //  2. Si on a pas 64 tranches de pommes on émettra une erreur
    //  3. Si on a pas de pâte dans le plat on émettra une erreur
    return null!;
  }
}

export const BakingService = new BakingServiceImpl();
