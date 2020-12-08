# Marble Testing

## Remember Marble diagram

![full-center h-600](./assets/images/marble-diagram-anatomy.svg)

Notes:
On va utiliser ça pour nos tests mais sous forme ascii

##==##

# ASCII Marble diagram

- `' '` whitespace: horizontal whitespace is ignored.
- `'-'` frame: 1 "frame" of virtual time passing.
- `'[0-9]+[ms|s|m]'` time progression: the time progression syntax lets you progress virtual time by a specific amount.
- `'|'` complete: The successful completion of an observable.
- `'#'` error: An error terminating the observable.
- `'[a-z0-9]'` represents a value emitted. The actual value can be represented in the values argument, where the character is the key.
- `'([a-z0-9]*)'` sync groupings: When multiple events need to be in the same frame synchronously, parentheses are used to group those events.
- `'^'` subscription point: (hot observables only) shows the point at which the tested observables will be subscribed to the hot observable.

##==##

# ASCII Marble diagram

## Some streams

<br>

> `---a---b---#` <br> `--^-----------!` <br> `-a--a--(a|)`

##==##

<!-- .slide: class="with-code consolas" -->

# Marble testing : cold & hot observable

```javascript
const input = ' -a-b-c|';

const cold$ = cold(input);
const hot$ = hot(input);
```

<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code consolas" -->

# Subscription example

```javascript
testScheduler.run(({ hot, expectObservable }) => {
  const source = hot('--a--a--a--a--a--a--a--');
  const sub1 = '      --^-----------!';
  const sub2 = '      ---------^--------!';
  const expect1 = '   --a--a--a--a--';
  const expect2 = '   -----------a--a--a-';
  expectObservable(source, sub1).toBe(expect1);
  expectObservable(source, sub2).toBe(expect2);
});
```

<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code consolas" -->

# Passing values

```javascript
let eventCount = 0;

const s1 = cold('--a--b|', { a: 'x', b: 'y' });

// side effect using 'tap' updates a variable
const result = s1.pipe(tap(() => eventCount++));

expectObservable(result).toBe('--a--b|', ['x', 'y']);

// flush - run 'virtual time' to complete all outstanding hot or cold observables
flush();

expect(eventCount).toBe(2);
```

<!-- .element: class="big-code"-->
