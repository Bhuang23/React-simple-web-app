import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import Home from './components/home.component';
import Logincomponent from './components/login.component';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Createusercomponent from "./components/createuser.component";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
function App() {
  return (
      <Router>
          <div className="app" >
              <Navbar bg="light" variant="light" >
                  <Navbar.Brand href='/'> React Single Page Application </Navbar.Brand>
                  <Nav className="ml-auto">
                      <Nav>
                          <Link to={'/login-component'} className="nav-link" >Login</Link>
                      </Nav>
                      <Nav>
                          <Link to={'/createuser-component'} className="nav-link" >
                              Sign up</Link>
                      </Nav>
                  </Nav>
              </Navbar>
              <hr />
              <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route path="/login-component" component={Logincomponent}/>
                  <Route path="/createuser-component" component={Createusercomponent}/>
              </Switch>
        </div>
    </Router>
  );
}
export default App;
