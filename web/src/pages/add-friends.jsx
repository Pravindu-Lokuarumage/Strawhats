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
        this.handleClick_view = this.handleClick_view.bind(this);
        this.handleClick_add = this.handleClick_add.bind(this);
    }

    handleClick_view(element){
            console.log(element)
				window.location.href="/friend-profile/" + element;				                
			}
    
    handleClick_add(friends){
        $.post(`${API_URL}/profile/friend/${currentUser}`,{friends})
        .then((response) => {
            console.log(this.state.profile); 
            window.location.href="/add-friends";
        })
    }
    

    componentWillMount(){
        $.get(`${API_URL}/profile/${currentUser}`)
        .then((response) => {
            this.setState({user:response[0].friends}) 
            console.log(this.state.user); 
                           
        })
        $.get(`${API_URL}/profile`)
        .then((response) => {
            this.setState({profile:response}) 
            console.log(this.state.profile);                     
        })
        
    }

    componentDidMount(){
        this.setState({button: $('#friend')})
    }

           
	render(){
		return(
            //page html
        	<div>
                <div class="body">
                <div id="navbar"><Navbar></Navbar></div>
                
                <div className="container">
					
                <div className="col-lg-7 mx-auto text-white text-center pt-2">
           		 <h3 className="display-4">DISCOVER</h3>
          		</div>
                    <div >
                   
                    <div class="profiles">
                        {this.state.profile.map(friends =>{
                        if(friends.user !== currentUser && (this.state.user === undefined ||this.state.user.indexOf(friends.user) === -1 )){
                            return(<div>
                            <Friend key={friends._id} user={friends.user} age = {friends.age} gender = {friends.gender}></Friend> 
                            <button type="button" name="button" className="float-right btn btn-dark " id ={friends.user} onClick={()=>this.handleClick_view(friends.user)}>View Profile </button>
                            <button type="button" name="button" className="btn btn-dark"  id ={friends.user} onClick={()=>this.handleClick_add(friends.user)}>Add Friend</button>                            
                            </div>)                      
                            }   
    })}	                                                                   			
                    </div>	
                    </div>
			    
        	</div>
            </div>
            <div id="footer"><Footer></Footer></div>
				</div>
    	);
	}
    
}

export default AddFriends;