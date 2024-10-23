

import React from 'react';
import CatagoryFullinfos from './CatagoryFullinfos';
import CatagoryCard from './CatagoryCard';
import styles from './Catagory.module.css'; // Import the CSS module

function Catagory() {
    return (
        <section className={styles.catagoryContainer}>
            {CatagoryFullinfos.map((infos) => (
                <div className={styles.catagoryCard} key={infos.title}>
                    <CatagoryCard data={infos} />
                </div>
            ))}
        </section>
    );
}

export default Catagory;