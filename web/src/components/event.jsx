import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
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
            user_data:[],
            steps:[],
            distance:[],
            calories:[],
            show:false
        }
        
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
    } 
    static defaultProps = {
        start: new Date(),
        end: new Date(),
        users:[]
      }
    componentDidMount(){
        this.props.users.map(user => {
            console.log(user)
            $.get(`${API_URL}/data/${user}`)
            .then((response) => {
                
                var Tsteps = 0;  
                var distance = 0;
                var calories = 0;
                response[0].stepsperd.forEach(element => {
                    if( new Date(this.props.start).getTime() < new Date(element.time).getTime() && new Date(this.props.end).getTime() > new Date(element.time).getTime())
                    {
                        Tsteps = Tsteps + parseInt(element.stepsperd, 10)
                    }
                });   
                distance = Tsteps/1.35;
                calories = distance/18.8;                        
            
                console.log(this.props.name);              
                console.log(user);
                console.log(Tsteps);              
                console.log(distance);              
                console.log(calories);  
                var Arr = this.state.user_data;
                Arr.push({Tsteps,distance,calories,user}); 
                var sArr = this.state.steps;
                sArr.push(Tsteps); 
                var dArr = this.state.distance;
                dArr.push(distance); 
                var cArr = this.state.calories;
                cArr.push(calories); 
                this.setState({
                    data:response[0],
                    user_data: Arr,
                    steps: sArr,
                    distance: dArr,
                    calories: cArr
                })  
                console.log(this.state);   
            })                                          
        }) 
        this.setState({
            SchartData:{
                labels: this.props.users,
                datasets:[
                  {
                    label:'Total Steps',
                    data:this.state.steps,
                    backgroundColor:'rgba(255, 99, 132, 0.6)',
                    pointRadius: 0
                  },
                  {
                    label:'Total Distance',
                    data:this.state.distance,
                    backgroundColor:'rgba(255, 0, 132, 0.6)',
                    pointRadius: 0
                  },
                  {
                    label:'Total Calories',
                    data:this.state.calories,
                    backgroundColor:'rgba(255, 120, 132, 0.6)',
                    pointRadius: 0
                  }
                ],
                
            },
            DchartData:{
                labels: this.props.users,
                datasets:[
                  {
                    label:'Total Steps',
                    data:this.state.distance,
                    backgroundColor:'rgba(255, 99, 132, 0.6)',
                    pointRadius: 0
                  }
                ]
            },
            CchartData:{
                labels: this.props.users,
                datasets:[
                  {
                    label:'Total Steps',
                    data:this.state.calories,
                    backgroundColor:'rgba(255, 99, 132, 0.6)',
                    pointRadius: 0
                  }
                ]
            },
              
        })           
    }
    handleClose(){
		this.setState({show:false})
	}
	handleShow(){
		this.setState({show:true})
	}
  render(){
    return(
      <Card>
        <br/>
        <Button onClick={this.handleShow}>{this.props.name}</Button>
        {this.state.user_data.map(user => {
            
            if (user.user === currentUser){
                return(
                    <div key ={user.user}>
                        <div>
                            {user.Tsteps}
                        </div>
                        <div>
                            {user.distance}
                        </div>
                        <div>
                            {user.calories}
                        </div>
                    </div>
                )
            }                                     
        })}
        <br/>
        <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
            <Modal.Header closeButton>
            <Modal.Title>Event details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
				<Chart chartData={this.state.SchartData} title="Event Summery"></Chart>
		    </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
      	</Modal>
      </Card>            
    )
  }
    
}

export default Event;