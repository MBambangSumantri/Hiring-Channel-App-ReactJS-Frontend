import React, {Component} from 'react'
import { Col, Nav, Navbar, Row } from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUserCircle, faCommentDots, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import Search from "./components/Search";

export default class Navigation extends Component {
    signOut = () => {
        localStorage.clear();
    }

    render() {
        const name = (this.props.user).split(' ')
        const first = name[0]
    return (
    <>
    <Navbar bg="light" expand="lg" style={{ borderBottom: '3px solid #DADADA'}}>
        <Navbar.Brand href="/"><img src='/img/arkademy.png' alt="Logo" height="50" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Col md="7">
            {
                (this.props.searchBar==='true') ?
                <Search getDataFromSearch={this.getData} onChange={this.getData}/> : null
            }
            </Col>
            <Col><Row><Col md='5'>
                            <Nav className="ml-auto">
                            <Nav.Link className="mt-2" href="/">Engineers</Nav.Link><hr style={{ border:'none', borderRight: '1px solid hsla(200, 10%, 50%,100', height:'4vh', width:'1px' }} />
                            <Nav.Link className="mt-2" href="/companies">Companies</Nav.Link>
                            </Nav></Col><Col></Col><Col md='5'>
                            <Nav className="ml-auto">
                            <Nav.Link className="mt-2" href={`/profile/${localStorage.getItem('id')}`}><FontAwesomeIcon icon={faUserCircle} size="lg" /> {first}</Nav.Link> 
                            <hr style={{ border:'none', borderLeft: '1px solid hsla(200, 10%, 50%,100', height:'4vh', width:'1px' }} />
                            <Nav.Link className="mt-2" href="/"><FontAwesomeIcon icon={faCommentDots} size="lg" /></Nav.Link>
                            <Nav.Link className="mt-2" onClick={() => this.signOut()} href='/login'><FontAwesomeIcon icon={faSignOutAlt} size="lg" /></Nav.Link>
                        </Nav></Col></Row></Col>
        </Navbar.Collapse>
    </Navbar>
    </>
    );
   }
}
