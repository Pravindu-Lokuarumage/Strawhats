import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import '../myStyle.css'
import $ from "jquery";
import Reviews from '../components/review';
const API_URL = 'https://api-cyan-six.vercel.app/api';
const currentUser = localStorage.getItem('user');

class  AboutUs extends Component {
    constructor(props){
		super(props)
		this.state ={
            reviews:[]
		}
		this.handleClick = this.handleClick.bind(this);
	}
    handleClick(){
        const user = localStorage.getItem('user')
        const comment = $('#comment').val();
        $.post(`${API_URL}/review`, { user, comment})
        .then((response) =>{
            console.log(response)
			if (response.success) {
                $.get(`${API_URL}/review`)
                .then((response) => {
                    console.log(this.state)
                    this.setState({reviews:response})  
                    console.log(this.state)  
                }) 
			}
		});
    }
    componentDidMount(){
        $.get(`${API_URL}/review`)
        .then((response) => {
            console.log(this.state)
            this.setState({reviews:response})  
            console.log(this.state)  
        }) 
    }
	render(){
		return(
            //Note: might have to change 3rd picture for a clipart for the Future plans.
            //page html
            //1.Welcome --//Our Goal
            //2.Our Team
            //3.Our Future
            //3.User Reviews
            //4.Our contact info
            <div class="forBackground">
            <div id="navbar"><Navbar></Navbar></div>
                <div className="container mainDiv">
                    {/* <div id="navbar"><Navbar></Navbar></div> */}
                    <div className="row logoRow">
                        <div className="col-md-4">
                                <img src="https://i.imgur.com/SWp00yl.png" className="float-right" width="350" height="350" alt="Cinque Terre"></img>
                        </div>
                        <div className="col-md-7 position-relative logoCol">
                            <h2 className="text-left logoHeader d-flex align-items-center"> ABOUT US</h2>
                            <p className="text-left">Want to know about who we are? What we do?
                            What is HAP? and where to contact us?. If yes, then you are on the right place.
                            </p>
                        </div>
                    </div>
                    <div className="row firstRow">
                        <div className="col-md-5 firstCol">
                            <h2 className="text-center firstHeader">WELCOME TO HAP</h2>
                            <h4 className="text-center goalHeader"> Our Goal</h4>
                            <p className="text-left">Health and Prosperity (HAP).
                            Our website is based on the goal of provinding the users with an
                            interferface through which they can keep track of their health goals
                            and hopefully achieve them. Our sole purpose is to keep this website
                            interesting enough for the users to keep coming back because of it's
                            easy to use user interface and accessibility.
                            </p>
                        </div>
                        <div className="col-md-6">
                            <img src="https://img.freepik.com/free-vector/crossfit-motivational-emblem-flat-style_23-2148223176.jpg?size=338&ext=jpg" className="float-right" width="350" height="274" alt="Cinque Terre"></img>
                        </div>
                    </div>
                    <div className="row secondRow">
                        <div className="col-md-6 float-left">
                                <img src="https://i.imgur.com/rGj6WJq.png" className="float-right" width="350" height="270" alt="Cinque Terre"></img>
                        </div>
                        <div className="col-md-6 secondCol float-right">
                            <h2 className="text-center secondHeader">MEET OUR TEAM</h2>
                            <h4 className="text-center teamHeader"> Our Developers</h4>
                            <p className="text-left">At Health and Prosperity (HAP) 
                            We have a very dedicated and hard-working team working at HAP.
                            Our team ensures that we keep improving and keep working on more 
                            features for the users. As of now the Team consists of 3 web developers
                            Pravindu, Arshad and Hamza.
                            </p>
                        </div>
                    </div>    
                    <div className="row thirdRow">
                        <div className="col-md-5 thirdCol Row">
                            <h2 className="text-center thirdHeader">FUTURE ASPECTS</h2>
                            <h4 className="text-center planHeader"> Plans and Hopes </h4>
                            <p className="text-left">Our plans for the future are very broad in terms
                            of where we want to see ourselves in the future. We want to make this 
                            website to be usable by everyone so that we can achieve the goal of
                            providing everyone a chance for a fit and healthy lifestyle. We are 
                            still very far from achieving it but we are hoping for the best.
                            </p>
                        </div>
                        <div className="col-md-6">
                            <img src="https://i.pinimg.com/originals/e1/6f/73/e16f73c8290a000a261d54fea57a80d0.png" className="float-right" width="350" height="270" alt="Cinque Terre"></img>
                        </div>
                    </div>
                    <div className="review">
                        <br></br>
                        <div className="form-group">
                            <div className="text-center"><h3>Reviews</h3></div>
                            <label htmlFor="review">Give us your feedback</label>
                            <input type="text" className="form-control" id="comment" />
                        </div>
                        <button className="btn btn-danger" onClick={this.handleClick}>Submit</button>
                        <div id="reviews" className="topReviews">
                            <div className="text-left"><h3>Top Reviews</h3></div>
                            {this.state.reviews.map(reviews =>(
                                    <Reviews key={reviews._id} comment={reviews.comment} user={reviews.user}></Reviews>
                                ))}
                        </div>
                    
                        <div className="row contactInfo">
                            <div className="col-md-3 text-center">FACEBOOK</div>
                            <div className="col-md-3 text-center">INSTAGRAM</div>
                            <div className="col-md-3 text-center">GMAIL</div>
                        </div>
                    </div>
                    <div id="footer"><Footer></Footer></div>
                </div>
             </div>
    	);
	}
}

export default AboutUs;