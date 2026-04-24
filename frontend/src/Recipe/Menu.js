import React, { useEffect, useMemo, useState } from 'react';
import './Menu.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useCart } from '../context/CartContext';
import { API_BASE } from '../config/api';
import { getFoodItems, submitFoodReview } from '../services/foodService';
import { formatINR } from '../utils/currency';

const fallbackImage = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=870&q=80';

export default function Menu() {
  const { addItem, favorites, toggleFavorite } = useCart();
  const [menuItems, setMenuItems] = useState([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('all');
  const [minRating, setMinRating] = useState('0');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reviewingId, setReviewingId] = useState('');

  useEffect(() => {
    Aos.init({ duration: 2000 });
    getFoodItems()
      .then((data) => setMenuItems(data))
      .catch(() => setError('Unable to load menu right now. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => ['All', ...new Set(menuItems.map((item) => item.category).filter(Boolean))], [menuItems]);
  const filteredItems = useMemo(() => menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const ratingMatch = Number(item.ratingAverage || 0) >= Number(minRating || 0);
    const discountedPrice = item.price - (item.price * ((item.discountPercent || 0) / 100));
    const priceMatch =
      priceRange === 'all' ||
      (priceRange === 'low' && discountedPrice < 300) ||
      (priceRange === 'mid' && discountedPrice >= 300 && discountedPrice <= 700) ||
      (priceRange === 'high' && discountedPrice > 700);
    return matchesSearch && matchesCategory && ratingMatch && priceMatch && item.available !== false;
  }), [menuItems, search, activeCategory, minRating, priceRange]);

  const toImageUrl = (src) => {
    if (!src) return fallbackImage;
    if (src.startsWith('http')) return src;
    return `${API_BASE}${src}`;
  };

  const handleQuickReview = async (item) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login first to submit ratings.');
      return;
    }
    const rating = Number(window.prompt(`Rate ${item.name} (1-5):`, '5'));
    if (!rating || rating < 1 || rating > 5) return;
    try {
      setReviewingId(item._id);
      const user = JSON.parse(localStorage.getItem('user1') || '{}');
      await submitFoodReview(item._id, { rating, userName: user.name || 'Guest' }, token);
      const data = await getFoodItems();
      setMenuItems(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setReviewingId('');
    }
  };

  return (
    <div>
      <br />
      <div className="hero1">
        <div className="text1" data-aos="fade-up">
          <h1>Our Menu</h1>
          <p><b>Premium dishes curated for a 5-star dining experience</b></p>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-6xl px-4">
        <div className="lux-card mb-4 grid gap-3 p-3 md:grid-cols-[1fr,auto,auto,auto]">
          <input value={search} onChange={(e) => setSearch(e.target.value)} className="lux-input rounded-full px-4 py-2 text-sm" placeholder="Search dishes..." />
          <select className="lux-input rounded-full px-3 py-2 text-sm" value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
            <option value="all">All Prices</option>
            <option value="low">Under ₹300</option>
            <option value="mid">₹300 - ₹700</option>
            <option value="high">Above ₹700</option>
          </select>
          <select className="lux-input rounded-full px-3 py-2 text-sm" value={minRating} onChange={(e) => setMinRating(e.target.value)}>
            <option value="0">Any Rating</option>
            <option value="3">3★ & above</option>
            <option value="4">4★ & above</option>
          </select>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button key={category} className={`rounded-full px-4 py-2 text-xs font-semibold ${activeCategory === category ? 'lux-btn' : 'bg-gray-100 text-gray-700'}`} onClick={() => setActiveCategory(category)}>
                {category}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="row">
            {[1, 2, 3].map((s) => <div key={s} className="col-sm-12 col-lg-4 col-md-6 mb-4"><div className="lux-card p-3"><div className="placeholder-glow"><span className="placeholder col-12" style={{height:'180px'}}></span></div></div></div>)}
          </div>
        )}
        {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {!loading && !error && filteredItems.length === 0 && <p className="lux-card p-4 text-sm">No dishes found. Try adjusting filters.</p>}

        {!loading && !error && (
          <div className="row">
            {filteredItems.map((item) => (
              <div key={item._id} className="col-sm-12 col-lg-4 col-md-6 mb-4" data-aos="fade-up">
                <div className="card relative h-100 lux-card">
                  <img src={toImageUrl(item.image)} className="card-img-top" alt={item.name} height="220px" />
                  <div className="card-body">
                    <h5 className="card-title" style={{color:'#f3d98b'}}>{item.name}</h5>
                    <p className="text-sm mb-2" style={{color:'#b8b2a3'}}>{item.description || 'Chef special crafted with premium ingredients.'}</p>
                    <p className="mb-1 text-sm">⭐ {(item.ratingAverage || 0).toFixed(1)} ({item.ratingCount || 0})</p>
                    <p className="card-text">
                      <b>{formatINR(item.price - (item.price * ((item.discountPercent || 0) / 100)))}</b>
                      {(item.discountPercent || 0) > 0 && <small className="ms-2 text-decoration-line-through text-muted">{formatINR(item.price)}</small>}
                    </p>
                    <button type="button" className="lux-btn mt-2 inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold" onClick={() => addItem({ ...item, id: item._id })}>
                      Add to cart
                    </button>
                    <button type="button" className="ms-2 inline-flex h-8 w-8 items-center justify-center rounded-full border-0 bg-light" onClick={() => toggleFavorite(item._id)} aria-label="Toggle favorite">
                      <span style={{ color: favorites.includes(item._id) ? '#dc2626' : '#9ca3af' }}>♥</span>
                    </button>
                    <button type="button" className="ms-2 rounded-full border border-warning bg-transparent px-3 py-1 text-xs text-warning" onClick={() => handleQuickReview(item)} disabled={reviewingId === item._id}>
                      {reviewingId === item._id ? 'Saving...' : 'Rate'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
