import React, { useState } from 'react'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import { BsCheck } from 'react-icons/bs'
import { useMutation, useQuery, gql } from '@apollo/client'
import 'styled-components/macro'
import { useUser } from '../../Providers/User'

const TICKETS_QUERY = gql`
  query tickets {
    tickets {
      id
      title
      description
      status
      severity
      user {
        username
        email
      }
    }
  }
`

const USERS_QUERY = gql`
  query users {
    users {
      id
      username
      role {
        name
      }
    }
  }
`

const CREATE_TICKET_MUTATION = gql`
  mutation CreateTicket($data: createTicketInput!) {
    createTicket(input: $data) {
      ticket {
        id
        description
        tecnology {
          name
        }
        title
      }
    }
  }
`

const DELETE_TICKET_MUTATION = gql`
  mutation DeleteTicket($data: deleteTicketInput!) {
    deleteTicket(input: $data) {
      ticket {
        id
        description
        tecnology {
          name
        }
        title
      }
    }
  }
`

const EDIT_TICKET_MUTATION = gql`
  mutation EditTicket($data: updateTicketInput!) {
    updateTicket(input: $data) {
      ticket {
        id
        description
        tecnology {
          name
        }
        title
        user {
          username
        }
        assignedUser {
          username
        }
      }
    }
  }
`

const ticketList = [
  {
    id: 'T01',
    Name: 'Ticket No.1',
    description: 'User log out is not working properly',
    status: 'In Progress',
    severity: 'Low',
  },
  {
    id: 'T02',
    Name: 'Ticket No.2',
    description: 'User log in is not working properly',
    status: 'In Progress',
    severity: 'Low',
  },
  {
    id: 'T03',
    Name: 'Ticket No.3',
    description: 'User sign out is not working properly',
    status: 'Completed',
    severity: 'High',
  },
  {
    id: 'T04',
    Name: 'Ticket No.4',
    description: 'There a bug on the landing page',
    status: 'In Progress',
    severity: 'Half',
  },
  {
    id: 'T05',
    Name: 'Ticket No.5',
    description: 'Chat interface is laggy',
    status: 'Completed',
    severity: 'High',
  },
]

const devsList = [
  { id: 'D01', Name: 'Enrique Elmio' },
  { id: 'D02', Name: 'Jay Martinez' },
  { id: 'D03', Name: 'David Bujosa' },
]

const DEFAULT_NEW_TICKET = {
  title: '',
  description: '',
  status: 'inProgress',
  severity: 'low',
}

const DEFAULT_USER = {
  id: '',
}

