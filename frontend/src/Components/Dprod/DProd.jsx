import React, { useState, useEffect } from 'react';
import axios from 'axios';
import route from '../route';
import './DProd.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaShoppingCart, FaCreditCard, FaStar } from 'react-icons/fa';

const DProd = ({ setUsername, setRole, setLoggedIn }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const value = localStorage.getItem('Auth');
  const [product, setProduct] = useState({});
  const [isOnCart, setIsOnCart] = useState(false);
  const [isOnWishlist, setIsOnWishlist] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [cart, setCart] = useState({
    product: {},
    size: "",
    quantity: 0
  });

  useEffect(() => {
    fetchProduct();
  }, [id, value, setUsername, setRole, setLoggedIn]);

  const fetchProduct = async () => {
    if (!id) return;
    try {
      const { status, data } = await axios.get(`${route()}product/${id}`, {
        headers: { Authorization: `Bearer ${value}` },
      });

      if (status === 200) {
        setUsername(data.username);
        setRole(data.role);
        setLoggedIn(true);
        setProduct(data.product);
        setIsOnCart(data.isOnCart);
        setIsOnWishlist(data.isOnWishlist);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleSize = (size) => {
    setSelectedSize(size);
    setCart({ size: size, product: product, quantity: 1 });
  };

  const handleAddToCart = async () => {
    if (cart.size) {
      const { status, data } = await axios.post(`${route()}addtocart`, cart, {
        headers: { "Authorization": `Bearer ${value}` }
      });
      if (status === 201) {
        alert(data.msg);
        fetchProduct();
      } else {
        alert("Adding incomplete");
      }
    } else {
      alert("Please select size");
    }
  };

  const addToWishlist = async (id) => {
    const { status, data } = await axios.post(`${route()}addtowishlist`, { id }, {
      headers: { "Authorization": `Bearer ${value}` }
    });
    if (status === 201) {
      // alert("Wishlist added");
      fetchProduct();
    } else {
      // alert("Failed");
    }
  };

  const removeFromWishlist = async (id) => {
    const { status, data } = await axios.delete(`${route()}removefromwishlist`, {
      data: { id },
      headers: { "Authorization": `Bearer ${value}` }
    });
    if (status === 201) {
      // alert("Removed from wishlist");
      fetchProduct();
    } else {
      // alert("Failed");
    }
  };

  const handleBuynow = async () => {
    if (cart.size) {
      const { status, data } = await axios.post(`${route()}addtocart`, cart, {
        headers: { "Authorization": `Bearer ${value}` }
      });
      if (status === 201) {
        alert(data.msg);
        navigate(`/scart/${product._id}`);
      } else {
        alert("Could not add to cart");
      }
    } else {
      alert("Please select size");
    }
  };

  return (
    <div className="product-page">
      <div className="product-container">
        {/* Product Images */}
        <div className="product-images">
          <div className="image-gallery">
            {product.pimages && product.pimages.length > 0 ? (
              <>
                <div className="main-image">
                  <img id='img' src={product.pimages[0]} alt="Main Product" className="main-product-image" />
                </div>
                <div className="thumbnails">
                  {product.pimages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Product Image ${index + 1}`}
                      onMouseOver={() => { document.getElementById("img").src = product.pimages[index]; }}
                      className="thumbnail"
                    />
                  ))}
                </div>
              </>
            ) : (
              <p>No images available</p>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="product-details">
          <div className='flex w-full justify-between '>
          <div className="product-title">
              <h1>{product.pname}</h1>
            </div>
          {!isOnCart && (isOnWishlist ?
              <img className='mr-6' src="/images/liked.png" alt="Wishlist" onClick={() => { removeFromWishlist(product._id) }} /> :
              <img  className='mr-6' src="/images/wlist.png" alt="Wishlist" onClick={() => { addToWishlist(product._id) }} />
            )}
          </div>
            
            <div className="product-category">
              <strong>{product.category?.toUpperCase()}</strong>
            </div>
            <div className="product-brand">
              <strong>Brand:</strong> {product.brand}
            </div>
            <div className="product-price">
              <strong>Price:</strong>
              <span>₹{product.price?.toFixed(2)}</span>
            </div>
            <h4 className='offer'>Available offers</h4>
        <p >Bank OfferGet 10% off upto ₹50 on first Shoppie UPI transaction on order of ₹250 and aboveT&C</p>


            {/* Size Options */}
            <div className="size-options">
              <strong>Select Size:</strong>
              <div className="size-choices">
                {product.sizeQuantities &&
                  Object.keys(product.sizeQuantities).map((size) => (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => handleSize(size)}
                      disabled={product.sizeQuantities[size] <= 0}
                    >
                      {size}
                    </button>
                  ))}
              </div>
            </div>
            
  
            {/* Buy Options */}
            <div className="buy-options">
              {isOnCart ? (
                <Link to={`/scart/${product._id}`}>
                  <button className="buy-btn">
                    <FaCreditCard className="icon" />
                    Buy Now
                  </button>
                </Link>
              ) : (
                <button className="buy-btn" onClick={handleBuynow}>
                  <FaCreditCard className="icon" />
                  Buy Now
                </button>
              )}
              {isOnCart ? (
                <Link to={'/cart'}>
                  <button className="cart-btn">
                    <FaShoppingCart className="icon" />
                    Go to Cart
                  </button>
                </Link>
              ) : (
                <button className="cart-btn" onClick={handleAddToCart}>
                  <FaShoppingCart className="icon" />
                  Add to Cart
                </button>
              )}
            </div>

           
        </div>
      </div>

    </div>
  );
};

export default DProd;
