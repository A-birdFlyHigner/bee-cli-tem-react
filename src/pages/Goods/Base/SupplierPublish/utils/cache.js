class Cache {
  static list = {}

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
    const { list } = this
    if (typeof name !== 'string') {
      throw new Error('The Cache name must be of type string')
    }
    if (typeof list[name] === 'undefined') {
      list[name] = new Cache()
    }
    return list[name]
  }

  static clear () {
    for (const key of Object.keys(this.list)) {
      const item = this.list[key]
      item.cache = {}
    }
  }
}



export default Cache
