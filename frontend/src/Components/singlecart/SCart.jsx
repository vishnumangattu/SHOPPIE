import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import route from '../route';
import axios from 'axios';
import './SCart.scss';
import { FiMinus, FiPlus } from 'react-icons/fi';

const SCart = ({ setUsername, setRole, setLoggedIn }) => {
    const navigate=useNavigate();
    const { pid } = useParams();
    const value = localStorage.getItem('Auth');
    const [cartItem, setCartItem] = useState(null); // Set to null initially to check if the cart is empty
    const [quantity, setQuantity] = useState(0); // Holds quantities of items
    const [priceTotal, setPriceTotal] = useState(0); // Holds the total price
    const [addresses,setAddresses]=useState([])
    const [selectedAddress, setSelectedAddress] = useState("");

    // Fetch cart data from localStorage on component mount
    useEffect(() => {
        getCart();
    }, []);

    const getCart = async () => {
        const { status, data } = await axios.get(`${route()}getsinglecart/${pid}`, { headers: { "Authorization": `Bearer ${value}` } });
        if (status === 200) {
            setUsername(data.username);
            setRole(data.role);
            setLoggedIn(true);
            setCartItem(data.cart);
            setQuantity(data.cart.quantity);
            setPriceTotal(data.cart.product.price * data.cart.quantity);
            setAddresses(data.addresses.addresses)
        }
    };

    const handleQuantityChange = async(id, type) => {
        const {status,data}=await axios.post(`${route()}editquantity`,{id,quantity,type},{headers:{"Authorization":`Bearer ${value}`}});
        if(status==201){
          getCart();
        }
    };

    const handleCart = async () => {
        const { status, data } = await axios.post(`${route()}buynow`, { id: pid }, { headers: { "Authorization": `Bearer ${value}` } });
        if (status === 201) {
            // alert(data.msg);
            if(data.msg=="success")
                navigate('/purchasecompleted')
        }
    };
    
    return (
        <div className="cart-container">
            {!cartItem ? (
                <div className="empty-cart">
                    <h2>No such product</h2>
                    <Link to={'/home'}>Go to homepage</Link>
                </div>
            ) : (
                <div className="cart">
                    <div id="carts" className="cart-items">
                        <div  className="cart-item">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Title</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={cartItem._id}>
                                        <td>
                                            <div className="image">
                                                <Link to={`/product/${cartItem.product._id}`}>
                                                    <img
                                                        src={cartItem.product.pimages[0]}
                                                        alt={cartItem.product.pname}
                                                        title="View product"
                                                    />
                                                </Link>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="content2">
                                                <h4>{cartItem.product.pname}</h4>
                                            </div>
                                        </td>
                                        <td >
                                            <div className="content1">
                                                <h3>₹{cartItem.product.price}</h3>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="quantity">
                                                <span
                                                    className="decrease"
                                                    onClick={() => handleQuantityChange(cartItem._id, 'decrease')}
                                                >
                                                    <FiMinus size={24} />
                                                </span>
                                                <span className="quantity-text">{quantity}</span>
                                                <span
                                                    className="increase"
                                                    onClick={() => handleQuantityChange(cartItem._id, 'increase')}
                                                >
                                                    <FiPlus size={24} />
                                                </span>
                                            </div>
                                        </td>
                                        <td >
                                            <div className="price">
                                                <h3>₹{cartItem.product.price * quantity}</h3>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="cart-summary">
                        <div className="summary-details">
                            <h2>Payment Details</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{cartItem.product.pname}</td>
                                        <td>{quantity}</td>
                                        <td>₹{cartItem.product.price * quantity}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="payment-details">
                            <div className="details">
                            <p className="total-price">Total Price: ₹{priceTotal.toFixed(2)}</p>
                                <p className="discount">Discount: 20%</p>
                                <p>Delivery Charge: ₹50</p>
                               
                                <p className="total-amount">Total Amount: ₹{((priceTotal - (priceTotal * 0.2)) + 50).toFixed(2)}</p>
                            </div>
                             {/* Address Select Dropdown */}
                            <div className="address-select">
                                <h4>Select Address</h4>
                                <select
                                    value={selectedAddress}
                                    onChange={(e) => setSelectedAddress(e.target.value)}
                                >
                                    <option value="">Select Address</option>
                                    {addresses.map((address, index) => (
                                        <option key={index} value={address._id}>
                                            {address.houseName}, {address.pincode}, {address.postOffice}, {address.place}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="payment-button">
                                <button onClick={handleCart}>Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SCart;
