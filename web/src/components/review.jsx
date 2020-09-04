import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom';

class Review extends Component { 
    constructor(props){
		super(props)
		/*this.state ={
            like:''
        }*/
		//this.handleClick = this.handleClick.bind(this);
	} 
  render(){
    return(
      <Card>
        <div>{this.props.user}</div>
        <div>{this.props.comment}</div>
      </Card>
            
    );
  }
    
}

export default Review;