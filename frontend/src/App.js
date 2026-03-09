import React from 'react';
import './App.css'
import Story from './Recipe/Story';
import Updates from './Recipe/Updates';
import Menu from './Recipe/Menu';
import Contact from './Recipe/Contact';
import Home from './Recipe/Home';
import Nav from './Recipe/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Reserve from './Recipe/Reserve';
import Signup from './Recipe/Signup';
import Login from './Recipe/Login';
import Comments from './Recipe/Comments';
import UpdateComment from './Recipe/UpdateComment';
import CommentBox from './Recipe/CommentBox';
import NewsLetter from './Recipe/NewsLetter';
import CartPage from './Recipe/CartPage';
import CheckoutPage from './Recipe/CheckoutPage';
import OrdersPage from './Recipe/OrdersPage';
import OrderSuccessPage from './Recipe/OrderSuccessPage';
import Protected from './Recipe/Protected';

function App() {
  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/story" element={<Story />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/update/:id" element={<UpdateComment />} />

            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/comments" element={<Comments />} />
            <Route path="/commentbox" element={<CommentBox />} />

            <Route path="/contact" element={<Contact />} />
            <Route path="/news" element={<NewsLetter />} />

            <Route path="/reserve" element={<Reserve />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            <Route element={<Protected />}>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrdersPage />} />
            </Route>
            <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
