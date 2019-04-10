import React from 'react';
import {Row, Col, Jumbotron} from 'reactstrap';

const Home = () => {
  return (
    <>
    <Row className="mt-4">
      <Col>
        <Jumbotron>
          <h1 className="text-warning display-2">Au Tour Du Monde</h1>
          <p className="lead">Where family, food, and motorcycles come together!</p>
        </Jumbotron>
      </Col>
    </Row>
    <Row>
      <Col>
        Welcome to our restaurant!
      </Col>
    </Row>
    </>
  );
}

export default Home;
