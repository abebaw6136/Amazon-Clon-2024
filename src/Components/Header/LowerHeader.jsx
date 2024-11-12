import React from 'react'
import { IoIosMenu } from "react-icons/io";
import classes from './Header.module.css';


 function LowerHeader() {
  return (
    <div className={classes.lower_container}>

        <ul>
        <li className={classes.menu_item}>
          <IoIosMenu aria-label="Menu" />
          <p>ALL</p>
        </li>
            <li>Today's Deals</li>
            <li>Costumer Service</li>
            <li>Registry</li>
            <li>Gift Cards</li>
            <li>Sell</li>


        </ul>

    </div>
  )
}

export default  LowerHeader