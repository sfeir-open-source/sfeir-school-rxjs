# map

> Applies a given `project` function to each value emitted by the source Observable, and emits the resulting values as an Observable.

```typescript
import { map } from 'rxjs';

const results$ = numbers$.pipe(map((n) => n * 2));
```

![](./assets/images/diagrams/operator_map.svg 'w-1000 center')
