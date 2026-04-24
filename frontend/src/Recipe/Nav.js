import React, { useMemo, useState } from 'react';
import './Nav.css';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
export default function Nav() {
let navigate=useNavigate()
  const { items } = useCart();
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const [isOpen, setIsOpen] = useState(false);

  let clickHandler=()=>{
        navigate("/reserve")
  }

  let auth=localStorage.getItem("user1")
  const user = auth ? JSON.parse(auth) : null;
  const reserve=localStorage.getItem("reserve") || "Reserve";
  const links = useMemo(() => {
    if (auth) {
      return [
        { to: '/', label: 'Home' },
        { to: '/menu', label: 'Menu' },
        { to: '/contact', label: 'Contact' },
        { to: '/orders', label: 'Orders' }
      ];
    }
    return [
      { to: '/', label: 'Home' },
      { to: '/menu', label: 'Menu' },
      { to: '/contact', label: 'Contact' },
      { to: '/signup', label: 'Sign Up' },
      { to: '/login', label: 'Log In' }
    ];
  }, [auth]);

  const logout = () => {
    localStorage.removeItem('user1');
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <>
     <div className="navbar sticky">
        <div className="logo" onClick={() => navigate('/')}>
        <h4>Crispy Kitchen</h4>
        </div>
        <button className="menu-toggle" onClick={() => setIsOpen((s) => !s)} aria-label="Toggle menu">☰</button>
        <div className={`list ${isOpen ? 'open' : ''}`}>
          {links.map((item) => <div className="list-item" key={item.to}><Link onClick={() => setIsOpen(false)} to={item.to}>{item.label}</Link></div>)}
          <div className="list-item">
            <Link to="/cart" className="relative" onClick={() => setIsOpen(false)}>
              <span>🛒</span>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </div>
          <div className="list-item"><Link to={auth ? '/orders' : '/login'}>👤</Link></div>
          <div className="list-item"><button className='navBtn' onClick={clickHandler}>{reserve}</button></div>
          {auth && <div className="list-item"><Link to='/login' onClick={logout}>Logout ({user?.name})</Link></div>}
        </div>
    </div>
    </>
  )
}
