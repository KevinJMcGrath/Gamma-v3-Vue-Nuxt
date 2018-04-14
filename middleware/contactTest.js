const moment = require('moment')

//nuxt page lifecycle
//https://github.com/nuxt/nuxt.js/issues/404

export default function (context) {

	console.log(moment().format('MM-DD-YYYY HH:mm:ss.SSS Z') + ' | Running contactTest middleware' + (process.server ? ' | Server-side' : ' | Client-side'))

}