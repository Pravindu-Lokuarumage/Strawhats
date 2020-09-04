import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {Link} from 'react-router-dom';


const isAuthenticated = localStorage.getItem('isAuthenticated');
const currentUser = localStorage.getItem('user');

class Navigation extends Component { 
    constructor(props){
		super(props)
		this.state ={
            Auth:false,
            name:"Login"
        }
		this.handleClick = this.handleClick.bind(this);
	} 
    componentDidMount(){
		if (!currentUser){
            this.setState({Auth:true,name:"Login"})
            const path = window.location.pathname;
    	    if (path !== '/login' && path !== '/registeration') { 
		    	window.location.href = '/login'; 
		    }
        }
        else{
            this.setState({Auth:true,name:"Logout"})
        }		
    }
    handleClick(){
        if (isAuthenticated){
            localStorage.removeItem('user');
            localStorage.removeItem('isAuthenticated');
            this.setState({Auth:true,name:"Login"})
        }
    }
    render(){
        return(
        <Navbar bg="light" expand="lg">
            <a className="navbar-brand" href="/">HAP</a>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Link className="nav-item nav-link" to="/">Profile</Link>
                <Link className="nav-item nav-link" to="/about-me">About Us</Link>
                <Link className="nav-item nav-link" to="/info">Info</Link>
                <Link to='/login' className="nav-item nav-link" onClick={this.handleClick}>{this.state.name}</Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
        );
    }
    
}

export default Navigation;