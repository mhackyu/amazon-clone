import React from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import './Header.scss';
import { useStateValue } from '../../store/StateProvider';
import { auth } from '../../lib/firebase';

function Header() {
  const [{ basket, user }] = useStateValue();

  const handleUserSession = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="logo"
        />
      </Link>

      <div className="header__search">
        <input type="text" className="header__searchInput" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <Link to="/login">
          <div onClick={handleUserSession} className="header__option">
            <span className="header__optionLineOne">
              Hello, {user?.email ? user?.email : 'Guest'}
            </span>
            <span className="header__optionLineTwo">
              {user ? 'Sign Out' : 'Sign In'}
            </span>
          </div>
        </Link>
        <Link to="/orders">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>
        <a href="https://github.com/mhackyu/amazon-clone" target="_blank" rel="noreferrer">
          <div className="header__option">
            <span className="header__optionLineOne">Github</span>
            <span className="header__optionLineTwo">Repository</span>
          </div>
        </a>
        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
