import { Form, Button, Card, Row, Col, Alert, Nav } from 'react-bootstrap'
import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, withRouter } from 'react-router-dom'
// import "../css/login.css"

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
        axios.post(process.env.REACT_APP_BASE_URL+'auth/login', dataLogin)
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
            localStorage.setItem('email', this.state.email);
            console.log(res.data)
            this.props.history.push('/')
        })
        .catch(err=>{
            this.setState({
                message: 'Login Failed!'
            })
        })
    }
    render() {
        console.log(this.state.id)
        return (
            <>
            <Row>
            <Col className="col-7">

            </Col>
            <Col className="col-5">
            { (this.state.message==='Login Failed!') ? ( ['danger'].map((variant, idx) => (
                        <Alert key={idx} variant={variant}>
                          {this.state.message}
                        </Alert>)
                      )) : null
                }
                <Card>
                <Card.Header>
                    <Row className="justify-content-center">
                        <h2>Sign in</h2>
                    </Row>
                </Card.Header>
                <Card.Body>
                <Form onSubmit={ (e) => this.Login(e)}>
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
                        <Form.Label column sm="4">Not registered?</Form.Label>
                        <Col sm="8">
                        <Nav.Link href="/register">Create an account</Nav.Link></Col>
                    </Form.Group>
                    <Button variant="primary" type="submit">Signin</Button>
                </Form>
                </Card.Body></Card>
                </Col>
                { (localStorage.getItem('token')) ? <Redirect to='/' /> : null }
            </Row>
            </>
        )
    }
}
export default withRouter(Login)