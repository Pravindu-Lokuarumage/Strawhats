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
import Friendlist from '../components/friend-list';

// const API_URL = 'http://localhost:5000/api';
const API_URL = 'https://api-cyan-six.vercel.app/api';
const currentUser = localStorage.getItem('user');




class  Profile extends Component {
    constructor(props){
		super(props)
		this.state = {
			profile:{},
			calories:0,
			caloriesEaten:0,
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
	arrSum = function(arr){
		return arr.reduce(function(a,b){
		  return Number(a) + Number(b)
		}, 0);
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
						weight:response[0].weight.toFixed(0),
						loss:response[0].goals.loss,
						steps:response[0].goals.steps,
						intake:response[0].goals.intake,
					})
					console.log(this.state);
					console.log(this.state.profile);
					console.log(this.state.profile.goals);
					console.log(this.state.profile.goals.loss);
					return (response[0]);
                }

			})
			.then(res =>{
				console.log("g")
				console.log(res)
				$.get(`${API_URL}/data/${currentUser}`)
        		.then(response => {
        		    if (response[0]== null){
        		    }
        		    else{
						var Tcalories = 0;
						var TcaloriesYesterday = 0;
						var Tsteps = 0;
						var TstepsYesterday = 0;
						var Theartrate = 0;
						var tot = 0
						console.log(response[0]);
						response[0].stepsperd.forEach(element => {
							if(new Date(this.state.day).getDate() === new Date(element.time).getDate())
							{
								Tsteps = Tsteps + parseInt(element.stepsperd, 10)
							}
							if(new Date(this.state.day).getDate()-1 === new Date(element.time).getDate())
							{
								TstepsYesterday = TstepsYesterday + parseInt(element.stepsperd, 10)
							}
						});
						response[0].heartrate.forEach(element => {
							if(new Date(this.state.day).getDate() === new Date(element.time).getDate())
							{
								Theartrate = Theartrate + parseInt(element.heartrate, 10)
								tot = tot +1
							}
						});
						response[0].calories.forEach(element => {
							if(this.state.day === element.day)
							{
								if (element.breakfast !== null)
								{
									Tcalories = Tcalories + parseInt(element.breakfast, 10)
								}
								if (element.lunch !== null)
								{
									Tcalories = Tcalories + parseInt(element.lunch, 10)
								}
								if (element.dinner !== null)
								{
									Tcalories = Tcalories + parseInt(element.dinner, 10)
								}
							}
							if(new Date(new Date(this.state.day).setDate(new Date(this.state.day).getDate()-1)).toDateString() === new Date(element.day).toDateString())
							{
								if (element.breakfast !== null)
								{
									TcaloriesYesterday = TcaloriesYesterday + parseInt(element.breakfast, 10)
								}
								if (element.lunch !== null)
								{
									TcaloriesYesterday = TcaloriesYesterday + parseInt(element.lunch, 10)
								}
								if (element.dinner !== null)
								{
									TcaloriesYesterday = TcaloriesYesterday + parseInt(element.dinner, 10)
								}
								console.log(TcaloriesYesterday)
							}
						});
						var calB = 0
						var avgH = Theartrate/tot
						var hours = new Date().getHours()

						if (this.state.profile.gender === 'Male')
						{
							calB = ((-55.0969 + (0.6309*avgH) + (0.1988*this.state.profile.weight) + (0.2017*this.state.profile.age))/4.184)*60*hours/1.5
						}
						else{
							calB = ((-20.4022 + (0.4472*avgH) - (0.1263*this.state.profile.weight) + (0.074*this.state.profile.age))/4.184)*60*hours/1.5
						}
						calB = Math.round(calB)
						this.setState({
							calories: Tcalories,
							caloriesEaten: TcaloriesYesterday,
							stepsTakenY: TstepsYesterday,
							stepsTaken: Tsteps,
							Burned: calB
						});
						console.log(res)

						return(res)
        		    }
				})
				.then(res =>{
					console.log(new Date(this.state.profile.updated).toDateString())
					console.log(new Date().toDateString())
					console.log(this.state)
					if(new Date(this.state.profile.updated).toDateString() !== new Date().toDateString()){
						$.get(`${API_URL}/data/${currentUser}`)
        				.then(response => {
        				    if (response[0]== null){
        				    }
        				    else{
								var caloriesCal = false
								var caloriesLost = 0
        				        response[0].caloriesBurn.forEach(element =>{
        				          var timestamp = new Date(element.time)
								
        				          if (timestamp.getDate() === new Date().getDate() - 1)
        				          {
									caloriesLost = element.caloriesBurn
									caloriesCal = true
        				          }							  
								})
								console.log(caloriesCal)

								if (!caloriesCal)
                				{
                				  	var harr = []
                				  	response[0].heartrate.forEach(element => {
										var timestamp = new Date(element.time)
										console.log(timestamp)
										
                				    	if (timestamp.getDate() === new Date().getDate() - 1)
                				    	{
                				    		harr.push(element.heartrate);
                				    	}
                					}); 
									var avg = this.arrSum(harr)/harr.length
									if (harr.length === 0){
										avg = 65
									}
									
                					var val = 0;
                					if (this.state.profile.gender === 'Male')
									{
										val = ((-55.0969 + (0.6309*avg) + (0.1988*this.state.profile.weight) + (0.2017*this.state.profile.age))/4.184)*60*24
									}
                					else
                					{
									    val = ((-20.4022 + (0.4472*avg) - (0.1263*this.state.profile.weight) + (0.074*this.state.profile.age))/4.184)*60*24
									}
									
									caloriesLost = val

									console.log(caloriesLost)
									
                					$.post(`${API_URL}/data/${currentUser}`, {caloriesBurn: caloriesLost})
                					.then((response) =>{
	    	    					    if (response.success) {
                					    	console.log(response);
	    	    						}
	    	    					});
								}

								return(caloriesLost)
							}
						})
						.then(lost =>{
							console.log(lost)
							var w = this.state.profile.weight;
							w = (this.state.caloriesEaten - lost)/3500 *0.45 + w
							$.ajax({
								url: `${API_URL}/profile/${currentUser}`,
								type: 'PUT',
								data: {weight: w, points:this.state.stepsTakenY, updated: new Date()},
								success: function(response){
									console.log(response);
									window.location.href = '/';
								} 
							})
						})
					}
				})
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
		var BMR = 0
		if (this.state.profile.gender === 'male')
		{
			BMR = 88.362 + (13.397 * this.state.profile.weight) + (4.799 * this.state.profile.height) - (5.677 * this.state.profile.age)
		}
		else
		{
			BMR = 447.593 + (9.247 * this.state.profile.weight) + (3.098 * this.state.profile.height) - (4.330 * this.state.profile.age)
		}
		if(this.state.loss - this.state.profile.weight > 0)
		{
			BMR = BMR + 1000 + 10 *(this.state.loss - this.state.profile.weight)
		}
		else
		{
			BMR = BMR + 200 + 10 *(this.state.loss - this.state.profile.weight)
		}
		BMR = Math.round(BMR)
		$.ajax({
			url: `${API_URL}/profile/${currentUser}`,
			type: 'PUT',
			data: {weight: this.state.weight, height: this.state.height, loss:this.state.loss, steps:this.state.steps, intake:BMR},
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
				<div class="body">
				<div id="navbar"><Navbar></Navbar></div>
                <div className="container">
				<div className="row">
          		<div className="col-lg-7 mx-auto text-white text-center pt-5">
           		 <h1 className="display-3">Profile Dashboard</h1>
          		</div>
				  </div>
				  
				  <div className="bg-white shadow rounded overflow-hidden">
					  
        			<div className="px-4 pt-0 pb-4 bg-dark">
         				 <div className="media align-items-end profile-header"> 
						            
            				<div className="media-body mb-5 text-white">
								<br></br>
							<img src="https://www.iconfinder.com/data/icons/professional-avatar-5/48/manager_male_avatar_men_character_professions-512.png" class="float-right" alt="profile avatar" width="220" height="200"></img>
              			<h4 className="mt-0 mb-0">{this.state.profile.name}</h4>
						  <br></br>
              		<p className="medium mb-4"> <i className="fa fa-map-marker mr-2" />Gender: {this.state.profile.gender}</p>
					  <p className="medium mb-4"> <i className="fa fa-map-marker mr-2" />Age: {this.state.profile.age}</p>
					  <p className="medium mb-4"> <i className="fa fa-map-marker mr-2" />Height: {this.state.profile.height}</p>
					  <p className="medium mb-4"> <i className="fa fa-map-marker mr-2" />Weight: {this.state.weight}</p>
					  <p className="medium mb-4"> <i className="fa fa-map-marker mr-2" />BMI: {this.state.profile.weight/(this.state.profile.height*this.state.profile.height)*10000}</p>
					  <button type = "button" class = "float-right btn btn-light" onClick={this.handleEdit}>  Edit Profile </button>
					  <br></br><br></br><br></br><br></br>
					  <h3>Goals</h3>
						<Goals target = {this.state.loss} weight={this.state.Burned} loss={Math.abs(this.state.intake) + (this.state.profile.weight-this.state.loss)/(Math.abs(this.state.profile.weight-this.state.loss))*600} stepsTaken={this.state.stepsTaken} steps={this.state.steps} calories={this.state.calories} intake={this.state.intake}></Goals>
						<br/>
						<button type = "button" class = "float-right btn btn-light" onClick={this.handleEdit}>  Add goals </button>
						<br></br><br></br><br></br><br></br><br></br>
						<div className="center friends">						
							<Friendlist friends = {this.state.profile.friends}> </Friendlist>
						</div>
					</div>
            		</div>
					
          			</div>
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
			</div>
    	);
	}
    
}

export default Profile;