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
							<Friend key={friends._id} user={friends.user}></Friend>
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