import React, {Component} from 'react'
import { Col, Nav, Navbar, Row } from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUserCircle, faCommentDots, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import Search from "./components/Search";
import { connect } from 'react-redux'
import { getEngineer, getCompany } from './redux/actions/Profile'

class Navigation extends Component {
    componentDidMount(){
        (localStorage.getItem('role')==='engineer') ?
        this.getEngineerName(process.env.REACT_APP_BASE_URL+'/api/v1/engineer/'+localStorage.getItem('id')) :
        this.getCompanyName(process.env.REACT_APP_BASE_URL+'/api/v1/company/'+localStorage.getItem('id'))
    }

    getEngineerName = url => {
        this.props.getEngineer(url)
    }

    getCompanyName = url => {
        this.props.getCompany(url)
    }

    signOut = () =>{
        localStorage.clear();
    }

    render() {
        let name
        (localStorage.getItem('role')==='engineer') ? name = (this.props.Engineers.user).split(' ') : name = (this.props.Companies.user).split(' ')
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
                <Search /> : null
            }
            </Col>
            <Col><Row><Col md='5'>
                            <Nav className="ml-auto">
                            <Nav.Link className="mt-2" href="/">Engineers</Nav.Link>
                            <div className="mt-1" style={{ borderRight: '1px solid #CECECE'}}></div>
                            <Nav.Link className="mt-2" href="/companies">Companies</Nav.Link>
                            </Nav></Col><Col></Col><Col md='5'>
                            <Nav className="ml-auto">
                            {(localStorage.getItem('role')==='engineer') ? 
                            <Nav.Link className="mt-2" href={`/profile/${localStorage.getItem('id')}`}><FontAwesomeIcon icon={faUserCircle} size="lg" /> {first}</Nav.Link> :
                            <Nav.Link className="mt-2" href={`/companies/${localStorage.getItem('id')}`}><FontAwesomeIcon icon={faUserCircle} size="lg" /> {first}</Nav.Link> }
                            <div className="mt-1" style={{ borderRight: '1px solid #CECECE'}}></div>
                            <Nav.Link className="mt-2" href="/"><FontAwesomeIcon icon={faCommentDots} size="lg" /></Nav.Link>
                            <Nav.Link className="mt-2" onClick={() => this.signOut()} href='/login'><FontAwesomeIcon icon={faSignOutAlt} size="lg" /></Nav.Link>
                        </Nav></Col></Row></Col>
        </Navbar.Collapse>
    </Navbar>
    </>
    );
   }
}

const mapStateToProps = state => ({
  Engineers: state.Engineers,
  Companies: state.Companies
});
const mapDispatchToProps = dispatch => ({
  getEngineer: url => dispatch(getEngineer(url)),
  getCompany: url => dispatch(getCompany(url))
});
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
