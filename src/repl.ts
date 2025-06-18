import { State } from './state.js'

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .split(/[;,.\s]/)
    .filter((item) => item.length !== 0)
}

export async function startREPL(init: State) {
  init.rl.prompt()
  init.rl.on('line', async (line) => {
    const [firstElement, secondElement] = cleanInput(line)
    try {
      if (!firstElement) {
        init.rl.prompt()
      } else if (
        firstElement.toLowerCase() === init.commands.exit.name.toLowerCase()
      ) {
        await init.commands.exit.callback(init)
      } else if (
        firstElement.toLowerCase() === init.commands.help.name.toLowerCase()
      ) {
        await init.commands.help.callback(init)
        init.rl.prompt()
      } else if (
        firstElement.toLowerCase() === init.commands.map.name.toLowerCase()
      ) {
        await init.commands.map.callback(init)
        init.rl.prompt()
      } else if (
        firstElement.toLowerCase() === init.commands.mapback.name.toLowerCase()
      ) {
        await init.commands.mapback.callback(init)
        init.rl.prompt()
      } else if (
        firstElement.toLowerCase() === init.commands.explore.name.toLowerCase()
      ) {
        if (!secondElement) {
          throw new Error('Provide location name to explore')
        }
        await init.commands.explore.callback(init, secondElement)
        init.rl.prompt()
      } else if (
        firstElement.toLowerCase() === init.commands.catch.name.toLowerCase()
      ) {
        if (!secondElement) {
          throw new Error('No Pokemon selected')
        }
        await init.commands.catch.callback(init, secondElement)
        init.rl.prompt()
      } else if (
        firstElement.toLowerCase() === init.commands.inspect.name.toLowerCase()
      ) {
        if (!secondElement) {
          throw new Error('No Pokemon selected')
        }
        await init.commands.inspect.callback(init, secondElement)
        init.rl.prompt()
      } else if (
        firstElement.toLowerCase() === init.commands.pokedex.name.toLowerCase()
      ) {
        await init.commands.pokedex.callback(init)
        init.rl.prompt()
      } else {
        throw new Error('Unknown command')
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message)
        init.rl.prompt()
      } else {
        console.log('Unknown error')
        init.rl.prompt()
      }
    }
  })
}
