import React from "react";
import Menu from '../newMenu/menu'
import styles from "./list.module.css";

const List = (props) => {
  const {
    title,
    children,
    handleAdd = (e) => {},
    handleMore = (e) => {},
  } = props;
  return (
    <div className={styles.list}>
      <div className={styles.header}>
        {title}
        <div className={styles.choose}></div>
      </div>
      <div className={styles.bodyer}>{children}</div>
      <div className={styles.footer}>
        <div>
          <div className={styles.add}></div>
          <div className={styles.addBtn} onClick={(e)=>{handleAdd(e)}}>"添加新的任务卡片"</div>
        </div>
      </div>
     
    </div>
  );
};

export default List;
