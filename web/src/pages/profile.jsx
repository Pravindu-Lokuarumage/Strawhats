import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import $ from "jquery";



class  Profile extends Component {
	render(){
		return(
            //page html
        	<div>
                <div id="navbar"><Navbar></Navbar></div>
                <div>
                    here
                </div>
			    <div id="footer"><Footer></Footer></div>

        </div>
    	);
	}
    
}

export default Profile;