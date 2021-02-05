import React, { useState, useEffect } from "react";
import styles from "./calendar.module.css";
function Calendar({ handleSetTime, display }) {
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
    let flag =
      nowDate.Year % 100 !== 0 && nowDate.Year % 4=== 0 ? true :false;
    let result = new Array(42);
    let monthDay =
      nowDate.Month === 2 && flag ? 29 : getMonthDay(nowDate.Month);
    let frontMonth =
      nowDate.Month === 1 ? getMonthDay(12) : getMonthDay(nowDate.Month - 1);
    let day = getOneDay(nowDate.Year, nowDate.Month, 1);
    for (let i = 0; i < 42; i++) {
      if (i >= day && i - day < monthDay) {
        result[i] = (
          <div
            className={styles.oneDay}
            id={`${nowDate.Year}-${nowDate.Month}-${date[i - day]}`}
          >
            {date[i - day]}
          </div>
        );
      } else if (i - day < 0) {
        result[i] = (
          <div
            className={styles.frontDay}
            id={`${nowDate.Month === 1 ? nowDate.Year - 1 : nowDate.Year}-${
              nowDate.Month === 1 ? 12 : nowDate.Month - 1
            }-${frontMonth + i - day + 1}`}
          >
            {frontMonth + i - day + 1}
          </div>
        );
      } else {
        result[i] = (
          <div
            className={styles.afterDay}
            id={`${nowDate.Month === 12 ? nowDate.Year + 1 : nowDate.Year}-${
              nowDate.Month === 12 ? 1 : nowDate.Month + 1
            }-${(i - day + 1) % monthDay}`}
          >
            {(i - day + 1) % monthDay}
          </div>
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
    console.log(nowDate);
    if (nowDate.Year && nowDate.Month && nowDate.Date) {
      setCale(list(nowDate));
    }
  }, [nowDate]);
  return (
    <div
      className={styles.container}
      style={{ display: display ? "block" : "none" }}
      onClick={(e) => {
        handleSetTime(e.target.id);
      }}
    >
      <div className={styles.header}>
        <div
          className={styles.sm2}
          onClick={(e) => {
            setDate({ ...nowDate, Year: nowDate.Year - 1 });
          }}
        ></div>
        <div
          className={styles.sm1}
          onClick={(e) => {
            setDate({
              ...nowDate,
              Month: nowDate.Month === 1 ? 12 : nowDate.Month - 1,
              Year: nowDate.Month === 1 ? nowDate.Year - 1 : nowDate.Year,
            });
          }}
        ></div>
        <div>
          {nowDate.Year}年{nowDate.Month}月{nowDate.Date}日
        </div>
        <div
          className={styles.bg1}
          onClick={(e) => {
            setDate({
              ...nowDate,
              Month: nowDate.Month === 12 ? 1 : nowDate.Month + 1,
              Year: nowDate.Month === 12 ? nowDate.Year + 1 : nowDate.Year,
            });
          }}
        ></div>
        <div
          className={styles.bg2}
          onClick={(e) => {
            setDate({ ...nowDate, Year: nowDate.Year + 1 });
          }}
        ></div>
      </div>
      <div className={styles.bodyer}>
        {dayList}
        {cale}
      </div>
    </div>
  );
}

export default Calendar;
