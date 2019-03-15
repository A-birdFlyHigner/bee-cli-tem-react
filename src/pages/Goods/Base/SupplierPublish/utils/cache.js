class Cache {
  static cache = {}

  constructor () {
    this.cache = {}
  }

  get (key) {
    if (!key) {
      return this.cache
    }
    return this.cache[key] || null
  }

  set(key, data) {
    this.cache[key] = data
  }

  remove (key = null) {
    if (!key) {
      this.cache = {}
    } else {
      delete this.cache[key]
    }
  }


  static create (name) {
    const { cache } = this
    if (typeof name !== 'string') {
      throw new Error('The Cache name must be of type string')
    }
    if (typeof cache[name] === 'undefined') {
      cache[name] = new Cache()
    }
    return cache[name]
  }

  static clear () {
    this.cache = {}
  }
}



export default Cache
