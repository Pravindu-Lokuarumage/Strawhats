import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

import $ from 'jquery';


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
        //functionality        
	}
	render(){
    	return(
    	    <div className="container">
    	        <div id="navbar"><Navbar></Navbar></div>

 			    <h1>Registration</h1>
 			    <div class="form-group">
			    	<label htmlfor="name">User</label>
			    	<input type="text" className="form-control" id="name" />
			    </div>
			    <div class="form-group">
			    	<label htmlfor="password">Password</label>
			    	<input type="text" className="form-control" id="password" />
			    </div>
			    <div class="form-group">
			    	<label htmlfor="confirm">Confirm</label>
			    	<input type="text" className="form-control" id="confirm_password" />
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