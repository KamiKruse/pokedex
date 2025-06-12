import { commandHelp } from '../commands/help'
import { initState, State } from '../state.js'
import { describe, expect, test } from 'vitest'

const init = initState()
describe.each([{ input: init, expected: undefined }])(
  'commandHelp',
  ({ input, expected }) => {
    test(`Should include welcome header and command descriptions`, () => {
      const actual = commandHelp(input)
      expect(actual).toContain('Welcome to the Pokedex!')
      expect(actual).toContain('exit: Exits the pokedex')
      expect(actual).toContain('help: Displays a help message')
    })
  }
)
