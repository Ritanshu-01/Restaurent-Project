import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../config/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const clickHandler = async () => {
    setApiError('');
    if (!password || !email) {
      setError(true);
      return false;
    }

    try {
      let result = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'post',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      result = await result.json();
      if (result.error) {
        setApiError(result.error);
        return;
      }
      if (result.user && result.token) {
        localStorage.setItem('user1', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        navigate('/');
      } else {
        setApiError('Unexpected response from server');
      }
    } catch (e) {
      setApiError('Unable to login. Please try again.');
    }
  };

  return (
    <div className="signup">
      <form style={{ padding: '2em' }} onSubmit={(e) => e.preventDefault()}>
      

      <div className="mb-3">
        <label htmlFor="exampleInputEmail1"  className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='itsonlyritanshu@gmail.com'  value={email}
        onChange={(e)=>setEmail(e.target.value)} />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        {error && !email && <span id="emailHelp" className="form-text" style={{color:'red',fontSize:"15px"}}>Please enter email</span>}
      </div>
    
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" placeholder='M345@$hjk'  value={password}
        onChange={(e)=>setPassword(e.target.value)} />
        <div id="emailHelp" className="form-text">Password must contain special characters,digits and atleast one capital letter.</div>
        {error && !password && <span id="emailHelp" className="form-text" style={{color:'red',fontSize:"15px"}}>Please enter password</span>}
      </div>
      {apiError && (
        <div className="alert alert-danger" role="alert">
          {apiError}
        </div>
      )}
      <button type="submit"  className="btn signup-btn" onClick={clickHandler}>Login!</button>
    </form>
    </div>
  )
}

export default Login
