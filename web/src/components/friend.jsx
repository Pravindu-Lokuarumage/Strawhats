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
        <div class="card bg-secondary text-white">
        <div>Name:- {this.props.user}</div>
        <div>Gender:- {this.props.gender}</div>
        <div>Age:-    {this.props.age}</div>
        </div>
      </Card>        
    );
  }
    
}

export default Friend;