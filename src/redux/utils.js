const REQUEST = 'REQUEST'
const FETCH = 'FETCH'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

export function action(type, payload = {}) {
  return {type, ...payload}
}

export function restActionKeys(baseKey) {
  return [REQUEST, FETCH, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${baseKey}_${type}`
    return acc
  }, {})
}

export function restAction(restActionKey){
  return {
    request: (parameters) => action(restActionKey['REQUEST'], {parameters}),
    fetch: (parameters) => action(restActionKey['FETCH'], parameters),
    success: (response, parameters) => action(restActionKey['SUCCESS'], {response, parameters}),
    failure: (parameters, error) => action(restActionKey['FAILURE'], {parameters,  error})
  }
}

export function objectToArray(obj) {
  return Object.keys(obj).map(key => obj[key])
}
