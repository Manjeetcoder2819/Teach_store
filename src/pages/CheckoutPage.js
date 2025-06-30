
import React, { useState } from 'react';
import { CreditCard, Package, Check, ArrowLeft } from 'lucide-react';
import './CheckoutPage.css';

const CheckoutPage = ({ 
  cart, 
  getTotalPrice, 
  setCurrentView 
}) => {
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
      <div className="checkout-empty">
        <Package size={64} className="empty-icon" />
        <h2>Your cart is empty</h2>
        <p>Add some products to your cart before checking out</p>
        <button
          onClick={() => setCurrentView('products')}
          className="primary-btn"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (orderCompleted) {
    return (
      <div className="checkout-success">
        <div className="success-icon">
          <Check size={48} />
        </div>
        <h1>Order Confirmed!</h1>
        <p>Thank you for your purchase. Your order has been successfully placed.</p>
        <div className="order-summary-card">
          <h3>Order Summary</h3>
          <p>Order #: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          <p>Total: ${total.toFixed(2)}</p>
          <p>Items: {cart.length}</p>
        </div>
        <button
          onClick={() => setCurrentView('home')}
          className="primary-btn"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <button
          onClick={() => setCurrentView('home')}
          className="back-btn"
        >
          <ArrowLeft size={20} />
          Back to Store
        </button>
      </div>

      <h1 className="checkout-title">Checkout</h1>
      
      <div className="checkout-content">
        {/* Checkout Form */}
        <div className="checkout-form">
          {/* Shipping Information */}
          <div className="form-section">
            <h2 className="section-title">
              <Package size={24} />
              Shipping Information
            </h2>
            <div className="form-fields">
              <div className="form-row">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input full-width"
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleInputChange}
                className="form-input full-width"
                required
              />
              <div className="form-row-three">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Payment Information */}
          <div className="form-section">
            <h2 className="section-title">
              <CreditCard size={24} />
              Payment Information
            </h2>
            <div className="form-fields">
              <input
                type="text"
                name="cardName"
                placeholder="Cardholder Name"
                value={formData.cardName}
                onChange={handleInputChange}
                className="form-input full-width"
                required
              />
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className="form-input full-width"
                required
              />
              <div className="form-row">
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <div className="summary-card">
            <h2>Order Summary</h2>
            
            {/* Cart Items */}
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item-summary">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="item-image-small" 
                  />
                  <div className="item-details-summary">
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <span className="item-price-summary">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="price-breakdown">
              <div className="price-row">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="price-row">
                <span>Shipping:</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="price-row">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="price-row total-row">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handleSubmit}
              disabled={isProcessing}
              className={`place-order-btn ${isProcessing ? 'processing' : ''}`}
            >
              {isProcessing ? (
                <div className="processing-content">
                  <div className="spinner"></div>
                  Processing...
                </div>
              ) : (
                `Place Order - $${total.toFixed(2)}`
              )}
            </button>

            {/* Security Notice */}
            <p className="security-notice">
              🔒 Your payment information is secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;