import React from "react";
import styles from "./form.module.css";
function Form({ title, state}) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>{title}</div>

      <div className={styles.form}>
        <input type="text" className={styles.username} placeholder="输入用户名"/>
        <input type="password" className={styles.password} placeholder="输入密码"/>
        <input type="submit" className={styles.btn} value={state}/> 
      </div>
    </div>
  );
}

export default Form;
