import React, {useState} from 'react';
import {Row, Col, Form, FormGroup, Label, Input, Button, ButtonGroup} from 'reactstrap';
import qs from 'query-string';

const Wifi = ({location}) => {
  const [language, setLanguage] = useState('en');

  const params = qs.parse(location.search);
  console.log('PARAMS:', params);

  const disclaimer = {
    en: (
      <>
        <p>
          By using this free wifi network, you agree to follow all local and national laws in regards to accessing the internet.
        </p>
        <p>
          This is a family restaurant, content inappropriate to children is forbidden.
          Respect copyright laws. No illegal downloads on our network.
        </p>
      </>
    ),
    fr: (
      <>
        <p>
          Suivez les regles.
        </p>
        <p>
          Ici c'est un restaurant famialle.
        </p>
      </>
    ),
  }

  function handleGoButton(e) {
    // prevent default
    e.preventDefault();
    const accessUrl = `${params.authaction}?tok=${params.token}&redir=${params.redir}`
    console.log('GOTO:', accessUrl);
  }

  return (
    <>
    <Row className="mt-3">
      <Col>
        <h4 className="text-warning">Au Tour du Monde</h4>
        <h5>Free Wifi!</h5>
      </Col>
      <Col xs={"auto"}>
        <ButtonGroup>
          <Button outline color="warning" onClick={() => setLanguage('en')} active={language === 'en'}>en</Button>
          <Button outline color="warning" onClick={() => setLanguage('fr')} active={language === 'fr'}>fr</Button>
        </ButtonGroup>
      </Col>
    </Row>
    <Row>
      <Col>
        {disclaimer[language]}
      </Col>
    </Row>
    <Row>
      <Col>
        <Form>
          <FormGroup>
            <Label>
              Email<sup className="text-danger">*</sup>
            </Label>
            <Input type="email" required/>
          </FormGroup>
          <Button color="warning" onClick={handleGoButton}>Access Wifi</Button>
        </Form>
      </Col>
    </Row>
    </>
  );
}

export default Wifi;
