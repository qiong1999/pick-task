import React, { useState, useEffect, useRef } from "react";

import List from "../../components/list/list.js";
import styles from "./task.module.css";
import Card from "../../components/card/card.js";
const todolist = [
  { id: "1", content: "test1", state: "todo" },
  { id: "2", content: "test2", state: "done" },
  { id: "3", content: "test3", state: "todo" },
  { id: "4", content: "test4", state: "undone" },
  { id: "5", content: "test5", state: "todo" },
  { id: "6", content: "test6", state: "todo" },
  { id: "7", content: "test7", state: "todo" },
];
function Task() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dis, setDis] = useState({ x: 0, y: 0 });
  const [down, setDown] = useState(false);
  const curNode = useRef(null);
  const [list, setList] = useState(todolist);
  const todo = list.map((item) => {
    if (item.state === "todo") {
      return (
        <Card type="list" id={item.id} >
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
    if (curNode.current) {
      const styles = `position:fixed;top:${position.y}px;left:${position.x}px;background:#c8e90c;z-index:10000`;
      curNode.current.setAttribute("style", styles);
    }
  }, [position]);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <input type="tFFext" className={styles.search} placeholder="搜索" />
      </div>
      <div
        id="bodyer"
        className={styles.bodyer}
        onMouseDown={(e) => {
          e.preventDefault();
          if (e.target.id === "bodyer") return;
          setDown(true);
          curNode.current = e.target;
          let x = e.clientX - e.target.getClientRects()[0].left;
          let y = e.clientY - e.target.getClientRects()[0].top;
          setDis({ x: x, y: y });
        }}
        onMouseMove={(e) => {
          if (down) {
            let x = e.clientX - dis.x;
            let y = e.clientY - dis.y;

            if (x < 0) {
              x = 0;
            }
            if (y < 0) {
              y = 0;
            }

            setPosition({ x: x, y: y });
          }
        }}
        onMouseUp={(e) => {
          if (down) {
            const root = document.getElementById("root");
            const width = root.clientWidth / 4.0;
            let temp;
            if (position.x < width) {
              temp = list.map((item) => {
                if (item.id === curNode.current.id) {
                  item.state = "todo";
                }
                return item;
              });
            } else if (position.x < width * 2) {
              temp = list.map((item) => {
                if (item.id === curNode.current.id) {
                  item.state = "done";
                }
                return item;
              });
            } else {
              temp = list.map((item) => {
                if (item.id === curNode.current.id) {
                  item.state = "undone";
                }
                return item;
              });
            }
            setList(temp);
            setDown(false);
            curNode.current.setAttribute("style", "");
          }

          curNode.current = null;
        }}
      >
        <List title="todo" >{todo}</List>
        <List title="done">{done}</List>
        <List title="undone">{undone}</List>
        <div className={styles.addList}>添加新的列表</div>
      </div>
    </div>
  );
}
export default Task;
