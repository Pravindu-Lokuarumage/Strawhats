import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import $ from 'jquery';


class Login extends Component {

	constructor(props){
		super(props)
		this.state ={
			msg : '',
			className:''
		}
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){
		//login funtionality
	}
	render(){
		return(
			<div className="container">
				<div id="navbar"><Navbar></Navbar></div>
	
				 <h1>Login</h1>
				 <div className="form-group">
					<label htmlFor="name">User</label>
					<input type="text" className="form-control" id="name" />
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input type="text" className="form-control" id="password" />
				</div>
				<button className="btn btn-success" onClick={this.handleClick}>Login</button>
				<p>Dont have an accouint? Create one <a href="/registeration">here</a>.</p>
				<div id="message">
					<p className={this.state.className}>{this.state.msg}</p>
				</div>
                
				<div id="footer"><Footer></Footer></div>

			 </div>
		);
	}
	
}

export default Login;