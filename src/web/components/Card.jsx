import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Navigation'
import CardList from './CardList'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
// import { Row, Button } from "react-bootstrap";

// export default class Card extends Component {
//    constructor(){
//       super()
//       this.state={
//          card: [],
//          base_url: '',
//          isError:'',
//          page: '',
//          next: '',
//          prev: ''
//       }
//    }

//    // get data from JSON
//    componentDidMount() {
//       this.getAll("http://localhost:8000/api/v1/engineer?page=1")
//       // fetch("http://localhost:8000/api/v1/engineer?page=1").then(response => {
//       //    console.log(response.header)
//       // })
//    }

//   getAll = (url) => {
//      console.log(url)
//      axios.get(url)
//      .then(res => {
//         this.setState({
//           card: res.data.result.data,
//           page: res.data.page,
//           next: res.data.nextPage,
//           prev: res.data.prevPage
//         });
//        })
//      .catch(err => {
//         this.setState({
//           isError: true
//         });
//     })
// }

//    render() {
//      const {card, prev, next, page} = this.state;
//      console.log(this.state.next)
//     return (
//       <>
//       {/* header/navigation */}
//       <Header user=" M. Bambang Sumantri"/>

//       {/* sort and limit */}

//       {/* card list */}
//       <CardList list={card} />

//       {/* pagination */}
//       <Row className="justify-content-center">
//       <Button onClick={() => this.getAll(prev)}>previous</Button>
//       <Button disabled>{page}</Button>
//       <Button onClick={() => this.getAll(next)}>next</Button>
//       </Row>
//       </>
//     );
//   }
// }
import { Button,Row, ButtonToolbar, DropdownButton, Dropdown, Container } from 'react-bootstrap'

export default class Card extends Component {
    constructor(){
        super()
        this.state={
            card: [],
            base_url: '',
            isLoading: false,
            isError: false,
            next: '',
            page: '',
            token: '',
            previous: '',
            user: ' M. Bambang Sumantri'
        }
    }

    componentDidMount(){
        // do something after component mounted
        this.getAll('http://localhost:8000/api/v1/engineer?page=1')
      //   fetch('http://localhost:8000/api/v1/engineer?page=1').then(response=>{
      //     console.log(response.header)
      //   })
      }

      getToken = (headers) =>{
        if (headers && headers.authorization) {
          var parted = headers.authorization.split(" ");
            if (parted.length === 2) {
             this.setState({
               token: parted[1]
             }) 
            } else {
             return null;
            }
          } else {
           return null;
          }
      }

      getAll = (url) => {
        // alert('button clicked!')
        console.log(url)
        this.setState({ isLoading: true })
        axios.get(url)
          .then(res => {
            this.setState({ 
                card: res.data.result.data,
                next: res.data.nextPage,
                previous: res.data.prevPage,
                base_url: url,
                page: res.data.page,
                isLoading: false, isError: false})
          })
          .catch(err => {
            // console.log(err)
            this.setState({ isLoading: false, isError: true })
          })
      }

