import React from 'react';
import { SlLocationPin } from 'react-icons/sl';
import { BsSearch } from '@react-icons/all-files/bs/BsSearch';
import { BiCart } from '@react-icons/all-files/bi/BiCart';
import LowerHeader from './LowerHeader'; // Ensure the import is correct
import classes from './Header.module.css';

const Header = () =>  {
  return (
    <>
    <section>
      
      <div className={classes.header_container}>
        {/* Logo Section */}
        <div className={classes.logo_container}>
          <a href=''>
            <img
              src='https://pngimg.com/uploads/amazon/small/amazon_PNG11.png'
              alt='amazon logo'
            />
          </a>
          <span className={classes.location_icon}>
            <SlLocationPin />
          </span>
          <div>
            <p>Delivered to</p>
            <span>Ethiopia</span>
          </div>
        </div>
      
      
      {/* Search Bar */}
      <div className={classes.search}>
        
        <select name='' id=''>
          <option value="">All</option>
        </select>
        
        <input type="text" placeholder='Search products' />
        <button type="submit">
          <BsSearch size={25} />
        </button>
      </div>
      {/* Right Side Links */}
      <div className={classes.order_container}>
        <>
          <a href='' className={classes.language}>
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/383px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png'
              alt='' />
            <select name="" id="">
              <option value=''>EN</option>
            </select>
          </a>
          <a href=''>
            <p>Sign In</p>
            <span>Account & Lists</span>
          </a>
          <a href=''>
            <p>returns</p>
            <span>& Orders</span>
          </a>
          <a href=' 'className={classes.Cart} >
            <BiCart size={35} />
            <span className={classes.cart_count}>0</span>
          </a>
          </>
        </div> 
        </div>
        <div>
        
        </div>
        
    </section>
    <LowerHeader />
    </>
  );
}

export default Header;
