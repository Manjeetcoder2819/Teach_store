import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CheckoutPage from './pages/CheckoutPage';
import Wishlist from './components/Wishlist.js';
import Account from './components/Account';
import CartModal from './components/CartModal';
import { products } from './data/products';
import './App.css';

function App() {
  // ✅ States
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // ✅ Cart Logic
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // ✅ Wishlist Logic
  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const isInWishlist = prevWishlist.some((item) => item.id === product.id);
      return isInWishlist
        ? prevWishlist.filter((item) => item.id !== product.id)
        : [...prevWishlist, product];
    });
  };

  // ✅ Shared Props
  const appProps = {
    cart,
    wishlist,
    products,
    searchTerm,
    selectedCategory,
    currentView,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    getTotalPrice,
    getTotalItems,
    setSearchTerm,
    setSelectedCategory,
    setCurrentView,
    setIsCartOpen,
  };

  // ✅ View Router
  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage {...appProps} />;
      case 'products':
        return <ProductsPage {...appProps} />;
      case 'wishlist':
        return <Wishlist wishlist={wishlist} toggleWishlist={toggleWishlist} />;
      case 'account':
        return <Account />;
      case 'checkout':
        return <CheckoutPage {...appProps} />;
      default:
        return <HomePage {...appProps} />;
    }
  };

  return (
    <div className="app">
      <Header {...appProps} />
      {renderCurrentView()}
      {isCartOpen && <CartModal {...appProps} />}
    </div>
  );
}

export default App;
