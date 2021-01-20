import React from "react";

import List from "../../components/list/list.js";
import styles from "./task.module.css";
import Card from "../../components/card/card.js";

function Task() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <input type="text" className={styles.search} placeholder="搜索" />
      </div>
      <div className={styles.bodyer}>
        <List title="todo">
          <Card type="list">完成</Card>
          <Card type="list"></Card>
          <Card type="list"></Card>
          <Card type="list"></Card>
          <Card type="list">完成</Card>
          <Card type="list"></Card>
          <Card type="list"></Card>
          <Card type="list"></Card>
        </List>
        <List title="todo"></List>
        <List title="todo"></List>
        <List title="todo"></List>
        <List title="todo"></List>
        <List title="todo"></List>
        <List title="todo"></List>
        <div className={styles.addList}>添加新的列表</div>
       
      </div>
    </div>
  );
}
export default Task;
