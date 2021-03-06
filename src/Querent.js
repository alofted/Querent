// Define Object.entries which is part of the ES2017 spec
Object.entries = x =>
  Object.keys(x).reduce((y, z) =>
    y.push([z, x[z]]) && y, [])

const query = (collection, query) =>
  collection.filter(object => matches(object, query))

const matches = (object, query) =>
  every(query, (key, value) =>
    evaluate(object[key], value))

const every = (object, iteratee) =>
  Object.entries(object).every(([key, value]) => iteratee(key, value))

const evaluate = (prop, value) => {
  if (Array.isArray(value))
    return value.includes(prop)

  if (value instanceof Object)
    return every(value, (key, value) => predicate(prop, key, value))

  return value === prop
}

const predicate = (prop, key, value) => {
  switch (key) {
    case '!': return !evaluate(prop, value)
    case '<': return prop < value
    case '<=': return prop <= value
    case '>': return prop > value
    case '>=': return prop >= value
    default: return evaluate(prop[key], value)
  }
}

const Querent = {
  query,
  matches,
  every,
  evaluate,
  predicate,
}

export default Querent
