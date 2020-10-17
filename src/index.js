import React from 'react'
import ReactDOM from 'react-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import App from './App'
import Normalize from './normalize'
import UserProvider from './Providers/User'

import 'bootstrap/dist/css/bootstrap.min.css'

const httpLink = createHttpLink({
  uri: 'https://supportticketapi.herokuapp.com/graphql',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('FRANCIA_token')
  console.log(_, 'lodash')
  // return the headers to the context so httpLink can read them
  return _.operationName !== 'Login' || _.operationName !== 'Register'
    ? {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      }
    : {
        headers: {
          ...headers,
        },
      }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <UserProvider>
        <Normalize />
        <App />
      </UserProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
