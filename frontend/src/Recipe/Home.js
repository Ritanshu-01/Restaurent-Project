import React, { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/currency';
 import Aos from 'aos'
 import 'aos/dist/aos.css'
 import Menu from './Menu'
import Contact from './Contact'
import { getFoodItems } from '../services/foodService';
import { API_BASE } from '../config/api';

import backVedio from './vedio/vedio.mp4'
/* import Updates from './Updates' */
export default function Home() {
  const { addItem } = useCart();
  const [specialMenus, setSpecialMenus] = useState([]);
  useEffect(() => {
    Aos.init({ duration: 2000 });
    getFoodItems({ featured: 'true' })
      .then((items) => {
        const mapped = items
          .filter((item) => Number(item.price) > 100)
          .slice(0, 3)
          .map((item) => ({
            id: item._id,
            name: item.name,
            price: item.price,
            image: item.image && item.image.startsWith('http') ? item.image : `${API_BASE}${item.image || ''}`,
            rating: item.ratingAverage || 4.5,
            lastUpdated: 'Recently updated'
          }));
        setSpecialMenus(mapped);
      })
      .catch(() => {
        setSpecialMenus([]);
      });
  }, []);
  return (
    <div>
<section className="vedio">
        <video width="100%" height="500px" autoPlay loop muted playsInline className='v1'>
  <source src={backVedio} type="video/mp4" width="100%"/>
</video>
<div className="c1" style={{color:'white',backgroundImage: 'linear-gradient(to top,rgb(0,0,0,.9),rgb(0,0,0,.5),rgb(0,0,0,.45))', borderRadius: '18px', padding: '2rem 2.5rem'}}>
<p style={{color: '#f3d98b', letterSpacing: '2px'}}>5-STAR LUXURY DINING</p>
<h1 style={{fontSize:'clamp(2rem,5vw,4rem)', marginBottom:'10px'}}>Experience Artisanal Flavors</h1>
<p><b>Rated 4.9/5 by 2,345+ guests</b></p>
<div style={{display:'flex', gap:'10px', marginTop:'14px', flexWrap:'wrap'}}>
  <button className="lux-btn rounded-full px-4 py-2 text-sm font-semibold" onClick={() => window.location.href='/menu'}>Order Now</button>
  <button className="rounded-full border border-warning px-4 py-2 text-sm text-white" onClick={() => window.location.href='/contact'}>Book a Table</button>
</div>
</div>
</section>

<section className="mx-auto mt-4 max-w-6xl px-4">
  <div className="lux-card p-3 text-center">
    <p className="m-0 text-sm"><b style={{color:'#f3d98b'}}>Daily Offer:</b> Use <b>WELCOME10</b> for 10% OFF on premium dishes.</p>
  </div>
</section>

<h1 className="p1 mt-5" data-aos="fade-right">Chef’s Specials</h1>

<div className="container" data-aos="fade-up">
  <div className="row">
    {!specialMenus.length && <p className="text-center text-sm" style={{color:'#b8b2a3'}}>Chef specials are being refreshed...</p>}
    {specialMenus.map((item) => (
      <div key={item.id} className="col-sm-12 col-md-6 col-lg-4">
        <div className="card lux-card">
          <img src={item.image} className="card-img-top" alt={item.name} height="200px" />
          <div className="card-body">
            <h5 className="card-title" style={{color:'#f3d98b'}}>{item.name}</h5>
            <p className="card-text"> <b>⭐ {item.rating}/5</b></p>
            <p><b>{formatINR(item.price)}</b></p>
            <p className="card-text"><small className="text-muted">Last updated {item.lastUpdated}</small></p>
            <button
              type="button"
              className="lux-btn mt-2 inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold"
              onClick={() => addItem({ ...item, id: item.id })}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  


 <Menu></Menu>
{/* <Updates></Updates> */}
 <Contact></Contact>
 

  </div>
    )
}
