import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Pie} from 'react-chartjs-2';

class Chart extends Component { 
    constructor(props){
        super(props);
      }
    
    static defaultProps = {
      displayTitle:true,
      displayLegend: true,
      legendPosition:'right',
      title:'City'
    } 
  render(){
    return(
        <div className="chart">
        <Pie
          data={this.props.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:this.props.title,
              fontSize:25,
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