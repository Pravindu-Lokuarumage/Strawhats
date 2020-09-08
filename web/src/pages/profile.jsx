import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import $ from "jquery";

const API_URL = 'https://api-cyan-six.vercel.app/api';
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
            //page html
        	<div>
                <div className="container">
					<div id="navbar"><Navbar></Navbar></div>
					<h1>User Profile</h1>
					<div class="profile">
						<div class="image">
							<img src="https://cdn1.vectorstock.com/i/1000x1000/43/45/male-and-female-avatar-profile-picture-silhouette-vector-4684345.jpg" class="float-right" alt="profile avatar" width="220" height="160"></img>
							<h2>Dashboard </h2>
							<ul>
							<li>Name: {this.state.profile.name}</li>
							<li>Gender: {this.state.profile.gender}</li>
							<li>Age: {this.state.profile.age}</li>
							<li>Height: {this.state.profile.height}</li>
							<li>Weight: {this.state.profile.weight}</li>
							<li>BMI: {this.state.profile.weight/(this.state.profile.height*this.state.profile.height)*10000}</li>
							<li>Goals</li>
							</ul> 
						</div>
					</div>
					 
			    <div id="footer"><Footer></Footer></div>
				</div>
        	</div>
    	);
	}
    
}

export default Profile;