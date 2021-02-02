import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./home.module.css";
import ajax from "../../ajax.js";

import Menu from "../../components/newMenu/menu.js";
import Card from "../../components/card/card.js";



function Home(props) {
  const history = useHistory();
  const [menuDisplay, setDis] = useState(false);
  const [board, setBoard] = useState([]);
  const cardList = board.map((item) => {
    return (
      <Card
        id={item.id}
        color={{ backgroundColor: "rgb(175, 233, 18)" }}
        title={item.title}
        handleClick={(e) => {
          props.jump(e)
          history.push("/task");
        }}
      ></Card>
    );
  });
  const [active, setActive] = useState("board");
  useEffect(() => {
    ajax({
      type: "post",
      url: "http://localhost:3004/home",
      data: {},
      header: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      success: function (data) {
        let result = JSON.parse(data);
        if (result.success) {
          setBoard(result.board);
        }
      },
      error: function (data) {},
    });
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <input type="text" className={styles.search} placeholder="搜索" />
      </div>
      <div className={styles.bodyer}>
        <div className={styles.aside}>
          <div
            className={`${styles.board} ${
              active === "board" ? styles.active : ""
            }`}
            onClick={() => {
              setActive("board");
            }}
          >
            看板
          </div>
          <div
            className={`${styles.firstpage} ${
              active !== "board" ? styles.active : ""
            }`}
            onClick={() => {
              setActive("firstpage");
            }}
          >
            主页
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.part2}>
            <div>个人看板</div>
            {cardList}
            <Card
              type="new"
              title="新建"
              handleClick={(e) => {
                setDis(true);
              }}
            ></Card>
            <Menu
              display={menuDisplay ? "block" : "none"}
              handleClick={(e) => {
                if (e) {
                  ajax({
                    type: "post",
                    url: "http://localhost:3004/home",
                    data: { title: e },
                    header: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    success: function (data) {
                      let result = JSON.parse(data);
                      if (result.success) {
                        setBoard(result.board);
                      }
                    },
                    error: function (data) {},
                  });
                }

                setDis(false);
              }}
            ></Menu>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
