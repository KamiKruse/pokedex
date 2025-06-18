import { commandHelp } from '../commands/help.js'
import { initState, State } from '../state.js'
import { describe, expect, test, afterEach, vi } from 'vitest'

const init = initState()
afterEach(() => {
  vi.restoreAllMocks()
})
describe.each([{ input: init, expected: undefined }])(
  'commandHelp',
  ({ input, expected }) => {
    test(`Should include welcome header and command descriptions`, async () => {
      const logSpy = vi.spyOn(console, 'log').mockImplementation(()=>{})
      await commandHelp(input)
      expect(logSpy).toHaveBeenCalledTimes(1)
      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining('Welcome to the Pokedex!')
      )
      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining('exit: Exits the pokedex')
      )
      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining('help: Displays a help message')
      )
      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining('map: Maps through the NEXT set of locations')
      )
      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'mapb: Maps through the PREVIOUS set of locations'
        )
      )
    })
  }
)
