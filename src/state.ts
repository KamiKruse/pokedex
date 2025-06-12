import { createInterface, type Interface } from 'readline'
import { stdout, stdin } from 'node:process'
import { commandHelp } from './commands/help.js'
import { commandExit } from './commands/exit.js'

export type CLICommand = {
  name: string
  description: string
  callback: (state: State) => void
}

export type State = {
  rl: Interface
  commands: Record<string, CLICommand>
}

export function initState(): State {
  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: 'Pokedex > ',
  })
  return {
    rl,
    commands: {
      exit: {
        name: 'exit',
        description: 'Exits the pokedex',
        callback: commandExit,
      },
      help: {
        name: 'help',
        description: 'Displays a help message',
        callback: commandHelp,
      },
    },
  }
}
