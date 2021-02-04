import React, { useState, useEffect } from "react";
import styles from "./calendar.module.css";
function Calendar() {
  const [nowDate, setDate] = useState({
    Month: 0,
    Year: 0,
    Date: 0,
  });
  const [cale, setCale] = useState([]);
  const oneDay = ["日", "一", "二", "三", "四", "五", "六"];
  const monthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const date = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
  ];
  const setCurrentYearMonthDay = (date) => {
    let Month = date.getMonth() + 1;
    let Year = date.getFullYear();
    let Date = date.getDate();
    return { Month, Year, Date };
  };
  const getMonthDay = (month) => {
    return monthDay[month - 1];
  };
  const getOneDay = (year, month, day) => {
    let date = new Date();
    date.setFullYear(year);
    date.setMonth(month - 1, day);
    return date.getDay();
  };
  const dayList = oneDay.map((item) => {
    return (
      <div className={styles.oneDay} key={item}>
        {item}
      </div>
    );
  });
  const list = (nowDate) => {
    let result = new Array(42);
    let monthDay = getMonthDay(nowDate.Month);
    let frontMonth = nowDate.Month === 1 ? 12 : getMonthDay(nowDate.Month - 1);
    let day = getOneDay(nowDate.Year, nowDate.Month, 1);
    for (let i = 0; i < 42; i++) {
      if (i >= day && i - day < monthDay) {
        result[i] = <div className={styles.oneDay}>{date[i - day]}</div>;
      } else if (i - day < 0) {
        result[i] = (
          <div className={styles.frontDay}>{frontMonth + i - day + 1}</div>
        );
      } else {
        result[i] = (
          <div className={styles.afterDay}>{(i - day + 1) % monthDay}</div>
        );
      }
    }
    return result;
  };
  useEffect(() => {
    setDate({
      ...nowDate,
      ...setCurrentYearMonthDay(new Date()),
    });
  }, []);
  useEffect(() => {
    if (nowDate.Year && nowDate.Month && nowDate.Date) {
      setCale(list(nowDate));
    }
  }, [nowDate]);
  return (
    <div className={styles.container} onClick={(e)=>{console.log("hello")}}>
      
      <div className={styles.header}>
        <div className={styles.sm2}></div>
        <div className={styles.sm1}></div>
        <div>
          {nowDate.Year}年{nowDate.Month}月{nowDate.Date}日
        </div>
        <div className = {styles.bg1}></div>
        <div className = {styles.bg2}></div>
      </div>
      <div className={styles.bodyer}>
        {dayList}
        {cale}
      </div>
    </div>
  );
}

export default Calendar;