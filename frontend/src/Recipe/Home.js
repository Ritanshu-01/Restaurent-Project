import React, { useEffect } from 'react'
import { useCart } from '../context/CartContext';
 import Aos from 'aos'
 import 'aos/dist/aos.css'
 import Menu from './Menu'
import Contact from './Contact'

import backVedio from './vedio/vedio.mp4'
/* import Updates from './Updates' */
export default function Home() {
  const { addItem } = useCart();
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  // Special menu items data
  const specialMenus = [
    {
      id: 'morning-fresh',
      name: 'Morning Fresh',
      price: 2.5,
      image:
        'https://images.unsplash.com/photo-1669277038743-066083326c32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      rating: 4.2,
      lastUpdated: '3 mins ago',
    },
    {
      id: 'lunch-special',
      name: 'Lunch special',
      price: 4.5,
      image:
        'https://images.unsplash.com/photo-1651707515427-eda0666ce222?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      rating: 4.8,
      lastUpdated: '31 mins ago',
    },
    {
      id: 'dinner-delight',
      name: 'dinner delight',
      price: 6.1,
      image:
        'https://images.unsplash.com/photo-1639280150666-4f01f0e02f7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      rating: 4.6,
      lastUpdated: '28 mins ago',
    },
  ];
  return (
    <div>
<div className="vedio">
        <video width="100%" height="500px" autoPlay loop muted playsInline className='v1'>
  <source src={backVedio} type="video/mp4" width="100%"/>

</video>
<div className="c1" style={{color:'white',backgroundImage: 'linearGradient(to top,rgb(0,0,0,1),rgb(0,0,0,.4),rgb(0,0,0,.3))'}}>
<h1>Delicious Steaks</h1>
<p><b>4.4/5</b></p>
<p><small>from 2,345+ customer Reviews</small></p>
</div>

        </div>
    

<h1 className="p1" data-aos="fade-right">Special Menus</h1>

<div className="container" data-aos="fade-up">
  <div className="row">
    {specialMenus.map((item) => (
      <div key={item.id} className="col-sm-12 col-md-6 col-lg-4">
        <div className="card">
          <img src={item.image} className="card-img-top" alt={item.name} height="200px" />
          <div className="card-body">
            <h5 className="card-title p1">{item.name}</h5>
            <p className="card-text"> <b>{item.rating}/5</b></p>
            <p className="p1"><b>just in ${item.price}</b></p>
            <p className="card-text"><small className="text-muted">Last updated {item.lastUpdated}</small></p>
            <button
              type="button"
              className="mt-2 inline-flex items-center rounded-full bg-success px-3 py-1 text-sm font-semibold text-white"
              onClick={() => addItem(item)}
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
{/*  <Story></Story>
 <Updates></Updates> */}
 <Contact></Contact>
 

</div>
    )
}
