# catchError

> Catches errors on the observable to be handled by returning a new observable or throwing an error.

```typescript
import { catchError } from 'rxjs';

const results$ = numbers$.pipe(
  catchError((error, source$) => {
    // handle error?
    // do something with source$ observable?
    // emit a last value?
    // throwing an error?
  }),
);
```

![w-1000 center](./assets/images/diagrams/operator_catcherror.svg)
