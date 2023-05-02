# retry

> Catches errors on the observable to be handled by returning a new observable or throwing an error.

```typescript
import { retry } from 'rxjs';

const results$ = numbers$.pipe(retry());
```

![w-1000 center](./assets/images/diagrams/operator_retry.svg)
