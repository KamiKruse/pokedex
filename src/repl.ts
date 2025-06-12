import { State } from "./state.js"


export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .split(/[;,.\s]/)
    .filter((item) => item.length !== 0)
}

export function startREPL(init: State) {
  init.rl.prompt()
  init.rl.on('line', (line) => {
    const [firstElement, ...rest] = cleanInput(line)
    try {
      if (!firstElement) {
        init.rl.prompt()
      } else if (firstElement.toLowerCase() === init.commands.exit.name) {
        init.commands.exit.callback(init)
      } else if (firstElement.toLowerCase() === init.commands.help.name) {
        console.log(init.commands.help.callback(init))
        init.rl.prompt()
      } else {
        throw new Error('Unknown command')
      }
    } catch (err) {
      if(err instanceof Error){
        console.log(err.message)
        init.rl.prompt()
      }else {
        console.log('Unknown error')
        init.rl.prompt() 
      }
     
    }
  })
}
