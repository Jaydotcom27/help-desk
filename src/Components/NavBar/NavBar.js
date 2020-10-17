import React from 'react'
import { useHistory } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

const NavBar = () => {
  const history = useHistory()

  return (
    <div>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home">Help Desk</Navbar.Brand>
        <Button onClick={() => history.push('/')}> Log Out </Button>
      </Navbar>
    </div>
  )
}

export default NavBar
