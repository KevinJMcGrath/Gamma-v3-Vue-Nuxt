// Adding automatic tracing through the TraceAgent
if (process.env.NODE_ENV === 'production') {
	require('@google-cloud/trace-agent').start()
}
else {
	require('@google-cloud/trace-agent').start({
		projectId: 'symphony-gamma-poc',
		keyFilename: './credentials/symphony-gamma-poc-493624b6cca1.json'
	})
}

const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const express = require('express')

const app = express()
const api = require('./api')

app.use(bodyParser.json())

// Tell express to use the API routes in the API folder
// instead of specifying them manually
app.use('/api', api)

const config = require('../nuxt.config.js')

const nuxt = new Nuxt(config)

if (config.dev) {
	const builder = new Builder(nuxt)
	builder.build().catch((error) => {
		console.error(error)
		process.exit(1)
	})
}

// Winston should either go here


app.use(nuxt.render)


//Or here. nuxt.render is technically middleware, but it's not using the express server



app.listen(8081)

console.log('Custom Server is listening on http://localhost:8081')