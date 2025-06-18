import { State } from '../state.js'

export async function commandCatch(state:State, ...args:string[]) {
  const [firstEL, ...rest] = args
  const pokemon = await state.pokeAPI.catchPokemon(firstEL)
  let userExperience = null
  const belowOrAt100 = 100
  const between100And150 = 150
  const between150And200 = 200
  if(pokemon.base_experience < 100){
     userExperience = Math.floor(Math.random() * belowOrAt100)
  }
  if(pokemon.base_experience > 100 && pokemon.base_experience <= 150){
    userExperience = Math.floor(Math.random() * between100And150)
  }
  if(pokemon.base_experience > 150 && pokemon.base_experience <= 200){
    userExperience = Math.floor(Math.random() * between150And200)
  }
  console.log(`Throwing a Pokeball at ${pokemon.name}...`)
  if(userExperience){
    if (pokemon.base_experience <= userExperience) {
      console.log(`${pokemon.name} was caught!`)
      state.pokedex[pokemon.name] = pokemon
      console.log(`You may now inspect it with the inspect command.`)
      state.rl.prompt()
    } else {
      console.log(`${pokemon.name} escaped!`)
      state.rl.prompt()
    }
  }
}
