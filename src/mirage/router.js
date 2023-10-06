import { Response } from 'miragejs'
export default function routes() {
  this.namespace = 'api'

  this.post(`/login`, function (schema, request) {
    const body = JSON.parse(request.requestBody)
    if (body.user === 'cabrini' && body.pass === '123') {
      return body
    } else {
      return new Response(400, { some: 'header' }, { errors: ['name cannot be blank'] })
    }
  })
}
