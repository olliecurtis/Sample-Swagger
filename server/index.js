// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
})
// Require external modules
const mongoose = require('mongoose')

const routes = require("./routes")

// Import Swagger Options
const swagger = require("./config/swagger")

// Register Swagger
fastify.register(require("fastify-swagger"), swagger.options)

// Connect to DB
mongoose.connect("mongodb://localhost/mycargarage")
  .then(() => console.log("MongoDB connected…"))
  .catch(err => console.log(err))

routes.forEach((route, index) => {
  fastify.route(route)
})


// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.swagger()
    fastify.log.info(`listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()