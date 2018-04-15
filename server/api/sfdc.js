const { Router } = require('express')
const axios = require('axios')


//Add logic for storing API keys here

const router = Router()

const baseURL = 'https://dev-symphonyinc.cs4.force.com/services/apexrest/symphony/'

router.post('/test', function(req, res, next) {
	console.log(req.body.email_address)
})

router.post('/verify', function(req, res, next) {

	const payload = { emailAddress: req.body.email_address }
	
	const config = {
		baseURL: baseURL,
		headers: {
			'X-SYM-APIKEY': '123456789KEVINabcdefgh'
		}
	}

	axios.post('/email-verification', payload, config)
	.then((response) => {
		console.log('Success!')
		console.log('Response Code: ' + response.status)
		console.log('Response Text: ' + response.statusText)
		console.log('Response Body: ' + response.data)

		res.json( { success: true, message: response.data })
	})
	.catch((error) => {		
		console.error('Failure ;_;')

		if (error.response)
		{
			console.error('Response Code: ' + error.response.status)
			console.error('Response Text: ' + error.response.statusText)
			console.error('Response Body: ')
			console.error(error.response.data)
			//console.error('Response Headers: ' + error.response.headers)

			res.status(error.response.status).json(error.response.data)
		}
		else if (error.request)
		{
			// Request was made but no response was received
			console.error(error.request)

			res.json( { success: false, message: 'System Error' })
		}
		else
		{
			console.error('Unknown Error: ' + error.message)

			res.json( { success: false, message: 'Unknown Error' })
		}
	})
})


router.post('/purchase-submit', function(req, res, next) {
	
	const config = {
		baseURL: baseURL,
		headers: {
			'X-SYM-APIKEY': '123456789KEVINabcdefgh'
		}
	}

	axios.post('/email-verification', payload, config)
	.then((response) => {
		console.log('Success!')
		console.log('Response Code: ' + response.status)
		console.log('Response Text: ' + response.statusText)
		console.log('Response Body: ' + response.data)

		res.json( { success: true, message: response.data })
	})
	.catch((error) => {		
		console.error('Failure ;_;')

		if (error.response)
		{
			console.error('Response Code: ' + error.response.status)
			console.error('Response Text: ' + error.response.statusText)
			console.error('Response Body: ' + error.response.data)
			console.error('Response Headers: ' + error.response.headers)

			res.json( { success: false, message: 'HTTP Error' })
		}
		else if (error.request)
		{
			// Request was made but no response was received
			console.error(error.request)

			res.json( { success: false, message: 'System Error' })
		}
		else
		{
			console.error('Unknown Error: ' + error.message)

			res.json( { success: false, message: 'Unknown Error' })
		}
	})
})

module.exports = router