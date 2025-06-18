export type CacheEntry<T> = {
  createdAt: number
  val: T
}
export class Cache {
  #cache = new Map<string, CacheEntry<any>>()
  #reapIntervalId: NodeJS.Timeout | undefined = undefined
  #interval: number

  add<T>(key: string, val: T) {
    return this.#cache.set(key, { createdAt: Date.now(), val })
  }
  get<T>(key: string): CacheEntry<T> | undefined {
    const val = this.#cache.get(key)
    if (!val) {
      return undefined
    }
    return val.val
  }
  #reap() {
    for (const [key, val] of this.#cache) {
      if (val.createdAt < Date.now() - this.#interval) {
        this.#cache.delete(key)
      }
    }
  }
  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => {
      this.#reap()
    }, this.#interval)
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId)
    this.#reapIntervalId = undefined
  }
  constructor(val: number) {
    this.#interval = val
    this.#startReapLoop()
  }
}



