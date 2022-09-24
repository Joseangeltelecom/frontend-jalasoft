const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

/* Problem 1 */

function average1(numbers){
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  return sum / numbers.length
}

const average2 = (numbers) => {
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  return sum / numbers.length
}

/* Problem 2 */

function sumOdds1(numbers){
  return numbers.reduce((acc, curr) =>
    curr % 2 > 0 ? acc + curr : acc
  );
}

const sumOdds2 = (numbers) => {
   return numbers.reduce((acc, curr) =>
    curr % 2 > 0 ? acc + curr : acc
  );
}

/* Problem 3 */
const container = [];

function runOperation(n1, n2, func){
  return n1 > 0 && n2 > 0 ? container.push(func(n1, n2)) : 0
}

const sum = (n1, n2) => n1 + n2
const subtract = (n1, n2) => n1 - n2
const multiply = (n1, n2) => n1 * n2
const divide = (n1, n2) => n1 / n2

runOperation(1, 2, sum);
runOperation(10, 5, subtract);
runOperation(2, 2, multiply);
runOperation(4, 2, divide);

console.log(container);