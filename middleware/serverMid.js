const moment = require('moment')

console.log('Loading serverMid...')

module.exports = function(req, res, next) {

	console.log(moment().format('MM-DD-YYYY HH:mm:ss.SSS Z') + ' | serverMid' + (process.server ? ' | Server-side' : ' | Client-side'))
	console.log('Path: ' + req.path)

	//MUST MUST MUST HAVE
	next()
}