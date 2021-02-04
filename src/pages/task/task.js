import React, { useState, useEffect, useRef } from "react";
import ajax from "../../ajax.js";
import List from "../../components/list/list.js";
import styles from "./task.module.css";
import Card from "../../components/card/card.js";
import WithMouse from "../../components/higherOrder/withMouse";
import Calendar from "../../components/calendar/calendar.js";

function Task(props) {
  // console.log("props.board", props.board);
  const [cardItem, setItem] = useState({});
  const taskNode = useRef(null);
  const [list, setList] = useState([{ id: "", content: "he", state: "todo" }]);

  /*const todo = list.map((item) => {
    if (item.state === "todo") {
      return (
        <WithMouse>
          <Card
            type="list"
            id={item.id}
            content={item.content}
            handleClick={(e) => {
              console.log(e);
              setItem(e);
            }}
          ></Card>
        </WithMouse>
      );
    }
  });*/
  const todo = list.map((item) => {
    if (item.state === "todo") {
      return <Card type="list"id={item.id} content={item.content} handleClick={(e)=>{ console.log("e",e);setItem(e)}}></Card>
    }
  });
  const done = list.map((item) => {
    if (item.state === "done") {
      return<Card type="list"id={item.id} content={item.content} handleClick={(e)=>{ console.log(e);setItem(e)}}></Card>
    }
  });
  const undone = list.map((item) => {
    if (item.state === "undone") {
      return<Card type="list"id={item.id} content={item.content} handleClick={(e)=>{ console.log(e);setItem(e)}}></Card>
    }
  });
  useEffect(() => {
    let width;
    if (taskNode.current) {
      width = taskNode.current.getClientRects()[0].width / 3.0;
    }

    let listChange = list.map((item) => {
      if (item.id === cardItem.id) {
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
        <List
          title="todo"
          handleAdd={(e) => {
            //console.log("dianji");
            let temp = list;
            temp.push({ id: "hi", content: "", state: "todo" });
            // console.log(...temp)
            setList([...temp]);
          }}
        >
          {todo}
        </List>
        <List title="done">{done}</List>
        <List title="undone">{WithMouse(Card)({type:"list",content:"hello",handleClick:(e)=>{console.log("test",e)}})}</List>
        
      </div>
    </div>
  );
}
export default Task;
