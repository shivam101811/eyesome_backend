import React, { useState } from 'react';
import img1 from '../assets/images/first-page/eye.png';
import img2 from '../assets/images/first-page/eye1.png';
import { Link  , useLocation } from 'react-router-dom'; 
import Login from './Login';




function Header({ onFilterChange, selectedProducts = [], selectedCartItems = [], user }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const location = useLocation();
  console.log(location.pathname.split('/')[1] === "categories-detail");

  const toggleNav = () => {
    setIsNavOpen(prevIsNavOpen => !prevIsNavOpen);
  };

  const toggleSubmenu = () => {
    setIsSubmenuOpen(prevIsSubmenuOpen => !prevIsSubmenuOpen);
  };

  const handleWhishlistClick = () => {
    // Reset the navigation icon and submenu when the Wishlist link is clicked
    setIsNavOpen(false);
    setIsSubmenuOpen(false);
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    //   setFilterValue(value);
    onFilterChange(value); // Notify the parent component about the filter change
    console.log(typeof(value), "<----- THIS IS VALUE")
  };



  return (
    <div className='wrapper header-position'>
      {/* Header */}
      <div className="header">
        <div className="header-1">
          <section className="h-title">
            <span className="eye-icon">
              <img src={img1} alt="" className="eye-icon2" />
              <img src={img2} alt="" className="eye-icon1" />
            </span>
            <label htmlFor="">
              <Link to="/" className='eyesome-txt'>EYESOME</Link>
            </label>
          </section>
          {
            location.pathname.split('/')[1] != "categories-detail" && 
            
            <div className="h-Filter-input"  >
            <form action="" className="form-1">
              <input type="text" placeholder="Search Glasses..." onChange={handleFilterChange} />
              <span className="h-icon">
                <i className="fa-solid fa-magnifying-glass" />
              </span>
            </form>
          </div>
          }
         
          <section className="h-options">
            <div className="Logged-info">
              {user ? (
                <div className="Logged-info-username">Hello, {user}</div>
              ) : (
                <div className="Logged-info-Login">
                  <Link to="/login" element={<Login />} className="login-header-btn">Login</Link>
                </div>
              )}
            </div>
            <Link to='/categories'>
              <button className="h-btn1">Explore</button>
            </Link>
            <Link to="/whishlist" className="header-icon">
              <button className="h-btn2">
                {selectedProducts.length > 0 && (
                  <span className="adding-product">{selectedProducts.length}</span>
                )}
                <i className="fa-regular fa-bookmark" />
              </button>
            </Link>
            <Link to="/Cart"  className="header-icon">
              <button className="h-btn3">
                {selectedCartItems.length > 0 && (
                  <span className="adding-product">{selectedCartItems.length}</span>
                )}
                {/* <span className="adding-product">1</span> */}
                <i className="fa-solid fa-cart-shopping" />
              </button>
            </Link>
            <button className="h-btn4">
              <div className="navbar" onClick={toggleSubmenu}>
                <div className={`icon ${isNavOpen ? 'cross' : ''}`} onClick={toggleNav}>
                  <span className="line" />
                  <span className="line" />
                  <span className="line" />
                </div>
              </div>
              <div className={`submenu ${isSubmenuOpen ? 'show-submenu' : ''}`} id="submenu">
                <Link to="/whishlist" onClick={handleWhishlistClick}>
                  <i className="fa-regular fa-bookmark" /> Whishlist
                </Link>
                <Link to="/Cart" onClick={handleWhishlistClick}> {/*something went wrong in here*/}
                  <i className="fa-solid fa-cart-shopping" /> Bag
                </Link>
              </div>
            </button>
          </section>
        </div>
        {
            location.pathname.split('/')[1] != "categories-detail" && 
        <div className="header-2">
          <form className="form2" action="">
          <input type="text" placeholder="Search Glasses..." onChange={handleFilterChange} />
            <span className="h-icon">
              <i className="fa-solid fa-magnifying-glass" />
            </span>
          </form>
        </div>
        }
      </div>
    </div>
  );
}

export default Header;
