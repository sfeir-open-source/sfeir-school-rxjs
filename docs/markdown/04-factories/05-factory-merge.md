## merge

```typescript
import { merge } from 'rxjs';

const input = document.querySelector('#my-input');
const inputChangeEvent$ = fromEvent(input, 'change');
const inputKeyUpEvent$ = fromEvent(input, 'keyup');
const inputPasteEvent$ = fromEvent(input, 'paste');

const inputValueChange$ = merge(inputChangeEvent$, inputKeyUpEvent$, inputPasteEvent$);
```

<!-- .element: class="big-code block" -->

![w-1000 center](./assets/images/diagrams/factory_merge.svg)
