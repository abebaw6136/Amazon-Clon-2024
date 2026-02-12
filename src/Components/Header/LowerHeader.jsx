import React from 'react';
import { IoIosMenu } from 'react-icons/io';
import classes from './LowerHeader.module.css';

function LowerHeader() {
  return (
    <div className={classes.lower_container}>
      <ul>
        <li className={classes.menu_item}>
          <IoIosMenu size={25} />
          <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>Customer Service</li> {/* Fixed Typo */}
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  )
}

export default LowerHeader;
