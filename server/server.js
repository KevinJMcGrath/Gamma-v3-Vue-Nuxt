const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const express = require('express')

const app = express()
const api = require('./api')

app.use(bodyParser.json())

// Tell express to use the API routes in the API folder
// instead of specifying them manually
app.use('/api', api)

const isProd = process.env.NODE_ENV === 'production'
const config = require('../nuxt.config.js')

console.log('isProd: ' + isProd)
console.log('config.dev: ' + config.dev)

const nuxt = new Nuxt(config)

if (config.dev) {
	const builder = new Builder(nuxt)
	builder.build().catch((error) => {
		console.error(error)
		process.exit(1)
	})
}

app.use(nuxt.render)
app.listen(3000)

console.log('Custom Server is listening on http://localhost:3000')