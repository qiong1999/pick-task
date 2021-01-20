import React from 'react';
import styles from './card.module.css'

function Card({title,start, color,type}){
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
                {title}
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