import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom';
import $, { uniqueSort } from 'jquery';
const API_URL = 'https://api-cyan-six.vercel.app/api';
const currentUser = localStorage.getItem('user');

class FriendList extends Component { 
    constructor(props){
        super(props)
        this.state = {
            list: [],
            profiles: []
        }
        this.handleClick_view = this.handleClick_view.bind(this);
    } 

    handleClick_view(element){
        console.log(element)
            window.location.href="/friend-profile/" + element;				                
        }

    componentDidMount(){
        $.get(`${API_URL}/profile`)
        .then((response) => {
            console.log(response)
            var Profiles = response;
            Profiles.sort((a,b) => b.points-a.points);
            this.setState({profiles : Profiles})
            console.log(Profiles);                   
        })
    }

    componentDidUpdate(){
         if(this.state.list !== this.props.friends && this.props.friends !== undefined){
             this.setState({list: this.props.friends})
         }   
    }
  render(){
    return(
      <Card>
        <div>
            <h3>Friends</h3>
            {this.state.profiles.map(profiles => {
                if(this.state.list.includes(profiles.user)){
                    return(
                    <div>
                        {profiles.user}
                        <button type="button" name="button" className="viewfrnd_btn" id ={profiles.user} onClick={()=>this.handleClick_view(profiles.user)}>View Profile</button>
                    </div>
                    )
                }
                if(profiles.user === currentUser){
                    return(
                    <div>
                        {profiles.user}
                    </div>
                    )
                }
            })}
        </div>
      </Card>            
    );
  }
    
}

export default FriendList;