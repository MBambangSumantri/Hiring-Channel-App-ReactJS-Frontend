import React, {Component} from 'react'
import { Col, Nav, Navbar } from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUserCircle, faCommentDots, faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import Search from "./components/Search";

export default class Navigation extends Component {
    getData = (data) =>{
        this.props.getDataFromSearch(data)
    }
    render() {
    return (
    <>
    <Navbar bg="light" expand="lg" style={{ borderBottom: '3px solid #DADADA'}}>
        <Navbar.Brand href="http://localhost:3000"><img src='/img/arkademy.png' height={50} alt="Logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Col md="7">
            {
                (this.props.searchBar==='true') ?
                <Search getDataFromSearch={this.getData} onChange={this.getData}/> : null
            }
            </Col>
            <Col>
            <Nav className="ml-auto">
                <Nav.Link className="ml-2 mr-2" href="#home">Home</Nav.Link>
                <Nav.Link className="ml-2" href="#home"><FontAwesomeIcon icon={faUserCircle} size="lg" />{this.props.user}</Nav.Link>
                <div className="ml-3 mt-1 mr-2" style={{ borderRight: '1px solid #CECECE'}}></div>
                <Nav.Link className="ml-4" href="#home"><FontAwesomeIcon icon={faCommentDots} size="lg" /></Nav.Link>
                <Nav.Link className="ml-4" href="#home"><FontAwesomeIcon icon={faSignInAlt} size="lg" /></Nav.Link>
            </Nav>
            </Col>
        </Navbar.Collapse>
    </Navbar>
    </>
    );
   }
}