      getData = (data) => {
        // this.getAll(this.state.base_url+`&name=${data}`)
        axios.get(`http://localhost:8000/api/v1/engineer?page=1&name=${data}`)
        .then(res => {
          this.setState({ 
              card: res.data.result.data,
              next: res.data.nextPage,
              previous: res.data.prevPage,
              page: res.data.page,
              isLoading: false, isError: false})
        })
        .catch(err => {
          // console.log(err)
          this.setState({ isLoading: false, isError: true })
        })
      }
    render(){
        console.log(this.state.base_url)
        const { card, isLoading, isError, previous, next, page } = this.state;
        // <Header parentCallback={callbackFunction} />
        return (
          <>
          <Header getDataFromSearch={this.getData} searchBar='true' user={this.state.user}/>
          <Container className='justify-content-center mt-3' style={{ paddingBottom:'20px'}}>
          <Row>
            <ButtonToolbar>
            {['Primary'].map(
                variant => (
                <DropdownButton
                    title='Per Page'
                    variant={variant.toLowerCase()}
                    id={`dropdown-variants-${variant}`}
                    key={variant}>
                    <Dropdown.Item eventKey="1" onClick={() => this.getAll((this.state.base_url.replace(/&limit=5|&limit=10|&limit=15|&limit=20/gi,''))+'&limit=5')}> 5</Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={() => this.getAll((this.state.base_url.replace(/&limit=5|&limit=10|&limit=15|&limit=20/gi,''))+'&limit=10')}> 10</Dropdown.Item>
                    <Dropdown.Item eventKey="3" onClick={() => this.getAll((this.state.base_url.replace(/&limit=5|&limit=10|&limit=15|&limit=20/gi,''))+'&limit=15')}> 15</Dropdown.Item>
                    <Dropdown.Item eventKey="4" onClick={() => this.getAll((this.state.base_url.replace(/&limit=5|&limit=10|&limit=15|&limit=20/gi,''))+'&limit=20')}> 20</Dropdown.Item>
                </DropdownButton>
                ),
            )}
            </ButtonToolbar>&nbsp;
            <ButtonToolbar>
            {['Primary'].map(
                variant => (
                <DropdownButton
                    title='Sort By'
                    variant={variant.toLowerCase()}
                    id={`dropdown-variants-${variant}`}
                    key={variant}>
                    <Dropdown.Item eventKey="1" onClick={() => this.getAll((this.state.base_url.replace(/&sort=name&order=asc|&sort=name&order=desc|&sort=dateupdated&order=asc|&sort=dateupdated&order=desc/gi,''))+'&sort=name&order=asc')}>Name (A-Z)</Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={() => this.getAll((this.state.base_url.replace(/&sort=name&order=asc|&sort=name&order=desc|&sort=dateupdated&order=asc|&sort=dateupdated&order=desc/gi,''))+'&sort=name&order=desc')}>Name (Z-A)</Dropdown.Item>
                    <Dropdown.Item eventKey="3" onClick={() => this.getAll((this.state.base_url.replace(/&sort=name&order=asc|&sort=name&order=desc|&sort=dateupdated&order=asc|&sort=dateupdated&order=desc/gi,''))+'&sort=dateupdated&order=asc')}>Date (Asc)</Dropdown.Item>
                    <Dropdown.Item eventKey="4" onClick={() => this.getAll((this.state.base_url.replace(/&sort=name&order=asc|&sort=name&order=desc|&sort=dateupdated&order=asc|&sort=dateupdated&order=desc/gi,''))+'&sort=dateupdated&order=desc')}>Date (Desc)</Dropdown.Item>
                </DropdownButton>
                ),
            )}
            </ButtonToolbar></Row>
        { // conditional rendering show loading and error
          isLoading ?
          <Row className="justify-content-center">
          <p>Loading..</p></Row> : 
          isError ? (
            <Row className="justify-content-center">
              <Button variant="outline-primary" onClick={() => this.getAll('http://localhost:8000/api/v1/engineer?page=1')}> Try Again</Button>
            </Row>
          ) : 
          
          <CardList list={card} />
            }

            <Row className="justify-content-center" >
            { // conditional rendering when there is no previous
              (!previous) ? <Button variant="outline-primary" disabled><FontAwesomeIcon icon={faAngleLeft} /></Button> : <Button variant="outline-primary" onClick={() => this.getAll(previous)}><FontAwesomeIcon icon={faAngleLeft} /></Button>
            }
            &nbsp;<Button variant="outline-primary" disabled> {page} </Button>&nbsp;
            {(!next) ? <Button variant="outline-primary" disabled><FontAwesomeIcon icon={faAngleRight} /></Button> : <Button variant="outline-primary" onClick={() => this.getAll(next)}><FontAwesomeIcon icon={faAngleRight} /></Button>}
            </Row>
            </Container>
            </>
        );
    }
}

