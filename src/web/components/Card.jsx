import React, { Component } from 'react';
import Header from '../Header'
import CardList from './CardList'
import "../css/style.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Button,Row, ButtonToolbar, DropdownButton, Dropdown, Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import { fetchEngineers } from '../redux/actions/Engineers'
import {HashLoader} from "react-spinners"


class Card extends Component {

    componentDidMount(){
        // do something after component mounted
        this.fetchEngineers(process.env.REACT_APP_BASE_URL+'/api/v1/engineer?page=1')
      }

      fetchEngineers = (url) => {
        this.props.fetch(url)
      }

    render(){
        return (
          <>
          { (!localStorage.getItem('token')) ? this.props.history.push('/login') :
          <Header searchBar='true'/> }

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
                    <Dropdown.Item eventKey="1" onClick={() => this.fetchEngineers((this.props.Engineers.base_url.replace(/&sort=name&order=asc|&sort=name&order=desc|&sort=dateupdated&order=asc|&sort=dateupdated&order=desc/gi,''))+'&sort=name&order=asc')}>Nama (A-Z)</Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={() => this.fetchEngineers((this.props.Engineers.base_url.replace(/&sort=name&order=asc|&sort=name&order=desc|&sort=dateupdated&order=asc|&sort=dateupdated&order=desc/gi,''))+'&sort=name&order=desc')}>Nama (Z-A)</Dropdown.Item>
                    <Dropdown.Item eventKey="3" onClick={() => this.fetchEngineers((this.props.Engineers.base_url.replace(/&sort=name&order=asc|&sort=name&order=desc|&sort=dateupdated&order=asc|&sort=dateupdated&order=desc/gi,''))+'&sort=dateupdated&order=asc')}>Terlama</Dropdown.Item>
                    <Dropdown.Item eventKey="4" onClick={() => this.fetchEngineers((this.props.Engineers.base_url.replace(/&sort=name&order=asc|&sort=name&order=desc|&sort=dateupdated&order=asc|&sort=dateupdated&order=desc/gi,''))+'&sort=dateupdated&order=desc')}>Terbaru</Dropdown.Item>
                </DropdownButton>
                ),
            )}
            </ButtonToolbar>
            </Row>
            </Container>
        { // conditional rendering show loading and error
          this.props.Engineers.isLoading ?
          <Row className="justify-content-center">
          <HashLoader size={150} style={{paddingBottom:"15px"}}></HashLoader>
          </Row> : 
          this.props.Engineers.isError ? (
            <Row className="justify-content-center">
              <Button variant="outline-primary" onClick={() => this.fetchEngineers(process.env.REACT_APP_BASE_URL+'/api/v1/engineer?page=1')}>Coba Lagi</Button>
            </Row>
          ) : 
          <div className="containerGrid">
          <CardList list={this.props.Engineers.card} />
          </div>
            }

            <Row className="justify-content-center" >
            { // conditional rendering when there is no previous
              (!this.props.Engineers.previous) ? <Button variant="outline-primary" disabled><FontAwesomeIcon icon={faAngleLeft} /></Button> : <Button variant="outline-primary" onClick={() => this.fetchEngineers(this.props.Engineers.previous)}><FontAwesomeIcon icon={faAngleLeft} /></Button>
            }
            &nbsp;<Button variant="outline-primary" disabled> {this.props.Engineers.page} </Button>&nbsp;
            {(!this.props.Engineers.next) ? <Button variant="outline-primary" disabled><FontAwesomeIcon icon={faAngleRight} /></Button> : <Button variant="outline-primary" onClick={() => this.fetchEngineers(this.props.Engineers.next)}><FontAwesomeIcon icon={faAngleRight} /></Button>}
            </Row>
            </>
        );
    }
}

const mapStateToProps = state => ({
  Engineers: state.Engineers
});
const mapDispatchToProps = dispatch => ({
  fetch: url => dispatch(fetchEngineers(url))
});
export default connect(mapStateToProps, mapDispatchToProps)(Card);