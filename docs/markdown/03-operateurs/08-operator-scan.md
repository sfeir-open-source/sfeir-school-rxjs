# scan

> Useful for encapsulating and managing state. Applies an accumulator (or "reducer function") to each value from the source after an initial state is established -- either via a seed value (second argument), or from the first value from the source.

```typescript
import { scan } from 'rxjs';

const results$ = numbers$.pipe(scan((acc, cur) => acc + cur));
```

![](./assets/images/diagrams/operator_scan.svg 'w-1000 center')
