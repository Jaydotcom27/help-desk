import React, {useState} from 'react'
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'styled-components/macro'

const TicketsContainer = () => {
    const ticketList = [
        {id: "T01", issue: "User log out is not working properly", status: "In Progress"},
        {id: "T02", issue: "User log in is not working properly", status: "In Progress"},
        {id: "T03", issue: "User sign out is not working properly", status: "Completed"},
    ]

    const [tickets] = useState(ticketList);
    const [selectedTicket, setSelectedTicket] = useState({});
    const selectTicket = (element, action) => {
        setSelectedTicket(element)
        if (selectedTicket && action === "Edit"){
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
      <Button className='ml-1' variant="success" onClick={() => {setShowCreate(true)}}>New</Button>
      </div>


        <Table striped bordered hover>
  <thead>
    <tr>
      <th>ID</th>
      <th>Issue</th>
      <th>Status</th>
      <th>Control</th>
    </tr>
  </thead>
  <tbody>
    {tickets.map(element=>(
        <tr>
            <td>{element.id}</td>
            <td>{element.issue}</td>
            <td>{element.status}</td>
            <td>
                <Button className='ml-1' variant="warning" onClick={()=> selectTicket(element, "Edit")}>Edit</Button>
                <Button className='ml-1' variant="danger" onClick={()=> selectTicket(element, "Delete")}>Delete</Button>
            </td>
            </tr>
            ))
        }
  </tbody>
</Table>
        </Tab.Pane>
        <Tab.Pane eventKey="second">
            <h1>Summary Pane</h1>
        </Tab.Pane>
      </Tab.Content>
    </Col>
  </Row>

</Tab.Container>
  <Modal show={showEdit} onHide={closeEdit}>
  <Modal.Header closeButton>
    <Modal.Title>Edit your ticket</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>ID</Form.Label>
    <Form.Control type="text" value={selectedTicket && selectedTicket.id} disabled/>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Issue</Form.Label>
    <Form.Control type="text" placeholder="Describe your issue" value={selectedTicket && selectedTicket.issue} />
  </Form.Group>
  <Form.Group controlId="formBasicPassword">
    <Form.Label>Status</Form.Label>
    <Form.Control type="text" value={selectedTicket && selectedTicket.status} disabled />
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
  <Form.Group controlId="formBasicEmail">
    <Form.Label>ID</Form.Label>
    <Form.Control type="text" disabled/>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Issue</Form.Label>
    <Form.Control type="text" placeholder="Describe your issue" />
  </Form.Group>
  <Form.Group controlId="formBasicPassword">
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