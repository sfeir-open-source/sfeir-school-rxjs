# filter

> Filter items emitted by the source Observable by only emitting those that satisfy a specified predicate.

```typescript
import { filter } from 'rxjs';

const results$ = numbers$.pipe(filter((n) => n % 2 === 0));
```

![](./assets/images/diagrams/operator_filter.svg 'w-1000 center')
