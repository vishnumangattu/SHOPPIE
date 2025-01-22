import React, { useEffect, useState } from 'react';
import route from '../route';  // Ensure that the route function is configured correctly
import axios from 'axios';
import './Orders.scss';  // Create a similar stylesheet as Wishlist.scss
import { Link } from 'react-router-dom';

const Orders = ({ setUsername, setRole, setLoggedIn }) => {
  const value = localStorage.getItem('Auth');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      if (value !== null) {
        const res = await axios.get(`${route()}getorders`, {
          headers: { "Authorization": `Bearer ${value}` }
        });
        if (res.status === 200) {
          setUsername(res.data.username);
          setRole(res.data.role);
          setLoggedIn(true);
          setOrders(res.data.orders); 
        } 
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className='Orders'>
      <h1 className="orders-heading">My Purchase ...</h1>
      <div className="orders-container">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="order-card">
              <Link to={`/product/${order.product._id}`}>
              <div>
                 <div className="men-card">
               <div className="image">
                 <img src={order.product.pimages[0]} alt=""/>
               </div>
               <div className="content">
               <span className="product-name">{order.product.category.toUpperCase()}</span><br/>
                  <span className="product-name">{order.product.pname.substring(0,16)}</span><br/>
                  {/* <span className="price">₹{product.price}</span><br/> */}
                 
               </div>
               
             </div>
             </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No orders available</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
