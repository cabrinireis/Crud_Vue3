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
    const dados = schema.patients.all()
    let filter = dados.models.filter((q) => {
      console.log(q.name.toLowerCase(), query)
      return q.name.toLowerCase().includes(query.toLowerCase())
    })
    return filter
  })

  this.get('/patients/:id', function (schema, request) {
    const id = request.params.id
    const patient = schema.patients.find(id)
    return patient
  })
}
