import { Table, Container, Card, Row, Col, Button, ButtonToolbar } from 'react-bootstrap'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import Header from '../Navigation'
import Axios from 'axios'

import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

export default class Profile extends Component {
    constructor(){
        super()
        this.state={
            id:'',
            name:'',
            email:'',
            description:'',
            expectsalary:'',
            skill:'',
            location:'',
            dateofbirth:'',
            showcase:'',
            datecreate:'',
            dateupdated:'',
            isDelete: false
        }
    }
    componentDidMount(){
        this.getData(`http://localhost:8000/api/v1/engineer/`+this.props.match.params.id)
    }

    getData = (url) =>{
        Axios.get(url)
        .then(res=>{
            this.setState({
                name:res.data.result[0].name,
                id:res.data.result[0].id,
                email:res.data.result[0].email,
                description:res.data.result[0].description,
                expectsalary:res.data.result[0].expectsalary,
                skill:res.data.result[0].skill,
                location:res.data.result[0].location,
                dateofbirth:res.data.result[0].dateofbirth,
                showcase:res.data.result[0].showcase,
                datecreate:res.data.result[0].datecreate,
                dateupdated:res.data.result[0].dateupdated
            })
        })
    }    

    deleteData = (url) =>{
         console.log(url)
        Axios.delete(url)
        .then(res=>{
            this.setState({
                isDelete: true
            })
        })
    }    

    render() {
        console.log(this.state.id)
        return (
            <>
            <Header user={this.state.name}/>
            <Container className='justify-content-center mt-3' style={{ paddingBottom:'20px'}}>
                <Row className='justify-content-center'>
                    <Col md='3'>
                <Card style={{ marginBottom:'15px', marginRight: '20px', borderRadius:'12%', width: '14rem', height:'20rem', backgroundImage: 'url(/img/lumayan.jpg)', backgroundSize: 'cover' }}>
                <Card.Body style={{ height: '200px'}}>
                </Card.Body>
                </Card></Col>
                <Col>
                <Table striped bordered hover>
                <tbody>
                    <tr>
                    <td width='30%'>Name</td>
                    <td> {this.state.name}</td>
                    </tr>
                    <tr>
                    <td>Date Of Birth</td>
                    <td>{this.state.dateOfBirth}</td>
                    </tr>
                    <tr>
                    <td>Location</td>
                    <td>{this.state.location}</td>
                    </tr>
                    <tr>
                    <td>Phone</td>
                    <td>{this.state.phone}</td>
                    </tr>
                    <tr>
                    <td>Description</td>
                    <td>{this.state.description}</td>
                    </tr>
                    <tr>
                    <td>Email</td>
                    <td>{this.state.email}</td>
                    </tr>
                    <tr>
                    <td>Expected Salary</td>
                    <td>{this.state.expectedSalary}</td>
                    </tr>
                    <tr>
                    <td>Skill</td>
                    <td>{this.state.skill}</td>
                    </tr>
                    <tr>
                    <td>Showcase</td>
                    <td>{this.state.showcase}</td>
                    </tr>
                </tbody>
                </Table>
                <ButtonToolbar>
                <Button variant="outline-warning"><FontAwesomeIcon icon={faPencilAlt} /> Edit</Button>&nbsp;
                <Button variant="outline-danger" onClick={() => this.deleteData(`http://localhost:8000/api/v1/engineer/${this.state.id}`)}><FontAwesomeIcon icon={faTrash} /> Delete</Button>
                </ButtonToolbar></Col>
                </Row>
                { (this.state.isDelete) ? <Redirect to='/' /> : null}
            </Container>
        </>
        )
    }
}
