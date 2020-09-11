import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import $ from "jquery";
import Friend from '../components/friend';

const API_URL = 'https://api-cyan-six.vercel.app/api';
const currentUser = localStorage.getItem('user');

class  AddFriends extends Component {
   
    constructor(props){
		super(props)
		this.state ={
			profile:[]
		}
    }

    handleClick(element){
            console.log(element)
				window.location.href="/friend-profile/" + element;				                
			}

    

    componentDidMount(){
        $.get(`${API_URL}/profile`)
        .then((response) => {
            this.setState({profile:response}) 
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
                        {this.state.profile.map(friends =>(
                            <div>
                            <Friend key={friends._id} user={friends.user}></Friend> 
                            <button type="button" name="button" className="viewfrnd_btn" id ={friends.user} onClick={()=>this.handleClick(friends.user)}>View Profile</button>
                            <button type="button" name="button" className="addfrnd_btn"  onClick={()=>this.handleClick}>Add Friend</button>   
                            </div>                        
                        ))}	                        
                                               			
					</div>
                    </div>
			    <div id="footer"><Footer></Footer></div>
				</div>
        	</div>
    	);
	}
    
}

export default AddFriends;