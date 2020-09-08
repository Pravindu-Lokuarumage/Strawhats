import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import $ from "jquery";

const API_URL = 'https://api-cyan-six.vercel.app/api';
// const currentUser = localStorage.getItem('user');

class  TrackMe extends Component {
    constructor(props){
		super(props)
		this.state = {
			// profile:{}
		};
	}
	// componentDidMount(){
	// 	if (currentUser){
	// 		$.get(`${API_URL}/profile/${currentUser}`)
	// 		.then(response => {
    //             if (response[0]== null){
    //                 window.location.href = '/create'; 
    //             }
    //             else{
    //                 this.setState({profile:response[0]})
    //             }

	// 		})
	// 	}
	// 	else{
	// 		const path = window.location.pathname;
    // 		if (path !== '/login' && path !== '/registration') { 
	// 			window.location.href = '/login'; 
	// 		}
	// 	}
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

export default TrackMe;