import React from 'react';
import styles from './card.module.css'

function Card({title,start, color,type,children}){
    if(type==="new"){
        return(
            <div className={styles.new}>
                {title}
            </div>
        )
    }
    else if(type==='list'){
        return(
            <div className={styles.list}>
                <div>{children}</div>
                <div className={styles.edit}></div>
                <div className={styles.finish}></div>
                <div className={styles.image}>image</div>
            </div>
        )
        
    }else{
        return(
            <div className={styles.card} style={color}>
               {title}
                <div className={styles.start} >收藏</div>
            </div>
        )
    }
   
}

export default Card;