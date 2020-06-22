import React from 'react';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Router} from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
  return (
    <div>
      <Navbar className="navbar main" bg="dark" expand="lg">
  <Navbar.Brand href="#home" className={"white"}>HNG Leaderboard</Navbar.Brand>
  <Navbar.Toggle className="navbar" aria-controls="basic-navbar-nav" />
  <Navbar.Collapse className="navbar" id="basic-navbar-nav">
    <Nav className="ml-auto">
      <Nav.Link><Link to="/api" className="navbar link">Pre-loaded</Link></Nav.Link>
      <Nav.Link><Link to="/drag-drop" className="navbar link">Paste CSV in hng leaderboard format</Link></Nav.Link>  
    </Nav>
  </Navbar.Collapse>
</Navbar>
    <Router/>
    </div>
  )
}
