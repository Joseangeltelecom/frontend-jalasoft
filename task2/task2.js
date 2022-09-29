const numbers = [1, 2, 2, 4, 4, 6, 7, 8, 8, 9]
const myArray = ["Hello", "guys", "How", "are", "you?"];

/* problem 1 */
const joinWords = (arr) => arr.join(" ");

/* problem 2 */
const joinWordsWithDashes = (arr) => arr.join("-");

/* problem 3 */
const joinEvenNumbers = (numbers) => {
  return numbers.map((n, i) =>
    n % 2 === 0 && numbers[i+1] % 2 === 0 ? `${n}-`: n).join("");
}

console.log(joinWords(myArray));
console.log(joinWordsWithDashes(myArray));
console.log(joinEvenNumbers(numbers))