import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import ProgressBar from 'react-bootstrap/ProgressBar'
import {Link} from 'react-router-dom';

class Friend extends Component { 
    constructor(props){
		super(props)
	} 
  render(){
    return(
      <div>
            <div>Calories to Burn daily ({this.props.weight}/{this.props.loss}) Target Weight ({this.props.target})</div>
			<ProgressBar animated now={(this.props.weight/this.props.loss)*100} />
			<br/>
			<div>Steps ({this.props.stepsTaken}/{this.props.steps})</div>
			<ProgressBar animated now={(this.props.stepsTaken/this.props.steps)*100} />
			<br/>					
			<div>Calorie Intake ({this.props.calories}/{this.props.intake})</div>
			<ProgressBar animated now={(this.props.calories/this.props.intake)*100} />
      </div>            
    );
  }
    
}

export default Friend;

