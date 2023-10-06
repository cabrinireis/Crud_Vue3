export default function seeds(server) {
  server.createList('patient', 5)
  server.create('patient', { name: 'ola' })
}
