import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/authStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import Swal from 'sweetalert2'; // Import SweetAlert
import './CSS/Signup.css';

export const Signup = () => {
  const [user, setUser] = useState({ username: '', email: '', phone: '', password: '' });
  const { saveTokenInLocalStr } = useAuth();
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (!user.username || !user.email || !user.phone || !user.password) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill in all fields before signing up.',
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const responseData = await response.json();
        saveTokenInLocalStr(responseData.token);
        Swal.fire({
          icon: 'success',
          title: 'Signup Successful',
          text: 'Welcome! Your account has been created.',
        });
        navigate('/'); // Redirect to home page
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Signup Failed',
          text: errorData.message || 'Signup failed. Please try again.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Unexpected Error',
        text: 'An error occurred. Please try again later.',
      });
      console.error('An error occurred:', error);
    }
  };

  const handleSocialSignup = (platform) => {
    Swal.fire({
      icon: 'info',
      title: `Signing up with ${platform}`,
      text: 'This feature is under development.',
    });
  };

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Name:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleInput}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInput}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone no:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handleInput}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleInput}
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>

      <div className="signup-link">
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>

      <div className="social-login">
        <p>Or signup with:</p>
        <div className="social-icons">
          <button onClick={() => handleSocialSignup('Google')}>
            <FontAwesomeIcon icon={faGoogle} /> Google
          </button>
          <button onClick={() => handleSocialSignup('X')}>
            <FontAwesomeIcon icon={faXTwitter} /> X
          </button>
          <button onClick={() => handleSocialSignup('Facebook')}>
            <FontAwesomeIcon icon={faFacebook} /> Facebook
          </button>
        </div>
      </div>
    </div>
  );
};
