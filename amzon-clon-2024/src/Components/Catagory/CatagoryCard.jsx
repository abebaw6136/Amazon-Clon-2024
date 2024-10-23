import React from 'react'
import classes from './Catagory.module.css';

 function catatagoryCard({data}) {
  return (
    <div className={classes.catagory}>
        <a href=''>
        <span>
        <h2>{data.title}</h2>
        </span>
        <img src={data.imglink} alt=''/>
        <p>shop now</p>
        </a>


    </div>
  )
}
export default  catatagoryCard