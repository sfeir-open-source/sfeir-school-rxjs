# mergeMap

> Projects each source value to an Observable which is merged in the output Observable.

```typescript
import { mergeMap } from 'rxjs';

const results$ = numbers$.pipe(mergeMap(n => grabData(n)));

function grabData(id: number): Observable<Data> {
    ...
}
```

![w-1000 center](../../assets/images/diagrams/operator_mergemap.svg)