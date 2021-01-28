import React, { useState,useEffect } from "react";
import styles from "./home.module.css";
import ajax from '../../ajax.js'

import Card from "../../components/card/card.js";

function Home() {

  console.log(`Bearer ${localStorage.getItem('token')}`)
  useEffect(()=>{
    ajax({
      type:'post',
      url:"http://localhost:3004/home",
      data:{test:1},
      header:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${localStorage.getItem('token')}`
      },
      success:function(data){
        console.log(data);
      },
      error:function(data){

      }
    })

  },[])
  const [active, setActive] = useState("board");
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
          <div className={styles.part1}>
            <div>最近查看</div>
            <Card
              title="hello"
              color={{ backgroundColor: "rgb(175, 233, 18)" }}
            ></Card>
            <Card
              title="hello"
              color={{ backgroundColor: "rgb(175, 233, 18)" }}
            ></Card>
            <Card
              title="hello"
              color={{ backgroundColor: "rgb(175, 233, 18)" }}
            ></Card>
          </div>
          <div className={styles.part2}>
            <div>个人看板</div>
            <Card
              title="hello"
              color={{ backgroundColor: "rgb(175, 233, 18)" }}
            ></Card>
            <Card
              title="hello"
              color={{ backgroundColor: "rgb(175, 233, 18)" }}
            ></Card>{" "}
            <Card
              title="hello"
              color={{ backgroundColor: "rgb(175, 233, 18)" }}
            ></Card>
            <Card type="new" title="新建"></Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
