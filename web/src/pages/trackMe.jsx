import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import $ from "jquery";

const API_URL = 'https://api-cyan-six.vercel.app/api';

class  TrackMe extends Component {
    // constructor(props){
	// 	super(props)
	// 	this.state = {

	// 	};
	// }
	render(){
		return(
        	<div>
                <div className="container">
				<div id="navbar"><Navbar></Navbar></div>

			    <div id="footer"><Footer></Footer></div>
				</div>
        	</div>
    	);
	}
    
}

export default TrackMe;
