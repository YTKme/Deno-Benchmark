/**
 * Array Sum
 */

function sumUsingForEach(array: number[]): number {
  let sum = 0;
  array.forEach(item => {
    sum += item;
  });
  return sum;
}

function sumUsingReduce(array: number[]): number {
  return array.reduce((sum, item) => sum + item, 0);
}

function sumUsingForOf(array: number[]): number {
  let sum = 0;
  for (const item of array) {
    sum += item;
  }
  return sum;
}

function sumUsingForLoop(array: number[]): number {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
}

const largeArray = Array.from({ length: 100 }, (_, i) => i + 1);
// const largeArray = Array.from({ length: 100_000 }, (_, i) => i + 1);
// const largeArray = Array.from({ length: 1_000_000 }, (_, i) => i + 1);

Deno.bench({
  name: "Array For Each",
  fn: () => {
    sumUsingForEach(largeArray);
  }
});

Deno.bench({
  name: "Array Reduce",
  fn: () => {
    sumUsingReduce(largeArray);
  }
});

Deno.bench({
  name: "Array For Of",
  fn: () => {
    sumUsingForOf(largeArray);
  }
});

Deno.bench({
  name: "Array For Loop",
  baseline: true,
  fn: () => {
    sumUsingForLoop(largeArray);
  }
});
