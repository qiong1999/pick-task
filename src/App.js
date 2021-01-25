import React,{useState,useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from 'react-router-dom';
import ajax from './ajax';
import Login from './pages/login/login.js';
import Form from './components/form/form.js'
import Home from './pages/home/home.js'
import Task from './pages/task/task.js'
import './App.css';

function App() {
  
  const [user,setUser] = useState({});
  useEffect(()=>{
    ajax({
      type:'post',
      url:'http://localhost:3004',
      data:user,
      header:{
        'Content-Type':'application/json'
      },
      success:function(data){
        if(data === 'success'){
         history.push('/login')
          return;
        }
        return "fail";
      },
      error:function(data,xhr){
        console.log(data,"error")
      }
  })
  },[user])
  const history=useHistory()
  
  return (
    <>
      <link to="/">
      </link>
      <link to="/login"></link>
      <link to="/sign"></link>
      <link to="/home"></link>
      <link to="/task"></link>
      <Switch>
        <Route exact path="/">
          <Login listenSign={(e)=>{e?history.push('/sign'):history.push('/login')}}></Login>
        </Route>
        <Route path="/sign">
          <Form title="Welcome to create account " state="注册" handleClick={(e)=>{setUser(e)}}></Form>
        </Route>
        <Route path="/login">
          <Form title="Welcome back" state="登录" handleClick={(e)=>{console.log(e);setUser(e)}}></Form>
        </Route>
        <Route path="/home">
          <Home></Home>
        </Route>
        <Route>
          <Task></Task>
        </Route>
      </Switch>
   </>
  );
}

export default App;
