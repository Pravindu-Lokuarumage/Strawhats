import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import $ from "jquery";
import Friend from '../components/friend';



const API_URL = 'https://api-cyan-six.vercel.app/api';
const currentUser = localStorage.getItem('user');
const UserFriend = localStorage.getItem('user');

class  FriendProfile extends Component {
   
    constructor(props){
		super(props)
		this.state ={
			profile:{}
		}
    }

    componentDidMount(){
        $.get(`${API_URL}/profile/${UserFriend}`)
        .then((response) => {
            this.setState({profile:response[0]}) 
            console.log(this.state.profile);             
        })
    }
           
	render(){
		return(
            //page html
        	<div>
                <div className="container">
					<div id="navbar"><Navbar></Navbar></div>
                    <div>
                    <div class="profiles">						
						<Friend user={this.state.profile.user} age={this.state.profile.age}></Friend>

					</div>
                    </div>
			    <div id="footer"><Footer></Footer></div>
				</div>
        	</div>
    	);
	}
    
}

export default FriendProfile;