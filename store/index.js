'use strict'

import Vue from 'vue'
import Vuex from 'vuex'

//const fs = (process.server ? require('fs') : null)
const moment = require('moment')

Vue.use(Vuex)

const store = () => new Vuex.Store({
	strict: true,
	//Establishing the fields for the store
	state: {
		status: {
			guid: ''
		},
		email: {
			email_address: 'stanz@ghostbusters.net',
			is_verified: 'false'
		},
		user: {
			firstname: 'Kevin',
			lastname: 'McGrath',
			phone: '215-828-6986'
		},
		company: {
			name: 'Ghostbusters, Inc.',
			industry: 'Consumer-Services'
		},
		service: {
			sub_domain: 'mycompany',
			seats: 10,
			vanity_name: 'My Company',
			promo_code: 'GAMMA-2018'
		},
		legal: {
			terms_accepted: true
		},
		billing: {
			type: 'card',
			address1: '14 North Moore Street',
			address2: 'Tribeca',
			city: 'New York',
			billing_state: 'NY',
			zip_code: '10013',
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
		SET_GUID(state, guid) {
			state.status.guid = guid
		},
		SET_EMAIL(state, email) {
			state.email.email_address = email
		},
		SET_FNAME(state, firstname) {
			state.user.firstname = firstname
			console.log('fname: ' + state.user.firstname)
		},
		SET_LNAME(state, lastname) {
			state.user.lastname = lastname
		},
		SET_PHONE(state, phone) {
			state.user.phone = phone
		},
		SET_COMPANY(state, company) {
			state.company.name = company
		},
		SET_INDUSTRY(state, industry) {
			state.company.industry = industry
		},
		SET_SEATS(state, seats) {
			state.service.seats = seats
		},
		SET_VANITYNAME(state, vanity_name) {
			state.service.vanity_name = vanity_name
		},
		SET_PROMOCODE(state, promo_code) {
			state.service.promo_code = promo_code
		},
		SET_TANDC(state, terms_accepted) {
			state.legal.terms_accepted = terms_accepted
		},
		SET_ADD1(state, address1) {
			state.billing.address1 = address1
		},
		SET_ADD2(state, address2) {
			state.billing.address2 = address2
		},
		SET_CITY(state, city) {
			state.billing.city = city
		},
		SET_BILLING_STATE(state, billing_state) {
			state.billing.billing_state = billing_state
		},
		SET_ZIP(state, zip_code) {
			state.billing.zip_code = zip_code
		},
		SET_STRIPE_TOKEN(state, tokenObj) {
			state.billing.stripe_token = tokenObj
		}

	},
	getters: {
		// Use this to encapsulate computed values for later use. 
		// https://vuex.vuejs.org/en/getters.html
	},	
	actions: {
		async nuxtServerInit({ commit }, { req, res }) {

			// The nuxtServerInit method is called before rendering the THE FIRST PAGE
			// for a new request coming in to the server. It is NEVER called again.
			// { commit } is "argument destructuring" of the context object,
			// extracting the context.commit method.

			console.log('_____________------------**********nuxtServerInit**********------------_____________')			
			
		}

		
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