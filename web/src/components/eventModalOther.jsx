import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Chart from '../components/barChart'
import {Link} from 'react-router-dom';
import $ from "jquery";

const API_URL = 'https://api-cyan-six.vercel.app/api';
const currentUser = localStorage.getItem('user');
class EventModal extends Component { 
    constructor(props){
        super(props)
        this.state = {
            show:false
        }
        
		this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleJoin = this.handleJoin.bind(this);
        
    } 
    static defaultProps = {
        start: new Date(),
        end: new Date(),
        users:[]
      }
    handleClose(){
		this.setState({show:false})
	}
	handleShow(){
		this.setState({show:true})
    }
    handleJoin(event){
        $.post(`${API_URL}/event/${currentUser}`, {name: event.target.name})
		.then((response) =>{
			console.log(response)
			if (response.success) {
				window.location.href="/activities"			
			}
		});
    }
  render(){
    return(
      <>
        <Button onClick={this.handleShow}>View Event</Button>

        <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
            <Modal.Header closeButton>
            <Modal.Title>{this.props.name} - {this.props.users[0]}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>Participants</div>
                <ul>
                    {this.props.users.map(user => {
                        return(
                            <li>{user}</li>
                        )
                    })}
				</ul> 
                <div>Start: {this.props.start}</div>
                <div>End: {this.props.end}</div>
                <Button name={this.props.name} onClick={this.handleJoin}>Join</Button>
		    </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
      	</Modal>
      </>            
    )
  }
    
}

export default EventModal;