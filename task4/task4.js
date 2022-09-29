/* I want you to create a function called increment()
the counter  should start from 0 and keep incrementing it by one every time we call the function
we shouldn't be able to reset the increment value. So the counter should start from 0 and be available only inside the function.
Use what you know about closures to achieve this */

function increment() {
  let count = 0;
  return () => count ++;
  }

const addOne = increment();

console.log(addOne()) // 0
console.log(addOne()) // 1
console.log(addOne()) // 2
console.log(addOne()) // 3
console.log(addOne()) // 4





