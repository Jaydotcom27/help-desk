import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Alert, Form } from 'react-bootstrap'
import 'styled-components/macro'
import { useMutation, gql } from '@apollo/client'

const PAGE_TRANSITION_MS = 3000

const REGISTER_USER_QUERY = gql`
  mutation Register($data: UsersPermissionsRegisterInput!) {
    register(input: $data) {
      user {
        username
        email
      }
    }
  }
`

export default function Register() {
  return (
    <div
      css={`
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <RegisterForm />
    </div>
  )
}

function RegisterForm() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState(null)

  const history = useHistory()

  const [register, { loading, error }] = useMutation(REGISTER_USER_QUERY, {
    variables: {
      data: {
        username,
        email,
        password,
      },
    },
    errorPolicy: 'ignore',
    onCompleted() {
      setSuccess(true)
      setTimeout(() => {
        history.push('/')
      }, PAGE_TRANSITION_MS)
    },
  })

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault()
      try {
        register()
      } catch (err) {
        console.error(err)
      }
    },
    [register]
  )

  return (
    <div
      css={`
        width: 100%;
        max-width: 440px;
      `}
    >
      <h1
        css={`
          margin-bottom: 48px;
          text-align: center;
        `}
      >
        Welcome back
      </h1>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label
            css={`
              font-weight: bold;
            `}
          >
            Email address
          </Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="thomas@acme.com"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formUsername">
          <Form.Label
            css={`
              font-weight: bold;
            `}
          >
            Username
          </Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Sech"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label
            css={`
              font-weight: bold;
            `}
          >
            Password
          </Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder=""
          />
        </Form.Group>
        <Button onClick={handleLogin}> Signup </Button>
      </Form>
      {error && (
        <Alert variant="error">
          There was an error. Please check your values.
        </Alert>
      )}
      {loading && '...'}
      {success && (
        <Alert variant="success">
          Sign up successful. Redirecting you to log in.
        </Alert>
      )}
    </div>
  )
}

function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      css={`
        position: relative;
        background: #4f4fed;
        color: white;
        width: 100%;
        border: 0;
        border-radius: 6px;
        height: 48px;
        box-shadow: 10px 10px 34px -6px rgba(119, 34, 199, 0.28);

        &:active {
          top: 1px;
        }
      `}
    >
      {children}
    </button>
  )
}