const TicketsContainer = () => {
  const userType = 'admin'
  const user = useUser()

  const [tickets] = useState(ticketList)
  const [devs] = useState(devsList)
  const [selectedTicket, setSelectedTicket] = useState({})
  const selectTicket = (element, action) => {
    setSelectedTicket(element)
    if (selectedTicket && action === 'Edit') {
      setShowEdit(true)
    } else if (selectedTicket && action === 'Delete') {
      setShowDelete(true)
    }
  }

  const [showEdit, setShowEdit] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  const [newTicketData, setNewTicketData] = useState(DEFAULT_NEW_TICKET)
  const [editTicketData, setEditTicketData] = useState(DEFAULT_NEW_TICKET)
  const [deleteTicketData, setDeleteTicketData] = useState(DEFAULT_NEW_TICKET)
  const [updatedUser, setUpdatedUser] = useState(DEFAULT_USER)

  let editTicketId, updateUserId

  React.useEffect(() => console.log(editTicketData), [editTicketData])

  const {
    data: ticketData,
    loading,
    error,
    refetch: refetchTickets,
  } = useQuery(TICKETS_QUERY)
  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useQuery(USERS_QUERY)

  const [handleCreate, { error: createError }] = useMutation(
    CREATE_TICKET_MUTATION,
    {
      variables: {
        data: {
          data: {
            title: newTicketData.title,
            description: newTicketData.description,
            status: newTicketData.status,
            severity: newTicketData.severity,
          },
        },
      },
      errorPolicy: 'ignore',
      onCompleted(data) {
        console.log(data)
        refetchTickets()
      },
    }
  )

  const [handleEdit, { error: editError }] = useMutation(EDIT_TICKET_MUTATION, {
    variables: {
      data: {
        where: {
          id: editTicketData.id,
        },
        data: {
          title: editTicketData.title,
          description: editTicketData.description,
          status: editTicketData.status,
          severity: editTicketData.severity,
        },
      },
    },
    errorPolicy: 'ignore',
    onCompleted(data) {
      console.log(data)
      refetchTickets()
    },
  })

  console.log('gmm', editTicketId, updateUserId)

  const [handleEditAssignment, { error: editAssignmentError }] = useMutation(
    EDIT_TICKET_MUTATION,
    {
      errorPolicy: 'ignore',
      onCompleted(data) {
        console.log(data, 'assign')
        refetchTickets()
      },
    }
  )

  const [handleDelete, { error: deleteError }] = useMutation(
    DELETE_TICKET_MUTATION,
    {
      variables: {
        data: {
          where: {
            id: deleteTicketData.id,
          },
        },
      },
      errorPolicy: 'ignore',
      onCompleted(data) {
        console.log(data)
        refetchTickets()
      },
    }
  )

  const closeEdit = async () => {
    await handleEdit()
    setShowEdit(false)
  }
  const closeCreate = async () => {
    await handleCreate()
    setShowCreate(false)
  }
  const closeDelete = async () => {
    await handleDelete()
    setShowDelete(false)
  }

  if (loading || usersLoading) {
    return 'loading...'
  }

  if (error || usersError) {
    console.error(error, usersError)
    return 'error.'
  }

  console.log(ticketData, usersData)

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
              {user.role && user.role === 'Admin' ? (
                <Nav.Item>
                  <Nav.Link eventKey="third">Assignments</Nav.Link>
                </Nav.Item>
              ) : (
                ''
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
                      color: #7d8ca3;
                      text-align: left;
                    `}
                  >
                    Ticket Management
                  </span>
                  <Button
                    className="ml-1"
                    variant="success"
                    onClick={() => {
                      setShowCreate(true)
                    }}
                  >
                    New
                  </Button>
                </div>

                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Issue</th>
                      <th>Status</th>
                      <th>Severity</th>
                      {user.role === 'Admin' && <th>Control</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {ticketData.tickets.map((element, i) => (
                      <tr key={element.id}>
                        <td>T{i}</td>
                        <td>{element.title}</td>
                        <td>
                          {' '}
                          {typeof element.status &&
                          element.status === 'done' ? (
                            <Badge pill variant="success">
                              Completed
                            </Badge>
                          ) : (
                            <Badge pill variant="warning">
                              In Progress
                            </Badge>
                          )}
                        </td>
                        <td>{element.severity}</td>
                        {user.role === 'Admin' && (
                          <td>
                            <Button
                              className="ml-1"
                              variant="warning"
                              onClick={() => {
                                setEditTicketData(element)
                                selectTicket(element, 'Edit')
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              className="ml-1"
                              variant="danger"
                              onClick={() => {
                                setDeleteTicketData(element)
                                selectTicket(element, 'Delete')
                              }}
                            >
                              Delete
                            </Button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <span
                  css={`
                    font-size: 28px;
                    font-weight: 300;
                    color: #7d8ca3;
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
                  {ticketData.tickets.map((element) => (
                    <Card
                      style={{
                        width: '18rem',
                        marginRight: '10px',
                        marginBottom: '10px',
                      }}
                      key={element.id}
                    >
                      <Card.Body>
                        <Card.Title>{element.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {element.severity} Serverity
                        </Card.Subtitle>
                        <Card.Text>{element.description}</Card.Text>
                        {typeof element.status && element.status === 'done' ? (
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
                  ))}
                </div>
              </Tab.Pane>
              {typeof userType && userType === 'admin' ? (
                <Tab.Pane eventKey="third">
                  <span
                    css={`
                      font-size: 28px;
                      font-weight: 300;
                      color: #7d8ca3;
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
                      {ticketData.tickets.map((element, id) => (
                        <tr key={element.id}>
                          <td>T{id}</td>
                          <td>{element.title}</td>
                          <td>
                            {typeof element.status &&
                            element.status === 'done' ? (
                              <Badge pill variant="success">
                                Completed
                              </Badge>
                            ) : (
                              <Badge pill variant="warning">
                                In Progress
                              </Badge>
                            )}
                          </td>
                          <td>{element.severity}</td>
                          <td>
                            <Form>
                              <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Control
                                  as="select"
                                  custom
                                  onChange={async (e) => {
                                    const targetValue = e.target.value
                                    const wantedUser = usersData.users.map(
                                      (user) => user.id === targetValue
                                    )
                                    updateUserId = wantedUser.id
                                    editTicketId = element.id
                                    console.log(wantedUser.username)
                                    await handleEditAssignment({
                                      variables: {
                                        data: {
                                          where: {
                                            id: element.id,
                                          },
                                          data: {
                                            assignedUser: wantedUser.id,
                                          },
                                        },
                                      },
                                      onComplete(data) {
                                        console.log('data', data)
                                      },
                                    })
                                  }}
                                >
                                  {usersData.users
                                    .filter(
                                      (user) => user.role.name === 'Admin'
                                    )
                                    .map((dev) => (
                                      <option key={dev.id} value={dev.id}>
                                        {dev.username}
                                      </option>
                                    ))}
                                </Form.Control>
                              </Form.Group>
                            </Form>
                          </td>
                          <td>
                            <Button
                              variant="success"
                              onClick={async () => {
                                await handleEdit({
                                  variables: {
                                    data: {
                                      where: {
                                        id: element.id,
                                      },
                                      data: {
                                        status: 'done',
                                      },
                                    },
                                  },
                                  onComplete(data) {
                                    console.log('data', data)
                                  },
                                })
                              }}
                            >
                              <BsCheck />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Tab.Pane>
              ) : (
                ''
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
              <Form.Control
                type="text"
                value={selectedTicket && selectedTicket.id}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="ticketName">
              <Form.Label>Issue Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Give your issue a name"
                value={editTicketData && editTicketData.title}
                onChange={(e) => {
                  const targetValue = e.target.value
                  setEditTicketData((data) => ({
                    ...data,
                    title: targetValue,
                  }))
                }}
              />
            </Form.Group>
            <Form.Group controlId="ticketDescription">
              <Form.Label>Issue Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editTicketData && editTicketData.description}
                onChange={(e) => {
                  const targetValue = e.target.value
                  setEditTicketData((data) => ({
                    ...data,
                    description: targetValue,
                  }))
                }}
              />
            </Form.Group>
            <Form.Group controlId="ticketSeverity">
              <Form.Label>Severity</Form.Label>
              <Form.Control
                as="select"
                value={editTicketData && editTicketData.severity}
                onChange={(e) => {
                  const targetValue = e.target.value
                  setEditTicketData((data) => ({
                    ...data,
                    severity: targetValue,
                  }))
                }}
              >
                <option value="low">Low</option>
                <option value="half">Half</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
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
              <Form.Control
                type="text"
                placeholder="Give your issue a name"
                value={newTicketData.title}
                onChange={(e) => {
                  const targetValue = e.target.value
                  setNewTicketData((data) => ({
                    ...data,
                    title: targetValue,
                  }))
                }}
              />
            </Form.Group>
            <Form.Group controlId="ticketDescription">
              <Form.Label>Issue Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newTicketData.description}
                onChange={(e) => {
                  const targetValue = e.target.value
                  setNewTicketData((data) => ({
                    ...data,
                    description: targetValue,
                  }))
                }}
              />
            </Form.Group>
            <Form.Group controlId="ticketSeverity">
              <Form.Label>Severity</Form.Label>
              <Form.Control
                as="select"
                value={newTicketData.severity}
                onChange={(e) => {
                  const targetValue = e.target.value
                  setNewTicketData((data) => ({
                    ...data,
                    severity: targetValue,
                  }))
                }}
              >
                <option value="low">Low</option>
                <option value="half">Half</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
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
          <Modal.Title>
            Are you sure you want to delete this ticket?
          </Modal.Title>
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
  )
}

export default TicketsContainer
