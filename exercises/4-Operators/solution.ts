import { Observable, range } from 'rxjs/';
import {
  map,
  flatMap,
  take,
  skipWhile,
  shareReplay
} from 'rxjs/operators';

import { streamInputFile, computeIntCode } from '../lib';

export const memory: Observable<number[]> = streamInputFile(
  'aoc2.txt'
).pipe(
  map(b => b.toString()),
  map(s => s.split(',').map(x => parseInt(x, 10)))
);

export const halt: Observable<number> = memory.pipe(
  map(mem => {
    mem[1] = 12;
    mem[2] = 2;
    return computeIntCode(mem) ? mem[0] : NaN;
  })
);

type input = { noun: number; verb: number };

export function run(
  memory: Observable<number[]>,
  input: Observable<input>
): Observable<[input, number]> {
  return memory.pipe(
    flatMap(m =>
      input.pipe(map(nv => [nv, m] as [input, number[]]))
    ),
    map(([input, memory]) => {
      const mem = [...memory];
      mem[1] = input.noun;
      mem[2] = input.verb;

      if (computeIntCode(mem)) {
        return [input, mem[0]];
      }
      throw 'error';
    })
  );
}

const interval = range(0, 100);

export const inputs: Observable<input> = interval.pipe(
  flatMap(a => interval.pipe(map(b => ({ noun: a, verb: b }))))
);

export const answer: Observable<number> = run(
  memory,
  inputs
).pipe(
  skipWhile(([_, r]) => r !== 19690720),
  take(1),
  map(([{ noun, verb }, _]) => 100 * noun + verb)
);
