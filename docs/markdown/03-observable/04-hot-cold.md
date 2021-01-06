<!-- .slide: class="transition bg-blue" -->

# Hot vs Cold

Notes:
On parle souvent de 2 types d'observables

##==##

<!-- .slide: class="with-code consolas" -->

# Cold Observable

> We call an Observable "Cold" when the data are produce by the observable itself. For example, observables created using the `of`, `from`, `range`, `interval` and `timer` operators will be cold.

```javascript
let obs = create(observer => observer.next(1));
```

<!-- .element: class="big-code block" -->

Notes:
Un cold observable partagera tout le temps le même stream pour ses subscribers sauf si on le transforme en hot

##==##

<!-- .slide: class="with-code consolas" -->

# Hot Observable

> We call an Observable "Hot" when the data are produce outside of the observable itself. For example, observables created using the `fromEvent` operators will be hot.

```javascript
const obs$ = fromEvent(document, 'click') //
  .pipe(
    map(event => ({
      clientX: event.clientX,
      clientY: event.clientY
    }))
  );
```

<!-- .element: class="big-code block" -->

##==##

<!-- .slide: class="two-column-layout" -->

# Cold Observable could become Hot

##--##

Cold Observable

<!-- .slide: class="with-code consolas"  -->

```javascript
const obs$ = from(['🍕', '🍪']) //
  .pipe(
    map(val => {
      return `Miam ${val}!`;
    })
  );
```

<!-- .element: class="big-code"-->

##--##

Become a Hot Observable

<!-- .slide: class="with-code consolas"  -->

```javascript
const obs$ = from(['🍕', '🍪']) //
  .pipe(
    map(val => {
      return `Miam ${val}!`;
    }),
    share()
  );
```

<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="two-column-layout" -->

# Hot Observable could become Cold

##--##

Hot Observable

<!-- .slide: class="with-code consolas"  -->

```javascript
const obs$ = fromEvent(
  document, //
  'click'
).pipe(map(e => ({ clientX: e.clientX })));

const sub1 = obs$.subscribe(val => {
  console.log('Sub1:', val);
});
```

<!-- .element: class="big-code"-->

##--##

Become a Cold Observable

<!-- .slide: class="with-code consolas"  -->

```javascript
const obsFactory = () =>
  fromEvent(
    document, //
    'click'
  ).pipe(map(e => ({ clientX: e.clientX })));

const sub1 = obsFactory().subscribe(val => {
  console.log('Sub1:', val);
});
```

<!-- .element: class="big-code"-->
