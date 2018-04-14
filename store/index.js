'use strict'

import Vue from 'vue'
import Vuex from 'vuex'

//const fs = (process.server ? require('fs') : null)
const moment = require('moment')

Vue.use(Vuex)

const store = () => new Vuex.Store({

	//Establishing the fields for the store
	state: {
		count: 0,
		auth: null,
		fileData: null,
		status: {
			guid: ''
		},
		email: {
			email_address: 'kevin.mcgrath@symphony.com',
			is_verified: 'false'
		},
		user: {
			firstname: 'Kevin',
			lastname: 'McGrath',
			mobilephone: '215-828-6986'
		},
		company: {
			name: 'Ghostbusters, Inc.',
			industry: 'Consumer-Services'
		},
		service: {
			subdomain: 'mycompany',
			seats: 10,
			directoryname: 'My Company',
			promocode: 'GAMMA-2018'
		},
		legal: {
			terms: true
		},
		billing: {
			type: 'card',
			address1: '14 North Moore Street',
			address2: 'Tribeca',
			city: 'New York',
			state: 'NY',
			zip: '10013',
			country: 'USA',
			stripe_token: {}
		},
		pricing: {
			onetime_fees: 500,
			pupm: 20,
			minimum_seats: 25		
		}
	},

	//Creating properties for updating the fields
	mutations: {
		incrementCounter(state) {
			state.count++

			SetLog('Load Count: ' + state.count)

		},
		update(state, data) {
			state.auth = data			
		},
		set_file(state, data) {
			state.fileData = data
		}
	},

	// the nuxtServerInit method is called before rendering the page
	// { commit } is "argument destructuring" of the context object,
	// extracting the context.commit method.
	actions: {
		async nuxtServerInit({ commit }, { req, res }) {
			
			console.log('_____________------------**********nuxtServerInit**********------------_____________')
			
			//commit('update', await testFunc2())

			
			
		},
		async UPDATE_RAND({ commit }) {

			SetLog('UPDATE_RAND')

			commit('set_file', await getData())

			commit('update', await testFunc2())
		},
		increment({commit}) {
			return new Promise((resolve, reject) => {

				SetLog('increment')

				commit('incrementCounter')
				resolve(true)
			})
		}/*,
		async loadFile({commit}, pageName) {
			console.log('loading file: ' + pageName + '.txt')
			let filePath = './static/' + pageName + '.txt'
			let fileType = 'UTF-8'

			//const fileData = await ReadFileData()
			const fileData = await getData()

			commit('fileData', fileData)

			console.log('File load complete')
		},*/
		
	}

})

function SetLog(logActivity)
{
	const processExe = (process.server ? 'Server-side' : 'Client-side')
	console.log(moment().format('MM-DD-YYYY HH:mm:ss.SSS Z') + ' | ' + logActivity + ' | ' + processExe)
}

function testFunc2() {
	return new Promise((resolve, reject) => {
		console.log('Executing timeout')
		setTimeout(() => {
			let vnum = Math.floor(Math.random()*20000) + new Date().getTime()
			resolve(vnum)
		}, 5000)
	})
}


function testFunc() {
	return new Promise(function (resolve, reject) {

		SetLog('nuxtServerInit-testFunc')

		resolve(true)
	})
}

function getData() {
	return new Promise(function(resolve, reject) {
		const fs = (process.server ? require('fs') : null)
		let fileName = './static/index.txt'
		let type = 'UTF-8'

		if (fs)
		{
			SetLog('Loading File')
			fs.readFile(fileName, type, (err, data) => {
				err ? reject(err) : resolve(data)
			})
		}
		else
		{
			SetLog('Failed to load fs')
			//console.log('fs is not available client side')
			resolve('shrug')
		}
	})
}

//DON'T FORGET THIS PART
export default store