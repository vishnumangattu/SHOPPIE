import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBuilding, FaMapMarkerAlt, FaEdit, FaPlus } from 'react-icons/fa';
import route from "../route";
import './Company.scss';
import { Link } from 'react-router-dom';

const Company = ({setUsername, setRole, setLoggedIn }) => {
  const value = localStorage.getItem("Auth");
  // Managing state for company name, location, categories, and product form
  const [company, setCompany] = useState({
    name: "",
    location: "",
    gstin:"",
    contact:""
  });
  const [categories, setCategories] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  
  useEffect(() => {
    getEssentials();
  }, []);

  const getEssentials = async () => {
    try {
      const { status, data } = await axios.get(`${route()}company`, { headers: { "Authorization": `Bearer ${value}` } });
      if (status === 200) {
        setUsername(data.username);
        setRole(data.role);
        setLoggedIn(true);
        if (data.company) setCompany(data.company);
        if (data.category && data.category.length > 0) setCategories(data.category[0].categories);
      }
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleEditClick = () => {
    setIsEditable(true);
  };
  const handleSave = async () => {
    if (isEditable) {
      const { status, data } = await axios.post(`${route()}editcompany`, company, { headers: { "Authorization": `Bearer ${value}` } });
      if (status === 201) {
        alert(data.msg);
      } else {
        alert("error");
      }
      setIsEditable(false);
    } else {
      setIsEditable(false);
    }
  };

  return (
    <div className="company-details">
      <div className="company-info">
  <div className="company-photo">
    <FaBuilding size={80} />
  </div>
  <div className="comp">
    {/* Company Name */}
    <div className="company-name">
      <label>Company Name:</label>
      
        <input 
          type="text" 
          value={company.name} 
          name="name"
          onChange={handleChange} 
          disabled={!isEditable}
          className="editable-input"
        />
    </div>

    {/* Company Location */}
    <div className="company-location">
      <label>Location:</label>
        <input 
          type="text" 
          name="location"
          value={company.location} 
          onChange={handleChange} 
          disabled={!isEditable}
          className="editable-input"
        />
    </div>

    {/* Key Executives */}
    <div className="company-gstin">
      <label>GSTIN:</label>
        <input 
          type="text" 
          name="gstin"
          value={company.gstin} 
          onChange={handleChange} 
          disabled={!isEditable}
          className="editable-input"
        />
    </div>
    
    {/* Contact Information */}
    <div className="company-contact">
      <label>Contact:</label>
        <input 
          type="text" 
          name="contact"
          value={company.contact} 
          onChange={handleChange} 
          disabled={!isEditable}
          className="editable-input"
        />
    </div>

  </div>

  {/* Edit and Save Buttons */}
  {!isEditable && <button className="edit-btn" onClick={handleEditClick}> Edit</button>}
  {isEditable && <button className="save-btn" onClick={handleSave}>Save</button>}
</div>


      <div className="company-categories">
        <div className="header flex justify-between">
        <div><h3>Categories</h3></div>
        {/* Add Product Button */}
        <div>
          <Link to={'/orders'}><h3 className=''> orders confirmation</h3>
                    </Link>
        </div>
        <div> Product<Link to={'/addproduct'} className="add-product-link">
          <button className="add-product-btn ml-2" >
           <FaPlus />
          </button>
        </Link></div>
        </div>
        <ul>
          {categories.map((category, index) => (
                <Link to={`/products/${encodeURIComponent(category)}`}key={index}>
              <li >{category}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Company;
