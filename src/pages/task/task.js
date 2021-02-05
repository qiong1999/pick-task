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
  const [list, setList] = useState([{ id: "", content: "he", state: "todo" ,time:"2020.01.12"}]);

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
  const timeFormat = (str) => {
    let temp = str.split("-");
    temp[1]= temp[1].length===1?`0${temp[1]}`:temp[1];
    temp[2]= temp[2].length===1?`0${temp[2]}`:temp[2];
    
    return temp.join(".");
  };
  const todo = list.map((item) => {
    if (item.state === "todo") {
      return <WithMouse handleClick={(e)=>{ console.log("e",e);setItem(e)}}><Card type="list"id={item.id} content={item.content} time={item.time} ></Card></WithMouse>
    }
  });
  const done = list.map((item) => {
    if (item.state === "done") {
      return<WithMouse handleClick={(e)=>{ console.log("e",e);setItem(e)}}><Card type="list"id={item.id} content={item.content}></Card></WithMouse>
    }
  });
  const undone = list.map((item) => {
    if (item.state === "undone") {
      return<WithMouse handleClick={(e)=>{ console.log("e",e);setItem(e)}}><Card type="list"id={item.id} content={item.content}></Card></WithMouse>
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
            let time = new Date();
            temp.push({ id: "hi", content: "", state: "todo" ,time: timeFormat(`${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}`)});
            // console.log(...temp)
            setList([...temp]);
          }}
        >
          {todo}
        </List>
        <List title="done">{done}</List>
        <List title="undone">{undone}</List>
        
      </div>
    </div>
  );
}
export default Task;
