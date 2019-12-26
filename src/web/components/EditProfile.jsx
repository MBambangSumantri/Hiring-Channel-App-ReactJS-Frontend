import React, { Component } from 'react'
import { Container, Card, Row, Col, Button, Form, Alert } from 'react-bootstrap'
import Header from '../Header'
import Axios from 'axios'

export default class EditProfile extends Component {
    constructor(){
        super()
        this.state={
            name:'',
            email:'',
            description:'',
            expectsalary:'',
            skill:'',
            location:'',
            dateofbirth:'',
            showcase:'',
        }
    }
    componentDidMount(){
        this.getData(`http://localhost:8000/api/v1/engineer/`+this.props.match.params.id)
    }
    getData = (url) =>{
        Axios.get(url)
        .then(res=>{
            this.setState({
              name: res.data.result[0].name,
              email: res.data.result[0].email,
              description: res.data.result[0].description,
              expectsalary: res.data.result[0].expectsalary,
              skill: res.data.result[0].skill,
              location: res.data.result[0].location,
              dateofbirth: res.data.result[0].dateofbirth,
              showcase: res.data.result[0].showcase
            });
        })
    }

    updateEngineer = e =>{
        e.preventDefault();
        const data = {
            name: this.state.name,
            email: this.state.email,
            description: this.state.description,
            expectedsalary: this.state.expectedsalary,
            skill: this.state.skill,
            location: this.state.location,
            showcase: this.state.showcase
        }
        Axios.put('http://localhost:8000/api/v1/engineer/'+localStorage.getItem('id'), data)
        .then( res=>{
            this.setState({
                message: 'Update Success!'
            })
            // this.props.history.push(`/profile/${localStorage.getItem('id')}`)
        })
        .catch(err=>{
            this.setState({
                message: 'Update Failed!'
            })
        })
    }

    render() {
        return (
            <>
            <Header user={this.state.name}/>
            <Container className='justify-content-center mt-3' style={{ paddingBottom:'20px'}}>
            <Row className='justify-content-center'>
            
            <Col md='3'>
            <Card style={{ marginBottom:'15px', marginRight: '20px', borderRadius:'12%', width: '14rem', height:'20rem', backgroundImage: 'url(/img/profile.jpg)', backgroundSize: 'cover' }}>
            <Card.Body style={{ height: '200px'}}>
            </Card.Body>
            </Card></Col>
            <Col>
            { (this.state.message==='Update Failed!') ? ( ['danger'].map((variant, idx) => (
                        <Alert key={idx} variant={variant}>
                          {this.state.message}
                        </Alert>)
                      )) : (this.state.message==='Update Success!') ? ( ['success'].map((variant, idx) => (
                        <Alert key={idx} variant={variant}>
                          {this.state.message}
                        </Alert>)
                      )) : null
                }
            <Form onSubmit={ (e) => this.updateEngineer(e)}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={ (e) => this.setState({ name: e.target.value })} name="name" type="text" value={this.state.name} placeholder="Enter name" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={ (e) => this.setState({ email: e.target.value })} name="email" type="text" value={this.state.email} placeholder="Enter Email" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={ (e) => this.setState({ description: e.target.value })} name="description" type="text" value={this.state.description} placeholder="Enter description" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Expected Salary</Form.Label>
                    <Form.Control onChange={ (e) => this.setState({ expectsalary: e.target.value })} name="expectsalary" type="text" value={this.state.expectsalary} placeholder="Enter Expect Salary (IDR)" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Skill</Form.Label>
                    <Form.Control as="textarea" rows="3" onChange={ (e) => this.setState({ skill: e.target.value })} name="skill" type="text" value={this.state.skill} placeholder="Enter skill" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Location</Form.Label>
                    <Form.Control onChange={ (e) => this.setState({ location: e.target.value })} name="location" type="location" value={this.state.location} placeholder="Enter location" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Date Of Birth</Form.Label>
                    <Form.Control onChange={ (e) => this.setState({ dateofbirth: e.target.value })} name="dateofbirth" type="text" value={this.state.dateofbirth} placeholder="Enter date of birth" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Showcase</Form.Label>
                    <Form.Control rows="3" onChange={ (e) => this.setState({ showcase: e.target.value })} name="showcase" type="text" value={this.state.showcase} placeholder="Enter showcase" />
                </Form.Group>
                <Button variant="outline-warning" type="button" href={`/profile/${localStorage.getItem('id')}`} >Cancel</Button>&nbsp;
                <Button variant="outline-primary" type="submit">Save</Button>
            </Form>
            </Col>
            </Row>
            </Container>
            </>
        )
    }
}