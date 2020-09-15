import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import $ from "jquery";

//const API_URL = 'https://api-cyan-six.vercel.app/api';
const API_URL = 'http://localhost:5000/api';
const currentUser = localStorage.getItem('user');

class CalorieIntake extends Component {
    constructor(props){
		super(props)
		this.state ={
			calories: [],
			msg: '',
			className:'',
			breakFast: Boolean, lunch: Boolean, dinner: Boolean,
		}
		this.handleClick = this.handleClickBf.bind(this);
		this.handleClick = this.handleClickL.bind(this);
		this.handleClick = this.handleClickD.bind(this);
		this.handleClick = this.handleClickAdd.bind(this);
	}
	componentDidUpdate(){
		
	}
	handleClickBf(){
		if (currentUser)
		{
			const day = new Date();
			const value = $('#calories').val();
				$.post(`${API_URL}/data/${currentUser}`, {breakfast: value, day: day})
				.then((response) =>{
					if (response.success) {
						console.log(response);  
						console.log(value)
						window.location.href = '/calorieIntake';
					}
				});
			}
		}
	handleClickL(){
		if (currentUser)
		{
			const day = new Date();
			const value = $('#calories').val();
				$.post(`${API_URL}/data/${currentUser}`, {lunch: value, day: day})
				.then((response) =>{
					if (response.success) {
						console.log(response);  
						console.log(value)
						window.location.href = '/calorieIntake';
					}
				});
			}
	}
	handleClickD(){
		if (currentUser)
		{
			const day = new Date();
			const value = $('#calories').val();
				$.post(`${API_URL}/data/${currentUser}`, {dinner: value, day: day})
				.then((response) =>{
					if (response.success) {
						console.log(response);  
						console.log(value)
						window.location.href = '/calorieIntake';
					}
				});
			}
	} 
	handleClickAdd(){
		if (currentUser)
		{
			const value = $('#calories').val();
				$.post(`${API_URL}/data/${currentUser}`, {calories: value})
				.then((response) =>{
					if (response.success) {
						console.log(response);  
						console.log(value)
						window.location.href = '/calorieIntake';
					}
				});
			}
		}

	render(){
		return(
			<div className="container"> 
                <div id="navbar"><Navbar></Navbar></div>
				<h1 className="text-center">Calorie Intake</h1>
				<div className="row">
				<div className="col-md-2 text-center"><h3>BreakFast</h3></div>
				<div className="d-flex justify-content-left mt-2 login_container">
                  <button type="button" name="button" className="btn login_btn BF" onClick={this.handleClickBf()}>Add Food</button>
                </div>
				<div className="col-md-2 text-center"><h3>Lunch</h3></div>
				<div className="d-flex justify-content-left mt-2 login_container">
                  <button type="button" name="button" className="btn login_btn" onClick={this.handleClickL()}>Add Food</button>
                </div>
				<div className="col-md-2 text-center"><h3>Dinner</h3></div>
				<div className="d-flex justify-content-left mt-2 login_container">
                  <button type="button" name="button" className="btn login_btn" onClick={this.handleClickD()}>Add Food</button>
                </div>
				</div>
				<br></br>
				<div id={"my_container"} className={"fatsecret_container"}></div>
				<div className="d-flex justify-content-left mt-2 login_container">
				<br></br>
				<form>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="Calories Taken" id="calories" />
                <div className="d-flex justify-content-center login_container">
                  <button type="button" name="button" className="btn login_btn" onClick={this.handleClickAdd}>Confirm Calorie Amount</button>
                </div>
				</div>
              </form>
                </div>
                <div id="footer"><Footer></Footer></div>
			</div>
		)
	}
}
export default CalorieIntake;
