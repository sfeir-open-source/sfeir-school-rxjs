import { interval, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

// ---------------------------------------
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
