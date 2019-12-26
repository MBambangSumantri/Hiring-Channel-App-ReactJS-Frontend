import React, { Component } from 'react';
import Header from '../../Header'
import CardList from './CardList'
import "../../css/style.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Button,Row, ButtonToolbar, DropdownButton, Dropdown, Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import { fetchCompanies } from '../../redux/actions/Companies'
import { HashLoader } from "react-spinners"


class Card extends Component {

    componentDidMount(){
        // do something after component mounted
        this.fetchCompanies(process.env.REACT_APP_BASE_URL+'/api/v1/company?page=1')
        // { (localStorage.getItem('id')) && this.getName(process.env.REACT_APP_BASE_URL+'api/v1/engineer/'+localStorage.getItem('id')) }
      }

      fetchCompanies = (url) => {
        this.props.fetch(url)
      }

      getName = (url) => {
        this.props.get(url)
      }

    render(){
        return (
          <>

           { (!localStorage.getItem('token')) ? this.props.history.push('/login') :
          <Header searchBar='true' /> }

          <Container style={{paddingTop:"15px"}}>
          <Row className='xs-5'>
            <ButtonToolbar>
            {['Secondary'].map(
                variant => (
                <DropdownButton
                    title='Batas Per Halaman'
                    variant={variant.toLowerCase()}
                    id={`dropdown-variants-${variant}`}
                    key={variant}>
                    <Dropdown.Item eventKey="1" onClick={() => this.fetchEngineers((this.props.Engineers.base_url.replace(/&limit=12|&limit=24|&limit=48|&limit=96/gi,''))+'&limit=12')}> 12</Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={() => this.fetchEngineers((this.props.Engineers.base_url.replace(/&limit=12|&limit=24|&limit=48|&limit=96/gi,''))+'&limit=24')}> 24</Dropdown.Item>
                    <Dropdown.Item eventKey="3" onClick={() => this.fetchEngineers((this.props.Engineers.base_url.replace(/&limit=12|&limit=24|&limit=48|&limit=96/gi,''))+'&limit=48')}> 48</Dropdown.Item>
                    <Dropdown.Item eventKey="4" onClick={() => this.fetchEngineers((this.props.Engineers.base_url.replace(/&limit=12|&limit=24|&limit=48|&limit=96/gi,''))+'&limit=96')}> 96</Dropdown.Item>
                </DropdownButton>
                ),
            )}
            </ButtonToolbar>&nbsp;
            <ButtonToolbar>
            {['Secondary'].map(
                variant => (
                <DropdownButton
                    title='Urutkan'
                    variant={variant.toLowerCase()}
                    id={`dropdown-variants-${variant}`}
                    key={variant}>
                    <Dropdown.Item eventKey="1" onClick={() => this.fetchCompanies((this.props.Companies.base_url.replace(/&sort=name&order=asc|&sort=name&order=desc/gi,''))+'&sort=name&order=asc')}>Nama (A-Z)</Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={() => this.fetchCompanies((this.props.Companies.base_url.replace(/&sort=name&order=asc|&sort=name&order=desc/gi,''))+'&sort=name&order=desc')}>Nama (Z-A)</Dropdown.Item>
                </DropdownButton>
                ),
            )}
            </ButtonToolbar>
            </Row>
            </Container>
        { // conditional rendering show loading and error
          this.props.Companies.isLoading ?
          <Row className="justify-content-center">
          <HashLoader size={150} style={{paddingBottom:"15px"}}></HashLoader>
          </Row> : 
          this.props.Companies.isError ? (
            <Row className="justify-content-center">
              <Button variant="outline-primary" onClick={() => this.fetchCompanies(process.env.REACT_APP_BASE_URL+'/api/v1/company?page=1')}>Coba Lagi</Button>
            </Row>
          ) : 
          <div className="containerGrid">
          <CardList list={this.props.Companies.card} />
          </div>
            }

            <Row className="justify-content-center" >
            { // conditional rendering when there is no previous
              (!this.props.Companies.previous) ? <Button variant="outline-primary" disabled><FontAwesomeIcon icon={faAngleLeft} /></Button> : <Button variant="outline-primary" onClick={() => this.fetchCompanies(this.props.Companies.previous)}><FontAwesomeIcon icon={faAngleLeft} /></Button>
            }
            &nbsp;<Button variant="outline-primary" disabled> {this.props.Companies.page} </Button>&nbsp;
            {(!this.props.Companies.next) ? <Button variant="outline-primary" disabled><FontAwesomeIcon icon={faAngleRight} /></Button> : <Button variant="outline-primary" onClick={() => this.fetchCompanies(this.props.Companies.next)}><FontAwesomeIcon icon={faAngleRight} /></Button>}
            </Row>
            </>
        );
    }
}

const mapStateToProps = state => ({
  Companies: state.Companies
});
const mapDispatchToProps = dispatch => ({
  fetch: url => dispatch(fetchCompanies(url)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Card);