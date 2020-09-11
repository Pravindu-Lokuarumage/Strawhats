import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Chart from '../components/chart';
import $ from "jquery";

const API_URL = 'https://api-cyan-six.vercel.app/api';
const currentUser = localStorage.getItem('user');

class Info extends Component {
    constructor(props){
        super(props);
        this.state = {
          hchartData:{},
          schartData:{},
          time:new Date()
        };
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleToday = this.handleToday.bind(this);

    }
    handlePrevious(){
      var temp = this.state.time;
      temp.setDate(temp.getDate() -1);
      this.setState({time:temp})
      this.getData();
    }
    handleNext(){
      var temp = this.state.time;
      temp.setDate(temp.getDate() +1);
      this.setState({time:temp})
      this.getData();
    }
    handleToday(){
      var temp = new Date();
      this.setState({time:temp})
      this.getData();
    }
    componentWillMount(){
        this.getData();
    }
    componentDidUpdate(){
        
    }
    getData(){
        $.get(`${API_URL}/data/${currentUser}`)
        .then(response => {
            if (response[0]== null){
            }
            else{
                var htime =[];
                var hdata =[];
                var stime =[];
                var sdata =[];


                response[0].heartrate.forEach(element => {
                    var timestamp = new Date(element.time)
                    if (timestamp.getDate()== this.state.time.getDate())
                    {
                      htime.push(timestamp.toTimeString().slice(0,8));
                      hdata.push(element.heartrate);
                    }
                });
                response[0].stepsperd.forEach(element => {
                    stime.push(new Date(element.time).toTimeString().slice(0,8));
                    sdata.push(element.stepsperd);
                });
                
                this.setState({
                    hchartData:{
                      labels: htime,
                      datasets:[
                        {
                          label:'Heart Rate',
                          data:hdata,
                          backgroundColor:'rgba(255, 99, 132, 0.6)'
                        }
                      ]
                    },
                    schartData:{
                        labels: stime,
                        datasets:[
                          {
                            label:'Steps',
                            data:sdata,
                            backgroundColor:'rgba(255, 99, 132, 0.6)'
                          }
                        ]
                      }
                  });
                console.log(this.state)
            }
        })
    }
    render(){
        return(
            <div>
                    <div id="navbar"><Navbar></Navbar></div>
                    <div>
                      <Chart chartData={this.state.hchartData}/>
                      <button onClick={() => this.handlePrevious()}>Yesterday</button>
                      <button onClick={() => this.handleToday()}>Today</button>
                      <button onClick={() => this.handleNext()}>Tommorow</button>
                      <Chart chartData={this.state.schartData}/>
                    </div>
                    <div id="footer"><Footer></Footer></div>
                </div>
        );
    }
    
}

export default Info;