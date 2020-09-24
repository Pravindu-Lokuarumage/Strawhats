import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button  from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
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
            friends:[]
		};
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
                        for (let index = 0; index < this.state.friends.length; index++) {
                            const element = this.state.friends[index];
                            a = event.users.includes(element);  
                            if (a){
                                a = !event.users.includes(currentUser);
                                break;
                            }                          
                        }
                        if (a){

                            return(
                                <div>
                                    <Event key={event._id} users ={event.users} name={event.name} start = {event.start} end ={event.end}></Event> 
                                </div>
                            )
                        }                                           
                    })}
					</div>
					 
				</div>
			    <div id="footer"><Footer></Footer></div>
				
        	</div>
    	);
	}
    
}

export default Activities;