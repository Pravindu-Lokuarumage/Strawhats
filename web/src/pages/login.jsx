import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import $ from 'jquery';
import '../myStyle.css'



const API_URL = 'https://api-cyan-six.vercel.app/api';
// const API_URL = 'http://localhost:5000/api';
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
		const user = $('#user').val();
		const password = $('#password').val();
		$.post(`${API_URL}/authenticate`, { user, password })
		.then((response) =>{
			if (response.success) {
				localStorage.setItem('user', user);
				localStorage.setItem('isAuthenticated', true);
				window.location.href = '/';
			} 	else {
					this.setState({
						msg: response.error,
						className:"alert alert-danger"
				});
			}
		});
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
                  <input type="text" className="form-control" placeholder="Username" id="user" />
                </div>
                <div className="input-group mb-2">
                  <div className="input-group-append">
                    <span className="input-group-text"><i className="fas fa-key" /></span>
                  </div>
                  <input type="password" className="form-control " placeholder="Password" id="password" />
                </div>
                <div className="d-flex justify-content-center mt-3 login_container">
                  <button type="button" name="button" className="btn login_btn" onClick={this.handleClick}>Login</button>
                </div>
              </form>
            </div>
            <div className="mt-4">
              <div className="d-flex justify-content-center links">
                <h6>Don't have an account? <a href="/registeration">Register here</a></h6>
                </div>
                <div className="d-flex justify-content-center links">
                <h6>Want to <a href="/changepw">change password?</a></h6>
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

export default Login;