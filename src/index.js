import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import App from './App'
import Normalize from './normalize'
import UserProvider from './Providers/User'

import 'bootstrap/dist/css/bootstrap.min.css'

const client = new ApolloClient({
  uri: 'https://supportticketapi.herokuapp.com/graphql',
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
