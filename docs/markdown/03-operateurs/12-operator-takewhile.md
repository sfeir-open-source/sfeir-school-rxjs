# takeWhile

> Emits values emitted by the source Observable so long as each value satisfies the given `predicate`, and then completes as soon as this `predicate` is not satisfied.

```typescript
import { takeWhile } from 'rxjs';

const results$ = numbers$.pipe(takeWhile((n) => n < 5));
```

![w-1000 center](./assets/images/diagrams/operator_takewhile.svg)
