import React from "react";

import List from '../../components/list/list.js'
import styles from "./task.module.css";


function Task() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <input type="text" className={styles.search} placeholder="搜索" />
      </div>
     <div className={styles.bodyer}>
        <List title="todo"></List>
     </div>
    </div>
  );
}
export default Task;
