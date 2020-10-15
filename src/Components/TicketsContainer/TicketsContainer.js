import React, { useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { BsCheck } from "react-icons/bs";


import 'styled-components/macro'

const TicketsContainer = () => {
  const userType = "admin";


  const ticketList = [
    { id: "T01", Name: "Ticket No.1", description: "User log out is not working properly", status: "In Progress", severity: "Low" },
    { id: "T02", Name: "Ticket No.2", description: "User log in is not working properly", status: "In Progress", severity: "Low" },
    { id: "T03", Name: "Ticket No.3", description: "User sign out is not working properly", status: "Completed", severity: "High" },
    { id: "T04", Name: "Ticket No.4", description: "There a bug on the landing page", status: "In Progress", severity: "Half" },
    { id: "T05", Name: "Ticket No.5", description: "Chat interface is laggy", status: "Completed", severity: "High" },

  ]

  const devsList = [
    { id: "D01", Name: "Enrique Elmio" },
    { id: "D02", Name: "Jay Martinez" },
    { id: "D03", Name: "David Bujosa" },
  ]

  const [tickets] = useState(ticketList);
  const [devs] = useState(devsList);
  const [selectedTicket, setSelectedTicket] = useState({});
  const selectTicket = (element, action) => {
    setSelectedTicket(element)
    if (selectedTicket && action === "Edit") {
      setShowEdit(true)
    } else if (selectedTicket && action === "Delete") {
      setShowDelete(true)
    }
  }

  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const closeEdit = () => setShowEdit(false);
  const closeCreate = () => setShowCreate(false);
  const closeDelete = () => setShowDelete(false);

  return (
    <div>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Dashboard</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Summary</Nav.Link>
              </Nav.Item>
              {typeof userType && userType === "admin" ? (
                <Nav.Item>
                  <Nav.Link eventKey="third">Assignments</Nav.Link>
                </Nav.Item>
              ) : (
                  ""
                )}

            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <div
                  css={`
        height: 12vh;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
        `}
                >
                  <span
                    css={`
        font-size: 28px;
        font-weight: 300;
          color: #7D8CA3;
          text-align: left;
        `}
                  >
                    Ticket Management
      </span>
                  <Button className='ml-1' variant="success" onClick={() => { setShowCreate(true) }}>New</Button>
                </div>


                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Issue</th>
                      <th>Status</th>
                      <th>Severity</th>
                      <th>Control</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map(element => (
                      <tr key={element.id}>
                        <td>{element.id}</td>
                        <td>{element.description}</td>
                        <td>                        {typeof element.status && element.status === "Completed" ? (
                          <Badge pill variant="success">
                            Completed
                          </Badge>
                        ) : (
                            <Badge pill variant="warning">
                              In Progress
                            </Badge>
                          )}</td>
                        <td>{element.severity}</td>
                        <td>
                          <Button className='ml-1' variant="warning" onClick={() => selectTicket(element, "Edit")}>Edit</Button>
                          <Button className='ml-1' variant="danger" onClick={() => selectTicket(element, "Delete")}>Delete</Button>
                        </td>
                      </tr>
                    ))
                    }
                  </tbody>
                </Table>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <span
                  css={`
        font-size: 28px;
        font-weight: 300;
          color: #7D8CA3;
          text-align: left;
        `}
                >
                  Tickets Summary
      </span>
                <div
                  css={`
                font-size: 20px;
                font-weight: 300;
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                `}
                >
                  {tickets.map(element => (
                    <Card style={{ width: '18rem', marginRight: "10px", marginBottom: "10px" }} key={element.id}>
                      <Card.Body>
                        <Card.Title>{element.Name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{element.severity} Serverity</Card.Subtitle>
                        <Card.Text>
                          {element.description}
                        </Card.Text>
                        {typeof element.status && element.status === "Completed" ? (
                          <Badge pill variant="success">
                            Completed
                          </Badge>
                        ) : (
                            <Badge pill variant="warning">
                              In Progress
                            </Badge>
                          )}
                      </Card.Body>
                    </Card>
                  ))
                  }

                </div>
              </Tab.Pane>
              {typeof userType && userType === "admin" ? (
                <Tab.Pane eventKey="third">
                  <span
                    css={`
        font-size: 28px;
        font-weight: 300;
          color: #7D8CA3;
          text-align: left;
        `}
                  >
                    Ticket Assignments
      </span>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Issue</th>
                        <th>Current Status</th>
                        <th>Severity</th>
                        <th>Asigned to</th>
                        <th>Created</th>
                        <th>Set as Completed</th>


                      </tr>
                    </thead>
                    <tbody>
                      {tickets.map(element => (
                        <tr key={element.id}>
                          <td>{element.id}</td>
                          <td>{element.description}</td>
                          <td>
                            {typeof element.status && element.status === "Completed" ? (
                              <Badge pill variant="success">
                                Completed
                              </Badge>
                            ) : (
                                <Badge pill variant="warning">
                                  In Progress
                                </Badge>
                              )}</td>
                          <td>{element.severity}</td>
                          <td>
                            <Form>
                              <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Control as="select" custom>
                                  {devs.map(dev => (
                                    <option key={dev.id} value={dev.id}>{dev.Name}</option>
                                  ))}
                                </Form.Control>
                              </Form.Group>
                            </Form>
                          </td>
                          <td>00/00/0000</td>
                          <td>
                            <Button variant="success"><BsCheck /></Button>
                          </td>


                        </tr>
                      ))
                      }
                    </tbody>
                  </Table>
                </Tab.Pane>
              ) : (
                  ""
                )}

            </Tab.Content>
          </Col>
        </Row>

      </Tab.Container>
      <Modal show={showEdit} onHide={closeEdit}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTicket.Name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="ticketId">
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" value={selectedTicket && selectedTicket.id} disabled />
            </Form.Group>
            <Form.Group controlId="ticketName">
              <Form.Label>Issue Title</Form.Label>
              <Form.Control type="text" placeholder="Give your issue a name" value={selectedTicket && selectedTicket.Name} />
            </Form.Group>
            <Form.Group controlId="ticketDescription">
              <Form.Label>Issue Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={selectedTicket && selectedTicket.description} />
            </Form.Group>
            <Form.Group controlId="ticketSeverity">
              <Form.Label>Severity</Form.Label>
              <Form.Control as="select" value={selectedTicket && selectedTicket.severity}>
                <option>Low</option>
                <option>Half</option>
                <option>High</option>
                <option>Critical</option>

              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEdit}>
            Close
    </Button>
          <Button variant="primary" onClick={closeEdit}>
            Save Changes
    </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCreate} onHide={closeCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="ticketId">
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" disabled />
            </Form.Group>
            <Form.Group controlId="ticketName">
              <Form.Label>Issue Title</Form.Label>
              <Form.Control type="text" placeholder="Give your issue a name" />
            </Form.Group>
            <Form.Group controlId="ticketDescription">
              <Form.Label>Issue Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group controlId="ticketSeverity">
              <Form.Label>Severity</Form.Label>
              <Form.Control as="select">
                <option>Low</option>
                <option>Half</option>
                <option>High</option>
                <option>Critical</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="ticketStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control type="text" disabled />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeCreate}>
            Close
    </Button>
          <Button variant="primary" onClick={closeCreate}>
            Create Ticket
    </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showDelete} onHide={closeDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete this ticket?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="danger mr-3" onClick={closeDelete}>
            Delete
    </Button>
          <Button variant="primary" onClick={closeDelete}>
            Cancel
    </Button>
        </Modal.Body>

      </Modal>
    </div>
  );
}


export default TicketsContainer;