import React, { useCallback, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import 'styled-components/macro'
import { useMutation, gql } from '@apollo/client'
import { useUser } from '../../Providers/User'

const LOGIN_USER_MUTATION = gql`
  mutation Login($data: UsersPermissionsLoginInput!) {
    login(input: $data) {
      jwt
      user {
        id
        username
        email
        role {
          name
        }
      }
    }
  }
`

export default function Login() {
  useEffect(() => {
    console.log('called')
    localStorage.removeItem('FRANCIA_token')
    console.log(localStorage.getItem('FRANCIA_token'))
  }, [])

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
      <LoginForm />
    </div>
  )
}

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()
  const user = useUser()

  const [login, { loading, error }] = useMutation(LOGIN_USER_MUTATION, {
    variables: {
      data: {
        identifier: email,
        password,
        provider: 'local',
      },
      errorPolicy: 'ignore',
    },
    onCompleted({ login }) {
      console.log(login)
      console.log('Logged in sucessfully with', login.user.username)
      localStorage.setItem('FRANCIA_token', login.jwt)
      user.setUsername(login.user.username)
      user.setEmail(login.user.email)
      user.setId(login.user.id)
      user.setRole(login.user.role.name)
      history.push('/user')
    },
  })

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault()
      try {
        login()
      } catch (err) {
        console.error(err)
      }
    },
    [login]
  )

  const handleSignup = useCallback(
    (e) => {
      e.preventDefault()
      history.push('/register')
    },
    [history]
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
        <Button onClick={handleLogin}> Login </Button>
        <RegisterButton onClick={handleSignup}> Signup </RegisterButton>
      </Form>
      {error && 'error'}
      {loading && '...'}
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

function RegisterButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      css={`
        margin-top: 18px;
        position: relative;
        background: white;
        color: #4f4fed;
        width: 100%;
        border: 1px solid #4f4fed;
        border-radius: 6px;
        height: 48px;
        &:active {
          top: 1px;
        }
      `}
    >
      {children}
    </button>
  )
}
