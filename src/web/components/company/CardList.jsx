import React from 'react';
import "../../css/style.css"
import { Col, Row, Container } from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function CardList(props) {
  return (
    <>
      {props.Companies.card.map(item => (
        (!item.logo) ?
            <div class='containerImage'>
                <img src='/img/profile.jpg' className='imageGrid' alt='CardImage' />
                <div class="overlay">
            <Container>
              <Row>
                <Link
                  to={`/companyprofile/${item.id}`}
                  style={{ color: "white", fontWeight: "bolder" }}
                >
                  {item.name}
                </Link>
              </Row>
              <Row style={{ fontSize: "11px" }}>
                <Col style={{ padding: "0px" }}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  &nbsp;&nbsp;
                  {item.location}
                </Col>
              </Row>
            </Container>
                </div>
            </div> :
        <div class="containerImage">
          <img
            src={process.env.REACT_APP_BASE_URL + `/company/${item.logo}`}
            className="imageGrid"
            alt="cardImage"
          />
          <div class="overlay">
            <Container>
              <Row>
                <Link
                  to={`/profile/${item.id}`}
                  style={{ color: "white", fontWeight: "bolder" }}
                >
                  {item.name}
                </Link>
              </Row>
              <Row style={{ fontSize: "11px" }}>
                <Col style={{ padding: "0px" }}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  &nbsp;&nbsp;
                  {item.location}
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      ))}
    </>
  );
}

const mapStateToProps = state => ({
  Companies: state.Companies
});
export default connect(mapStateToProps)(CardList);
