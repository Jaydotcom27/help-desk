import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import 'styled-components/macro'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import User from './Components/User/User'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/user">
          <User />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
