# debounceTime

> Emits a notification from the source Observable only after a particular time span has passed without another source emission.

```typescript
import { debounceTime } from 'rxjs';

const results$ = numbers$.pipe(debounceTime(5000));
```

![w-1000 center](./assets/images/diagrams/operator_debouncetime.svg)

Notes:

Cette opérateur n'est une qu'une variante de debounce, on retrouve ce schéma pour pas mal d'opérateur où des cas spécifiques étaient très courants
