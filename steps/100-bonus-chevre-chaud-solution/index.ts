import { combineLatest, interval, of } from 'rxjs';
import { map, delay, take, mergeMap } from 'rxjs/operators';

// ---------------------------------------
// Solution
// Mise en bouche avec une entrée chaude
// ---------------------------------------
//
// Représentez une entrée de chèvre chaud !
// Le résultat sera sous la forme d'un tableau :
//
// ["Pain cuit", "Buche de chèvre", "miel"]
//
// ---------------------------------------

const eventInterval$ = (amount: number) => interval(amount);
const pain$ = eventInterval$(4000).pipe(map(() => 'Pain'));
const fromageDeChevre$ = eventInterval$(2000).pipe(map(() => 'Buche de chèvre'));
const cuisson$ = (toBake: string, cookingTime = 4000) =>
  of(toBake).pipe(
    map((toBake) => toBake.concat(' cuit')),
    delay(cookingTime),
  );

// 1 - Prendre une tranche de pain et la cuire au four
const painCuit$ = pain$.pipe(take(1), mergeMap(cuisson$));

// 2 - Ajouter du chèvre et du miel
const chevreChaud$ = combineLatest([painCuit$, fromageDeChevre$.pipe(take(1))]).pipe(
  map(([painCuit, chevre]) => [painCuit, chevre, 'miel']),
);

// 3 - Mangez
chevreChaud$.subscribe(console.log);

// Visualisation des flux en continu
pain$.subscribe((val) => console.log(val));
fromageDeChevre$.subscribe((val) => console.log(val));
