import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {Link} from 'react-router-dom';

class Review extends Component { 
    constructor(props){
		super(props)
	} 
  render(){
    return(
        <div className="container">
            <div className="text-center"><h3>Reviews</h3></div>
            <div>{}</div>
            <div></div>
        </div>
    );
  }
    
}

export default Review;