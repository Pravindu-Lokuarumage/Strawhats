import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Calories extends Component { 
    constructor(props){
        super(props)
        this.state ={
            data:this.props.heartrate,
            caloriesBurn:0
        }
    } 
    arrSum = function(arr){
        return arr.reduce(function(a,b){
          return Number(a) + Number(b)
        }, 0);
    }
    componentDidUpdate(){
        console.log(this.props.profile);
        if(this.state.data !== this.props.heartrate)
        {
            const avg = this.arrSum(this.props.heartrate)/this.props.heartrate.length
            const today = new Date()
            var hours = today.getHours()
            if (today.getDate() !== this.props.day.getDate())
            {
                hours = 24;
            }
            this.setState({
                data:this.props.heartrate,
                caloriesBurn:((-55.0969 + (0.6309*avg) + (0.1988*this.props.profile.weight) + (0.2017*this.props.profile.age))/4.184)*60*hours
            })
        }
    }
    render(){
        return(
            <div>{this.state.caloriesBurn}</div>       
        );
    }
    
}

export default Calories;