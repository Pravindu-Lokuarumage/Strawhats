import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import $ from "jquery";



class  AboutUs extends Component {
    handleClick(){
        //login funtionality
    }
    
	render(){
		return(
            //page html
            //1.Welcome
            //2.About us
            //3.Our mission
            <div className="container">
				<div id="navbar"><Navbar></Navbar></div>
                {/* <img src="https://t3.ftcdn.net/jpg/01/14/03/74/240_F_114037493_Ojbs6yZLQdJ48cqHmzRyAxlhIQUkGopV.jpg" class="img-fluid" alt="Cinque Terre"></img>
                 <h1 class="text-center"> Welcome</h1>
                 <h1>About us</h1> */} 

                 <div class="row">
                    <div class="col-md-4">
                        <h2 class="text-center">Welcome To HAP</h2>
                        <h4 class="text-center"> Our Goal</h4>
                        <p class="text-left">Health and Prosperity (HAP).
                        Our website is based on the goal of provinding the users with an
                        interferface through which they can keep track of their health goals
                        and hopefully achieve them. Our sole purpose is to keep this website
                        interesting enough for the users to keep coming back because of it's
                        easy to use user interface and accessibility.
                        </p>
                    </div>
                        <div class="col-md-6"><img src="https://t3.ftcdn.net/jpg/01/14/03/74/240_F_114037493_Ojbs6yZLQdJ48cqHmzRyAxlhIQUkGopV.jpg" class="float-right" width="350" height="270" alt="Cinque Terre"></img>
                    </div>
                </div>

				 <div className="form-group">
					<label htmlFor="review">Review</label>
					<input type="text" className="form-control" id="review" />
				</div>
				<button className="btn btn-success" onClick={this.handleClick}>Submit</button>
				<div id="footer"><Footer></Footer></div>
			 </div>
    	);
	}
    
}

export default AboutUs;