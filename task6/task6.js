/*  Task 6 */
/* 
1.) Promises exercises 2

Create a function PrintName
	It receives a name as a parameter
	after 5seconds it prints "The name received is:  X"  
*/

// //option 1:
 function PrintName(name) {
setInterval(() => console.log(name), 5000);
}

//option 2:
function PrintName2(name) {
  setTimeout(() => console.log(name), 5000);
  }


//PrintName("JoseAngel")
PrintName2("JoseAngel");

/* 
2.) Create a function called job
it receives  a parameter called -> data
if data is not a number , return a promise rejected instantly and give the data "error" in a string	
if data is an odd number, return a promise resolved 1 second later and give the data "odd"  in a string
if data is an even number, return a promise rejected 2 seconds later and give the data "even" in a string	
THE FUNCTION MUST ALWAYS RETURN A PROMISE
*/

const job = (data) => {
 return new Promise((resolve, reject) => {

    if(!Number(data)) {
      reject("Error: Invalid")
    }
    if(data % 2 == 0) {
      setTimeout(() => {
        resolve("Even");
      },2000)
    } else {
      setTimeout(() => {
        resolve("Odd");
      },1000)
    }
  })
}

job(3)
.then((response) => console.log(response))
.catch((err) => console.log(err))




