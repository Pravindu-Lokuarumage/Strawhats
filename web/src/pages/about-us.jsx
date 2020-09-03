import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import '../myStyle.css'
import $ from "jquery";

class  AboutUs extends Component {
    handleClick(){
        //login funtionality
    }
    
	render(){
		return(
            //page html
            //1.Welcome
            //2.Our Goal
            //3.Our Team
            //4.User Reviews
            //5.Our contact info
            <div class="container">
				<div id="navbar"><Navbar></Navbar></div>
                 <div class="row">
                    <div class="col-md-5 firstRow">
                        <h2 class="text-center p-1 p-sm-3">Welcome To HAP</h2>
                        <h4 class="text-center"> Our Goal</h4>
                        <p class="text-left">Health and Prosperity (HAP).
                        Our website is based on the goal of provinding the users with an
                        interferface through which they can keep track of their health goals
                        and hopefully achieve them. Our sole purpose is to keep this website
                        interesting enough for the users to keep coming back because of it's
                        easy to use user interface and accessibility.
                        </p>
                    </div>
                    <div class="col-md-6">
                        <img src="https://t3.ftcdn.net/jpg/01/14/03/74/240_F_114037493_Ojbs6yZLQdJ48cqHmzRyAxlhIQUkGopV.jpg" class="float-right" width="350" height="270" alt="Cinque Terre"></img>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 float-left">
                            <img src="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX11814910.jpg" class="float-right" width="300" height="300" alt="Cinque Terre"></img>
                    </div>
                    <div class="col-md-6 float-right">
                        <h2 class="text-center">Meet Our Team</h2>
                        <h4 class="text-center"> Our Goal</h4>
                        <p class="text-left">Health and Prosperity (HAP).
                        Our website is based on the goal of provinding the users with an
                        interferface through which they can keep track of their health goals
                        and hopefully achieve them. Our sole purpose is to keep this website
                        interesting enough for the users to keep coming back because of it's
                        easy to use user interface and accessibility.
                        </p>
                    </div>
                </div>    

                <div class="row">
                    <div class="col-md-5 firstRow">
                        <h2 class="text-center p-1 p-sm-3">Welcome To HAP</h2>
                        <h4 class="text-center"> Our Goal</h4>
                        <p class="text-left">Health and Prosperity (HAP).
                        Our website is based on the goal of provinding the users with an
                        interferface through which they can keep track of their health goals
                        and hopefully achieve them. Our sole purpose is to keep this website
                        interesting enough for the users to keep coming back because of it's
                        easy to use user interface and accessibility.
                        </p>
                    </div>
                    <div class="col-md-6">
                        <img src="https://t3.ftcdn.net/jpg/01/14/03/74/240_F_114037493_Ojbs6yZLQdJ48cqHmzRyAxlhIQUkGopV.jpg" class="float-right" width="350" height="270" alt="Cinque Terre"></img>
                    </div>
                </div>


				 <div className="form-group">
					<label htmlFor="review">Review</label>
					<input type="text" className="form-control" id="review" />
				</div>
				<button className="btn btn-primary" onClick={this.handleClick}>Submit</button>
				<div id="footer"><Footer></Footer></div>
			 </div>
    	);
	}
    
}

export default AboutUs;