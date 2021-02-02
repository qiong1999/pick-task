import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import md5 from "md5";
import ajax from "./ajax";
import Login from "./pages/login/login.js";
import Form from "./components/form/form.js";
import Home from "./pages/home/home.js";
import Task from "./pages/task/task.js";
import "./App.css";

function App() {
  const [user, setUser] = useState({});
  const [login, setLogin] = useState({});
  const [board, setBoard] = useState({});
  useEffect(() => {
    if (user.username && user.password) {
      ajax({
        type: "post",
        url: "http://localhost:3004/sign",
        data: user,
        header: {
          "Content-Type": "application/json",
        },
        success: function (data) {
          const result = JSON.parse(data);
          if (result.success) {
            history.push("/login");
            return;
          }
          return "fail";
        },
        error: function (data, xhr) {
          alert("注册失败");
        },
      });
    }
  }, [user]);
  useEffect(() => {
    if (login.username && login.password) {
      ajax({
        type: "post",
        url: "http://localhost:3004/login",
        data: login,
        header: {
          "Content-Type": "application/json",
        },
        success: function (data) {
          const result = JSON.parse(data);
          //console.log(result)
          if (result.success) {
            localStorage.setItem("token", result.token);
            // const token = localStorage.getItem("token")
            history.push("/home");
          }
        },
        error: function (data, ctx) {},
      });
    }
  }, [login]);
  useEffect(()=>{

    //console.log(board)
  },[board])
  const history = useHistory();

  return (
    <>
      <link to="/"></link>
      <link to="/login"></link>
      <link to="/sign"></link>
      <link to="/home"></link>
      <link to="/task"></link>
      <Switch>
        <Route exact path="/">
          <Login
            listenSign={(e) => {
              e ? history.push("/sign") : history.push("/login");
            }}
          ></Login>
        </Route>
        <Route path="/sign">
          <Form
            title="Welcome to create account "
            state="注册"
            handleClick={(e) => {
              setUser({ username: md5(e.username), password: md5(e.password) });
            }}
          ></Form>
        </Route>
        <Route path="/login">
          <Form
            title="Welcome back"
            state="登录"
            handleClick={(e) => {
              setLogin({
                username: md5(e.username),
                password: md5(e.password),
              });
            }}
          ></Form>
        </Route>
        <Route path="/home">
          <Home
            jump={(e) => {
              setBoard(e);
            }}
          ></Home>
        </Route>
        <Route>
          <Task board={board}></Task>
        </Route>
      </Switch>
    </>
  );
}

export default App;
