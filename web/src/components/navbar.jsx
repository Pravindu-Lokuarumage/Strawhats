import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {Link} from 'react-router-dom';

class Navigation extends Component {  
  render(){
    return(
      <Navbar bg="light" expand="lg">
        <a className="navbar-brand" href="/">HAP</a>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className="nav-item nav-link" to="/">Profile</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
    
}

export default Navigation;