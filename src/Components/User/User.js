import React from 'react'
import 'styled-components/macro'
import NavBar from '../NavBar/NavBar'
import TicketsContainer from '../TicketsContainer/TicketsContainer'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';


export default function User() {
  return (
    <div>
      <NavBar />
      <Jumbotron fluid>
        <Container>
          <h1>Help us improve</h1>
          <p>
            By letting us helping you with the issues you stumble across, welcome to our help desk.
          </p>
        </Container>
      </Jumbotron>
    <TicketsContainer />
    </div>
  )
}
