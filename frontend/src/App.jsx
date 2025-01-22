import React,{useState,useEffect} from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Login from './Components/login/Login'
import Email from './Components/email/Email';
import Signup from './Components/signup/Signup';
import Navbar from './Components/nav/Navbar';
import Home from './Components/home/Home';
import Profile from './Components/profile/Profile';
import Company from './Components/company/Company';
import AddProduct from './Components/addProduct/AddProduct';
import Products from './Components/products/Products';
import EditProduct from './Components/editProduct/EditProduct';
import Cart from './Components/cart/Cart';
import DProd from './Components/Dprod/DProd';
import Wishlist from './Components/Wishlist/Wishlist';
import SCart from './Components/singlecart/SCart';
import Orders from './Components/orders/Orders';
import PurchaseCompleted from './Components/purchase/PurchaseCompleted';
import EmailVerificationSuccess from './Components/verifysuccess/EmailVerificationSuccess';
import Sellorder from './Components/sellorder/Sellorder';
import './App.css'


const App = () => {
    const [username,setUsername]=useState("");
    const [role,setRole]=useState("");
    const [loggedIn,setLoggedIn]=useState(false); 

   

  return (
    <>
    <BrowserRouter>

                <Navbar username={username} role={role} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path='/login' Component={Login}/>
        <Route path='/email' Component={Email}/>
        <Route path='/signup' Component={Signup}/>
        <Route path='/' element={<Home  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/profile' element={<Profile role={role}  setUsername={setUsername} loggedIn={loggedIn} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/company' element={<Company  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/addproduct' element={<AddProduct  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/products/:category' element={<Products  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/editproduct/:_id' element={<EditProduct  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/cart' element={<Cart  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/product/:id' element={<DProd  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/mywishlist' element={<Wishlist  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/scart/:pid' element={<SCart  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/myorders' element={<Orders  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/orders' element={<Sellorder  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/purchasecompleted' Component={PurchaseCompleted}/>
        <Route path='/emailsuccess' Component={EmailVerificationSuccess}/>
        
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
