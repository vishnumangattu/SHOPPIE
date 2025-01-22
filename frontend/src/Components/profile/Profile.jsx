import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import route from "../route";
import './Profile.scss';

const Profile = ({setUsername,setRole,loggedIn,role,setLoggedIn}) => {
  const value=localStorage.getItem('Auth');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddresses, setIsEditingAddresses] = useState(false);
   const [isSeller, setIsSeller] = useState(false); 
  const [addresses, setAddresses] = useState([]);
  const [profile, setProfile] = useState({});
  const [countCart,setCountCart]=useState(0);
  const [countWishlist,setCountWishlist]=useState(0);
  const [countOrders,setCountOrders]=useState(0);
  const navigate=useNavigate();
  useEffect(()=>{
    getEssentials();
  },[])

  useEffect(() => {
    if (role === "seller") {
      setIsSeller(true);
    }
  }, [role]);

  const getEssentials=async()=>{
    try {
      
      const {status,data}=await axios.get(`${route()}profile`,{headers:{"Authorization":`Bearer ${value}`}});
      if (status==200) {
        setUsername(data.username);
        setRole(data.role);
        setLoggedIn(true);
        if(data.profile)
          setProfile({...data.profile});
        if(data.address)
          setAddresses(data.address.addresses);
        setCountCart(data.cart);
        setCountWishlist(data.wishlist);
        setCountOrders(data.orders)
      }
    }
     catch (error) {
      console.log("error");
    }
  }
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmitProfile=async()=>{
    if(isEditingProfile){
      const {status,data}=await axios.post(`${route()}edituser`,profile,{headers:{"Authorization":`Bearer ${value}`}});
      if (status===201) {
        alert(data.msg)
      }else{
        alert("error")
      }
      setIsEditingProfile(!isEditingProfile);
    }
    else{
      setIsEditingProfile(!isEditingProfile);
    }
  }
  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAddresses = [...addresses];
    updatedAddresses[index] = {
      ...updatedAddresses[index],
      [name]: value,
    };
    setAddresses(updatedAddresses);
  };

  const handleAddAddress = () => {
    setAddresses([
      { houseNumber: "", houseName: "", place: "", pincode: "", postOffice: "",city:"",phone:"",name:"" },
      ...addresses,
      
    ]);
  };
  const handleSubmitAddress=async()=>{
    if(isEditingAddresses){
      const {status,data}=await axios.post(`${route()}editaddress`,addresses,{headers:{"Authorization":`Bearer ${value}`}});
      if (status===201) {
        alert(data.msg)
      }else{
        alert("error")
      }
      setIsEditingAddresses(!isEditingAddresses);
    }
    else{
      setIsEditingAddresses(!isEditingAddresses);
    }
  }
  return (
    <div className="profile-container">
      {/* Profile Section */}
      <div className="profile-header">
        {/* <h1>User Details</h1>
        <div className="profile-pic">
         <img src="./images/profile.png"  alt="" />
        </div> */}
       
            <div className="flex items-center mb-4">
              <div className="mr-5">{isSeller && (
              <Link to={'/company'}>
                <button className="seller-btn">
                  Seller
                </button>
              </Link>
            )}</div>
          <img
            className="h-12 w-12 rounded-full"
            src="./images/profile.png"
            alt="Profile"
          />
          <div className="ml-1 px-6">
            <div className="text-gray-600">Hello,</div>
            <div className="text-xl font-semibold">{profile.fname==""?"Flipkart Customer":(profile.fname+" " +profile.lname)}</div>
          </div>
        </div>
        
        <div className="profile-info">
          <div className="input-container">
          <div>
                <label className="block text-gray-700"> first Name</label>
                <input
                  type="text"
                  name="fname"
                  value={profile.fname}
                  onChange={handleProfileChange}
                  disabled={!isEditingProfile}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700"> last Name</label>
                <input
                  type="text"
                  name="lname"
                  value={profile.lname}
                  onChange={handleProfileChange}
                  disabled={!isEditingProfile}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  disabled={!isEditingProfile}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="text"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  disabled={!isEditingProfile}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
          </div>


          <div className="gender">
              <label>
              Gender:
              </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={profile.gender === "male"}
                onChange={handleProfileChange}
                disabled={!isEditingProfile}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={profile.gender === "female"}
                onChange={handleProfileChange}
                disabled={!isEditingProfile}
              />
              Female
            </label>
          </div>
          <button onClick={handleSubmitProfile} className="savedit">
            {isEditingProfile ? "Save Profile" : "Edit Profile"}
          </button>
        </div>
        <div className=" flex items-center text-red-600 cursor-pointer ">
            
            <button onClick={()=>{
              localStorage.removeItem('Auth');
              navigate('/');
              setLoggedIn(!loggedIn);
  }} className="log-out-btn"><div className="flex"><svg
  className="h-6 w-6"
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"
  />
</svg><p>Logout</p></div></button>
          </div>
      </div>

      {/* Addresses Section */}
      <div className="address-section">
        <div className="navHeader">
          <div className="head">
            <Link to={'/mywishlist'}>My Wishlist
            <div className="count">{countWishlist}</div></Link>
          </div>
          <div className="border"></div>
          <div className="head">
          <Link to={'/myorders'}>MY Orders
          <div className="count">{countOrders}</div></Link>
          </div>
          <div className="border"></div>
          <div className="head">
            <Link to={'/cart'}>My Cart
            <div className="count">{countCart}</div></Link>
          </div>
        </div>
        
        <div className="mt-6">
              <button
                onClick={handleAddAddress}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
              >
                + Add Address
              </button>
            </div>
        {addresses.map((address, index) => (
  // <div key={index} className="address-container">
  //   <input
  //     type="text"
  //     name="houseName"
  //     placeholder="House Name"
  //     value={address.houseName}
  //     onChange={(e) => handleAddressChange(index, e)}
  //     disabled={!isEditingAddresses}
  //     className="hname"
  //   />
  //   <input
  //     type="text"
  //     name="place"
  //     placeholder="Place"
  //     value={address.place}
  //     onChange={(e) => handleAddressChange(index, e)}
  //     disabled={!isEditingAddresses}
  //     className="address-input"
  //   />
  //   <input
  //     type="text"
  //     name="pincode"
  //     placeholder="Pincode"
  //     value={address.pincode}
  //     onChange={(e) => handleAddressChange(index, e)}
  //     disabled={!isEditingAddresses}
  //     className="address-input"
  //   />
  //   <input
  //     type="text"
  //     name="postOffice"
  //     placeholder="Post Office"
  //     value={address.postOffice}
  //     onChange={(e) => handleAddressChange(index, e)}
  //     disabled={!isEditingAddresses}
  //     className="address-input"
  //   />
  //   <input
  //     type="text"
  //     name="landmark"
  //     placeholder="Landmark"
  //     value={address.landmark}
  //     onChange={(e) => handleAddressChange(index, e)}
  //     disabled={!isEditingAddresses}
  //     className="address-input"
  //   />
  //   <div className="adrbut">
      
  //   <button onClick={handleSubmitAddress} className="address-button">
  //     {isEditingAddresses ? "Save Address" : "Edit Address"}
  //   </button>
  //   </div>
  // </div>
  <div className="border p-6 rounded-lg shadow space-y-4">
          
                  <div className="text-blue-600 font-medium"> NEW ADDRESS</div>
                  
                  
                  {/* Input Fields */}
                  <div className="space-y-4">
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                          type="text"
                              name="name"
                              placeholder="Name"
                              value={address.name}
                              onChange={(e) => handleAddressChange(index, e)}
                              disabled={!isEditingAddresses}
                          className="w-full border border-gray-300 p-2 rounded"
                          required
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">10-digit mobile number</label>
                        <input
                          type="text"
                          name="phone"
                          value={address.phone}
                              onChange={(e) => handleAddressChange(index, e)}
                              disabled={!isEditingAddresses}
                          className="w-full border border-gray-300 p-2 rounded"
                          required
                          maxLength="10"
                        />
                      </div>
                    </div>
                    
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">Pincode</label>
                        <input
                          type="text"
                          name="pincode"
                          value={address.pincode}
                              onChange={(e) => handleAddressChange(index, e)}
                              disabled={!isEditingAddresses}
                          className="w-full border border-gray-300 p-2 rounded"
                          required
                          maxLength="6"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">Post Office</label>
                        <input
                          type="text"
                          name="postOffice"
                          value={address.postOffice}
                              onChange={(e) => handleAddressChange(index, e)}
                              disabled={!isEditingAddresses}
                          className="w-full border border-gray-300 p-2 rounded"
                          required
                        />
                      </div>
                    </div>
        
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Address (Area and Street)</label>
                      <textarea
                        name="houseName"
                        rows="4"
                        value={address.houseName}
                              onChange={(e) => handleAddressChange(index, e)}
                              disabled={!isEditingAddresses}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                      ></textarea>
                    </div>
        
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">City/District/Town</label>
                        <input
                          type="text"
                          name="city"
                          value={address.city}
                              onChange={(e) => handleAddressChange(index, e)}
                              disabled={!isEditingAddresses}
                          className="w-full border border-gray-300 p-2 rounded"
                          required
                        />
                      </div>
                      
                    </div>
        
                  
                  </div>
                  
                  
                  
                  {/* Buttons */}
                  <div className="flex justify-end space-x-4 mt-4">
                  <button onClick={handleSubmitAddress} className="address-button">
                   {isEditingAddresses ? "Save Address" : "Edit Address"}
                  </button>
                  </div>
              </div>
))}

      </div>
    </div>
  );
};

export default Profile;
