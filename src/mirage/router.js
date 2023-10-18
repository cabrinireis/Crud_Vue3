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

  this.post('/patients/', function (schema, request) {
    const data = JSON.parse(request.requestBody)
    return schema.patients.create(data)
  })

  this.post(`/patients/:id`, function (schema, request) {
    const id = request.params.id
    const patient = schema.patients.find(id)
    const body = JSON.parse(request.requestBody)
    return patient.update(body.params)
  })

  this.get('/patients', function (schema, request) {
    const query = request.queryParams.query
    const dados = schema.patients.all()
    let filter = dados.models.filter((q) => {
      return q.name.toLowerCase().includes(query.toLowerCase())
    })
    return new Response(200, { some: 'header' }, { response: filter })
  })

  this.get('/patients/:id', function (schema, request) {
    const id = request.params.id
    const patient = schema.patients.find(id)
    return patient
  })

  this.delete(`/patients/:id`, function (schema, request) {
    const id = request.params.id
    const item = schema.patients.find(id)
    return item.destroy()
  })

  this.passthrough('https://viacep.com.br/ws/**')
}
