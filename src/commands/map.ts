import { State } from '../state.js'

export async function commandMap(state: State) {
  let offset =
    state.nextLocationsURL === null
      ? 0
      : state.nextLocationsURL?.substring(state.nextLocationsURL.length - 2)

  if (state.nextLocationsURL === null) {
    state.nextLocationsURL = `location-area/?limit=20&offset=${offset}`
    const page = await state.pokeAPI.fetchLocations(state.nextLocationsURL)
    state.nextLocationsURL = page.next?.slice(page.next.search(/[l]/g))
    page.results.forEach((location) => {
      console.log(location.name)
    })
  } else {
    const nPage = await state.pokeAPI.fetchLocations(state.nextLocationsURL)
    state.nextLocationsURL = nPage.next?.slice(nPage.next.search(/[l]/g))
    state.prevLocationsURL = nPage.previous?.slice(
      nPage.previous.search(/[l]/g)
    )
    nPage.results.forEach((location) => {
      console.log(location.name)
    })
  }
}
export async function commandMapBack(state: State) {
  if (state.prevLocationsURL === null) {
    console.log('You are on the first page')
    state.rl.prompt()
  } else {
    if (state.prevLocationsURL !== null) {
      const page = await state.pokeAPI.fetchLocations(state.prevLocationsURL)
       page.results.forEach((location) => {
         console.log(location.name)
       })
      state.nextLocationsURL = page.next?.slice(page.next.search(/[l]/g))
      if (page.previous) {
        state.prevLocationsURL = page.previous?.slice(
          page.previous.search(/[l]/g)
        )
      } else {
        state.prevLocationsURL = null
      }
    }
  }
}
