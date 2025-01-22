import React, { useEffect, useState } from 'react';
import route from '../route';
import axios from 'axios';
import './Home.scss';
import { Link } from 'react-router-dom';

const Home = ({ setUsername, setRole, setLoggedIn }) => {
  const value = localStorage.getItem('Auth');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getDetails();
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter products based on the search query
    if (query.trim() === '') {
      // If search query is empty, display all products
      setFilteredProducts(products);
    } else {
      // Filter products by name (case-insensitive)
      const filtered = products.filter(product =>
        product.pname.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const getDetails = async () => {
    try {
      if (value !== null) {
        const res = await axios.get(`${route()}home`, {
          headers: { "Authorization": `Bearer ${value}` }
        });
        if (res.status === 200) {
          setUsername(res.data.username);
          setRole(res.data.role);
          setLoggedIn(true);
          setProducts(res.data.products);
          setFilteredProducts(res.data.products); // Initially set all products as filtered
        } else if (res.status === 403) {
          setLoggedIn(false);
        }
      }
    } catch (error) {
      console.log("Error fetching product details:", error);
    }
  };

  return (
    <div className='home bg-slate-200 h-screen'>
      
      <input
        className="input"
        name="text"
        placeholder="Search Products.."
        type="search"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className="products-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <div className="men-card">
                <div className="image">
                  <img src={product.pimages[0]} alt={product.pname} />
                </div>
                <div className="content">
                  <span className="product-name">{product.category.toUpperCase()}</span><br />
                  <span className="product-name">{product.pname.substring(0, 16)}</span><br />
                  <span className="price">₹{product.price}</span><br />
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
