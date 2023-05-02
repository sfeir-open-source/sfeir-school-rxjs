# Function binding

```typescript
class Service {
  private url = 'https://example.com';

  getData() {
    return of(url);
  }
}

fromEvent(myButton, 'click')
  .pipe(
    map(() => formState),
    switchMap(Service.getData), // => Cannot read properties of undefined (reading 'url')
  )
  .subscribe((data) => {
    // do something
  });
```

Notes:

- ça ne fonctionne pas à cause du changement de contexte

##==##

# Function binding

```typescript
class Service {
  private url = 'https://example.com';

  getData() {
    return of(url);
  }
}

fromEvent(myButton, 'click')
  .pipe(
    map(() => formState),
    switchMap(Service.getData.bind(Service)),
  )
  .subscribe((data) => {
    // do something
  });
```

Notes:

- l'utilisation de bind permet de s'assurer qu'on converse le bon contexte
