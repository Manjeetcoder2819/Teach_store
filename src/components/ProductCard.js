import React from 'react';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product, addToCart, toggleWishlist, wishlist }) => {
  const isInWishlist = wishlist.some(item => item.id === product.id);

  return (
    <div className="product-card">
      <div className="image-container">
        <img src={product.image} alt={product.name} className="product-image" />

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
        >
          <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
        </button>

        {/* Sale Badge */}
        {product.originalPrice > product.price && (
          <div className="sale-badge">SALE</div>
        )}
      </div>

      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        {/* Rating */}
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
              />
            ))}
          </div>
          <span className="reviews">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="product-price">
          <span className="price">${product.price}</span>
          {product.originalPrice > product.price && (
            <span className="original-price">${product.originalPrice}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
          <ShoppingCart size={20} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
