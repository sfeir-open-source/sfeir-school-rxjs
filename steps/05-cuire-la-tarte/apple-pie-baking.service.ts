import { Observable } from 'rxjs';
import { ApplePie, AppleSlice, Compote, PiePlate } from '../common/models';

class ApplePieBakingServiceImpl {
  public bakeApplePie(piePastryInPlate: PiePlate, compote: Compote, appleSlices: AppleSlice[]): Observable<ApplePie> {
    // TODO:
    //  1. after 5s (the cooking time), the method must return an ApplePie
    //  2. if we don't have 64 slices of apples, we'll give an error
    //  3. if we don't have any dough in the dish, we'll give an error
    return null!;
  }
}

export const ApplePieBakingService = new ApplePieBakingServiceImpl();
