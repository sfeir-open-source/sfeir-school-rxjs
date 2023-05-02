# switchMap

> Projects each source value to an Observable which is merged in the output Observable, emitting values only from the most recently projected Observable.

```typescript
import { switchMap } from 'rxjs';

const results$ = numbers$.pipe(switchMap(n => grabData(n)));

function grabData(id: number): Observable<Data> {
    ...
}
```

![w-1000 center](./assets/images/diagrams/operator_switchmap.svg)
