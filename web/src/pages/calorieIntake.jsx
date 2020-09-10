import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import $ from "jquery";
import Axios from 'axios';
import hmacsha1 from 'hmacsha1';
import {stringify} from 'query-string';
const API_PATH = 'https://platform.fatsecret.com/rest/server.api';
const ACCESS_KEY = 'fe89c4d02c9e454daa8e802d553bb744';
//const APP_SECRET = 'f39ebfe3761341f68ece682e4003cef9';
const APP_SECRET = '726e879059059c149a48981936346ccf1d7';
const OAUTH_VERSION = '1.0';
const OAUTH_SIGNATURE_METHOD = 'HMAC-SHA1';

const API_URL = 'https://api-cyan-six.vercel.app/api';

class CalorieIntake extends Component {
    constructor(props){
		super(props)
		this.state ={
            calories: []
		}
		//this.onChange = this.onChange.bind(this);
	}
	getOauthParameters(){
		const timestamp = Math.round(new Date().getTime() / 1000);
		return {
		  oauth_consumer_key: ACCESS_KEY,
		  oauth_nonce: `${timestamp}${Math.floor(Math.random() * 1000)}`,
		  oauth_signature_method: OAUTH_SIGNATURE_METHOD,
		  oauth_timestamp: timestamp,
		  oauth_version: OAUTH_VERSION,
		};
	}
	// onChange(){
	// 	console.log("hello")
	// }
	componentDidUpdate(){
		//let value = console.log(document.getElementsByClassName('fatsecret_calories_value').innerText);
		if (console.log(document.getElementsByClassName('.fatsecret_calories_value').innerText) == null)
		{
			console.log("No value");
		}
		else{
			console.log(document.getElementsByClassName('.fatsecret_calories_value').innerText);
		}
		console.log($('.fatsecret_calories_value').innerText);
		// calories = document.getElementsByClassName()
	}
	render(){
		return(
			<div className="container"> 
                <div id="navbar"><Navbar></Navbar></div>
				<h1>Calorie Intake</h1>
				<div id="my_container" className="fatsecret_container"></div>
				{/* <div>{this.myMethod()}</div> */}
                <div id="footer"><Footer></Footer></div>
			</div>
		)
	}
}
export default CalorieIntake;


// const APP_ID = 'b46c0fbd';
// const APP_KEY='6d7c41154f741276cad71cf02cf6a686';
// const URL = `https://api.nutritionix.com/v1_1/search/mcdonalds?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=${APP_ID}&appKey=${APP_KEY}`
// getData = async () => {
// 	const result = await Axios.get(URL);
// 	console.log(result);
// 	console.log("1");
// } 

//------------------FATSECRET-----------------------//
// const API_PATH = 'https://platform.fatsecret.com/rest/server.api';
// const ACCESS_KEY = 'fe89c4d02c9e454daa8e802d553bb744';
// //const APP_SECRET = 'f39ebfe3761341f68ece682e4003cef9';
// const APP_SECRET = '726e879059059c149a48981936346ccf1d7';
// const OAUTH_VERSION = '1.0';
// const OAUTH_SIGNATURE_METHOD = 'HMAC-SHA1';

	// getOauthParameters(){
	// 	const timestamp = Math.round(new Date().getTime() / 1000);
	// 	return {
	// 	  oauth_consumer_key: ACCESS_KEY,
	// 	  oauth_nonce: `${timestamp}${Math.floor(Math.random() * 1000)}`,
	// 	  oauth_signature_method: OAUTH_SIGNATURE_METHOD,
	// 	  oauth_timestamp: timestamp,
	// 	  oauth_version: OAUTH_VERSION,
	// 	};
	// }
	// MqueryParams = $.param(this.getOauthParameters());
	// getSignature(MqueryParams, httpMethod = 'GET') {
	// 	const signatureBaseString = [
	// 	  httpMethod,
	// 	  encodeURIComponent(API_PATH),
	// 	  encodeURIComponent(stringify(MqueryParams)),
	// 	].join('&');
	// 	const signatureKey = `${APP_SECRET}&`;
	// 	return hmacsha1(signatureKey, signatureBaseString);
	//   }
	// makeApiCall(MqueryParams, httpMethod = 'GET'){
	// 	const queryParam = {
	// 	...this.getOauthParameters(),
	// 	...MqueryParams,
	// 	format: 'json',
	// 	};
	// 	queryParam['oauth_signature'] = this.getSignature(queryParam, httpMethod);
	// 	$.get(`${API_PATH}?${stringify(queryParam)}`, {method: httpMethod})
	// 	.then(response => {
	// 		if (response){
	// 			console.log("Fetched")
	// 			return response;
	// 		}
	// 		else{
	// 			console.log("Couldn't Fetch")
	// 		}
	// 	})
	// }
