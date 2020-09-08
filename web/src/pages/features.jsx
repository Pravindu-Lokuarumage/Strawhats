import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import $ from "jquery";

const API_URL = 'https://api-cyan-six.vercel.app/api';
const currentUser = localStorage.getItem('user');

class Features extends Component {
    constructor(props){
		super(props)
		this.state = {
			profile:{}
		};
	}
	componentDidMount(){
		if (currentUser){
			$.get(`${API_URL}/profile/${currentUser}`)
			.then(response => {
                if (response[0]== null){
                    window.location.href = '/create'; 
                }
                else{
                    this.setState({profile:response[0]})
                }

			})
		}
		else{
			const path = window.location.pathname;
    		if (path !== '/login' && path !== '/registration') { 
				window.location.href = '/login'; 
			}
		}
	}
	render(){
		return(
            //Note: might have to change 3rd picture for a clipart for the Future plans.
            //page html
            //1.Welcome --//Our Goal
            //2.Our Team
            //3.Our Future
            //3.User Reviews
            //4.Our contact info
            <div className="container mainFeatures">
				<div id="navbar"><Navbar></Navbar></div>
                <div className="row logoRow">
                    <div className="col-md-7 position-relative logoCol">
                        <h2 className="text-left logoHeader d-flex align-items-center"> FEATURES</h2>
                    </div>
                </div>
                 <div className="row firstRowFeatures">
                    <div className="col-md-5 firstCol">
                        <h2 className="text-center firstHeader">Check Your Vitals</h2>
                        <p className="text-left"> Get your heart rate data along with a graph
                        displaying how it various through out the day. To see your vitals information
                        click on the link below.
                        </p>
                        <a className="vitals" href="/info">Check Vitals</a>
                    </div>
                    <div className="col-md-6">
                        <img src="data:image/jpeg;base64,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" className="float-right" width="350" height="274" alt="Cinque Terre"></img>
                    </div>
                </div>
                <div className="row secondRowFeatures">
                    <div className="col-md-6 float-left">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSZEBiNWWXzrNx0P2KGZUdSnjjQEZYqPUCckQ&usqp=CAU" className="float-right" width="350" height="270" alt="Cinque Terre"></img>
                    </div>
                    <div className="col-md-6 secondCol float-right">
                        <h2 className="text-center secondHeader">Calorie Intake</h2>
                        <p className="text-left">Want to know how many calories you have eaten in a day?
                        Just add the items you have eaten in a day at breakfast, lunch and dinner and we 
                        will calculate the calories for you. Click the link below to go to calorie intake 
                        calculator.
                        </p>
                        <a className="calorieIntake1" href="/calorieIntake">Calorie Intake</a>
                    </div>
                </div>    
                <div className="row thirdRowFeatures">
                    <div className="col-md-5 thirdCol Row">
                        <h2 className="text-center thirdHeader">Tracking and Excersing</h2>
                        <p className="text-left">Want to know how many steps you have taken?
                        Want to know how many calories you have burned uptil now? Just click the link
                        below to see all this information.
                        </p>
                        <a className="caloriesburned" href="/trackMe">My Track</a>
                    </div>
                    <div className="col-md-6">
                        <img src="data:image/png;base64,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" className="float-right" width="350" height="270" alt="Cinque Terre"></img>
                    </div>
                </div>
				<div id="footer"><Footer></Footer></div>
			 </div>
    	);
	}
    
}

export default Features;