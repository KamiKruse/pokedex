import { createInterface, type Interface } from 'readline'
import { stdout, stdin } from 'node:process'
import { commandHelp } from './commands/help.js'
import { commandExit } from './commands/exit.js'
import { commandExplore } from './commands/explore.js'
import { commandCatch } from './commands/catch.js'
import { commandInspect } from './commands/inspect.js'
import { commandPokedex } from './commands/pokedex.js'
import { commandMap, commandMapBack } from './commands/map.js'
import { Pokemon } from './pokeapi.js'
import { PokeAPI } from './pokeapi.js'

export type CLICommand = {
  name: string
  description: string
  callback: (state: State, ...args:string[]) => Promise<void>
}

export type State = {
  rl: Interface
  commands: Record<string, CLICommand>
  pokeAPI: PokeAPI
  nextLocationsURL?: string | null
  prevLocationsURL?: string | null
  pokedex: Record<string, Pokemon>
}

export function initState(): State {
  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: 'Pokedex > ',
  })
  const interval = 6000
  let areaName 
  rl.on('line', (input) =>{
    areaName = input
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
      map: {
        name: 'map',
        description: 'Maps through the NEXT set of locations',
        callback: commandMap,
      },
      mapback: {
        name: 'mapb',
        description: 'Maps through the PREVIOUS set of locations',
        callback: commandMapBack,
      },
      explore: {
        name: 'explore',
        description: 'Provides Pokemon info for the area',
        callback: commandExplore,
      },
      catch: {
        name: 'catch',
        description: 'Catches Pokemon',
        callback: commandCatch,
      },
      inspect: {
        name: 'inspect',
        description: 'Inspects caught Pokemon',
        callback: commandInspect,
      },
      pokedex: {
        name: 'pokedex',
        description: 'Lists all the caught Pokemon',
        callback: commandPokedex,
      },
    },
    pokeAPI: new PokeAPI(interval),
    nextLocationsURL: null,
    prevLocationsURL: null,
    pokedex: {},
  }
}
