import React, { Component,useEffect } from 'react';
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
          schartData:{}
        }
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
                    htime.push(new Date(element.time).toTimeString().slice(0,8));
                });
                response[0].heartrate.forEach(element => {
                    hdata.push(element.heartrate);
                });
                response[0].stepsperd.forEach(element => {
                    stime.push(new Date(element.time).toTimeString().slice(0,8));
                });
                response[0].stepsperd.forEach(element => {
                    sdata.push(element.stepsperd);
                });
                
                this.setState({
                    hchartData:{
                      labels: htime,
                      datasets:[
                        {
                          label:'Population',
                          data:hdata,
                          backgroundColor:'rgba(255, 99, 132, 0.6)'
                        }
                      ]
                    },
                    schartData:{
                        labels: stime,
                        datasets:[
                          {
                            label:'Population',
                            data:sdata,
                            backgroundColor:'rgba(255, 99, 132, 0.6)'
                          }
                        ]
                      }
                  });
            }
        })
    }
    render(){
        return(
            <div>
                    <div id="navbar"><Navbar></Navbar></div>
                    <div>
                        <Chart chartData={this.state.hchartData}/>
                        <Chart chartData={this.state.schartData}/>

                    </div>
                    <div id="footer"><Footer></Footer></div>
                </div>
        );
    }
    
}

export default Info;