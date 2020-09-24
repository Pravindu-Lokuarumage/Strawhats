import React, { Component, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Chart from '../components/chart';
import $ from "jquery";
import '../myStyle.css'
import Calories from '../components/calCalories';

const API_URL = 'https://api-cyan-six.vercel.app/api';
const currentUser = localStorage.getItem('user');

class Info extends Component {
    constructor(props){
        super(props);
        this.state = {
          hchartData:{},
          schartData:{},
          time:new Date(),
          profile:{},
          calories:0
        };
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleToday = this.handleToday.bind(this);
        this.dropdownInfo = this.dropdownInfo.bind(this);

    }
    handlePrevious(){
      var temp = this.state.time;
      temp.setDate(temp.getDate() - 1);
      this.setState({time:temp})
      this.getData();
    }
    handleNext(){
      var temp = this.state.time;
      temp.setDate(temp.getDate() + 1);
      this.setState({time:temp})
      this.getData();
    }
    handleToday(){
      var temp = new Date();
      this.setState({time:temp})
      this.getData();
    }
    componentDidMount(){
      this.myInterval = setInterval(() => {
        this.getData();
      }, 1000*60);
    }
    componentWillUnmount(){
      clearInterval(this.myInterval);
    }
    componentWillMount(){
        if (currentUser){
          $.get(`${API_URL}/profile/${currentUser}`)
          .then(response => {
            if (response[0]== null){
                window.location.href = '/create'; 
            }
            else{
                this.setState({profile:response[0]})
            }
          })
        }
        else{
          const path = window.location.pathname;
            if (path !== '/login' && path !== '/registration') { 
            window.location.href = '/login'; 
          }
        }
        this.getData();
    }
    componentDidUpdate(){
        
    }
    arrSum = function(arr){
      return arr.reduce(function(a,b){
        return Number(a) + Number(b)
      }, 0);
    }
    getData(){
        $.get(`${API_URL}/data/${currentUser}`)
        .then(response => {
            if (response[0]== null){
            }
            else{
                var ctime =[];
                var cdata =[];
                var htime =[];
                var hdata =[];
                var stime =[];
                var sdata =[];
                var tempdata =[];
                var chartTime = 0;
                var caloriesCal = false
                response[0].caloriesBurn.forEach(element =>{
                  var timestamp = new Date(element.time)

                  if (timestamp.getDate() === new Date().getDate() - 1)
                  {
                    caloriesCal = true
                  }
                  cdata.push(element.caloriesBurn)
                  ctime.push(timestamp.toDateString())

                })
                if (!caloriesCal)
                {
                  var harr = []
                  response[0].heartrate.forEach(element => {
                    var timestamp = new Date(element.time)
                    
                    if (timestamp.getDate() === this.state.time.getDate() - 1)
                    {
                      harr.push(element.heartrate);
                    }
                  }); 
                  const avg = this.arrSum(harr)/harr.length
                  var val = 0;
                  if (this.state.profile.gender === 'Male')
					        {
					        	val = ((-55.0969 + (0.6309*avg) + (0.1988*this.state.profile.weight) + (0.2017*this.state.profile.age))/4.184)*60*24/1.5
					        }
                  else
                  {
					        	val = ((-20.4022 + (0.4472*avg) - (0.1263*this.state.profile.weight) + (0.074*this.state.profile.age))/4.184)*60*24/1.5
                  }
                  console.log(val)
                  $.post(`${API_URL}/data/${currentUser}`, {caloriesBurn: val})
                  .then((response) =>{
	    	          if (response.success) {
                      console.log(response);
	    	          	}
	    	          });
                }
                response[0].heartrate.forEach(element => {
                  var timestamp = new Date(element.time)
                  if (timestamp.getDate() == this.state.time.getDate())
                  {
                    if (chartTime == 1000*60*60*24){
                      this.state.time.setHours(0,0,0,chartTime-1)
                    }
                    else{
                      this.state.time.setHours(0,0,0,chartTime)
                    }

                    while (timestamp.getTime()>this.state.time.getTime() && chartTime < 1000*60*60*24) {

                      this.state.time.setHours(0,0,0,chartTime)

                      htime.push(this.state.time.toTimeString().slice(0,8));
                      hdata.push(null);
                      chartTime = chartTime + 1000*60*15;
                    }
                    htime.push(timestamp.toTimeString().slice(0,8));
                    hdata.push(element.heartrate);
                    tempdata.push(element.heartrate);
                  }
                });
                while (this.state.time.getHours()<24 && this.state.time.getHours()!==23){
                  this.state.time.setHours(0,0,0,chartTime)
                  htime.push(this.state.time.toTimeString().slice(0,8));
                  hdata.push(null);
                  chartTime = chartTime + 1000*60*15;
                }
                chartTime = 0;
                response[0].stepsperd.forEach(element => {
                  var timestamp = new Date(element.time)
                  if (timestamp.getDate()== this.state.time.getDate())
                  {
                    if (chartTime == 1000*60*60*24){
                      this.state.time.setHours(0,0,0,chartTime-1)
                    }
                    else{
                      this.state.time.setHours(0,0,0,chartTime)
                    }
                    while (timestamp.getTime()>this.state.time.getTime() && chartTime < 1000*60*60*24) {

                      this.state.time.setHours(0,0,0,chartTime)
                      stime.push(this.state.time.toTimeString().slice(0,8));
                      sdata.push(null);
                      chartTime = chartTime + 1000*60*15;
                    }
                    stime.push(new Date(element.time).toTimeString().slice(0,8));
                    sdata.push(element.stepsperd);
                  }
                });
                while (this.state.time.getHours()<24 && this.state.time.getHours()!==23){
                  this.state.time.setHours(0,0,0,chartTime)
                  stime.push(this.state.time.toTimeString().slice(0,8));
                  sdata.push(null);
                  chartTime = chartTime + 1000*60*15;
                }
                this.setState({
                    hData:tempdata,
                    hchartData:{
                      labels: htime,
                      datasets:[
                        {
                          label:'Heart Rate',
                          data:hdata,
                          backgroundColor:'rgba(255, 99, 132, 0.6)',
                          pointRadius: 0
                        }
                      ]
                    },
                    schartData:{
                        labels: stime,
                        datasets:[
                          {
                            label:'Steps',
                            data:sdata,
                            backgroundColor:'rgba(255, 99, 132, 0.6)',
                            pointRadius: 0
                          }
                        ]
                      },
                    cchartData:{
                        labels: ctime,
                        datasets:[
                          {
                            label:'Calories Burned',
                            data:cdata,
                            backgroundColor:'rgba(255, 99, 132, 0.6)',
                            pointRadius: 0
                          }
                        ]
                      }
                  });
            }
        })
    }
    handleClick = (e) => {
      if (this.node.contains(e.target))
      {
        return;
      }
      this.handleClickOutside();
    }
    dropdownInfo(){
      document.getElementById("myDropdownInfo").classList.toggle("show");
    }
    render(){
        return(
          <div class="body">
            <div>
              <div id="navbar"><Navbar></Navbar></div>
              <div>
              <div className="col-lg-7 mx-auto text-dark text-center pt-2">
           		 <h3 className="display-4">DAILY CALORIES AND HEARTRATE</h3>
          		</div>
              <br></br>
              <div className="text-center">
              <h6>Calories burned today:- <Calories heartrate={this.state.hData} profile={this.state.profile} day={this.state.time}></Calories></h6>
              </div>
<<<<<<< HEAD
              {/* <div className='container'>
=======
              </div>
              <div className='text-center'>
              <br></br>
>>>>>>> e43282c3cf513cc802358167938815a515d80b39
                <button onClick={() => this.handlePrevious()}>Previous Day</button>
                <button onClick={() => this.handleToday()}>Today</button>
                <button onClick={() => this.handleNext()}>Next Day</button>
                <div>Day - <span>{this.state.time.getDate()}/{this.state.time.getMonth()}/{this.state.time.getFullYear()}</span></div>
<<<<<<< HEAD
              </div> */}
              <div className="dropdownInfo" ref={node => this.node = node}>
									<button onClick={() => this.dropdownInfo()} className="dropbtnInfo">Monthly Graphs</button>
									<div id="myDropdownInfo" className="dropdown-contentInfo">
										{/* <button onClick={() => this.handleMonth()} className="handleM">This Month</button>
										<button onClick={() => this.prevMonth()} className="handlePM">Previous Month</button>
										<button onClick={() => this.nextMonth()} className="handleNM">Next Month</button> */}
                    <button onClick={() => this.handlePrevious()} className='handleDay'>Previous Day</button>
                    <button onClick={() => this.handleToday()} className='handleTDay'>Today</button>
                    <button onClick={() => this.handleNext()} className='handleNDay'>Next Day</button>
									</div>
								</div>
              <div>Day - <span>{this.state.time.getDate()}/{this.state.time.getMonth()}/{this.state.time.getFullYear()}</span></div>
              <div className='container'>
=======

              </div>
              <div className="col-md-8" >
>>>>>>> e43282c3cf513cc802358167938815a515d80b39
                <Chart title="Daily Heart Rate" chartData={this.state.hchartData}/>
              </div>
              <div className='col-md-8 float-right'>
                <Chart title="Daily Steps" chartData={this.state.schartData}/>              
              </div>
              <div className='container'>
                <Chart title="Calories Burned" chartData={this.state.cchartData}/>              
              </div>
              <div id="footer"><Footer></Footer></div>
            </div>
            </div>
        );
    }
    
}

export default Info;