import React from 'react';
import { ShoppingCart, Search, Heart, User, Menu } from 'lucide-react';
import './Header.css';

const Header = ({
  searchTerm,
  setSearchTerm,
  setCurrentView,
  setIsCartOpen,
  getTotalItems,
  wishlist
}) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-top">
          {/* Logo */}
          <button onClick={() => setCurrentView('home')} className="logo">
            TechStore
          </button>

          {/* Desktop Search Bar */}
          <div className="search-bar-desktop">
            <div className="search-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="nav-icons">
            <button
              onClick={() => setCurrentView('products')}
              className="nav-btn hide-mobile"
            >
              Products
            </button>

            {/* Wishlist */}
            <button
              className="icon-btn"
              onClick={() => setCurrentView('wishlist')}
              title="Wishlist"
            >
              <Heart size={24} />
              {wishlist.length > 0 && (
                <span className="badge red">{wishlist.length}</span>
              )}
            </button>

            {/* User */}
           <button
       className="icon-btn"
       onClick={() => setCurrentView('account')}
                title="User Account"
               >
             <User size={24} />
               </button>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="icon-btn"
              title="Cart"
            >
              <ShoppingCart size={24} />
              {getTotalItems() > 0 && (
                <span className="badge blue">{getTotalItems()}</span>
              )}
            </button>

            {/* Mobile Menu */}
            <button className="icon-btn show-mobile" title="Menu">
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="search-bar-mobile">
          <div className="search-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
