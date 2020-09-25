import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Chart from '../components/chart';
import '../myStyle.css'
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
			checkMonth: Boolean,
			monthSetDays: '',
			title: "",
			error: ""
			
		  };
		this.handleClick = this.handleClick.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.handleDay = this.handleDay.bind(this);
		this.handleMonth = this.handleMonth.bind(this);
		this.prevMonth= this.prevMonth.bind(this);
		this.nextMonth= this.nextMonth.bind(this);
		this.handleClickB = this.handleClickB.bind(this);
		this.handleClickL = this.handleClickL.bind(this);
		this.handleClickD = this.handleClickD.bind(this);
	}
	componentWillMount(){
		this.getData();
		document.addEventListener('mousedown', this.handleClick, false)
	}
	componentWillUnmount(){
		document.removeEventListener('mousedown', this.handleClick, false)
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
			j = parseInt(date) - 1;
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
		for (var z = j; z >= 0; z--)
		{
			if (z < 9 && z >= 0)
			{
				monthDays[z] = this.state.monthValue + " 0" + (z+1).toString();
			}
			else{
				monthDays[z] = this.state.monthValue + " " + (z+1).toString();
			}
			monthValues[z] = 0;
		}
		for (i = monthDays.length - 1; i > 0; i--)
		{
			for(var z = days.length - 1; z >= 0; z--)
			{
				if (monthDays[i] == days[z])
				{
					monthValues[i] = monthlyC[z];
				}
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
					if (element.breakfast == undefined){
						element.breakfast = 0;}
					if (element.lunch == undefined){
						element.lunch = 0;}
					if (element.dinner == undefined){
						element.dinner = 0;}
					Tcalories.push(parseInt(element.breakfast, 10) + parseInt(element.lunch, 10) + parseInt(element.dinner, 10))
				});
				if(this.state.checkDay || this.state.day == new Date().toString().slice(0,15))
				{
					this.dailyChart(dailyC);
				}
				if (this.state.checkMonth)
				{
					this.monthlyChart(Tcalories, CaloriesD);
				}
				// if (this.state.checkWeek)
				// {
				// 	this.weeklyChart(Tcalories, CaloriesD);
				// }
            }
        })
    }
	handleClickB(){
		if (currentUser){
			const date =  $('#unique_date').val();
			var day = new Date().toString().slice(0,15);
			var day1 = new Date(date).toString().slice(0,15);
			var day2 = new Date().toString().slice(0,15);
			var year = day1.toString().slice(10,15);
			var month = day1.toString().slice(4,7)
			var selectedDay = day1.toString().slice(8,10)
			if (day2.toString().slice(4,7) == month && day2.toString().slice(10,15) == year && selectedDay > day2.slice(8,10))
			{
				this.setState({error:"Please choose a valid date"})
			}
			else
			{
				this.setState({error:""})
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
	}
	handleClickL(){
		if (currentUser){
			const date =  $('#unique_date').val();
			var day = new Date().toString().slice(0,15);
			var day1 = new Date(date).toString().slice(0,15);
			var day2 = new Date().toString().slice(0,15);
			var year = day1.toString().slice(10,15);
			var month = day1.toString().slice(4,7)
			var selectedDay = day1.toString().slice(8,10)
			if (day2.toString().slice(4,7) == month && day2.toString().slice(10,15) == year && selectedDay > day2.slice(8,10))
			{
				this.setState({error:"Please choose a valid date"})
			}
			else{
				this.setState({error:""})
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
	}
	handleClickD(){
		if (currentUser){
			const date =  $('#unique_date').val();
			var day = new Date().toString().slice(0,15);
			var day1 = new Date(date).toString().slice(0,15);
			var day2 = new Date().toString().slice(0,15);
			var year = day1.toString().slice(10,15);
			var month = day1.toString().slice(4,7)
			var selectedDay = day1.toString().slice(8,10)
			if (day2.toString().slice(4,7) == month && day2.toString().slice(10,15) == year && selectedDay > day2.slice(8,10))
			{
				this.setState({error:"Please choose a valid date"})
			}
			else{
				this.setState({error:""})
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
	}
	handleClickOutside(){
		var dropdownsM = document.getElementsByClassName("dropdown-contentM");
		var i;
		for (i = 0; i < dropdownsM.length; i++) {
		  var openDropdown = dropdownsM[i];
		  if (openDropdown.classList.contains('show')) {
			openDropdown.classList.remove('show');
		  }
		}
	}
	handleClick = (e) => {
		if (this.node.contains(e.target))
		{
			return;
		}
		this.handleClickOutside();
	}
	dropdownM(){
		document.getElementById("myDropdownM").classList.toggle("show");
	}
	render(){
		return(
			<div className="calorieIntakePage">
				<div id="navbar"><Navbar></Navbar></div>
				<div className="container CalorieC"> 
					<div className="calorieBg">
						<h1 className="text-center calorieH">Calorie Intake</h1>
						<div id={"my_container"} className={"fatsecret_container"}></div>
						<br></br>
					</div>
					<div className="Cbuttons">
						<div className="dateSelector text-center">
						<div className="text-center"><h4>Select Day</h4></div>
							<form action="/action_page.php" className="dateForm">
								<label htmlFor="Date"> </label>
								<input type="date" id="unique_date" name="date"></input>
							</form>
							<button onClick={() => this.handleDay()} className="graphBtn">See graph</button>
							<div>
								{this.state.error}
							</div>
						</div>
						<div className="d-flex justify-content-left mt-2 login_container">
						<br></br>
						<div>
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
					</div>
					</div>
					<div className="Cgraphs">
						<div className="row">
							<div className="chartSize col-md-10 position-relative">
							<Chart title={this.state.title} legendPosition='bottom' chartData={this.state.CchartData} />
							</div>
							<div className="col-md-2 position-relative">
							<div><br></br><br></br></div>
								<div><br></br><br></br><br></br><br></br></div>
								<div className="dropdownM" ref={node => this.node = node}>
									<button onClick={() => this.dropdownM()} className="dropbtnM">Monthly Graphs</button>
									<div id="myDropdownM" className="dropdown-contentM">
										<button onClick={() => this.handleMonth()} className="handleM">This Month</button>
										<button onClick={() => this.prevMonth()} className="handlePM">Previous Month</button>
										<button onClick={() => this.nextMonth()} className="handleNM">Next Month</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div id="footer"><Footer></Footer></div>
			</div>
		)
	}
}
export default CalorieIntake;