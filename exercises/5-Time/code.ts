import { Observable, interval, of, timer } from 'rxjs';
import {
  switchMap,
  mapTo,
  tap,
  delay,
  take,
  flatMap,
  takeUntil,
  takeLast
} from 'rxjs/operators';

export function makeMetronome(
  director: Observable<number>
): Observable<number> {
  return director.pipe(
    switchMap(period =>
      period > 0 ? timer(0, period * 1000) : []
    )
  );
}
