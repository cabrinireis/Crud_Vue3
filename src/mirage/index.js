import { Server } from 'miragejs'
import factories from './factory'
import routes from './router.js'
import models from './model.js'
import seeds from './seeds.js'

const config = (environment) => {
  const config = {
    environment,
    factories,
    models,
    routes,
    seeds
  }

  return config
}

export function makeServer({ environment = 'development' } = {}) {
  return new Server(config(environment))
}
