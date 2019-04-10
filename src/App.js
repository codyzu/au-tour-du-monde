import React from 'react';
import {Container} from 'reactstrap';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './Home';
import Wifi from './Wifi';

const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/wifi" component={Wifi}/>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
