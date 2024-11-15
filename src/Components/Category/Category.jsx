
import React from 'react';
import { CategoryFullinfos } from './CategoryFullinfos';
import CategoryCard from './CategoryCard';
import classes from './Category.module.css'; // Ensure the import path is correct

function Category() {
    return (
        <section className={classes.category_container}>
            {CategoryFullinfos.map((infos) => (
                <CategoryCard key={infos.name} data={infos} />
            ))}
        </section>
    );
}

export default Category;