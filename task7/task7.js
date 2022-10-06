class pizza {
  ingredients = []
  
async cook() {
  setTimeout(() => console.log("The pizza is ready"), 5000);
}

async addIngredients(ingrediente) {

return new Promise((resolve, reject) => {
  if(typeof ingrediente !== "string"){
    reject("That's not a valid ingredient")
  } else {
    setTimeout(() =>{
    this.ingredients.push(ingrediente)
    resolve(console.log("The " + ingrediente + " was added")
    )}, 1000)
  }
})
}
}

const piza = new pizza()

try {
  await piza.addIngredients("Masa")
  await piza.addIngredients("Salsa de Tomate")
  await piza.addIngredients("Jamon")
  await piza.addIngredients("queso")
  await piza.addIngredients("Peperoni")
  await piza.cook() 
} catch (error) {
  console.log(error)
}