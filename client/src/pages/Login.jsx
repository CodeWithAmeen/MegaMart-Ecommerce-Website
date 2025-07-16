import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/authStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import Swal from 'sweetalert2'; // Import SweetAlert
import './CSS/Login.css';

export const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const { saveTokenInLocalStr, auth, logout } = useAuth();
  const navigate = useNavigate();

  // Handle input changes
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.email || !user.password) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill in both the email and password fields.',
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const responseData = await response.json();

      if (response.ok) {
        saveTokenInLocalStr(responseData.token); // Save the JWT token
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Welcome back!',
        });
        navigate('/'); // Redirect to the home page
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: responseData.message || 'Please check your credentials.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred. Please try again later.',
      });
      console.error('Login error:', error);
    }
  };

  // Handle social login
  const handleSocialLogin = (platform) => {
    Swal.fire({
      icon: 'info',
      title: `Logging in with ${platform}`,
      text: `This feature is under development.`,
    });
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>

      <div className="signup-link">
        <p>Don't have an account? <a href="/signup">Signup</a></p>
      </div>

      <div className="social-login">
        <p>Or login with:</p>
        <div className="social-icons">
          <button onClick={() => handleSocialLogin('Google')}>
            <FontAwesomeIcon icon={faGoogle} /> Google
          </button>
          <button onClick={() => handleSocialLogin('X')}>
            <FontAwesomeIcon icon={faXTwitter} /> X
          </button>
          <button onClick={() => handleSocialLogin('Facebook')}>
            <FontAwesomeIcon icon={faFacebook} /> Facebook
          </button>
        </div>
      </div>

      {auth.token && (
        <div className="logout-container">
          <button
            onClick={() => {
              logout();
              Swal.fire({
                icon: 'success',
                title: 'Logged Out',
                text: 'You have been logged out successfully.',
              });
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
