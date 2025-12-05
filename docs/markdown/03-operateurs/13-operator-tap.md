# tap

> Used to perform side-effects for notifications from the source observable

```typescript
import { tap } from 'rxjs';

const results$ = numbers$.pipe(tap((value) => console.log(value)));
```

![](./assets/images/diagrams/operator_tap.svg 'w-1000 center')
