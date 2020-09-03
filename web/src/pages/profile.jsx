import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import $ from "jquery";

const API_URL = 'http://localhost:5000/api';
const currentUser = localStorage.getItem('user');



class  Profile extends Component {
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
				this.setState({profile:response})
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
            //page html
        	<div>
                <div id="navbar"><Navbar></Navbar></div>
                <div className="container">
                    <div>
                        
                    </div>
                </div>
			    <div id="footer"><Footer></Footer></div>

        </div>
    	);
	}
    
}

export default Profile;