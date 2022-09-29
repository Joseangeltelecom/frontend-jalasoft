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

/* hey guys! 

write a program that will check if a string containing brackets, parenthesis and curly braces is "balanced"
what does "balanced" mean for us? well...that every opening tag has a valid closing tag

 
example:
"()()(()){}{[[]]}"  --> balanced
""  --> balanced
"{}" -- >balanced
"{{{{{(((((())))))}}}}}"  --> balanced

 
"(){}[" -> not balanced
")(" --> not balanced
"{{" -> not balanced
"([]"  --> not balanced
"[{]"  --> not balanced */


const isBalanced = (characteres) => {
  let stack = [];
  
  for(let i = 0; i < characteres.length; i++){

    console.log(getOpenings(characteres[i]))
   
    if(getOpenings(characteres[i])){
      stack.push(characteres[i]);
    } else if ((getPairs(stack, characteres, i))){
        stack.pop()
     }
      else return false;
  }
  return stack.length ? false: true;
}


const getPairs = (stack, characteres, i) => {
  let char = stack[stack.length-1]

  char == "(" && characteres[i] == ")" || 
  char == "{" && characteres[i] == "}" || 
  char == "[" && characteres[i] == "]"
}

console.log(getPairs)

const getClosings =() => {
  switch(characteres) {
    case ")":
    case "}":
    case "]":
        return true
    default:
      return false
  }

}

const getOpenings = (characteres) => {
  switch(characteres) {
    case "(":
    case "{":
    case "[":
        return true
    default:
      return false
  }
}

console.log(isBalanced("{{{{{(((((())))))}}}}}"))

