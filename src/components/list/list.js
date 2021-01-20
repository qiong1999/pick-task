import React from 'react';
import Card from '../../components/card/card.js'

import styles from './list.module.css'

function List({title,children}){

    return(
        <div className={styles.list}>
            <div className={styles.header}>
            {title}
            <div className={styles.choose}></div>

            </div>
            <div className={styles.bodyer}>
               {children}
            </div>
            <div className={styles.footer}>
                <div>
                <div className={styles.add}></div>
                <div className={styles.addBtn}>"添加新的任务卡片"</div>
                </div>
                
            </div>
        </div>
    )
}

export default List;