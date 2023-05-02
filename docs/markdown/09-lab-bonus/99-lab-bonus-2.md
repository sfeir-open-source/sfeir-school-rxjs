<!-- .slide: class="exercice" -->

# Bonus - Préparez une tartine de chèvre chaud

## Lab

<br>

On se fait une tartine de chèvre chaud avant de se quitter ?

<br>

1. Cuire une tranche de pain au four
2. Ajouter du chèvre et du miel
3. Mangez :)

Le résultat sera sous la forme d'un tableau :

```typescript
['Pain cuit', 'Buche de chèvre', 'miel'];
```

##==##

Pour vous aider à initialiser :

```typescript
const eventInterval$ = (amount) => interval(amount);
const pain$ = eventInterval$(4000).pipe(map(() => 'Pain'));
const fromageDeChevre$ = eventInterval$(2000).pipe(map(() => 'Buche de chèvre'));
const cuisson$ = (toBake: string, cookingTime = 4000) =>
  of(toBake).pipe(
    map((toBake) => toBake.concat(' cuit')),
    delay(cookingTime),
  );
```
