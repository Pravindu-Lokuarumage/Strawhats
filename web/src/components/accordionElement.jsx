import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Event from './event'
import EventModal from './eventModal'
import EventModal2 from './eventModalOther'
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
        <Card className='bg-dark'>
          <Card.Header>
              <Row>
                  <Col>
                    <Accordion.Toggle as={Button} variant="link" eventKey={this.props.name}>
                        {this.props.name} - Created by {this.props.users[0]}
                    </Accordion.Toggle>
                  </Col>
                  <Col>
                    <EventModal key={this.props.key} users ={this.props.users} name={this.props.name} start = {this.props.start} end ={this.props.end}></EventModal>

                  </Col>
              </Row>
            
          </Card.Header>
          <Accordion.Collapse eventKey={this.props.name}>
            <Card.Body>
                <Event key={this.props.key} type={this.props.type} user ={this.props.user} name={this.props.name} start = {this.props.start} end ={this.props.end}></Event>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
                
    );
  }
    
}

export default Chart;