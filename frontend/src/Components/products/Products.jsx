import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import route from '../route';
import './Products.scss';
import { Link, useParams } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

const Products = ({ setUsername, setRole, setLoggedIn }) => {
  const {category}=useParams();
  const value=localStorage.getItem("Auth")
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  },[]);
  const fetchProducts = async () => {
    try {
      const {status,data}=await axios.get(`${route()}products/${category}`,{headers:{"Authorization":`Bearer ${value}`}})
      if(status){
        setUsername(data.username);
        setRole(data.role);
        setLoggedIn(true);
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  return (
    <div className="productss-container">
      {products && products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} className="product-card">
            {product.pimages && product.pimages.length > 0 && (
              <div className="product-images mt-3 ml-3">
          <div className="image-gallery">
            {product.pimages && product.pimages.length > 0 ? (
              <>
                <div className="main-image">
                  <img id='img' src={product.pimages[0]} alt="Main Product" className="main-product-image" />
                </div>
                
              </>
            ) : (
              <p>No images available</p>
            )}
          </div>
        </div>
            )}
            <div className="bottom">
              <div className="left">
             
                <div className="product-info">
                  <strong>Category: </strong> <span className='product-category'> {product.category.toUpperCase()}</span>
                </div>

                <div className="product-info">
                  <strong>Product Name: </strong> <span className='product-name'> {product.pname}</span>
                </div>

              
                <div className="product-info">
                  <strong>Brand:</strong>{product.brand}
                </div>

              
                <div className="product-info">
                  <strong>Price:</strong><span className='product-price'>₹{product.price.toFixed(2)}</span> 
                </div>
              </div>
              <div className="right">
             
                  <strong>Sizes:</strong>
                  <div className="size-quantities">
                    {Object.keys(product.sizeQuantities).map((size) => (
                      <div key={size} className="size-quantity">
                        <strong>{size} : {product.sizeQuantities[size]}</strong>
                      </div>
                    ))}
                </div>
              </div>
              <Link to={`/editproduct/${product._id}`}>
                <button className="edit-btn">
                  <FaEdit className="edit-icon"/>
                  Edit
                </button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default Products;
