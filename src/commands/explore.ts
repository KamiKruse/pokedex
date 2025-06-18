import { State } from '../state.js'

export async function commandExplore(state:State, ...args:string[]) {
  try {
    const [firstEL, ...rest] = args
    const location = await state.pokeAPI.fetchLocation(firstEL)
    if(location){
      console.log("Found Pokemon:")
      location.pokemon_encounters.forEach((encounter) => {
        console.log(` - ${encounter.pokemon.name}`)
      })
    }
    else {
      throw new Error("Error fetching details")
    }   
  } catch (error) {
    console.error(error)
  } 
}
