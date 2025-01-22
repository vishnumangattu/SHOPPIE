import React, { useEffect, useState } from 'react';
import route from '../route';  // Ensure that the route function is configured correctly
import axios from 'axios';
import './sellorder.scss';  // Create a similar stylesheet as Wishlist.scss
import { Link } from 'react-router-dom';

const Sellorder = ({ setUsername, setRole, setLoggedIn }) => {
  const value = localStorage.getItem('Auth');
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('pending'); // Initial filter is "pending"

  // Fetch orders based on the selected status
  useEffect(() => {
    getDetails(statusFilter);
  }, [statusFilter]);

  const getDetails = async (status) => {
    try {
      if (value !== null) {
        const res = await axios.get(`${route()}getsellorders`, {
          headers: { "Authorization": `Bearer ${value}` }
        });
        if (res.status === 200) {
          setUsername(res.data.username);
          setRole(res.data.role);
          setLoggedIn(true);
          // Filter orders by status
          const filteredOrders = res.data.orders.filter(order => order.status === status);
          setOrders(filteredOrders); // Update the state with the filtered orders
        }
      }
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  // Handle status filter change
  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value); // Update the filter based on dropdown selection
  };

  // Update the status of an order (Approve or Reject)
  const updateOrderStatus = async (buyerId,orderId, newStatus) => {
    try {
      const res = await axios.post(
        `${route()}updateorderstatus`,
        { 
          id:orderId,
          status: newStatus,
          buyerId:buyerId
         },
        {
          headers: {
            "Authorization": `Bearer ${value}`,
            "Content-Type": "application/json",
          }
        }
      );
      if (res.status === 201) {
        alert(res.data.msg)
        // After the status is updated, fetch the new data
        getDetails(statusFilter);  // Re-fetch the orders to reflect the update
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className='Orders'>
      <h1 className="orders-heading">Orders</h1>

      {/* Dropdown for status filter */}
      <div className="filter-container">
        <label htmlFor="statusFilter" className="filter-label">Choose:</label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={handleStatusChange}
          className="filter-dropdown"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Orders list */}
      <div className="orders-container">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="men-card">
                <div className="image">
                  <img src={order.product.pimages[0]} alt="" />
                </div>
                <div className="content">
                  <span className="product-name">{order.product.category.toUpperCase()}</span><br />
                  <span className="product-name">{order.product.pname.substring(0, 16)}</span><br />
                  <span className="product-names">SIZE: {order.size}</span><br />
                  {order.status === 'pending' && (
                    <>
                  <button
                    className='newbutton1'
                    onClick={() => updateOrderStatus(order.buyerId,order._id, 'approved')}  // Approve the order
                  >
                    APPROVE
                  </button>
                  <button
                    className='newbutton2'
                    onClick={() => updateOrderStatus(order.buyerId,order._id, 'rejected')}  // Reject the order
                  >
                    REJECT
                  </button>
                  </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No orders available for the selected status</p>
        )}
      </div>
    </div>
  );
};

export default Sellorder;
