import React from 'react';
import { SlLocationPin } from 'react-icons/sl';
import { BsSearch } from '@react-icons/all-files/bs/BsSearch';
import { BiCart } from '@react-icons/all-files/bi/BiCart';
import { Link } from 'react-router-dom'; // Import Link
import LowerHeader from './LowerHeader'; // Ensure the import is correct
import classes from './Header.module.css';

const Header = () => {
  return (
    <>
      <section>
        <div className={classes.header_container}>
          {/* Logo Section */}
          <div className={classes.logo_container}>
            <Link to='/'> {/* Changed to Link */}
              <img
                src='https://pngimg.com/uploads/amazon/small/amazon_PNG11.png'
                alt='amazon logo'
              />
            </Link>
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
              <Link to='' className={classes.language}> {/* Changed to Link */}
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/383px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png'
                  alt='' />
                <select name="" id="">
                  <option value=''>EN</option>
                </select>
              </Link>
              <Link to='/signin'> {/* Changed to Link */}
                <p>Sign In</p>
                <span>Account & Lists</span>
              </Link>
              <Link to='/orders'> {/* Changed to Link */}
                <p>Returns</p>
                <span>& Orders</span>
              </Link>
              <Link to='/cart' className={classes.Cart}> {/* Changed to Link */}
                <BiCart size={35} />
                <span className={classes.cart_count}>0</span>
              </Link>
            </>
          </div> 
        </div>
        <div></div>
      </section>
      <LowerHeader />
    </>
  );
}

export default Header;