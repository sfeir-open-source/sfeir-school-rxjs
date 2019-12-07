const input =
  '1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,10,19,1,19,6,23,2,23,13,27,1,27,5,31,2,31,10,35,1,9,35,39,1,39,9,43,2,9,43,47,1,5,47,51,2,13,51,55,1,55,9,59,2,6,59,63,1,63,5,67,1,10,67,71,1,71,10,75,2,75,13,79,2,79,13,83,1,5,83,87,1,87,6,91,2,91,13,95,1,5,95,99,1,99,2,103,1,103,6,0,99,2,14,0,0';
let memory: ReadonlyArray<number> = input
  .split(',')
  .map(x => parseInt(x, 10));

function run(mem: number[]) {
  function compute(index: number): boolean {
    switch (mem[index]) {
      case 1:
        mem[mem[index + 3]] =
          mem[mem[index + 1]] + mem[mem[index + 2]];
        return compute(index + 4);
      case 2:
        mem[mem[index + 3]] =
          mem[mem[index + 1]] * mem[mem[index + 2]];
        return compute(index + 4);
      case 99:
        return true;
      default:
        return false;
    }
  }
  const halt = compute(0);
  return halt ? mem[0] : NaN;
}

//prepare
let mem = [...memory];
mem[1] = 12;
mem[2] = 2;

console.log('2.1:', run(mem));

function findResult(res: number) {
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      let mem = [...memory];
      mem[1] = i;
      mem[2] = j;
      if (run(mem) === res) {
        return [i, j];
      }
    }
  }
  return [];
}

console.log('2.2:', findResult(19690720));
