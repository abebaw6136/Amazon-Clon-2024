import React, { useContext } from 'react';
import { SlLocationPin } from 'react-icons/sl';
import { BsSearch } from 'react-icons/bs'; // Adjusted import
import { BiCart } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import LowerHeader from './LowerHeader';
import classes from './Header.module.css';
import { DataContext } from '../DataProvider/DataProvider';

const Header = () => {
  const [state, dispatch] = useContext(DataContext); // Destructure state and dispatch
  const { basket } = state; // Extract basket from state

  const handleSearch = (event) => {
    event.preventDefault();
    // Implement your search logic here
  };


  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          <div className={classes.logo_container}>
            <Link to='/'>
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
      
          <form className={classes.search} onSubmit={handleSearch}>
            <select name='' id=''>
              <option value="">All</option>
            </select>
            <input type="text" placeholder='Search products' />
            <button type="submit" aria-label="Search">
              <BsSearch size={25} />
            </button>
          </form>

          <div className={classes.order_container}>
            <Link to='' className={classes.language}>
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/383px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png'
                alt='US flag' />
              <select name="" id="">
                <option value=''>EN</option>
              </select>
            </Link>
            <Link to='/signin'>
              <p>Sign In</p>
              <span>Account & Lists</span>
            </Link>
            <Link to='/orders'>
              <p>Returns</p>
              <span>& Orders</span>
            </Link>
            <Link to='/cart' className={classes.Cart}>
              <BiCart size={35} />
              <span >{basket.length}</span>
            </Link>
          </div> 
        </div>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header;