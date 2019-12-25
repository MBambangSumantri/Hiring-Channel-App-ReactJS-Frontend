import React from 'react';
import "../css/style.css"
import { Col, Row, Container } from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEnvelope, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";

function CardList(props) {
  return (
    <>
      {props.Engineers.card.map(item => (
        <div class="containerImage">
          <img src={`http://localhost:8000/engineer/${item.photo}`} className="imageGrid" alt="cardImage" />
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
                  <FontAwesomeIcon icon={faEnvelope} />
                  &nbsp;&nbsp;
                  {item.email}
                </Col>
              </Row>
              <Row style={{ fontSize: "11px" }}>
                <Col style={{ padding: "0px" }}>
                  <FontAwesomeIcon icon={faMoneyBillWave} />
                  &nbsp;&nbsp;
                  <NumberFormat
                    value={item.expectsalary}
                    displayType="text"
                    thousandSeparator
                    prefix="Rp."
                  />
                </Col>
              </Row>
              <Row style={{ fontSize: "11px", fontWeight: "Bolder" }}>
                <Col style={{ padding: "0px" }}>Skills:</Col>
              </Row>
              <Row style={{ fontSize: "11px", fontWeight: "Bolder" }}>
                <Col style={{ padding: "0px" }}>{item.skill}</Col>
              </Row>
            </Container>
          </div>
        </div>
      ))}
    </>
  );
}

const mapStateToProps = state => ({
  Engineers: state.Engineers
});
export default connect(mapStateToProps)(CardList);
