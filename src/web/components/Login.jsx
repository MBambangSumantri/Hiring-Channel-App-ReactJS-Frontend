import { Form, Button, Row, Col, Alert, Nav } from 'react-bootstrap'
import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, withRouter } from 'react-router-dom'

class Login extends Component {
    constructor(){
        super()
        this.state={
            message: '',
            email: '',
            role: '',
            token: '',
            id: ''
        }
    }
    Login = e =>{
        e.preventDefault();
        const dataLogin = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('http://localhost:8000/auth/login', dataLogin)
        .then( res=>{
            this.setState({
                email: res.data.data.email,
                message: res.data.message,
                role: res.data.data.role,
                token: res.data.token,
                id: res.data.data.id
            })
            localStorage.setItem('token', this.state.token)
            localStorage.setItem('id', this.state.id)
            localStorage.setItem('email', this.state.email)
            localStorage.setItem('role', this.state.role)
            this.props.history.push('/')
        })
        .catch(err=>{
            this.setState({
                message: 'Login Failed!'
            })
        })
    }
    render() {
        return (
            <>
            <Row>
            <Col md="7">
            <Row className="justify-content-center" style={{paddingTop:100}}>
            <img src='/img/ilustrasi.svg' style={{width:600}} alt='LoginImage' />
            </Row>
            </Col>
            <Col md="5">
            { (this.state.message==='Login Failed!') ? ( ['danger'].map((variant, idx) => (
                        <Alert key={idx} variant={variant}>
                          {this.state.message}
                        </Alert>)
                      )) : null
            }
            <Row className="justify-content-center" style={{paddingTop:130}}>
                <Form onSubmit={ (e) => this.Login(e)}>
                <Form.Group controlId="formTitle">
                    <Form.Label><h2>Sign In</h2></Form.Label>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={ (e) => this.setState({ email: e.target.value })} name="email" type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={ (e) => this.setState({ password: e.target.value })} name="password" type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="6">Not registered?</Form.Label>
                        <Nav.Link href="/register">Create an account</Nav.Link>
                    </Form.Group>
                    <Button variant="primary" type="submit">Login</Button>
                </Form>
                </Row>
                </Col>
                </Row>
                { (localStorage.getItem('token')) ? (localStorage.getItem('role')==='engineer') ? <Redirect to='/companies' /> : <Redirect to='/' /> : null}
                </>
        )
    }
}
export default withRouter(Login)