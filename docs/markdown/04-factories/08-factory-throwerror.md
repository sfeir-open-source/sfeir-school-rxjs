## throwError

```typescript
import { throwError } from 'rxjs';

const interval$ = interval(1_000);
const fromPromise$ = from(fetch('https://sfeir.com'));

const error$ = throwError(() => new Error('something goes wrong! 😢')));
error$.subscribe({
    error(error) {
        console.error(error)
    }
});
// => 'something goes wrong! 😢'
```

<!-- .element: class="big-code block" -->

![w-1000 center](./assets/images/diagrams/factory_throwerror.svg)
