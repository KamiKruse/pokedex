import { Cache } from './pokecache.js'

export class PokeAPI {
  private static readonly baseURL = 'https://pokeapi.co/api/v2'
  #cacheInstance

  constructor(val: number) {
    this.#cacheInstance = new Cache(val)
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    try {
      const fullUrl = `${PokeAPI.baseURL}/${pageURL}`
      const response = await fetch(fullUrl, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        const data = await response.json()
        const cacheHas = this.#cacheInstance.get<ShallowLocations>(fullUrl)
        if (!cacheHas) {
          this.#cacheInstance.add(fullUrl, data)
          return data
        } else {
          return cacheHas.val
        }
      } else {
        throw Error('Unable to get response')
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
      return { count: 0, next: null, previous: null, results: [] }
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`
    const cached = this.#cacheInstance.get<Location>(url)
    if (cached) {
      return cached.val
    }
    try {
      const resp = await fetch(url)

      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`)
      }

      const location: Location = await resp.json()
      this.#cacheInstance.add(url, location)
      return location
    } catch (e) {
      throw new Error(
        `Error fetching location '${locationName}': ${(e as Error).message}`
      )
    }
  }

  async catchPokemon(pokeName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokeName}`
    
    try {
      const resp = await fetch(url)
      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`)
      }
      const pokemon: Pokemon = await resp.json()
      return pokemon
    } catch (error) {
      throw new Error(
        `Error getting Pokemon '${pokeName}': ${(error as Error).message}`
      )
    }
  }
}

export type Pokemon = {
  name: string
  base_experience: number
  height: number
  weight: number
  abilities: {
    ability: {
      name: string
    }
  }[],
  forms: {
    name: string
  }[],
  moves:{
    move:{
      name: string
    }
  }[],
  stats:{
    base_stat: number
    stat: {
      name: string
    }
  }[],
  types:{
    type:{
      name:string
    }
  }[]
}
export type ShallowLocations = {
  count: number
  next: string | null
  previous: string | null
  results: Array<{ name: string; url: string }>
}

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string
      url: string
    }
    version_details: {
      rate: number
      version: {
        name: string
        url: string
      }
    }[]
  }[]
  game_index: number
  id: number
  location: {
    name: string
    url: string
  }
  name: string
  names: {
    language: {
      name: string
      url: string
    }
    name: string
  }[]
  pokemon_encounters: {
    pokemon: {
      name: string
      url: string
    }
    version_details: {
      encounter_details: {
        chance: number
        condition_values: any[]
        max_level: number
        method: {
          name: string
          url: string
        }
        min_level: number
      }[]
      max_chance: number
      version: {
        name: string
        url: string
      }
    }[]
  }[]
}
