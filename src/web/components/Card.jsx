import React, { Component } from 'react';
import Header from '../Navigation'
import CardList from './CardList'
import "../css/style.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Button,Row, ButtonToolbar, DropdownButton, Dropdown, Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import { fetchEngineers, getEngineers } from '../redux/actions/Engineers'

class Card extends Component {

    componentDidMount(){
        // do something after component mounted
        this.fetchEngineers('http://localhost:8000/api/v1/engineer?page=1')
        // { (localStorage.getItem('id')) && this.getName(process.env.REACT_APP_BASE_URL+'api/v1/engineer/'+localStorage.getItem('id')) }
      }

      fetchEngineers = (url) => {
        this.props.fetch(url)
      }

      getName = (url) => {
        this.props.get(url)
      }

    render(){
        return (
          <>
          {/* { (!localStorage.getItem('token')) ? this.props.history.push('/login') : */}
          <Header searchBar='true' user={this.props.Engineers.user}/> {/*}*/}
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
                    <Dropdown.Item eventKey="1" onClick={() => this.fetchEngineers((this.props.Engineers.base_url.replace(/&limit=12|&limit=24|&limit=48|&limit=96/gi,''))+'&limit=15')}> 12</Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={() => this.fetchEngineers((this.props.Engineers.base_url.replace(/&limit=12|&limit=24|&limit=48|&limit=96/gi,''))+'&limit=20')}> 24</Dropdown.Item>
                    <Dropdown.Item eventKey="3" onClick={() => this.fetchEngineers((this.props.Engineers.base_url.replace(/&limit=12|&limit=24|&limit=48|&limit=96/gi,''))+'&limit=25')}> 48</Dropdown.Item>
                    <Dropdown.Item eventKey="4" onClick={() => this.fetchEngineers((this.props.Engineers.base_url.replace(/&limit=12|&limit=24|&limit=48|&limit=96/gi,''))+'&limit=30')}> 96</Dropdown.Item>
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
          <p>Loading..</p>
          </Row> : 
          this.props.Engineers.isError ? (
            <Row className="justify-content-center">
              <Button variant="outline-primary" onClick={() => this.fetchEngineers('http://localhost:8000/api/v1/engineer?page=1')}> Try Again</Button>
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
  fetch: url => dispatch(fetchEngineers(url)),
  get: url => dispatch(getEngineers(url))
});
export default connect(mapStateToProps, mapDispatchToProps)(Card);