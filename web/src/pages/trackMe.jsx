import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import $ from "jquery";
import Chart from '../components/pieChart';

const API_URL = 'https://api-cyan-six.vercel.app/api';
// const API_URL = 'http://localhost:5000/api';
const currentUser = localStorage.getItem('user');
class  TrackMe extends Component {
    constructor(props){
		super(props)
		this.state = {
			Duration: Number,
			Tcal: 0,
			DurationType: 'Time Duration',
			check: false,
			CchartData:{}
		};
		this.handleClick = this.handleClick.bind(this);
		this.dropdownDuration = this.dropdownDuration.bind(this);
		this.addExercise = this.addExercise.bind(this);
		this.timeDuration = this.timeDuration.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}
	componentDidMount(){		
		this.getData();
	}
	componentWillMount(){		
		this.getData();
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
		//Approximately 6 calories are burned a min
		this.addExercise('pushups', 6);
	}
	pullups(){
		//Approximately 9 calories are burned a min
		this.addExercise('pullups', 9);
	}
	squats(){
		//Approximately 5.5 calories are burned a min
		this.addExercise('squats', 5.5);
	}
	planks(){
		//Approximately 4 calories are burned a min
		this.addExercise('planks', 4);
	}
	sPlanks(){
		//Approximately 5 calories are burned a min
		this.addExercise('side planks', 5);
	}
	sitUps(){
		//Approximately 6 calories are burned a min
		this.addExercise('sit ups', 6);
	}
	crunches(){
		//Approximately 5.4 calories are burned a min
		this.addExercise('crunches', 5.4);
	}
	lunges(){
		//Approximately 6.2 calories are burned a min
		this.addExercise('lunges', 6.2);
	}
	gBridge(){
		//Approximately 4.3 calories are burned a min
		this.addExercise('glute bridge', 4.3);
	}
	wSits(){
		//Approximately 4.4 calories are burned a min
		this.addExercise('wall sits', 4.4);
	}
	rowing(){
		//Approximately 6.5 calories are burned a min
		this.addExercise('rowing', 6.5);
	}
	jRopes(){
		//Approximately 5.3 calories are burned a min
		this.addExercise('jumping ropes', 5.3);
	}
	cFits(){
		//Approximately 4.1 calories are burned a min
		this.addExercise('cross fits', 4.1);
	}
	lRaises(){
		//Approximately 4.2 calories are burned a min
		this.addExercise('leg raises', 4.2);
	}
	bDips(){
		//Approximately 5.12 calories are burned a min
		this.addExercise('bench dips', 5.12);
	}
	addExercise(type, value){
		var day = new Date();
		var caloriesBurned = value * this.state.Duration;
		$.ajax({
			url: `${API_URL}/data/excercisedCalories/${currentUser}`,
			type: 'PUT',
			data: {type: type, caloriesBurned: caloriesBurned, day: day},
			success: function(response){
				console.log(response);
				window.location.href = '/trackMe';
			}
		})
		this.getData();
	}
	getData(){
		if(this.state.check == false)
		{
			this.pieGraph(['Fetching Excercise Data'], [0]);
			this.setState({check:true});
		}
        $.get(`${API_URL}/data/${currentUser}`)
        .then(response => {
			var pushups = 0;  var pullups = 0; var squats = 0; var planks = 0; var sidePlanks = 0;
			var situps = 0; var crunches = 0; var lunges = 0; var gluteBridge = 0; var wallSits = 0;
			var rowing= 0; var jumpingRopes = 0; var crossFit = 0; var legRaises = 0; var Bdips = 0;
			var values = [];
			var label = [];
			var TotalCalories = 0;
            if (response[0]== null){
            }
            else{
				response[0].excercisedCalories.forEach(element => {
					if(element.type === 'pushups') pushups = pushups + parseInt(element.calories,10);
					if(element.type === 'pullups') pullups = pullups + parseInt(element.calories,10);
					if(element.type === 'squats') squats = squats + parseInt(element.calories,10);
					if(element.type === 'planks') planks = planks + parseInt(element.calories,10);
					if(element.type === 'side planks') sidePlanks = sidePlanks + parseInt(element.calories,10);
					if(element.type === 'sit ups') situps = situps + parseInt(element.calories,10);
					if(element.type === 'crunches') crunches = crunches + parseInt(element.calories,10);
					if(element.type === 'lunges') lunges = lunges + parseInt(element.calories,10);
					if(element.type === 'glute bridge') gluteBridge = gluteBridge + parseInt(element.calories,10);
					if(element.type === 'wall sits') wallSits = wallSits + parseInt(element.calories,10);
					if(element.type === 'rowing') rowing = rowing + parseInt(element.calories,10);
					if(element.type === 'jumping ropes') jumpingRopes = jumpingRopes + parseInt(element.calories,10);
					if(element.type === 'cross fits') crossFit = crossFit + parseInt(element.calories,10);
					if(element.type === 'leg raises') legRaises = legRaises + parseInt(element.calories,10);
					if(element.type === 'bench dips') Bdips = Bdips + parseInt(element.calories,10);
					TotalCalories = TotalCalories + parseInt(element.calories,10);
				});
			}
			this.setState({Tcal:TotalCalories})
			if (pushups !== 0){ values.push(pushups)
			label.push('Push Ups')}
			if (pullups !== 0){ values.push(pullups)
			label.push('Pull Ups')}
			if (squats !== 0){ values.push(squats)
			label.push('Squats')}
			if (planks !== 0){ values.push(planks)
			label.push('Planks')}
			if (sidePlanks !== 0){ values.push(sidePlanks)
			label.push('Side Planks')}
			if (situps !== 0){ values.push(situps)
			label.push('Sit Ups')}
			if (crunches !== 0){ values.push(crunches)
			label.push('Crunches')}
			if (lunges !== 0){ values.push(lunges)
			label.push('Lunges')}
			if (gluteBridge !== 0){ values.push(gluteBridge)
			label.push('Glute Bridge')}
			if (wallSits !== 0){ values.push(wallSits)
			label.push('Wall Sits')}
			if (rowing !== 0){ values.push(rowing)
			label.push('Rowing')}
			if (jumpingRopes !== 0){ values.push(jumpingRopes)
			label.push('Jumping Ropes')}
			if (crossFit !== 0){ values.push(crossFit)
			label.push('Cross Fit')}
			if (legRaises !== 0){ values.push(legRaises)
			label.push('Leg Raises')}
			if (Bdips !== 0){ values.push(Bdips)
			label.push('Bench Dips')}
			console.log(values);
			if(values.length === 0)
			{
				this.pieGraph(['No Exercises Today'], [0]);
			}
			else if (this.state.check == true)
			{
				this.pieGraph(label,values)
			}
        })
    }
	pieGraph(label, values){
		this.setState({
			CchartData:{
				labels: label,
				datasets:[
					{
					label:'Excercised Calories',
					data: values,
					backgroundColor: ['rgb(58, 113, 231)', 'rgb(225, 58, 231)', 'rgb(231, 58, 72)', ' rgb(58, 196, 231)'
					, 'rgb(60, 248, 207)', 'rgb(248, 167, 60)', 'rgb(207, 248, 60)', 'rgb(60, 248, 60)', 'rgb(60, 95, 248)'
					, 'rgb(205, 135, 252)', '#f09206f1', 'rgb(255, 55, 171)', 'rgb(0, 221, 221)', 'rgb(182, 255, 45)', 'rgb(108, 45, 255)']
					}
				]
			}
		});
		this.setState({title:"Monthly Calories"})
	}
	render(){
		return(
        	<div>
			<div className='body'>
			<div id="navbar"><Navbar></Navbar></div>
				<div className="container">
					<h1 className='text-center'>Exercises</h1>
					<div className='row'>
						<div className='text-center col-md-6'>
							<h3>Select Time Duration</h3>
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
							<br></br><br></br><br></br>
							<div>
								<h3>Exercised calories burned Today:</h3>
								<h3>{this.state.Tcal}</h3>
							</div>
						</div>	
						<div className='col-md-6'>
						<Chart title='Excercised Calories' legendPosition='bottom' chartData={this.state.CchartData} />
						</div>
					</div>
				<br></br><br></br>
				<h2 className='text-center'>Select Exercise</h2>
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
