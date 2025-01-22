import React, { useState,useEffect } from 'react';
import axios from 'axios';
import route from '../route';
import './EditProduct.scss';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = ({setUsername, setRole, setLoggedIn }) => {
    const {_id}=useParams();
    const navigate=useNavigate();
    const value=localStorage.getItem("Auth")
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState([]); 
  const [product, setProduct] = useState({});
  const [isAddCategory,setAddCategory]=useState(false)
  const handleCategoryChange = (e) => {
    setProduct({category:e.target.value});
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const { status, data } = await axios.get(`${route()}getproduct/${_id}`, { headers: { "Authorization": `Bearer ${value}` } });
      if (status === 200) {
        setUsername(data.username)
        setRole(data.role);
        setLoggedIn(true);
        setProduct(data.product);
        if (data.category.length > 0) 
            setCategories(data.category[0].categories);
      }
    } catch (error) {
      console.log("error");
    }
  };
  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleAddCategory =async () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory]);
      setCategory(newCategory);  
      const {status,data}=await axios.post(`${route()}editcategory`,{newCategory},{headers:{"Authorization":`Bearer ${value}`}});
      if (status===201) {
        alert(data.msg);
        setAddCategory(!isAddCategory);
        getEssentials();
      }else{
        alert("error")
      }
      setNewCategory('');
    }
  };
  const handleSizeQuantityChange = (size, e) => {
    setProduct({
      ...product,
      sizeQuantities: {
        ...product.sizeQuantities,
        [size]: parseInt(e.target.value, 10) || 0,
      },
    });
  };
  const handleProductDetailChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    let arr=[]
    Object.values(e.target.files).map(async(p)=>{
      const photo=await convertToBase64(p)
      arr.push(photo)
    });
    setProduct({
      ...product,
      pimages: arr,
    });
  };
    function convertToBase64(file) {
        return new Promise((resolve,reject)=>{
            const fileReader=new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload=()=>{
                resolve(fileReader.result)
            }
            fileReader.onerror= (error)=>{
                reject(error)
            }
        })
    }
    const handleSubmit=async(e)=>{
        try {
            e.preventDefault();
            const {status,data}=await axios.put(`${route()}editproduct/${product._id}`,{...product},{headers:{"Authorization":`Bearer ${value}`}});
            if (status==201) {
                alert(data.msg);
                navigate('/company');
            }else{
                alert("Adding incomplete")
            }
        } catch (error) {
            
        }
    }
  return (
    <div className="add-product">
      <h2>Edit Product</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        {/* Category */}
        <div className="form-group">
          <label>Category</label>
          <div className="category-select">
            <select
              value={category}
              onChange={handleCategoryChange}
              disabled={categories.length === 0}
            >
              <option value="">Select a Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
            
              <div className="add-category">
                <button type="button" onClick={() => setAddCategory(!isAddCategory)}>
                  +
                </button>
                {isAddCategory  && (
                  <div className="new-category-input">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={handleNewCategoryChange}
                      placeholder="Add new category"
                    />
                    <button type="button" onClick={handleAddCategory}>Add</button>
                  </div>
                )}
              </div>
          </div>
        </div>

        {/* Product Name */}
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="pname"
            value={product.pname}
            onChange={handleProductDetailChange}
            placeholder="Enter product name"
          />
        </div>

        {/* Price */}
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleProductDetailChange}
            placeholder="Enter price"
          />
        </div>

        {/* Brand (Company) */}
        <div className="form-group">
          <label>Brand (Company)</label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            disabled="true"
            placeholder="Enter brand"
          />
        </div>

        {/* Sizes and Quantities */}
        <div className="form-group">
          <label>Sizes (Enter Quantity)</label>
          <div className="size-quantity">
            {['S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map((size) => (
              <div key={size} className="size-input">
                <label>{size}</label>
                <input
                  type="number"
                  value={product.sizeQuantities?.[size] || 0}
                  onChange={(e) => handleSizeQuantityChange(size, e)}
                  placeholder="Quantity"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Images */}
        <div className="form-group">
          <label>Product Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
          />
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default EditProduct;
