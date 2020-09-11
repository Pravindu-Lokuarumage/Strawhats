import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

import $ from 'jquery';

const API_URL = 'https://api-cyan-six.vercel.app/api';

class Registration extends Component {
	constructor(props){
		super(props)
		this.state ={
			msg : '',
			className:''
		}
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick(){
		const user = $('#name').val();
			const password = $('#password').val();
			const confirm = $('#confirm_password').val();
			if (password === confirm){
				if (user === '' || password === ''){
					this.setState({
						msg:"Username or password cannot be empty",
						className:"alert alert-danger"
					});
				} else{
					$.post(`${API_URL}/registration`, { user, password})
					.then((response) =>{
						console.log(response)
						if (response.success) {
							window.location.href="/login"			
						} else {
							this.setState({
								msg: response.error,
								className:"alert alert-danger"
							});
						}
					});
				}
			}
			else{
				this.setState({
					msg:"Passwords do not match",
					className:"alert alert-danger"
				});
			}
	}
	render(){
    	return(	
    	    <div className="container">
    	        <div id="navbar"><Navbar></Navbar></div>

 			    <h1>Registration</h1>
 			    <div className="form-group">
			    	<label htmlFor="name">User</label>
			    	<input type="text" className="form-control" id="name" />
			    </div>
			    <div className="form-group">
			    	<label htmlFor="password">Password</label>
			    	<input type="password" className="form-control" id="password" />
			    </div>
			    <div className="form-group">
			    	<label htmlFor="confirm">Confirm</label>
			    	<input type="password" className="form-control" id="confirm_password" />
			    </div>
			    <button className="btn btn-success" id="register" onClick={this.handleClick}>Register</button>
			    <p>Already have an accouint? Login <a href="/login">here</a>.</p>
			    <div id="message">
					<p className={this.state.className}>{this.state.msg}</p>
				</div>

				<div id="footer"><Footer></Footer></div>

 		    </div>
		);
	}
}

export default Registration;