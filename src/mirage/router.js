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

  this.get('/patients', function (schema, request) {
    const query = request.queryParams.query
    const data = schema.patients.all()
    let filter = data.filter((q) => {
      return q.name.toLowerCase().includes(query)
    })

    return query ? filter : schema.patients.all()
  })
}
