import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button  from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import $ from "jquery";
// const API_URL = 'http://localhost:5000/api';
const API_URL = 'https://api-cyan-six.vercel.app/api';
const currentUser = localStorage.getItem('user');



class  Profile extends Component {
    constructor(props){
		super(props)
		this.state = {
			profile:{},
			show:false
		};
		this.handleEdit = this.handleEdit.bind(this);
		this.handleShow = this.handleShow.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleChange = this.handleChange.bind(this);


	}
	componentDidMount(){
		if (currentUser){
			$.get(`${API_URL}/profile/${currentUser}`)
			.then(response => {
                if (response[0]== null){
                    window.location.href = '/create'; 
                }
                else{
                    this.setState({profile:response[0]})
                }

			})
		}
		else{
			const path = window.location.pathname;
    		if (path !== '/login' && path !== '/registration') { 
				window.location.href = '/login'; 
			}
		}
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
		this.setState({
			weight:this.state.profile.weight,
			height:this.state.profile.height
		})
		this.setState({show:true})
	}
    handleEdit(){
        this.handleShow();
	}
	handleSubmit(){
		$.ajax({
			url: `${API_URL}/profile/${currentUser}`,
			type: 'PUT',
			data: {weight: this.state.weight, height: this.state.height},
			success: function(response){
				console.log(response);
				window.location.href = '/';
			} 
		})
	}
	render(){
		return(
            //page html
        	<div>
                <div className="container">
					<div id="navbar"><Navbar></Navbar></div>
					<h1>User Profile</h1>
					<div class="profile">
						<div class="image">
							<img src="https://cdn1.vectorstock.com/i/1000x1000/43/45/male-and-female-avatar-profile-picture-silhouette-vector-4684345.jpg" class="float-right" alt="profile avatar" width="220" height="160"></img>
							<h2>Dashboard </h2>
							<ul>
							<li>Name: {this.state.profile.name}</li>
							<li>Gender: {this.state.profile.gender}</li>
							<li>Age: {this.state.profile.age}</li>
							<li>Height: {this.state.profile.height}</li>
							<li>Weight: {this.state.profile.weight}</li>
							<li>BMI: {this.state.profile.weight/(this.state.profile.height*this.state.profile.height)*10000}</li>
							<li>Goals</li>
							<li>Friends:{this.state.profile.friends}</li>
							</ul> 
						</div>
						<button onClick={this.handleEdit}>Edit</button>
					</div>
					 
			    <div id="footer"><Footer></Footer></div>
				</div>
				<Modal show={this.state.show} onHide={this.handleClose} animation={false}>
        		    <Modal.Header closeButton>
        		    <Modal.Title>Modal heading</Modal.Title>
        		    </Modal.Header>
        		    <Modal.Body>
						<Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="weight">
                                    <Form.Label>Weight</Form.Label>
                                    <Form.Control placeholder={this.state.profile.weight} onChange={this.handleChange}/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="height">
                                    <Form.Label>Height</Form.Label>
                                    <Form.Control placeholder={this.state.profile.height} onChange={this.handleChange}/>
                                </Form.Group>
                            </Form.Row>
                            
                            <Button variant="primary" onClick={this.handleSubmit}>
                                Submit
                            </Button>
                        </Form>
				    </Modal.Body>
        		    <Modal.Footer>
        		      <Button variant="secondary" onClick={this.handleClose}>
        		        Close
        		      </Button>
        		    </Modal.Footer>
      		    </Modal>
        	</div>
    	);
	}
    
}

export default Profile;