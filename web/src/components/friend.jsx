import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom';

class Friend extends Component { 
    constructor(props){
		super(props)
	} 
  render(){
    return(
      <Card>
        <div>{this.props.user}</div>
        <div>{this.props.gender}</div>
        <div>{this.props.age}</div>
      </Card>            
    );
  }
    
}

export default Friend;