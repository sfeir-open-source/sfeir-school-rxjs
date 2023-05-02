# reduce

> Applies an accumulator function over the source Observable, and returns the accumulated result when the source completes, given an optional seed value.

```typescript
import { reduce } from 'rxjs';

const results$ = numbers$.pipe(reduce((acc, cur) => acc + cur));
```

![w-1000 center](./assets/images/diagrams/operator_reduce.svg)
