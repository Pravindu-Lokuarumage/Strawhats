import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import $ from "jquery";

const API_URL = 'https://api-cyan-six.vercel.app/api';
// const currentUser = localStorage.getItem('user');


class  CalorieIntake extends Component {
    // constructor(props){
	// 	super(props)
	// 	this.state = {
	// 		profile:{}
	// 	};
	// }
	render(){
		return(
            //page html
        	<div>
                <div className="container">
					<div id="navbar"><Navbar></Navbar></div>
			    <div id="footer"><Footer></Footer></div>
				</div>
        	</div>
    	);
	}
    
}

export default CalorieIntake;