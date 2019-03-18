class Cache {
  static list = {}

  constructor () {
    this.cache = {}
  }

  get (name) {
    if (!name) {
      return this.cache
    }
    return this.cache[name]
  }

  set(name, data) {
    this.cache[name] = data
  }

  names () {
    return Object.keys(this.cache)
  }

  values () {
    return this.names().map(name => this.get(name))
  }

  updateItem (name, key, value) {
    const data = this.get(name)
    this.set(name, {
      ...data,
      [key]: value
    })
  }

  updateAll (key, value) {
    this.names().forEach((name) => this.updateItem(name, key, value))
  }

  reset (name = null) {
    if (!name) {
      this.cache = {}
    } else {
      delete this.cache[name]
    }
  }

  static create (alias) {
    const { list } = this
    if (typeof alias !== 'string') {
      throw new Error('The Cache alias must be of type string')
    }
    if (typeof list[alias] === 'undefined') {
      list[alias] = new Cache()
    }
    return list[alias]
  }

  static clear () {
    Object.keys(this.list).forEach(alias => {
      this.list[alias].reset()
    })
  }
}



export default Cache
