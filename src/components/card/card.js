import React from "react";
import styles from "./card.module.css";

function Card({ title, start, color, type, children, id, style }) {
  if (type === "new") {
    return (
      <div id={id} className={styles.new}>
        {title}
      </div>
    );
  } else if (type === "list") {
    return (
      <div id={id} className={styles.list}>
        <div className ={styles.cont}>{children}</div>
        <div className={styles.edit} ></div>
        <div className={styles.finish}></div>
        <div className={styles.image} ondragstart = "return false">image</div>
      </div>
    );
  } else {
    return (
      <div id={id} className={styles.card} style={color}>
        {title}
        <div className={styles.start}>收藏</div>
      </div>
    );
  }
}

export default Card;
