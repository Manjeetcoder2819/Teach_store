import React from 'react';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';
import './CartModal.css';

const CartModal = ({
  cart,
  setIsCartOpen,
  updateQuantity,
  removeFromCart,
  getTotalPrice,
  getTotalItems,
  setCurrentView,
}) => {
  return (
    <div className="cart-modal-overlay">
      <div className="cart-modal">
        <div className="cart-header">
          <h2>Shopping Cart ({getTotalItems()})</h2>
          <button onClick={() => setIsCartOpen(false)} className="close-btn">
            <X size={24} />
          </button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <ShoppingCart size={64} className="empty-icon" />
              <p>Your cart is empty</p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setCurrentView('products');
                }}
                className="primary-btn"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>${item.price}</p>
                  </div>
                  <div className="item-quantity">
                    <button onClick={() => updateQuantity(item.id, Math.max(item.quantity - 1, 1))}>
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="item-price">
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                    <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total: ${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="cart-actions">
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="secondary-btn"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setCurrentView('checkout');
                    }}
                    className="primary-btn"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
