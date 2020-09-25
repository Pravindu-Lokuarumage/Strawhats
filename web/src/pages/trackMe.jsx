import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import $ from "jquery";

const API_URL = 'https://api-cyan-six.vercel.app/api';

class  TrackMe extends Component {
    constructor(props){
		super(props)
		this.state = {
			Duration: Number,
			DurationType: 'Time Duration',
			calConst: Number
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
		this.addExercise();
	}
	pullups(){
		//const for 1 mins calories burned
		//Approximately 9 calories are burned a min
		this.setState({calConst: 9})
		this.addExercise();
	}
	squats(){
		//const for 1 mins calories burned
		//Approximately 5.5 calories are burned a min
		this.setState({calConst: 5.5})
		this.addExercise();
	}
	planks(){
		//const for 1 mins calories burned
		//Approximately 4 calories are burned a min
		this.setState({calConst: 4})
		this.addExercise();
	}
	sPlanks(){
		//const for 1 mins calories burned
		//Approximately 5 calories are burned a min
		this.setState({calConst: 5})
		this.addExercise();
	}
	sitUps(){
		//const for 1 mins calories burned
		//Approximately 4 calories are burned a min
		this.setState({calConst: 6})
		this.addExercise();
	}
	crunches(){
		//const for 1 mins calories burned
		//Approximately 4 calories are burned a min
		this.setState({calConst: 5.4})
		this.addExercise();
	}
	lunges(){
		//const for 1 mins calories burned
		//Approximately 4 calories are burned a min
		this.setState({calConst: 6.2})
		this.addExercise();
	}
	gBridge(){
		//const for 1 mins calories burned
		//Approximately 4 calories are burned a min
		this.setState({calConst: 4.3})
		this.addExercise();
	}

	// 	};
	// }
	render(){
		return(
        	<div>
                <div className="container">
				<div id="navbar"><Navbar></Navbar></div>

			    <div id="footer"><Footer></Footer></div>
				</div>
        	</div>
    	);
	}
    
}

export default TrackMe;
