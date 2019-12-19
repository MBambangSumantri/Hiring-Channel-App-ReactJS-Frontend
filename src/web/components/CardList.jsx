import React from 'react';
import { Card, Row } from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEnvelope, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function CardList(props) {
    return (
      <>
          <Row className="justify-content-center mt-3">
            {props.list.map(item => (
            <Card
              style={{
                marginBottom: "40px",
                marginRight: "35px",
                borderRadius: "20px",
                width: "200px",
                height: "350px",
                backgroundImage: "url(/img/lumayan.jpg)",
                backgroundSize: "cover"
              }}
            >
              <Card.Body style={{ height: "200px" }}></Card.Body>
              <Card.Footer
                className="text-white bg-dark"
                style={{
                  borderRadius: "0px 0px 20px 20px",
                  lineHeight: "75%",
                  opacity: "0.7"
                }}
              >
                <h2 style={{ marginTop:'0px', fontSize:'24px'}}><Link to={`/profile/${item.id}`} style={{ color: 'white' }}> {item.name}</Link></h2>
                <Card.Text>
                  <p>{item.description}</p>
                  <small><FontAwesomeIcon icon={faEnvelope} /> Email</small>
                  <br />
                  <small><FontAwesomeIcon icon={faMoneyBillWave} /> IDR. {item.expectsalary}</small>
                  <br />
                  <small><FontAwesomeIcon/>Skill : {item.skill}</small>
                </Card.Text>
              </Card.Footer>
            </Card>
            ))}
          </Row>
      </>
    );
}

export default CardList
