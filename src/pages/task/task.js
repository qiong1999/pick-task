import React, { useState, useEffect, useRef } from "react";
import ajax from "../../ajax.js";
import List from "../../components/list/list.js";
import styles from "./task.module.css";
import Card from "../../components/card/card.js";
import WithMouse from "../../components/higherOrder/withMouse";
function Task(props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dis, setDis] = useState({ x: 0, y: 0 });
  const [down, setDown] = useState(false);
  const curNode = useRef(null);
  const [list, setList] = useState([]);
  const Test =  WithMouse(Card)({type:"list"});
  const todo = list.map((item) => {
    if (item.state === "todo") {
      return (
        <Card type="list" id={item.id}>
          {item.content}
        </Card>
      );
    }
  });
  const done = list.map((item) => {
    if (item.state === "done") {
      return (
        <Card type="list" id={item.id}>
          {item.content}
        </Card>
      );
    }
  });
  const undone = list.map((item) => {
    if (item.state === "undone") {
      return (
        <Card type="list" id={item.id}>
          {item.content}
        </Card>
      );
    }
  });
  useEffect(() => {
    console.log(localStorage.getItem("token"));
    ajax({
      type: "post",
      url: "http://localhost:3004/task",
      data: {},
      header: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      success: function (data) {
        console.log(data);
      },
      error: function (data) {},
    });
  }, []);
 
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <input type="tFFext" className={styles.search} placeholder="搜索" />
      </div>
      <div
        id="bodyer"
        className={styles.bodyer}
        
      >
        <List title="todo">{todo}</List>
        <List title="done">{done}</List>
        <List title="undone">
        {Test}
        {Test}
        </List>
        <div className={styles.addList}>添加新的列表</div>
      </div>
      
    </div>
  );
}
export default Task;
