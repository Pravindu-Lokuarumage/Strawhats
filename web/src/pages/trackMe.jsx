import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import $ from "jquery";
import PieChart from '../components/pieChart';

const API_URL = 'https://api-cyan-six.vercel.app/api';
// const API_URL = 'http://localhost:5000/api';
const currentUser = localStorage.getItem('user');
class  TrackMe extends Component {
    constructor(props){
		super(props)
		this.state = {
			Type: String,
			Duration: Number,
			DurationType: 'Time Duration',
			calConst: Number,
			CchartData:{}
		};
		this.handleClick = this.handleClick.bind(this);
		this.dropdownDuration = this.dropdownDuration.bind(this);
		this.addExercise = this.addExercise.bind(this);
		this.renderDuration = this.renderDuration.bind(this);
		this.timeDuration = this.timeDuration.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}
	componentDidMount(){
		
	}
	componentWillMount(){
		document.addEventListener('mousedown', this.handleClick, false)
	}
	componentWillUnmount(){
		document.removeEventListener('mousedown', this.handleClick, false)
	}
	handleClickOutside(){
		var dropdownsDuration = document.getElementsByClassName("dropdown-contentDuration");
		var i;
		for (i = 0; i < dropdownsDuration.length; i++) {
		  var openDropdown = dropdownsDuration[i];
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
	dropdownDuration(){
		document.getElementById("myDropdownDuration").classList.toggle("show");
	}
	timeDuration(){
		document.getElementsByClassName("myDropdownDuration").classList.toggle("show");
	}
	handle10mins(){
		this.setState({DurationType: '10 minutes'})
		if (this.state.Duration !== 10)
		{
			this.setState({Duration:10});
		}
		this.handleClickOutside();
	}
	handle20mins(){
		this.setState({DurationType: '20 minutes'})
		this.setState({Duration:20});
		this.handleClickOutside();
	}
	handle30mins(){
		this.setState({DurationType: '30 minutes'})
		this.setState({Duration:30});
		this.handleClickOutside();
	}
	handle1hour(){
		this.setState({DurationType: '1 hour'})
		this.setState({Duration:60});
		this.handleClickOutside();
	}
	handle2hours(){
		this.setState({DurationType: '2 hours'})
		this.setState({Duration:120});
		this.handleClickOutside();
	}
	pushups(){
		//const for 1 mins calories burned
		//Approximately 6 calories are burned a min
		this.setState({calConst: 6})
		this.setState({type: 'pushups'})
		this.addExercise('pushups', 6);
	}
	pullups(){
		//const for 1 mins calories burned
		//Approximately 9 calories are burned a min
		this.setState({calConst: 9})
		this.setState({type: 'pullups'})
		this.addExercise('pullups', 9);
	}
	squats(){
		//const for 1 mins calories burned
		//Approximately 5.5 calories are burned a min
		this.setState({calConst: 5.5})
		this.setState({type: 'squats'})
		this.addExercise('squats', 5.5);
	}
	planks(){
		//const for 1 mins calories burned
		//Approximately 4 calories are burned a min
		this.setState({calConst: 4})
		this.setState({type: 'planks'})
		this.addExercise('planks', 4);
	}
	sPlanks(){
		//const for 1 mins calories burned
		//Approximately 5 calories are burned a min
		this.setState({calConst: 5})
		this.setState({type: 'side planks'})
		this.addExercise('side planks', 5);
	}
	sitUps(){
		//const for 1 mins calories burned
		//Approximately 6 calories are burned a min
		this.setState({calConst: 6})
		this.setState({type: 'sit ups'})
		this.addExercise('sit ups', 6);
	}
	crunches(){
		//const for 1 mins calories burned
		//Approximately 5.4 calories are burned a min
		this.setState({calConst: 5.4})
		this.setState({type: 'crunches'})
		this.addExercise('crunches', 5.4);
	}
	lunges(){
		//const for 1 mins calories burned
		//Approximately 6.2 calories are burned a min
		this.setState({calConst: 6.2})
		this.setState({type: 'lunges'})
		this.addExercise('lunges', 6.2);
	}
	gBridge(){
		//const for 1 mins calories burned
		//Approximately 4.3 calories are burned a min
		this.setState({calConst: 4.3})
		this.setState({type: 'glute bridge'})
		this.addExercise('glute bridge', 4.3);
	}
	wSits(){
		//const for 1 mins calories burned
		//Approximately 4.4 calories are burned a min
		this.setState({calConst: 4.4})
		this.setState({type: 'wall sits'})
		this.addExercise('wall sits', 4.4);
	}
	rowing(){
		//const for 1 mins calories burned
		//Approximately 6.5 calories are burned a min
		this.setState({calConst: 6.5})
		this.setState({type: 'rowing'})
		this.addExercise('rowing', 6.5);
	}
	jRopes(){
		//const for 1 mins calories burned
		//Approximately 5.3 calories are burned a min
		this.setState({calConst: 5.3})
		this.setState({type: 'jumping ropes'})
		this.addExercise('jumping ropes', 5.3);
	}
	cFits(){
		//const for 1 mins calories burned
		//Approximately 4.1 calories are burned a min
		this.setState({calConst: 4.1})
		this.setState({type: 'cross fits'})
		this.addExercise('cross fits', 4.1);
	}
	lRaises(){
		//const for 1 mins calories burned
		//Approximately 4.2 calories are burned a min
		this.setState({calConst: 4.2})
		this.setState({type: 'legs raises'})
		this.addExercise('leg raises', 4.2);
	}
	bDips(){
		//const for 1 mins calories burned
		//Approximately 5.12 calories are burned a min
		this.setState({calConst: 5.12})
		this.setState({type: 'bench dips'})
		this.addExercise('bench dips', 5.12);
	}
	getData(){
        $.get(`${API_URL}/data/${currentUser}`)
        .then(response => {
            if (response[0]== null){
            }
            else{
				var pushups = 0;
				var pullups = 0;
				var squats= 0;
				response[0].excercisedCalories.forEach(element => {
					if(element.type == pushups)
					{
						pushups = pushups + element.calories
					}
					if(element.type == pullups)
					{
						pullups = pushups + element.calories
					}
					if(element.type == squats)
					{
						squats = squats + element.calories
					}
				});
            }
        })
    }
	addExercise(type, value){
		var day = new Date();
		var caloriesBurned = value * this.state.Duration;
		console.log(caloriesBurned);
		console.log(day);
		$.ajax({
			url: `${API_URL}/data/excercisedCalories/${currentUser}`,
			type: 'PUT',
			data: {type: type, caloriesBurned: caloriesBurned, day: day},
			success: function(response){
				console.log(response);
				console.log(caloriesBurned);
			}
		})
		this.pieGraph();
	}
	pieGraph(values){
		this.setState({
			CchartData:{
				labels: 'push ups, pull ups, squats',
				datasets:[
					{
					label:'Excercised Calories',
					data: values,
					backgroundColor:'rgba(160, 160, 224, 0.63)'
					}
				]
			}
		});
		this.setState({title:"Monthly Calories"})
	}
	renderDuration(){
		// <div className="dropdownDuration" ref={node => this.node = node}>
		// <button onClick={() => this.dropdownDuration()} className="dropbtnDuration">Select Duration</button>
		// 	<div id="myDropdownDuration" className="dropdown-contentDuration">
		// 		<p className='10min'>10 minutes</p>
		// 		<p className='20min'>20 minutes</p>
		// 		<p className='30min'>30 minutes</p>
		// 		<p className='60min'>1 hour</p>
		// 		<p className='120min'>2 hours</p>
		// 	</div>
		// </div>
	}
	render(){
		return(
        	<div>
			<div className='body'>
			<div id="navbar"><Navbar></Navbar></div>
				<div className="container">
					<h1 className='text-center'>Excersices</h1>
					<h3>Select Time Duration</h3>
					{/* <PieChart title='Excercised Calories' legendPosition='bottom' chartData={this.state.CchartData} /> */}
					<div className="dropdownDuration" ref={node => this.node = node}>
							<button onClick={() => this.dropdownDuration()} className="dropbtnDuration">{this.state.DurationType}</button>
							<div id="myDropdownDuration" className="dropdown-contentDuration">
								<button onClick={() => this.handle10mins()} className='h10'>10 minutes</button>
								<button onClick={() => this.handle20mins()} className='h20'>20 minutes</button>
								<button onClick={() => this.handle30mins()} className='h30'>30 minutes</button>
								<button onClick={() => this.handle1hour()} className='h60'>1 hour</button>
								<button onClick={() => this.handle2hours()} className='h120'>2 hours</button>
							</div>
						</div>
						<br></br><br></br>
					<h2 className='text-center'>Select Excersice</h2>
					<br></br>
				</div>
				<div className='row'>
					<div className='col-md-4 text-center'>
						<h4 className='pushUps'>Push ups</h4>
						<button onClick={() => this.pushups()} className="addExcercise">Add this Exercise</button>
					</div>
					<div className='text-center col-md-4'>
						<h4 className='pullUps'>Pull ups</h4>
						<button onClick={() => this.pullups()} className="addExcercise">Add this Exercise</button>
					</div>
					<div className='col-md-4 text-center'>
						<h4 id='squats'>Squats</h4>
						<button onClick={() => this.squats()} className="addExcercise">Add this Exercise</button>
					</div>
				</div>
				<br></br><br></br>
				<div className='row'>
					<div className='text-center col-md-4'>
						<h4 className='planks'>Planks</h4>
						<button onClick={() => this.planks()} className="addExcercise">Add this Exercise</button>
					</div>
					<div className='text-center col-md-4'>
						<h4 className='sidePlanks'>Side Planks</h4>
						<button onClick={() => this.sPlanks()} className="addExcercise">Add this Exercise</button>
					</div>
					<div className='text-center col-md-4'>
						<h4 className='sitUps'>Situps</h4>
						<button onClick={() => this.sitUps()} className="addExcercise">Add this Exercise</button>
					</div>
				</div>
				<br></br><br></br>
				<div className='row'>
					<div className='col-md-4 text-center'>
						<h4 id='Crunches'>Crunches</h4>
						<button onClick={() => this.crunches()} className="addExcercise">Add this Exercise</button>
					</div>
					<div className='text-center col-md-4'>
						<h4 className='lunges'>Lunges</h4>
						<button onClick={() => this.lunges()} className="addExcercise">Add this Exercise</button>
					</div>
					<div className='text-center col-md-4'>
						<h4 className='gluteBrigde'>Glute Bridge</h4>
						<button onClick={() => this.gBridge()} className="addExcercise">Add this Exercise</button>
					</div>
				</div>
				<br></br><br></br>
				<div className='row'>
					<div className='col-md-4 text-center'>
						<h4 id='wallSits'>Wall Sits</h4>
						<button onClick={() => this.wSits()} className="addExcercise">Add this Exercise</button>
					</div>
					<div className='text-center col-md-4'>
						<h4 className='Rowing'>Rowing</h4>
						<button onClick={() => this.rowing()} className="addExcercise">Add this Exercise</button>
					</div>
					<div className='text-center col-md-4'>
						<h4 className='jumping'>Jumping Ropes</h4>
						<button onClick={() => this.jRopes()} className="addExcercise">Add this Exercise</button>
					</div>
				</div>
				<br></br><br></br>
				<div className='row'>
					<div className='col-md-4 text-center'>
						<h4 id='crossFits'>Cross Fits</h4>
						<button onClick={() => this.cFits()} className="addExcercise">Add this Exercise</button>
					</div>
					<div className='text-center col-md-4'>
						<h4 className='legRaises'>Leg Raises</h4>
						<button onClick={() => this.lRaises()} className="addExcercise">Add this Exercise</button>
					</div>
					<div className='text-center col-md-4'>
						<h4 className='benchDips'>Bench Dips</h4>
						<button onClick={() => this.bDips()} className="addExcercise">Add this Exercise</button>
					</div>
				</div>
				<br></br><br></br>
				<br></br><br></br>
			<div id="footer"><Footer></Footer></div>
			</div>
        	</div>
    	);
	}
    
}

export default TrackMe;
