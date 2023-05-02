# Subscribe in subscribe

```typescript
const myButton = document.getElementById('my-button');
const formState = { ... };

fromEvent(myButton, 'click').subscribe(() => {
    Service.getData(formState).subscribe(data => {
        // do something
    });
});
```

Notes:

- on voit très souvent ce genre de code
- parfois avec encore plus d'imbrication de subscribe
  sauf que :
- souvent on oublie d'unsubscribe
- on fait des subscribes inutiles
- on peut l'écrire de manière plus clair

##==##

# Subscribe in subscribe

```typescript
const myButton = document.getElementById('my-button');
const formState = { ... };

fromEvent(myButton, 'click').pipe(
    map(() => formState),
    switchMap(form => Service.getData(form)),
).subscribe(data => {
    // do something
});
```
