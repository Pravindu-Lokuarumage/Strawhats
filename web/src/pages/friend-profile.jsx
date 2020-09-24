import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import $ from "jquery";
import Goals from '../components/goals';
import ProgressBar from 'react-bootstrap/ProgressBar';



const API_URL = 'https://api-cyan-six.vercel.app/api';
const currentUser = localStorage.getItem('user');
var str =window.location.pathname.split("/")
console.log(str)
const UserFriend = str[2];

class  FriendProfile extends Component {
   
    constructor(props){
		super(props)
		this.state ={
            profile:{},
			day:new Date().toString().slice(0,15)
		}
    }

    

    componentWillMount(){
        $.get(`${API_URL}/profile/${UserFriend}`)
        .then((response) => {
            console.log(response)
            if (response.length === 0)
            {
                window.location.href ='/404';
            }
            else{
                this.setState({
                    profile:response[0],
                    loss:response[0].goals.loss,
					steps:response[0].goals.steps,
					intake:response[0].goals.intake
                }) 
            
            console.log(this.state.profile); 

            }
                        
        }) 
		$.get(`${API_URL}/data/${UserFriend}`)
    	.then(response => {
    	    if (response[0]== null){
    	    }
    	    else{
				var Tcalories = 0;
				var Tsteps = 0;
				var Theartrate = 0;
				var total = 0
				console.log(response[0]);
				response[0].stepsperd.forEach(element => {
					if(new Date(this.state.day).getDate() === new Date(element.time).getDate())
					{
						Tsteps = Tsteps + parseInt(element.stepsperd, 10)
						console.log(parseInt(element.stepsperd, 10))
					}
				});
				response[0].heartrate.forEach(element => {
					if(new Date(this.state.day).getDate() == new Date(element.time).getDate())
					{
						Theartrate = Theartrate + parseInt(element.heartrate, 10)
						total = total +1
					}
				});
				response[0].calories.forEach(element => {
					if(this.state.day == element.day)
					{
						Tcalories = parseInt(element.breakfast, 10) + parseInt(element.lunch, 10) + parseInt(element.dinner, 10)
					}
                });
				var avgH = Theartrate/total 
				var calB = 0
				var hours = new Date().getHours()

						if (this.state.profile.gender === 'Male')
						{
							calB = ((-55.0969 + (0.6309*avgH) + (0.1988*this.state.profile.weight) + (0.2017*this.state.profile.age))/4.184)*60*hours
						}
						else{
							calB = ((-20.4022 + (0.4472*avgH) - (0.1263*this.state.profile.weight) + (0.074*this.state.profile.age))/4.184)*60*hours
						}
						calB = Math.round(calB)
				this.setState({
					calories: Tcalories,
					stepsTaken: Tsteps,
					Burned: calB
				});
    	    }
    	})
	}
    
           
	render(){
		return(
            //page html
        	<div>
                <div class="body">
                <div id="navbar"><Navbar></Navbar></div>
                <div className="container">					
                    
				<div className="row">
          		<div className="col-lg-7 mx-auto text-white text-center pt-5">
           		 <h1 className="display-5">Dashboard</h1>
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

                     <br></br><br></br><br></br> 
                      <div>Goals</div>
						<Goals target = {this.state.loss} weight={this.state.Burned} loss={Math.abs(this.state.intake) + (this.state.profile.weight-this.state.loss)/(Math.abs(this.state.profile.weight-this.state.loss))*600} stepsTaken={this.state.stepsTaken} steps={this.state.steps} calories={this.state.calories} intake={this.state.intake}></Goals>  
					</div>
            		</div>
					
          			</div>
        		</div>
                    
                    </div>
			    
				</div>
        	
            <div id="footer"><Footer></Footer></div>
            </div>
    	);
	}
    
}

export default FriendProfile;