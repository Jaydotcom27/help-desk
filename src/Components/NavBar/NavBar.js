import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';


const NavBar = () => {
    return ( 
        <div>
  <Navbar bg="light" variant="light">
    <Navbar.Brand href="#home">Help Desk</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#user">Tickets</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Ticket Search" className="mr-sm-2" />
      <Button variant="outline-primary">Search</Button>
    </Form>
  </Navbar>
  </div>
     );
}
 
export default NavBar;
 