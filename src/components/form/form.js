import React,{useEffect,useState} from "react";
import styles from "./form.module.css";
function Form({ title, state,handleClick=(e)=>{}}) {
  let [username,setName]=useState("");
  let [password,setPassword]= useState("");
  return (

    <div className={styles.container}>
      <div className={styles.header}>{title}</div>

      <div className={styles.form}>
        <input type="text" className={styles.username} placeholder="输入用户名"onChange={(e)=>{setName(e.target.value)}}/>
        <input type="password" className={styles.password} placeholder="输入密码" onChange={(e)=>{setPassword(e.target.value)}}/>
        <input type="submit" className={styles.btn} value={state} onClick={()=>handleClick({username,password})}/> 
      </div>
    </div>
  );
}

export default Form;
