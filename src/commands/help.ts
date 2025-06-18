import { State } from '../state'

export async function commandHelp(state: State) {
  let welcomeHeader = `Welcome to the Pokedex!\nUsage:\n\n`
  let commandNames = ''
  for (const command in state.commands) {
    commandNames += `${state.commands[command].name}: ${state.commands[command].description}\n`
  }
   console.log(welcomeHeader + commandNames)
   
}
