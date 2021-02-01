import React,{useState,useEffect,useRef}from "react";
import styles from "./menu.module.css";

function Menu(props) {
     
     const [title,setTitle] = useState("")
     const closeNode = useRef(null)
    
  return (
    <div className={styles.container} ref={closeNode} style={{display:props.display}}>
     
        <div className={styles.close}
        
        onClick={(e)=>{props.handleClick("")}}></div>
        <input
          className={styles.new}
          type="text"
          placeholder="创建新看板"
          onChange={(e)=>{setTitle(e.target.value)}}
        />
        <input type="submit" className={styles.sub} onClick={()=>{

           props.handleClick(title)
        
        }}/>
    </div>
  );
}

export default Menu;
