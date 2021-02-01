import React from "react";
import styles from "./card.module.css";

const Card = (props) => {
  const {
    title,
    start,
    color,
    type,
    children,
    id,
    style,
    content,
    handleClick = (e) => {},
  } = props;
  if (type === "new") {
    return (
      <div
        id={id}
        className={styles.new}
        onClick={(e) => {
          handleClick(e);
        }}
      >
        {title}
      </div>
    );
  } else if (type === "list") {
    return (
      <div
        id={id}
        className={styles.list}
        onMouseUp={(e) => {
          const message ={
            id:id,
            x:e.target.getClientRects()[0].left,
            y:e.target.getClientRects()[0].top,
          }
          handleClick(message);
        }}
      >
        {content}
        <div className={styles.edit} onClick={(e)=>{console.log("dianji")}}></div>
        <div className={styles.finish}></div>
        <div className={styles.image}>image</div>
      </div>
    );
  } else {
    return (
      <div
        id={id}
        className={styles.card}
        style={color}
        onClick={(e) => {
          handleClick({ id: id, title: title });
        }}
      >
        {title}
        <div className={styles.start}>收藏</div>
      </div>
    );
  }
};

export default Card;
