
import Cache from './cache'
import convertSkus from './skus'

export {
  Cache,
  convertSkus
}

export const emptyFn = (arg) => arg

export const trim = (value = '') => {
  if (typeof value !== 'string') {
    return value
  }
  return value.trim()
}

export const pick = (object, paths = []) => {
  const result = {}
  paths.forEach(path => {
    result[path] = object[path]
  })
  return result
}

export const omit = (object, paths = []) => {
  const result = {}
  for (const key in object) {
    if (paths.indexOf(key) === -1) {
      result[key] = object[key]
    }
  }
  return result
}
