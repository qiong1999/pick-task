import React, { useState } from "react";
import styles from "./card.module.css";
import Calendar from "../calendar/calendar";


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
  const [time, setTime] = useState(props.time);
  const [dis, setDis] = useState(false);

  const timeFormat = (str) => {
    let temp = str.split("-");
    temp[1]= temp[1].length===1?`0${temp[1]}`:temp[1];
    temp[2]= temp[2].length===1?`0${temp[2]}`:temp[2];
    
    return temp.join(".");
  };
  //console.log(timeFormat("2020-6-4"))
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
      <div className={styles.total}>
        <div id={id} className={styles.list}>
          {content}
          <div
            className={styles.edit}
            onClick={(e) => {
              console.log("编辑");
            }}
          ></div>
          <div
            className={styles.finish}
            onClick={(e) => {
              console.log("完成");
            }}
          ></div>
          <input
            className={styles.image}
            onClick={(e) => {
              console.log("头像");
              setDis(!dis);
            }}
            placeholder={time}
          />
        </div>
        <Calendar
          handleSetTime={(e) => {
            handleClick(e);
           
            if(e){
              
              new Date(timeFormat(e)) < new Date()? alert("不能选择过去时间"):setTime(timeFormat(e));
            }
            
          }}
          display={dis}
        ></Calendar>
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
