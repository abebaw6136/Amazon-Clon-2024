
import React from 'react';
import { CatagoryFullinfos } from './CatagoryFullinfos';
import CatagoryCard from './CatagoryCard';
import classes from './Catagory.module.css'; // Ensure the import path is correct

function Catagory() {
    return (
        <section className={classes.catagory_container}>
            {CatagoryFullinfos.map((infos) => (
                <CatagoryCard key={infos.name} data={infos} />
            ))}
        </section>
    );
}

export default Catagory;