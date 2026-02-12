import React, { useContext } from 'react';
import { SlLocationPin } from 'react-icons/sl';
import { BsSearch } from 'react-icons/bs';
import { BiCart } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../Utility/firebase';
import LowerHeader from './LowerHeader';
import classes from './Header.module.css';
import { DataContext } from '../DataProvider/DataProvider';

const Header = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  // Safely calculate total items
  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0) || 0;

  const handleSignOut = () => {
    signOut(auth).then(() => {
      dispatch({
        type: 'SET_USER',
        user: null,
      });
    }).catch((error) => {
      console.error('Sign out error:', error);
    });
  };

  return (
    <section className={classes.fixed_header}>
      <div className={classes.header_container}>
        {/* Logo and Location */}
        <div className={classes.logo_container}>
          <Link to="/">
            <img src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png" alt="amazon logo" />
          </Link>
          <div className={classes.delivery}>
            <SlLocationPin />
            <div>
              <p>Deliver to</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className={classes.search}>
          <select name="category">
            <option value="">All</option>
          </select>
          <input type="text" placeholder="Search Amazon" />
          <div className={classes.search_icon}>
             <BsSearch size={20} />
          </div>
        </div>

        {/* Right Side Navigation */}
        <div className={classes.order_container}>
          <div className={classes.language}>
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png" alt="flag" />
            <select>
                <option value="EN">EN</option>
            </select>
          </div>
          
          <Link to={!user ? "/auth" : "/"}>
            <div>
              <p>{user ? `Hello, ${user.email.split('@')[0]}` : "Sign In"}</p>
              <span>Account & Lists</span>
            </div>
          </Link>
          {user && (
            <button onClick={handleSignOut} className={classes.signOutButton}>
              Sign Out
            </button>
          )}

          <Link to="/orders">
            <p>Returns</p>
            <span>& Orders</span>
          </Link>

          <Link to="/cart" className={classes.cart}>
            <BiCart size={35} />
            <span className={classes.cart_count}>{totalItem}</span>
            <p>Cart</p>
          </Link>
        </div>
      </div>
      <LowerHeader />
    </section>
  );
};

export default Header;