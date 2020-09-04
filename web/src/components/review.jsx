import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom';

class Review extends Component { 
    constructor(props){
		super(props)
	} 
  render(){
    return(
<<<<<<< HEAD
        <div className="container">
            <div className="text-center"><h3>Reviews</h3></div>
            <div>{}</div>
            <div></div>
        </div>
=======
      <Card>
        <div>{this.props.user}</div>
        <div>{this.props.comment}</div>
      </Card>
            
>>>>>>> 1c3e0b2231e8653774fd30943f3f115a9695b38d
    );
  }
    
}

export default Review;