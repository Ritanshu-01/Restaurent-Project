import React, { useEffect } from 'react';
import './Menu.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useCart } from '../context/CartContext';

const menuItems = [
  {
    id: 'nuts-biscuits',
    name: 'Nuts Biscuits',
    price: 6.7,
    image:
      'https://plus.unsplash.com/premium_photo-1669727915223-46c13b2f4232?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    category: 'Breakfast',
  },
  {
    id: 'fruit-salad',
    name: 'Fruit Salad',
    price: 1.5,
    image:
      'https://images.unsplash.com/photo-1560788843-f1af8e869d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=887&q=80',
    category: 'Breakfast',
  },
  {
    id: 'lemon-drink',
    name: 'Lemon drink',
    price: 1.2,
    image:
      'https://images.unsplash.com/photo-1656936631969-9e7cdbae5ae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    category: 'Breakfast',
  },
  {
    id: 'pizza',
    name: 'Pizza',
    price: 6.7,
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    category: 'Lunch',
  },
  {
    id: 'french-fries',
    name: 'French Fries',
    price: 1.5,
    image:
      'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    category: 'Lunch',
  },
  {
    id: 'brown-rice',
    name: 'Brown Rice',
    price: 1.2,
    image:
      'https://images.unsplash.com/photo-1496662559123-ac291228fb6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    category: 'Lunch',
  },
  {
    id: 'punjabi-cuisine',
    name: 'Punjabi Cuisine',
    price: 6.7,
    image:
      'https://images.unsplash.com/photo-1631452180539-96aca7d48617?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    category: 'Dinner',
  },
  {
    id: 'cheesy-sandwich',
    name: 'Cheesy sandwich',
    price: 1.5,
    image:
      'https://plus.unsplash.com/premium_photo-1664472757995-3260cd26e477?ixlib=rb-4.0.3&auto=format&fit=crop&w=761&q=80',
    category: 'Dinner',
  },
  {
    id: 'veg-burger',
    name: 'Veg burger',
    price: 1.2,
    image:
      'https://images.unsplash.com/photo-1512152272829-e3139592d56f?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    category: 'Dinner',
  },
];

export default function Menu() {
  const { addItem, favorites, toggleFavorite } = useCart();

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div>

<br />
<div className="hero1">
    
    <div className="text1" data-aos="fade-up">
    <h1>Our Menu</h1>
    <p><b>Perfect for all breakfast,lunch and dinner</b></p>
    </div>
   
</div>
   
<h3 className="p1 m-5" data-aos="fade-right"><b>Breakfast Menu</b></h3>

<div className="container">
  <div className="row">
    {menuItems
      .filter((item) => item.category === 'Breakfast')
      .map((item) => (
        <div key={item.id} className="col-sm-12 col-lg-4 col-md-6" data-aos="fade-up">
          <div className="card relative">
            <img src={item.image} className="card-img-top" alt={item.name} height="200px" />
            <div className="card-body">
              <h5 className="card-title p1">{item.name}</h5>
              <p className="card-text">
                <b>${item.price.toFixed(2)}</b>
              </p>
              <button
                type="button"
                className="mt-2 inline-flex items-center rounded-full bg-success px-3 py-1 text-sm font-semibold text-white"
                onClick={() => addItem(item)}
              >
                Add to cart
              </button>
              <button
                type="button"
                className="ms-2 inline-flex h-8 w-8 items-center justify-center rounded-full border-0 bg-light"
                onClick={() => toggleFavorite(item.id)}
                aria-label="Toggle favorite"
              >
                <span style={{ color: favorites.includes(item.id) ? '#dc2626' : '#9ca3af' }}>
                  ♥
                </span>
              </button>
            </div>
          </div>
        </div>
      ))}
  </div>
</div>
{/* second row */}
  <h3 className="p1 m-5" data-aos="fade-right"><b>Lunch Menu</b></h3>
<div className="container">
  <div className="row">
    {menuItems
      .filter((item) => item.category === 'Lunch')
      .map((item) => (
        <div key={item.id} className="col-sm-12 col-lg-4 col-md-6" data-aos="fade-up">
          <div className="card relative">
            <img src={item.image} className="card-img-top" alt={item.name} height="200px" />
            <div className="card-body">
              <h5 className="card-title p1">{item.name}</h5>
              <p className="card-text">
                <b>${item.price.toFixed(2)}</b>
              </p>
              <button
                type="button"
                className="mt-2 inline-flex items-center rounded-full bg-success px-3 py-1 text-sm font-semibold text-white"
                onClick={() => addItem(item)}
              >
                Add to cart
              </button>
              <button
                type="button"
                className="ms-2 inline-flex h-8 w-8 items-center justify-center rounded-full border-0 bg-light"
                onClick={() => toggleFavorite(item.id)}
                aria-label="Toggle favorite"
              >
                <span style={{ color: favorites.includes(item.id) ? '#dc2626' : '#9ca3af' }}>
                  ♥
                </span>
              </button>
            </div>
          </div>
        </div>
      ))}
  </div>
</div>


  <h3 className="p1 m-5" data-aos="fade-right"><b>Dinner Menu</b></h3>
{/* third row */}
<div className="container">
  <div className="row">
    {menuItems
      .filter((item) => item.category === 'Dinner')
      .map((item) => (
        <div key={item.id} className="col-sm-12 col-md-6 col-lg-4" data-aos="fade-up">
          <div className="card relative">
            <img src={item.image} className="card-img-top" alt={item.name} height="200px" />
            <div className="card-body">
              <h5 className="card-title p1">{item.name}</h5>
              <p className="card-text">
                <b>${item.price.toFixed(2)}</b>
              </p>
              <button
                type="button"
                className="mt-2 inline-flex items-center rounded-full bg-success px-3 py-1 text-sm font-semibold text-white"
                onClick={() => addItem(item)}
              >
                Add to cart
              </button>
              <button
                type="button"
                className="ms-2 inline-flex h-8 w-8 items-center justify-center rounded-full border-0 bg-light"
                onClick={() => toggleFavorite(item.id)}
                aria-label="Toggle favorite"
              >
                <span style={{ color: favorites.includes(item.id) ? '#dc2626' : '#9ca3af' }}>
                  ♥
                </span>
              </button>
            </div>
          </div>
        </div>
      ))}
  </div>
</div>


<h3 className='p1 m-5' data-aos="fade-right"><b>Special For You!</b></h3>
<div className="card mb-3" data-aos="fade-up">
  <div className="row g-0">
    <div className="col-md-4">
      <img src="https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" className="img-fluid rounded-start" alt="..." height="250px"/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h3 className='p1 mt-5'><b>Free Of Cost!</b></h3>
        <p className="card-text mt-4">As a dessert we will offer you ice creams of flavours which id absolutely free for our all customers.</p>
        <p className='mt-5'><b>Thank You for visiting us!</b></p>
             </div>
    </div>
  </div>
</div>




    </div>
  )
}
