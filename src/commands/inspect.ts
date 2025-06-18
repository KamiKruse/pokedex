import { State } from "src/state.js";

export async function commandInspect(state:State, ...args:string[]){
  const [firstEL, ...rest] = args
  if(Object.hasOwn(state.pokedex, firstEL)){
    console.log(`Name: ${firstEL}`)
    console.log(`Height: ${state.pokedex[firstEL].height}`)
    console.log(`Weight: ${state.pokedex[firstEL].weight}`)
    console.log(`Stats:`)
    state.pokedex[firstEL].stats.forEach(stat => {
      console.log(`  -${stat.stat.name}: ${stat.base_stat}`)
    })
    state.pokedex[firstEL].types.forEach(type => {
      console.log('Types:')
      console.log(`  - ${type.type.name}`)
    })
  } else {
    console.log('you have not caught that pokemon')
  }
}
