import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Chart from '../components/barChart'
import {Link} from 'react-router-dom';
import $ from "jquery";

const API_URL = 'https://api-cyan-six.vercel.app/api';
const currentUser = localStorage.getItem('user');
class Event extends Component { 
    constructor(props){
        super(props)
        this.state = {
            test:"ok",
            user_data:[]
        }
    } 
    static defaultProps = {
        start: new Date(),
        end: new Date(),
        type:"jogging",
        users:[]
      }
    componentDidMount(){
        $.get(`${API_URL}/data/${this.props.user}`)
        .then((response) => {
            var Tsteps = 0; 
            var count = 0;
            var Trate = 0; 
            var distance = 0;
            var calories = 0;
            response[0].stepsperd.forEach(element => {
                if(new Date(this.props.start).getTime() < new Date(element.time).getTime() && new Date(this.props.end).getTime() > new Date(element.time).getTime())
                {
                    Tsteps = Tsteps + parseInt(element.stepsperd, 10)
                }
            }); 
            response[0].heartrate.forEach(element => {
                if(new Date(this.props.start).getTime() < new Date(element.time).getTime() && new Date(this.props.end).getTime() > new Date(element.time).getTime())
                {
                    Trate = Trate + parseInt(element.heartrate, 10)
                    count++
                }
            });
            var AvgRate = Trate/count;
            if(this.props.type==="Swimming"){
                AvgRate = AvgRate + 20;
            }
            if(this.props.type==="Cycling"){
                AvgRate = AvgRate + 30;  
            }
            distance = Tsteps/1.35;
            
            calories = distance/18.8;                        
            if(this.props.type==="Swimming"){
                calories = calories * 8;
            }
            if(this.props.type==="Cycling"){
                calories = calories * 5;  
            }
            this.setState({
                data:response[0],
                user_data: {AvgRate,Tsteps,distance,calories},
                user:response[0].user
            })   

        })          
    }
  render(){
    return(
      <>
        <br/>
            <Row >
                <Col>
                    <div> Heart Rate </div>
                    <div>{this.state.user_data.AvgRate}</div>
                </Col>
                <Col>
                    <div> Total Distance </div>
                    <div>{this.state.user_data.distance}</div>
                </Col>
                <Col>
                    <div> Total calories burned </div>
                    <div>{this.state.user_data.calories}</div>
                </Col>
            </Row>
                
        <br/>
      </>            
    )
  }
    
}

export default Event;