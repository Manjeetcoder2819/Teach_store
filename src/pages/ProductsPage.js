import './ProductsPage.css';
// ProductsPage.js
import React from 'react';
import ProductCard from '../components/ProductCard';
import { Filter } from 'lucide-react';
import './ProductsPage.css';

const ProductsPage = ({
  products,
  searchTerm,
  selectedCategory,
  setSelectedCategory,
  addToCart,
  toggleWishlist,
  wishlist
}) => {
  const categories = ['All', 'Electronics', 'Fashion'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="products-container">
      {/* Header */}
      <div className="products-header">
        <h1>Our Products</h1>
        <p>
          Showing {filteredProducts.length} of {products.length} products
          {searchTerm && ` for "${searchTerm}"`}
        </p>
      </div>

      {/* Filters */}
      <div className="filter-box">
        <div className="filter-controls">
          <Filter size={20} className="filter-icon" />
          <span className="filter-label">Filter by category:</span>
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'active-filter' : 'filter-button'}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <div className="emoji">🔍</div>
          <h2>No products found</h2>
          <p>
            {searchTerm
              ? `No products match your search for "${searchTerm}"`
              : `No products in the ${selectedCategory} category`}
          </p>
          <button
            onClick={() => setSelectedCategory('All')}
            className="view-all-button"
          >
            View All Products
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
            />
          ))}
        </div>
      )}

      {/* Load More */}
      {filteredProducts.length > 0 && (
        <div className="load-more">
          <button>Load More Products</button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
