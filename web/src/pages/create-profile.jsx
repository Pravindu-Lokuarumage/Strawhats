import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Form  from 'react-bootstrap/Form';
import Button  from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import $ from "jquery";


const API_URL = 'http://localhost:5000/api';


class  NewProfile extends Component {
    constructor(props){
		super(props)
		this.state ={
            user:localStorage.getItem('user'),
            name : String,
            weight: Number,
            height: Number,
            age: Number,
			gender:String
		}
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        let value
        let nam = event.target.id; 
        if (event.target.type === 'radio')
        {
            nam = "gender";
            value = event.target.id;
        }
        else
        {
            value = event.target.value; 
        }

        this.setState({
            [nam]: value
        })
        console.log(this.state);
    }
    handleClick(){
        $.post(`${API_URL}/profile`, this.state)
        .then((response) =>{
			if (response.success) {
                console.log(response);
				window.location.href="/"				
                
			}
		});
    }
	render(){
		return(
        	<div>
                <div id="navbar"><Navbar></Navbar></div>
                <Container>
                    <div className="wrap-contact2">
                        <Form>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control placeholder="Full Name" onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col} controlId="weight">
                                    <Form.Label>Weight</Form.Label>
                                    <Form.Control placeholder="weight" onChange={this.handleChange}/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="height">
                                    <Form.Label>Height</Form.Label>
                                    <Form.Control placeholder="height" onChange={this.handleChange}/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} xs={7}controlId="age">
                                    <Form.Label >Age</Form.Label>
                                    <Form.Control placeholder="age" onChange={this.handleChange}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="gender">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        label="Male"
                                        name="formHorizontalRadios"
                                        id = "Male"
                                        onChange={this.handleChange}
                                    />
                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="Female"
                                        name="formHorizontalRadios"
                                        id = "Female"
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Button variant="primary" onClick={this.handleClick}>
                                Submit
                            </Button>
                        </Form>
                    </div>
                </Container>
			    <div id="footer"><Footer></Footer></div>

            </div>
    	);
	}
    
}

export default NewProfile;