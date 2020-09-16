import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Chart from '../components/chart';
import {Bar,Line} from 'react-chartjs-2';
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
			monthValue: new Date().toString().slice(4,7),
			checkDay: Boolean,
			checkWeek: Boolean,
			checkMonth: Boolean,
			weekValue: 1,
			title: ""
			
		  };
		this.handleDay = this.handleDay.bind(this);
		this.handleToday = this.handleToday.bind(this);
		this.handleWeek = this.handleWeek.bind(this);
		this.prevWeek= this.prevWeek.bind(this);
		this.nextWeek= this.nextWeek.bind(this);
		this.handleMonth = this.handleMonth.bind(this);
		this.prevMonth= this.prevMonth.bind(this);
		this.nextMonth= this.nextMonth.bind(this);
		this.handleClickB = this.handleClickB.bind(this);
		this.handleClickL = this.handleClickL.bind(this);
		this.handleClickD = this.handleClickD.bind(this);
	}
	componentWillMount(){
        this.getData();
	}
	//Handles the Graph for only Today
	handleToday(){
		const date = $('#unique_date').val();
		var Cday = new Date().toString().slice(0,15); 
		this.setState({day:Cday});
		this.setState({checkDay:true})
		this.getData();
	}
	//Handles the Graph for any custom day selected by the User.
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
		this.getData();
	}
	//Generates the Charts for 1 day
	dailyChart(dailyC){
		this.setState({
			CchartData:{
				labels: ['Breakfast', 'Lunch', 'Dinner'],
				datasets:[
					{
					label:'Calories Taken',
					data: dailyC,
					backgroundColor:'rgba(101, 228, 207, 0.63)'
					}
				]
			}
		});
		this.setState({title:"Daily Calories"})
		this.setState({check:false})
	}
	//Handles the current Week
	handleWeek(){
		this.setState({weekValue: 1})
		this.setState({checkWeek:true});
		this.getData();
	}
	//Handles the Graph Element for the Previous Week
	prevWeek(){
		this.setState({weekValue: this.state.weekValue + 7})
		this.setState({checkWeek:true});
		this.getData();
	}
	//Handles the Graph Element for the Next Weel
	nextWeek(){
		this.setState({weekValue: this.state.weekValue - 7})
		this.setState({checkWeek:true});
		this.getData();
	}
	//Generates the Charts for weeks
	weeklyChart(weeklyC, days){
		var i;
		var j = 6;
		var weekValues = [];
		var weekDays = []
		for(i = days.length - this.state.weekValue; i >= days.length - (this.state.weekValue+6); i--)
		{
			if (weeklyC[i] !== undefined && days[i] !== undefined)
			{
				weekValues[j] = weeklyC[i];
				weekDays[j] = days[i];
				j--;
			}
			else
			{
			}
		}
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
		this.setState({title:"Weekly Calories"})
		this.setState({checkWeek:false});
	}
	handleMonth(){
		var month = new Date().toString().slice(4,7); 
		this.setState({monthValue: month})
		this.setState({checkMonth:true});
		this.getData();
	}
	prevMonth(){
		var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		if (this.state.monthValue == months[0])
		{
			this.setState({monthValue: months[months.length - 1]});
			console.log(this.state.monthValue);
		}
		else {
			for (var i = 1; i < months.length; i++)
			{
				if (this.state.monthValue == months[i])
				{
					// console.log("hello");
					this.setState({monthValue: months[i-1]})
					console.log(this.state.monthValue);
				}
			}
		}	
		this.setState({checkMonth:true});
		this.getData();
	}
	nextMonth(){
		var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		if (this.state.monthValue == months[12])
		{
			this.setState({monthValue: months[0]});
			console.log(this.state.monthValue);
		}
		else {
			for (var i = 0; i < months.length-1; i++)
			{
				if (this.state.monthValue == months[i])
				{
					this.setState({monthValue: months[i+1]})
					console.log(this.state.monthValue);
				}
			}
		}	
		this.setState({checkMonth:true});
		this.getData();
	}
	monthlyChart(monthlyC, days){
		var i;
		var j;
		var monthValues = [];
		var monthDays = [];
		if (this.state.monthValue == new Date().toString().slice(4,7))
		{
			var date = new Date().getDate();
			console.log(date);
			j = parseInt(date) - 1;
			console.log(j);
		}
		else if (this.state.monthValue == 'Feb')
		{
			j = 27;
		}
		else if (this.state.monthValue == 'Jan', 'Mar', 'May', 'Jul', 'Aug', 'Oct', 'Dec')
		{
			j = 30;
		}
		else if (this.state.monthValue == 'Apr', 'Jun', 'Sep', 'Oct', 'Nov')
		{
			j = 29;
		}
		for (i = days.length - 1; i >= 0; i--)
		{
			if (days[i].slice(0,3) == this.state.monthValue)
			{
				monthValues[j] = monthlyC[i];
				monthDays[j] = days[i];
				j--;
			}
			else{

			}
		}
		this.setState({
			CchartData:{
				labels: monthDays,
				datasets:[
					{
					label:'Calories Taken',
					data: monthValues,
					backgroundColor:'rgba(160, 160, 224, 0.63)'
					}
				]
			}
		});
		this.setState({title:"Monthly Calories"})
		this.setState({checkMonth:false});
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
				if(this.state.checkDay || this.state.day == new Date().toString().slice(0,15))
				{
					this.dailyChart(dailyC);
				}
				if (this.state.checkWeek)
				{
					this.weeklyChart(Tcalories, CaloriesD);
				}
				if (this.state.checkMonth)
				{
					console.log(this.state.checkMonth);
					this.monthlyChart(Tcalories, CaloriesD);
				}
				console.log(this.state.checkMonth);
				// console.log(this.state.checkMonth);
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
					<h3 className="text-center">Graphical Summary </h3>
					<form action="/action_page.php">
						<label htmlFor="Date">Select Date:  </label>
						<input type="date" id="unique_date" name="date"></input>
					</form>
					<button onClick={() => this.handleDay()}>See graph</button>
					<button onClick={() => this.handleToday()}>Today's Graph</button>
					<div>
					<button onClick={() => this.prevWeek()}>Previous Week</button>
					<button onClick={() => this.handleWeek()}>Weekly Graph</button>
					<button onClick={() => this.nextWeek()}>Next Week</button>
					</div>
					<div>
					<button onClick={() => this.prevMonth()}>Prev Month</button>
					<button onClick={() => this.handleMonth()}>Monthly Graph</button>
					<button onClick={() => this.nextMonth()}>Next Month</button>
					</div>
					<div className="chartSize">
					<Chart title={this.state.title} legendPosition='bottom' chartData={this.state.CchartData} />
					</div>
					<div id="footer"><Footer></Footer></div>
				</div>
			</div>
		)
	}
}
export default CalorieIntake;