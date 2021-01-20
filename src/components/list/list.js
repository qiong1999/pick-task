import React from 'react';

import styles from './list.module.css'

function List({title}){

    return(
        <div className={styles.list}>
            {title}
            <div className={styles.choose}>choose</div>
        </div>
    )
}

export default List;