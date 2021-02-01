import React, { useState, useEffect, useRef } from "react";
import ajax from "../../ajax.js";
import List from "../../components/list/list.js";
import styles from "./task.module.css";
import Card from "../../components/card/card.js";
import WithMouse from "../../components/higherOrder/withMouse";
function Task(props) {
  const [cardItem, setItem] = useState({});
  const taskNode = useRef(null);
  const [list, setList] = useState([
    { id: "1", content: "hello", state: "todo" },
    { id: "hi", content: "hello1", state: "todo" },
  ]);

  const todo = list.map((item) => {
    if (item.state === "todo") {
      return WithMouse(Card)({
        type: "list",
        content: item.content,
        id: item.id,
        handleClick: (e) => {
          setItem(e);
        },
      });
    }
  });

  const done = list.map((item) => {
    if (item.state === "done") {
      return WithMouse(Card)({
        type: "list",
        content: item.content,
        id: item.id,
        handleClick: (e) => {
          setItem(e);
        },
      });
    }
  });
  const undone = list.map((item) => {
    if (item.state === "undone") {
      return WithMouse(Card)({
        type: "list",
        content: item.content,
        id: item.id,
        handleClick: (e) => {
          setItem(e);
        },
      });
    }
  });
  useEffect(() => {
    let width;

    if (taskNode.current) {
      width = taskNode.current.getClientRects()[0].width / 3.0;
      console.log("width", width);
    }

    let listChange = list.map((item) => {
      if (item.id === cardItem.id) {
        console.log(cardItem.x, "wind", width);
        if (cardItem.x < width) {
          item.state = "todo";
        } else if (cardItem.x < width * 2) {
          console.log("he");
          item.state = "done";
        } else {
          item.state = "undone";
        }
      }
      return item;
    });
    setList([...listChange]);
  }, [cardItem]);
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
    <div className={styles.container} ref={taskNode}>
      <div className={styles.header}>
        <input type="tFFext" className={styles.search} placeholder="搜索" />
      </div>
      <div id="bodyer" className={styles.bodyer}>
        <List title="todo">{todo}</List>
        <List title="done">{done}</List>
        <List title="undone">{undone}</List>
      </div>
    </div>
  );
}
export default Task;
