import React from 'react';
import ProductCard from '../components/ProductCard';
import { Truck, Shield, Headphones } from 'lucide-react';
import './HomePage.css';

const HomePage = ({
  products,
  addToCart,
  toggleWishlist,
  wishlist,
  setCurrentView,
}) => {
  const featuredProducts = products.slice(0, 3);
  const saleProducts = products.filter((p) => p.originalPrice > p.price);

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to TechStore</h1>
          <p className="hero-subtitle">Discover amazing products at unbeatable prices</p>
          <button onClick={() => setCurrentView('products')} className="hero-button">
            Shop Now
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon truck">
              <Truck size={32} />
            </div>
            <h3>Free Shipping</h3>
            <p>Free shipping on orders over $50</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon shield">
              <Shield size={32} />
            </div>
            <h3>Secure Payment</h3>
            <p>Your payment information is safe</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon support">
              <Headphones size={32} />
            </div>
            <h3>24/7 Support</h3>
            <p>Get help whenever you need it</p>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="featured-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <p>Check out our most popular items</p>
        </div>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
            />
          ))}
        </div>
        <div className="view-all-btn">
          <button onClick={() => setCurrentView('products')}>
            View All Products
          </button>
        </div>
      </div>

      {/* Sale Section */}
      {saleProducts.length > 0 && (
        <div className="sale-section">
          <div className="section-header white">
            <h2>🔥 Hot Deals</h2>
            <p>Limited time offers - Don't miss out!</p>
          </div>
          <div className="products-grid">
            {saleProducts.slice(0, 3).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                toggleWishlist={toggleWishlist}
                wishlist={wishlist}
              />
            ))}
          </div>
        </div>
      )}

      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="newsletter-content">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for exclusive deals and new product updates</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
