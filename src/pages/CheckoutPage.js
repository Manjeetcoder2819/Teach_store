import React, { useState, useEffect } from 'react';
import { CreditCard, Package, Check, ArrowLeft } from 'lucide-react';

const CheckoutPage = ({ 
  cart, 
  getTotalPrice, 
  setCurrentView 
}) => {
  // Add CSS normalize styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* CSS Normalize */
      *, *::before, *::after {
        box-sizing: border-box;
      }
      
      * {
        margin: 0;
        padding: 0;
      }
      
      html, body {
        height: 100%;
      }
      
      body {
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
      }
      
      img, picture, video, canvas, svg {
        display: block;
        max-width: 100%;
      }
      
      input, button, textarea, select {
        font: inherit;
      }
      
      p, h1, h2, h3, h4, h5, h6 {
        overflow-wrap: break-word;
      }
      
      #root, #__next {
        isolation: isolate;
      }
      
      /* Additional normalize styles */
      html {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      
      article, aside, details, figcaption, figure, footer, header, hgroup, main, nav, section, summary {
        display: block;
      }
      
      audio, canvas, progress, video {
        display: inline-block;
        vertical-align: baseline;
      }
      
      audio:not([controls]) {
        display: none;
        height: 0;
      }
      
      [hidden], template {
        display: none;
      }
      
      a {
        background-color: transparent;
        text-decoration: none;
      }
      
      a:active, a:hover {
        outline: 0;
      }
      
      abbr[title] {
        border-bottom: 1px dotted;
      }
      
      b, strong {
        font-weight: bold;
      }
      
      dfn {
        font-style: italic;
      }
      
      mark {
        background: #ff0;
        color: #000;
      }
      
      small {
        font-size: 80%;
      }
      
      sub, sup {
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
      }
      
      sup {
        top: -0.5em;
      }
      
      sub {
        bottom: -0.25em;
      }
      
      img {
        border: 0;
      }
      
      svg:not(:root) {
        overflow: hidden;
      }
      
      figure {
        margin: 1em 40px;
      }
      
      hr {
        box-sizing: content-box;
        height: 0;
      }
      
      pre {
        overflow: auto;
      }
      
      code, kbd, pre, samp {
        font-family: monospace, monospace;
        font-size: 1em;
      }
      
      button, input, optgroup, select, textarea {
        color: inherit;
        font: inherit;
        margin: 0;
      }
      
      button {
        overflow: visible;
        text-transform: none;
      }
      
      button, html input[type="button"], input[type="reset"], input[type="submit"] {
        -webkit-appearance: button;
        cursor: pointer;
      }
      
      button[disabled], html input[disabled] {
        cursor: default;
      }
      
      button::-moz-focus-inner, input::-moz-focus-inner {
        border: 0;
        padding: 0;
      }
      
      input {
        line-height: normal;
      }
      
      input[type="checkbox"], input[type="radio"] {
        box-sizing: border-box;
        padding: 0;
      }
      
      input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
        height: auto;
      }
      
      input[type="search"] {
        -webkit-appearance: textfield;
        box-sizing: content-box;
      }
      
      input[type="search"]::-webkit-search-cancel-button, input[type="search"]::-webkit-search-decoration {
        -webkit-appearance: none;
      }
      
      fieldset {
        border: 1px solid #c0c0c0;
        margin: 0 2px;
        padding: 0.35em 0.625em 0.75em;
      }
      
      legend {
        border: 0;
        padding: 0;
      }
      
      textarea {
        overflow: auto;
      }
      
      optgroup {
        font-weight: bold;
      }
      
      table {
        border-collapse: collapse;
        border-spacing: 0;
      }
      
      td, th {
        padding: 0;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderCompleted(true);
    }, 2000);
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center py-16">
        <Package size={64} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add some products to your cart before checking out</p>
        <button
          onClick={() => setCurrentView('products')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (orderCompleted) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center py-16">
        <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={48} className="text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Confirmed!</h1>
        <p className="text-xl text-gray-600 mb-6">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto mb-6">
          <h3 className="font-bold text-lg mb-2">Order Summary</h3>
          <p className="text-gray-600">Order #: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          <p className="text-gray-600">Total: ${total.toFixed(2)}</p>
          <p className="text-gray-600">Items: {cart.length}</p>
        </div>
        <button
          onClick={() => setCurrentView('home')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center mb-8">
        <button
          onClick={() => setCurrentView('home')}
          className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Store
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="space-y-6">
          {/* Shipping Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Package className="mr-2" size={24} />
              Shipping Information
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Payment Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <CreditCard className="mr-2" size={24} />
              Payment Information
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                name="cardName"
                placeholder="Cardholder Name"
                value={formData.cardName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex items-center space-x-4 py-2 border-b">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-12 h-12 object-cover rounded-lg" 
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-3 border-t">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handleSubmit}
              disabled={isProcessing}
              className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-300 ${
                isProcessing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700'
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                `Place Order - $${total.toFixed(2)}`
              )}
            </button>

            {/* Security Notice */}
            <p className="text-xs text-gray-500 mt-4 text-center">
              🔒 Your payment information is secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;