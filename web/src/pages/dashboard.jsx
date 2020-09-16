import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import $ from "jquery";

const API_URL = 'https://api-cyan-six.vercel.app/api';
const currentUser = localStorage.getItem('user');

class  Dashboard extends Component {
   
    constructor(props){
		super(props)
		this.state ={
		}
    }
	render(){
		return(
            //page html
        	<div>
                <div id="navbar"><Navbar></Navbar></div>
                <div className="container">
                    <div className="text-center">
                        <h1>DashBoard</h1>
                    </div>
                    <div className="text-center">
                        <h1>User Profile Summary</h1>
                        <p>1.Name, 2.Profile Picture</p>
                        <p>(small section, just for the overview)</p>
                    </div>
                    <div className="text-left">
                        <h1>User History/Data Analysis section</h1>
                        <p>1.Weight loss, 2.Steps Taken, 3.Calories Taken/burned, 4.Average heartRate</p>
                        <p>Information can be displayed normally or shown using Graphs etc. for e.g.</p>
                        <p>Graph of No. of calories gained vs no of calories burned (overall difference as well maybe) etc</p>
                    </div>
                    <div className="text-right">
                        <h1>User Goals Section</h1>
                        <p>1.Goals for Weight loss, 2.Goals for calories burned, 3.(Insert anyother Goal)</p>
                        <p>Progress bar can be used, also graphs to show how much of the targeted goal has been achieved</p>
                    </div>
                    <div className="text-center">
                        <h1>(Possibly) Something Related to a Social Aspect</h1>
                        <p>Im not sure about this part but maybe we can implement some social aspect to interact</p>
                        <p>with friends or users or something (maybe we can implement the Friendlist Ranking system here instead of in Profile) (note: wont work on this until the other all tasks are completed)</p>
                    </div>
				</div>
                <div id="footer"><Footer></Footer></div>
        	</div>
    	);
	}
    
}

export default Dashboard;