import React from 'react';
import './Nav.css';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
export default function Nav() {
let navigate=useNavigate()
  const { items } = useCart();
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  let clickHandler=()=>{
        navigate("/reserve")
  }

  let auth=localStorage.getItem("user1")
  let reserve=localStorage.getItem("reserve")
  const logout = () => {
    localStorage.removeItem('user1');
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <>
     <div className="navbar sticky">
        <div className="logo">
        <h4>Crispy kitchen</h4>
        </div>
        {
          auth?
          <div className="list">
        <div className="list-item"><Link to='/'>Home</Link></div>
        <div className="list-item"><Link to='/menu'>Menu</Link></div>
        <div className="list-item"><Link to='/contact'>Contact</Link></div>
        <div className="list-item"><Link to='/story'>Story</Link></div>
        <div className="list-item"><Link to='/updates'>Updates</Link></div>
        <div className="list-item"><Link to='/orders'>Orders</Link></div>
        <div className="list-item"><Link to='/login' onClick={logout}>Logout <span style={{color:'red',textTransform:'capitalize'}}>({JSON.parse(auth).name})</span></Link></div>
        <div className="list-item">
          <Link to="/cart" className="relative">
            <span>Cart</span>
            {cartCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-10px',
                  backgroundColor: '#16a34a',
                  color: '#fff',
                  borderRadius: '9999px',
                  fontSize: '10px',
                  padding: '2px 6px',
                  fontWeight: 600,
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>
        </div>
        <div className="list-item"><button className='navBtn' onClick={clickHandler}>{reserve}</button></div>
        </div>
          :
          <div className="list">
        <div className="list-item"><Link to='/'>Home</Link></div>
        <div className="list-item"><Link to='/menu'>Menu</Link></div>
        <div className="list-item"><Link to='/contact'>Contact</Link></div>
        <div className="list-item"><Link to='/signup'>Sign Up</Link></div>
        <div className="list-item"><Link to='/login'>Log In</Link></div>
        <div className="list-item">
          <Link to="/cart" className="relative">
            <span>Cart</span>
            {cartCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-10px',
                  backgroundColor: '#16a34a',
                  color: '#fff',
                  borderRadius: '9999px',
                  fontSize: '10px',
                  padding: '2px 6px',
                  fontWeight: 600,
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>
        </div>
        <div className="list-item"><button className='navBtn' onClick={clickHandler}>{reserve}</button></div>
        </div>
        }
    </div>
    </>
  )
}
