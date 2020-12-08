<!-- .slide: class="transition bg-blue" -->

# Side effects

##==##

# Side effet of sharable

<br><br>

**Side Effect** represent operator that don't touch the stream but execute some external operations. For example, `tap` is a side effect operator.

##==##

<!-- .slide: class="two-column-layout" -->

# Side effet of sharable

##--##

Cold observable

<!-- .slide: class="with-code consolas" -->

```javascript
cons log = (val) => console.log(val)
const example = timer(1000).pipe(
  tap(() => console.log('***SIDE EFFECT***')),
  mapTo('***RESULT***')
);
const subscribe1 = example.subscribe(log);
const subscribe2 = example.subscribe(log);
//***SIDE EFFECT***"
//"***RESULT***"
//"***SIDE EFFECT***"
//"***RESULT***"
```

<!-- .element: class="big-code no-max-height block" -->

##--##

<!-- .slide: class="with-code consolas" -->

Share stream

```javascript
//share observable among subscribers
const shared = example.pipe(share());
const subscribe3 = shared.subscribe(log);
const subscribe4 = shared.subscribe(log);
//"***SIDE EFFECT***"
//"***RESULT***"
//"***RESULT***"
```

<!-- .element: class="big-code no-max-height block" -->
