import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button  from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import $ from "jquery";
// const API_URL = 'http://localhost:5000/api';
const API_URL = 'https://api-cyan-six.vercel.app/api';
const currentUser = localStorage.getItem('user');



class  Profile extends Component {
    constructor(props){
		super(props)
		this.state = {
			profile:{},
			calories:1,
			show:false, 
			show1:false,
			day:new Date().toString().slice(0,15)
		};
		this.handleEdit = this.handleEdit.bind(this);
		this.handleShow = this.handleShow.bind(this);
		this.handleShow1 = this.handleShow1.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleGoals = this.handleGoals.bind(this);
	}
	componentDidMount(){
		if (currentUser){
			$.get(`${API_URL}/profile/${currentUser}`)
			.then(response => {
                if (response[0]== null){
                    window.location.href = '/create'; 
                }
                else{
					this.setState({
						profile:response[0],
						loss:response[0].goals.loss,
						steps:response[0].goals.steps,
						intake:response[0].goals.intake,
					})
					console.log(this.state);
					console.log(this.state.profile);
					console.log(this.state.profile.goals);
					console.log(this.state.profile.goals.loss);

                }

			})
			$.get(`${API_URL}/data/${currentUser}`)
        	.then(response => {
        	    if (response[0]== null){
        	    }
        	    else{
					var Tcalories = 0;
					var Tsteps = 0;
					var Theartrate = 0;
					var tot = 0
					console.log(response[0]);
					response[0].stepsperd.forEach(element => {
						if(new Date(this.state.day).getDate() == new Date(element.time).getDate())
						{
							console.log("a")

							Tsteps = Tsteps + parseInt(element.stepsperd, 10)
							console.log(parseInt(element.stepsperd, 10))
						}
					});
					response[0].heartrate.forEach(element => {
						if(new Date(this.state.day).getDate() == new Date(element.time).getDate())
						{
							Theartrate = Theartrate + parseInt(element.heartrate, 10)
							tot = tot +1
						}
					});
					response[0].calories.forEach(element => {
						if(this.state.day == element.day)
						{
							Tcalories = parseInt(element.breakfast, 10) + parseInt(element.lunch, 10) + parseInt(element.dinner, 10)
						}
					});
					var avgH = Theartrate/tot
					this.setState({
						calories: Tcalories,
						stepsTaken: Tsteps
					});
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
				[nam]:value,
				goals:{
					loss:this.state.loss,
					steps:this.state.steps,
					intake:this.state.intake
				}
        })
        console.log(this.state);
    }
	handleClose(){
		this.setState({show:false,show1:false})
	}
	handleShow(){
		this.setState({
			weight:this.state.profile.weight,
			height:this.state.profile.height,
			goals:this.state.profile.goals
		})
		this.setState({show:true})
	}
	handleShow1(){
		this.setState({
			weight:this.state.profile.weight,
			height:this.state.profile.height,
			goals:this.state.profile.goals,
			loss:this.state.loss,
			steps:this.state.steps,
			intake:this.state.intake,
		})
		this.setState({show1:true})
	}
    handleEdit(){
        this.handleShow();
	}
	handleSubmit(){
		$.ajax({
			url: `${API_URL}/profile/${currentUser}`,
			type: 'PUT',
			data: {weight: this.state.weight, height: this.state.height, loss:this.state.loss, steps:this.state.steps, intake:this.state.intake},
			success: function(response){
				console.log(response);
				window.location.href = '/';
			} 
		})
	}
	handleGoals(){
        this.handleShow1();
	}
	render(){
		return(
        	<div>
				<div id="navbar"><Navbar></Navbar></div>
                <div className="container">
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
						<Button onClick={this.handleEdit}>Edit</Button>

						<div>Goals</div>
						<div>Weight target ({this.state.profile.weight}/{this.state.loss})</div>
						<ProgressBar animated now={(this.state.profile.weight/this.state.loss)*100} />

						<br/>
						<div>Steps ({this.state.stepsTaken}/{this.state.steps})</div>
						<ProgressBar animated now={(this.state.stepsTaken/this.state.steps)*100} />
						<br/>
						
						<div>Calorie Intake ({this.state.calories}/{this.state.intake})</div>
						<ProgressBar animated now={(this.state.calories/this.state.intake)*100} />


						<Button variant="secondary" onClick={this.handleGoals}>Add Goals</Button>
					</div>
					 
				</div>
			    <div id="footer"><Footer></Footer></div>
				<Modal show={this.state.show} onHide={this.handleClose} animation={false}>
        		    <Modal.Header closeButton>
        		    <Modal.Title>Edit Profile</Modal.Title>
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
				  
				<Modal show={this.state.show1} onHide={this.handleClose} animation={false}>
        		    <Modal.Header closeButton>
        		    	<Modal.Title>Goals</Modal.Title>
        		    </Modal.Header>
        		    <Modal.Body>
						<Form>
							<Form.Group controlId="loss">
                                <Form.Label>Weight Loss Goal</Form.Label>
                                <Form.Control placeholder="Ideal Weight" onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group controlId="steps">
                                <Form.Label>Daily Steps Goal</Form.Label>
                                <Form.Control placeholder="Steps to walk" onChange={this.handleChange}/>
                            </Form.Group>
							<Form.Group controlId="intake">
                                <Form.Label>Calorie Intake Goal</Form.Label>
                                <Form.Control placeholder="Calories of daily diet" onChange={this.handleChange}/>
                            </Form.Group>
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