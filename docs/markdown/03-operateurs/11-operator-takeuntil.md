# takeUntil

> Emits the values emitted by the source Observable until a `notifier` Observable emits a value.

```typescript
import { takeUntil } from 'rxjs';

const results$ = numbers$.pipe(takeUntil(emitAfter5seconds));

function emitAfter5seconds(): Observable<number> {
    ...
}
```

##==##

# takeUntil

![w-1000 center](./assets/images/diagrams/operator_takeuntil.svg)
