import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Chart from '../components/chart';
import $ from "jquery";

const API_URL = 'https://api-cyan-six.vercel.app/api';
//const API_URL = 'http://localhost:5000/api';
const currentUser = localStorage.getItem('user');

class CalorieIntake extends Component {
    constructor(props){
		super(props)
        this.state = {
			CchartData:{},
			day: new Date().toString().slice(0,15),
			checkDay: Boolean,
			checkWeek: Boolean
		  };
		this.handleDay = this.handleDay.bind(this);
		this.handleToday = this.handleToday.bind(this);
		this.handleWeek = this.handleWeek.bind(this);
		this.handleClickB = this.handleClickB.bind(this);
		this.handleClickL = this.handleClickL.bind(this);
		this.handleClickD = this.handleClickD.bind(this);
	}
	componentDidUpdate(){
	}
	componentDidMount(){

	}
	componentWillMount(){
        this.getData();
	}
	handleToday(){
		const date = $('#unique_date').val();
		var Cday = new Date().toString().slice(0,15); 
		this.setState({day:Cday});
		this.setState({checkDay:true})
		this.getData();
	}
	handleDay(){
		const date = $('#unique_date').val();
		var Cday = new Date().toString().slice(0,15); 
		if (date !== "")
		{
			Cday = new Date(date).toString().slice(0,15);
			console.log(Cday);
			this.setState({day:Cday});
			console.log(this.state.day);
		}
		else{
			this.setState({day:Cday});
			console.log(this.state.day);
		}
		this.setState({checkDay:true})
		console.log("hello");
		this.getData();
	}
	handleWeek(){
		this.setState({checkWeek:true});
		this.getData();
	}
	dailyChart(dailyC){
		this.setState({
			CchartData:{
				labels: ['Breakfast', 'Lunch', 'Dinner'],
				datasets:[
					{
					label:'Calories Taken',
					data: dailyC,
					backgroundColor:'rgba(255, 99, 132, 0.6)'
					}
				]
			}
		});
		this.setState({check:false})
	}
	weeklyChart(weeklyC, days){
		var i;
		var j = 6;
		var weekValues = [];
		var weekDays = []
		for(i = days.length - 1; i >= days.length - 7; i--)
		{
			weekValues[j] = weeklyC[i];
			weekDays[j] = days[i];
			j--;
		}
		console.log(weekDays);
		this.setState({
			CchartData:{
				labels: weekDays,
				datasets:[
					{
					label:'Calories Taken',
					data: weekValues,
					backgroundColor:'rgba(255, 99, 132, 0.6)'
					}
				]
			}
		});
		this.setState({checkWeek:false});
	}
	getData(){
        $.get(`${API_URL}/data/${currentUser}`)
        .then(response => {
            if (response[0]== null){
            }
            else{
				var breakfastC = [];
				var lunchC = [];
				var dinnerC = [];
				var dailyC = [];
				var Tcalories = [];
				var CaloriesD = [];
				response[0].calories.forEach(element => {
					if(this.state.day == element.day)
					{
						dailyC.push(parseInt(element.breakfast, 10), parseInt(element.lunch, 10), parseInt(element.dinner, 10))
					}
					CaloriesD.push(element.day.toString().slice(4,10));
					breakfastC.push(parseInt(element.breakfast, 10));
					lunchC.push(parseInt(element.lunch, 10));
					dinnerC.push(parseInt(element.dinner, 10))
					Tcalories.push(parseInt(element.breakfast, 10) + parseInt(element.lunch, 10) + parseInt(element.dinner, 10))
				});
				console.log(this.state.check);
				if(this.state.checkDay || this.state.day == new Date().toString().slice(0,15))
				{
					this.dailyChart(dailyC);
				}
				console.log(CaloriesD);
				if (this.state.checkWeek)
				{
					this.weeklyChart(Tcalories, CaloriesD);
				}
				
				console.log(this.state.check);
            }
        })
    }
	handleClickB(){
		if (currentUser){
			const date =  $('#unique_date').val();
			var day = new Date().toString().slice(0,15); 
			if (date !== "")
			{
				day = new Date(date).toString().slice(0,15);
			}
			const value = $('#bfcalories').val();
			$.ajax({
				url: `${API_URL}/data/calories/${currentUser}`,
				type: 'PUT',
				data: {breakfast: value, day: day},
				success: function(response){
					console.log(response);
					console.log(value);
					window.location.href = '/calorieIntake';
				} 
			})
		}
	}
	handleClickL(){
		if (currentUser){
			const date =  $('#unique_date').val();
			var day = new Date().toString().slice(0,15); 
			if (date !== "")
			{
				day = new Date(date).toString().slice(0,15);
			}
			const value = $('#lcalories').val();
			$.ajax({
				url: `${API_URL}/data/calories/${currentUser}`,
				type: 'PUT',
				data: {lunch: value, day: day},
				success: function(response){
					console.log(response);
					console.log(value);
					window.location.href = '/calorieIntake';
				} 
			})
		}
	}
	handleClickD(){
		if (currentUser){
			const date =  $('#unique_date').val();
			var day = new Date().toString().slice(0,15); 
			if (date !== "")
			{
				day = new Date(date).toString().slice(0,15);
			}
			const value = $('#dcalories').val();
			$.ajax({
				url: `${API_URL}/data/calories/${currentUser}`,
				type: 'PUT',
				data: {dinner: value, day: day},
				success: function(response){
					console.log(response);
					console.log(value);
					window.location.href = '/calorieIntake';
				} 
			})	
		}
	}
	render(){
		return(
			<div>
				<div className="container"> 
					<div id="navbar"><Navbar></Navbar></div>
					<h1 className="text-center">Calorie Intake</h1>
					<br></br>
					<div id={"my_container"} className={"fatsecret_container"}></div>
					<br></br>
					<div className="d-flex justify-content-left mt-2 login_container">
					<br></br>
					<form>
						<div className="input-group mb-3 row">
							<input type="text" className="form-control" placeholder="Calories Taken" id="bfcalories" />
							<div className="d-flex justify-content-center login_container">
								<button type="button" name="button" className="btn login_btn" onClick={this.handleClickB}>Add to Breakfast</button>
							</div>
							<input type="text" className="form-control" placeholder="Calories Taken" id="lcalories" />
							<div className="d-flex justify-content-center login_container">
								<button type="button" name="button" className="btn login_btn" onClick={this.handleClickL}>Add to Lunch</button>
							</div>
							<input type="text" className="form-control" placeholder="Calories Taken" id="dcalories" />
							<div className="d-flex justify-content-center login_container">
								<button type="button" name="button" className="btn login_btn" onClick={this.handleClickD}>Add to Dinner</button>
							</div>
						</div>
					</form>
					</div>
					<form action="/action_page.php">
						<label htmlFor="Date">Select Date:  </label>
						<input type="date" id="unique_date" name="date"></input>
					</form>
					<button onClick={() => this.handleDay()}>See graph</button>
					<button onClick={() => this.handleToday()}>Today's Graph</button>
					<button onClick={() => this.handleWeek()}>Weekly Graph</button>
					<Chart chartData={this.state.CchartData}/>
					<div id="footer"><Footer></Footer></div>
				</div>
			</div>
		)
	}
}
export default CalorieIntake;