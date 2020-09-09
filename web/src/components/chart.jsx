import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import {Bar,Line} from 'react-chartjs-2';

class Chart extends Component { 
    constructor(props){
        super(props);
      }
    
    static defaultProps = {
      displayTitle:true,
      displayLegend: true,
      legendPosition:'right',
      location:'City'
    } 
  render(){
    return(
        <div className="chart">
        <Line
          data={this.props.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Largest Cities In '+this.props.location,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
        </div>          
    );
  }
    
}

export default Chart;