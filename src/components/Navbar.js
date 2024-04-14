import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Cart from '../screens/Cart';
import Modal from '../Modal';
import { useCart } from './ContextReducer';
function Navbar(props) {
const [cartView,setcartView] = useState(false);
  let data = useCart();
const navigate = useNavigate();

  const handleLogout = ()=>{
  localStorage.removeItem("authToken");
  navigate("/Login")
  }
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "orange" }}  > 
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic" to="/">MEALWHEEL</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link className="nav-link active fs-6 " aria-current="page" to="/">Home</Link>
        </li>
       {(localStorage.getItem("authToken"))?
        <li className="nav-item">
        <Link className="nav-link active fs-6 " aria-current="page" to="/myOrder">My Orders</Link>
      </li>
      :"" }
      </ul>
      {(!localStorage.getItem("authToken"))?
      <div className='d-flex'>
          <Link className="btn bg.white text-orange mx-1" style={{background:"white", color:"orange"}}  to="/login">Login</Link>
          <Link className="btn   bg.white text-orange mx-1" style={{background:"white", color:"orange"}} to="/CreateUser">Signup</Link>
      </div>
        :<div>
           <div className="btn bg.white text-orange mx-1" style={{background:"white", color:"orange"}} onClick={()=>{setcartView(true)}}>
        My Cart{"  "}
        <Badge pill style={{ backgroundColor: 'red' }}>{data.length}</Badge>
        </div>
   {cartView? <Modal onClose={()=>setcartView(false)}><Cart /></Modal>:null}     
 <div className="btn bg.white text-danger mx-1" style={{background:"white", color:"red"}} onClick={handleLogout}>
        Logout
        </div>
        </div>
       
        }
    </div>
  </div>
</nav>
      </div>
    )
  }
export default Navbar;
