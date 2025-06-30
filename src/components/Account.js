import React, { useState, useEffect } from 'react';
import './Account.css';

const Account = () => {
  const [user, setUser] = useState(null); // holds user object
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Check localStorage on mount
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate login
    if (email && password) {
      const userData = { email };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setEmail('');
      setPassword('');
    } else {
      alert('Please enter email and password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="account-page">
      {user ? (
        <div className="profile-view">
          <h2>Welcome, {user.email}</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="login-form">
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default Account;
