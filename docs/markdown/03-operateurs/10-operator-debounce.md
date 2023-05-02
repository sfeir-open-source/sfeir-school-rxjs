# debounce

> Emits a notification from the source Observable only after a particular time span determined by another Observable has passed without another source emission.

```typescript
import { debounce } from 'rxjs';

const results$ = numbers$.pipe(debounce(emitAfter3seconds));

function emitAfter3seconds(): Observable<number> {
    ...
}
```

##==##

# debounce

![w-1000 center](./assets/images/diagrams/operator_debounce.svg)
