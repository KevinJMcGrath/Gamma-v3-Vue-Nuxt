import axios from 'axios';
import globalState from '../libs/interviewState.js';

export default function SendSFDCGammaRequest()
{
	var baseObj = globalState.billing.stripe_token;

	baseObj.card.address_city = globalState.billing.city;
	baseObj.card.address_country = 'United States';
	baseObj.card.address_line1 = globalState.billing.address1;
	baseObj.card.address_state = globalState.billing.state;
	baseObj.card.address_zip = globalState.billing.zip;
	baseObj.card.name = globalState.user.firstname + ' ' + globalState.user.lastname;

	baseObj.card.metadata.firstname = globalState.user.firstname;
	baseObj.card.metadata.lastname = globalState.user.lastname;
	baseObj.card.metadata.billingfirstname = globalState.user.firstname;
	baseObj.card.metadata.billinglastname = globalState.user.lastname;
	baseObj.card.metadata.email = globalState.user.email;
	baseObj.card.metadata.phone = globalState.user.mobilephone;
	
	baseObj.card.metadata.subdomain = globalState.service.subdomain;
	baseObj.card.metadata.seats = globalState.service.seats;

	baseObj.card.metadata.company = globalState.company.name;
	baseObj.card.metadata.region = globalState.company.region;

	baseObj.card.metadata.eula = globalState.legal.terms;

	console.log(baseObj);

	var prodEP = 'https://symphony.my.salesforce.com/services/apexrest/symphony/stripe/37df37742a354ea0948ea9249dad410a';
	var testEP = 'https://dev-symphonyinc.cs4.force.com/services/apexrest/symphony/stripe/37df37742a354ea0948ea9249dad410a';

	//Using Axios (invoked by CDN in HTML) to handle HTTP requests.
	//https://github.com/axios/axios
	var axiosConfig = {
		method: 'post',
		url: testEP,
		data: baseObj
	};

	/*var returnObj = {
		success: false;
		message: '';
		response: {};
	};
	
	axios(axiosConfig).then(function(response) {
		returnObj.response = response;
		returnObj.success = response.success;
		returnObj.message = response.message;

		console.log(response);
	}).catch(function(error) {
		returnObj.success = false;
		returnObj.response = error;

		console.log(error);
	});

	return returnObj;*/

	return axios(axiosConfig);
}

