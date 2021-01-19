import React, { useState, useEffect, useMemo } from "react";
import styles from "./login.module.css";
import classNames from "classnames";

function Login(props) {
  const [scrollY, setScrollY] = useState(0);
  const [select, setSelect] = useState(true);
  useEffect(() => {
    document.addEventListener("scroll", (e) => {
      setScrollY(window.scrollY);
    });
  }, []);
  const classes = useMemo(() => {
    if (scrollY < 10) return styles.header;
    return styles.scroll;
  });
  const ownStyle = useMemo(() => {
    if (select) return styles.sign;
    return styles.login;
  });
  const signClass = classNames(
    styles.rgSign,
    ownStyle === styles.sign ? styles.sign : ""
  );
  const loginClass = classNames(
    styles.rgLogin,
    ownStyle === styles.sign ? "" : styles.login
  );
  const handleClick=(value)=>{
    props.listenSign(value)
  }
  return (
    <div className={styles.container}>
      <div className={classes}>
        <div className={styles.lf}> Pick Task</div>
        <div
          className={signClass}
          onClick={() => {
            setSelect(true);
            handleClick(true)
          }}
        >
          <a href="#">注册</a>
        </div>
        <div
          className={loginClass}
          onClick={() => {
            setSelect(false);
            handleClick(false)
          }}
        >
          <a href="#">登录</a>
        </div>
      </div>
      <div className={styles.bodyer}>
        
          <div className={styles.state}>
            <h2>Pick Task 一款帮助个人以更高效的方式开展工作并完成工作</h2>
            <p>Pick Task 以列表和任务卡片的形式为您提供有趣的组织项目方式</p>
          </div>
          <img className={styles.image} src="pickTask.png" alt="宣传照片" />
        </div>
     
      <div className={styles.footer}>Pick Task一个开源的任务管理工具</div>
    </div>
  );
}

export default Login;
