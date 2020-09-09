import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import hmacsha1 from 'hmacsha1';
import {stringify} from 'query-string';
import $ from "jquery";

//const API_URL2 = 'https://platform.fatsecret.com/js?key=fe89c4d02c9e454daa8e802d553bb744';
const API_URL = 'https://api-cyan-six.vercel.app/api';
const API_PATH = 'https://platform.fatsecret.com/rest/server.api';
const ACCESS_KEY = 'fe89c4d02c9e454daa8e802d553bb744';
const APP_SECRET = 'f39ebfe3761341f68ece682e4003cef9';
const OAUTH_VERSION = '1.0';
const OAUTH_SIGNATURE_METHOD = 'HMAC-SHA1';

class CalorieIntake extends Component {
    constructor(props){
		super(props)
		this.state ={
            calories: [],
			Brand : 'Brand',
			 Generic : 'Generic',
		}
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
	queryParams = $.param(this.getOauthParameters());
	getSignature(queryParams, httpMethod = 'GET') {
		const signatureBaseString = [
		  httpMethod,
		  encodeURIComponent(API_PATH),
		  encodeURIComponent(stringify(queryParams)),
		].join('&');
		const signatureKey = `${APP_SECRET}&`;
		return hmacsha1(signatureKey, signatureBaseString);
	  }
	makeApiCall(queryParams, httpMethod = 'GET'){
		const queryParam = {
		...this.getOauthParameters(),
		...queryParams,
		format: 'json',
		};
		$.get(queryParam['oauth_signature'])
		.then(response => {
			if (response){
				console.log("Fetched")
				queryParam['oauth_signature'] = this.getSignature(queryParam, httpMethod);
				return fetch(`${API_PATH}?${stringify(queryParam)}`, {method: httpMethod});
			}
			else{
				console.log("Couldn't Fetch")
			}
		})
	}
	render(){
		return(
			<div className="container"> 
                <div id="navbar"><Navbar></Navbar></div>
				<h1>Calorie1 Intake</h1>
				{/* { console.log(this.getOauthParameters())}
				{ console.log(this.getSignature())} */}
				{ console.log(this.makeApiCall())}
				<div id="my_container" className="fatsecret_container"></div>
                <div id="footer"><Footer></Footer></div>
			</div>
		)
	}
}
export default CalorieIntake;