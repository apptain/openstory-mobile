export function callApi(endpoint, method, body, headers) {
  const thatEndpoint = endpoint;
  //TODO headers default array that param adds to
  const options = {
    headers: headers || { 'Content-Type': 'application/json', 'mode': 'cors' }
  }
  if(method){
    options.method = method
  }
  if(body){
    options.body = body
  }

  return fetch(endpoint, options)
  .then(response =>
    response.json().then(json => ({ json, response }))
  ).then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json)
    }
    return Object.assign({}, json)
  })
  .then(
    response => {
      return {response}
    },
    error => {
      return {error: 'ENDPOINT ERROR at ' + thatEndpoint + '\<br \/\> ERROR:' + error.message}
    }
  )
}
