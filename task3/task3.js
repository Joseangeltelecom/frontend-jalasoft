/* 
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
  let map = {
    ")":"(",
    "}":"{",
    "]":"["
  };
  
  for(let i = 0; i < characteres.length; i++){
    let char = stack[stack.length - 1]
    if(getOpenings(characteres[i])){
      stack.push(characteres[i]);
    } else if (char === map[characteres[i]]){
        stack.pop()
     } else return false;
  }
  return stack.length ? false: true;
}

const getOpenings = (characteres) => {
  switch(characteres) {
    case "(":
    case "{":
    case "[":
      return true;
    default:
      return false
  }
}

console.log(isBalanced("{{{{{(((((())))))}}}}}"))

