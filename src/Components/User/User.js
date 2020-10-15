import React from 'react'
import 'styled-components/macro'
import NavBar from '../NavBar/NavBar'
import TicketsContainer from '../TicketsContainer/TicketsContainer'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

export default function User() {

  const userType = "admin";

  return (
    <div>
      <NavBar />
      <Jumbotron fluid>
        <Container>
          {typeof userType && userType === "admin" ? (
            <div>
              <h1>Welcome to your admin dashboard</h1>
              <p>
                Review and manage all the issues on the system, assign them and change their status.
          </p>
            </div>

          ) : (
              <div>
                <h1>Help us improve</h1>
                <p>
                  By letting us helping you with the issues you stumble across, welcome to our help desk.
            </p>
              </div>
            )}

        </Container>
      </Jumbotron>
      <TicketsContainer />
    </div>
  )
}
