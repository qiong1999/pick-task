import React,{useState,useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from 'react-router-dom';

import Login from './pages/login/login.js';
import Form from './components/form/form.js'
import Home from './pages/home/home.js'
import './App.css';

function App() {
  const [sign,setSign]=useState(true);
  
  const history=useHistory()
  
  return (
    <>
      <link to="/">
      </link>
      <link to="/login"></link>
      <link to="/sign"></link>
      <link to="/home"></link>
      <Switch>
        <Route exact path="/">
          <Login listenSign={(e)=>{e?history.push('/sign'):history.push('/login')}}></Login>
        </Route>
        <Route path="/sign">
          <Form title="Welcome to create account " state="注册"></Form>
        </Route>
        <Route path="/login">
          <Form title="Welcome back" state="登录"></Form>
        </Route>
        <Route path="/home">
          <Home></Home>
        </Route>
      </Switch>
   </>
  );
}

export default App;
