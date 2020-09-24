import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

import $ from 'jquery';

const API_URL = 'https://api-cyan-six.vercel.app/api';
// const API_URL = 'http://localhost:5000/api';
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
			<div className="container h-100">
			{/* <div id="navbar"><Navbar></Navbar></div> */}
			<div className="d-flex justify-content-center h-100">
			<div className="user_card">
				<div className="d-flex justify-content-center">
				<div className="brand_logo_container">
					<img src="https://i.imgur.com/SWp00yl.png" className="brand_logo" alt="Logo" />
				</div>
				</div>
				<div className="d-flex justify-content-center form_container">
				<form>
					<div className="input-group mb-3">
					<div className="input-group-append">
						<span className="input-group-text"><i className="fas fa-user" /></span>
					</div>
					<input type="text" className="form-control" placeholder="Username" id="name" />
					</div>
					<div className="input-group mb-2">
					<div className="input-group-append">
						<span className="input-group-text"><i className="fas fa-key" /></span>
					</div>
					<input type="password" className="form-control " placeholder="Password" id="password" />	
					<div className="input-group-append">
						<span className="input-group-text"><i className="fas fa-key" /></span>
					</div>				
					<input type="password" className="form-control " placeholder="Confirm Password" id="confirm_password" />
					</div>
					<div className="d-flex justify-content-center mt-3 login_container">
					<button type="button" name="button" className="btn login_btn" onClick={this.handleClick}>Register</button>
					</div>
				</form>
				</div>
				<div className="mt-4">
				<div className="d-flex justify-content-center links">					
					<h6>Already have an account? <a href="/login"> Login here </a></h6>										
				</div>
					<div id="message" className="d-flex justify-content-center links">
					<div className="{this.state.className}">
                    	{this.state.msg}
					</div>				        
              	</div>
				</div>
			</div>
			</div>
      </div>    	    
		);
	}
}

export default Registration;