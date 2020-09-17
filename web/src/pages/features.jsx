import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import '../myStyle.css'


const API_URL = 'https://api-cyan-six.vercel.app/api';
// const API_URL = 'http://localhost:5000/api';
class Features extends Component {

	render(){
		return(
            <div className="mainFeatures">
                <div id="navbar"><Navbar></Navbar></div>
                <div className="container featuresContainer">
                <div className="text-center logoHeader1">
                            <h2> FEATURES</h2>
                </div>
                    <div className="features-sec-1">
                        <div className="row">
                            <div className="col-md-5 firstCol">
                                <h2 className="text-center firstHeader">Check Your Vitals</h2>
                                <p className="text-left"> Get your heart rate data along with a graph
                                displaying how it various through out the day. To see your vitals information
                                click on the link below.
                                </p>
                                <a className="vitals" href="/info">Check Vitals</a>
                            </div>
                            <div className="col-md-6">
                                <img src="https://images.vexels.com/media/users/3/130909/isolated/preview/de35bf1732fa08be557bbaac9c8d1f22-heartrate-heart-icon-by-vexels.png" className="float-right" width="350" height="274" alt="Cinque Terre"></img>
                            </div>
                        </div>
                    </div>
                    <div className="features-sec-2">
                        <div className="row">
                            <div className="col-md-6 float-left">
                                    <img src="https://i.pinimg.com/originals/7c/bf/6d/7cbf6d7704484301533a703be36356fd.png" className="float-right" width="260" height="260" alt="Cinque Terre"></img>
                            </div>
                            <div className="col-md-6 secondCol float-right">
                                <h2 className="text-center secondHeader">Calorie Intake</h2>
                                <p className="text-left">Want to know how many calories you have eaten in a day?
                                Just add the items you have eaten in a day at breakfast, lunch and dinner and we 
                                will calculate the calories for you. Click the link below to go to calorie intake 
                                calculator.
                                </p>
                                <a className="calorieIntake1" href="/calorieIntake">Calorie Intake</a>
                            </div>
                        </div>
                    </div> 
                    <div className="features-sec-3">
                        <div className="row">
                            <div className="col-md-5 thirdCol Row">
                                <h2 className="text-center thirdHeader">Tracking and Excersing</h2>
                                <p className="text-left">Want to know how many steps you have taken?
                                Want to know how many calories you have burned uptil now? Just click the link
                                below to see all this information.
                                </p>
                                <a className="caloriesburned" href="/trackMe">My Track</a>
                            </div>
                            <div className="col-md-6">
                                <img src="https://i.pinimg.com/originals/9c/63/39/9c633996e964ae9ea0f4c9130c0853fe.png" className="float-right" width="400" height="270" alt="Cinque Terre"></img>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="footer"><Footer></Footer></div>
             </div>
    	);
	}
}

export default Features;