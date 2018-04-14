import axios from 'axios'
const moment = require('moment')

//nuxt page lifecycle
//https://github.com/nuxt/nuxt.js/issues/404

export default function (context) {

	console.log(moment().format('MM-DD-YYYY HH:mm:ss.SSS Z') + ' | Running email-verify middleware' + (process.server ? ' | Server-side' : ' | Client-side'))


	if (context.route && context.route.path)
	{
		console.log('Current route: ' + context.route.path)
	}
}