import { Table, Container, Card, Row, Col, Button, ButtonToolbar } from 'react-bootstrap'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import Header from '../../Header'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { companyProfile } from '../../redux/actions/Companies'

class EngineerProfile extends Component {

    componentDidMount(){
        this.companyProfile(process.env.REACT_APP_BASE_URL+`api/v1/companies/`+this.props.match.params.id)
    }

    companyProfile = (url) => {
        this.props.fetch(url)
    }

    render() {
        // console.log()
        return (
            <>
            <Header />
            <Container className='justify-content-center mt-3' style={{ paddingBottom:'20px'}}>
                <Row className='justify-content-center'>
                <Col md='3'>
                    { (!this.props.Companies.logo) ?
                    <Card style={{ marginBottom:'15px', marginRight: '20px', borderRadius:'12%', width: '14rem', height:'20rem', backgroundImage: `url(/img/profil.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <Card.Body style={{ height: '200px'}}>
                    </Card.Body>
                    </Card> : 
                    <Card style={{ marginBottom:'15px', marginRight: '20px', borderRadius:'12%', width: '14rem', height:'20rem', backgroundImage: `url(`+process.env.REACT_APP_BASE_URL+`uploads/companies/${this.props.Companies.logo})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                    <Card.Body style={{ height: '200px'}}>
                    </Card.Body>
                    </Card> }
                    </Col>
                <Col>
                <Table striped bordered hover>
                <tbody>
                    <tr>
                    <td width='30%'>Name</td>
                    <td>{this.props.Companies.name}</td>
                    </tr>
                    <tr>
                    <td>Email</td>
                    <td>{this.props.Companies.email}</td>
                    </tr>
                    <tr>
                    <td>Location</td>
                    <td>{(this.props.Companies.location!==null)&&(this.props.Companies.location!=='null')&&this.props.Companies.location}</td>
                    </tr>
                    <tr>
                    <td>Description</td>
                    <td>{(this.props.Companies.description!==null)&&(this.props.Companies.description!=='null')&&this.props.Companies.description}</td>
                    </tr>
                </tbody>
                </Table>
                <ButtonToolbar>
                <Link to={`/companies`}><Button variant="outline-primary"><FontAwesomeIcon icon={faArrowAltCircleLeft}/> Back</Button></Link>&nbsp;
                </ButtonToolbar></Col>
                </Row>
            </Container>
        </>
        )
    }
}
const mapStateToProps = state => ({
    Companies: state.Companies
})
const mapDispatchToProps = dispatch => ({
    fetch: url => dispatch(companyProfile(url))
})
export default connect(mapStateToProps, mapDispatchToProps)(EngineerProfile)