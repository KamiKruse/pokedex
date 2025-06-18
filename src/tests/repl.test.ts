import { cleanInput } from '../repl'
import { describe, expect, test } from 'vitest'

describe.each([
  { input: 'hello, world', expected: ['hello', 'world'] },
  {
    input: ' hello, world ',
    expected: ['hello', 'world'],
  },
  {
    input: ' hello world ',
    expected: ['hello', 'world'],
  },
  {
    input: 'hello.world ',
    expected: ['hello', 'world'],
  },
  {
    input: 'hello; world ',
    expected: ['hello', 'world'],
  },
  {
    input: 'explore canalave-city-area ',
    expected: ['explore', 'canalave-city-area'],
  }
])('cleanInput($input)', ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input)
    expect(actual).toHaveLength(expected.length)
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i])
    }
  })
})
