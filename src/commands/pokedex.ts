import { State } from "src/state.js";

export async function commandPokedex(state:State) {
  const pokedex = Object.keys(state.pokedex)
  console.log("Your Pokedex: ")
  if(pokedex.length === 0){
    console.log("You haven't caught any pokemon yet")
  }
  pokedex.forEach(item => {
    console.log(` - ${item}`)
  })
}
