import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button  from 'react-bootstrap/Button';
import Goals from '../components/goals'
import $ from "jquery";
import Event from '../components/event';

// const API_URL = 'http://localhost:5000/api';
const API_URL = 'https://api-cyan-six.vercel.app/api';
const currentUser = localStorage.getItem('user');




class  Activities extends Component {
    constructor(props){
		super(props)
		this.state = {
            events:[],
            profile:{},
            friends:[],
            show:false,
            msg:""
        };
        this.handleNew = this.handleNew.bind(this);
        this.handleJoin = this.handleJoin.bind(this);
        this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleChange = this.handleChange.bind(this);
        
    }
    handleChange(event){
		let value
		value = event.target.value;
        let nam = event.target.id;
        this.setState({
				[nam]:value
        })
        console.log(this.state);
    }
    handleClose(){
		this.setState({show:false})
	}
	handleShow(){
		this.setState({show:true})
    }
    handleJoin(event){
        $.post(`${API_URL}/event/${currentUser}`, {user: event.target.user, name: event.target.name})
		.then((response) =>{
			console.log(response)
			if (response.success) {
				window.location.href="/activities"			
			}
		});
    }
    handleNew(){
        if(new Date(this.state.end).getTime()>new Date(this.state.start).getTime()){
            if (new Date()<new Date(this.state.start).getTime()){
                console.log(this.state.name)
                if (this.state.name === "" || this.state.name === undefined){
                    this.setState({msg:"name cannot be empty"})
                }
                else{

                    $.post(`${API_URL}/event/${currentUser}`, {start: this.state.start, end: this.state.end, name: this.state.name})
                    .then((response) =>{
                	    console.log(response)
                	    if (response.success) {
                        		window.location.href="/activities"			
                        	}
                    });
                }
            }
            else{
                this.setState({msg:"start time after today"})
            }
        }
        else{
            this.setState({msg:"start time should be before end"})
        }
        
    }
	componentDidMount(){
		$.get(`${API_URL}/event`)
        .then((response) => {
            this.setState({events:response}) 
            console.log(this.state.events);                     
        })
        $.get(`${API_URL}/profile/${currentUser}`)
        .then((response) => {
            this.setState({
                profile:response[0],
                friends:response[0].friends
            }) 
            console.log(this.state.profile);                     
        })
	}
	render(){
		return(
        	<div>
				<div id="navbar"><Navbar></Navbar></div>
                <div className="container">
					<h1>Activities</h1>
					<div class="event">
                    {this.state.events.map(event => {
                        var a = event.users.includes(currentUser);
                        if (a){
                            return(
                                <div>
                                    <Event key={event._id} users ={event.users} name={event.name} start = {event.start} end ={event.end}></Event> 
                                </div>
                            )
                        }                                           
                    })}
					<p>friends events</p>
                    {this.state.events.map(event => {
                        this.state.friends.values()
                        var a = false;
                        var b = false;
                        for (let index = 0; index < this.state.friends.length; index++) {
                            const element = this.state.friends[index];
                            a = event.users.includes(element);  
                            if (a){
                                a = !event.users.includes(currentUser);
                                break;
                            }                          
                        }
                        b = new Date().getTime() < new Date(event.start).getTime();
                        if (a){
                            if (b){
                                return(
                                    <div>
                                        <Event key={event._id} users ={event.users} name={event.name} start = {event.start} end ={event.end}></Event>
                                        <Button id={event.users} name={event.name} onClick={this.handleJoin}>Join</Button> 
                                    </div>
                                )

                            }
                            else{
                                return(
                                    <div>
                                        <Event key={event._id} users ={event.users} name={event.name} start = {event.start} end ={event.end}></Event>
                                    </div>
                                )
                            }
                            
                        }                                           
                    })}
					</div>
					 <div>Create Event</div>
                     <Button onClick={this.handleShow}>Create Event</Button>
				</div>
			    <div id="footer"><Footer></Footer></div>
				<Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                    <Modal.Header closeButton>
                    <Modal.Title>Event details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
							<Form.Group controlId="name">
                                <Form.Label>Event Name</Form.Label>
                                <Form.Control required onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group controlId="start">
                                <Form.Label>Start Time</Form.Label>
                                <Form.Control required type="datetime-local" onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group controlId="end">
                                <Form.Label>End Time</Form.Label>
                                <Form.Control required type="datetime-local" onChange={this.handleChange}/>
                            </Form.Group>
                            <Button variant="primary" onClick={this.handleNew}>
                                Submit
                            </Button>
                            <div>{this.state.msg}</div>
                        </Form>
		            </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
      	        </Modal>
        	</div>
    	);
	}
    
}

export default Activities;