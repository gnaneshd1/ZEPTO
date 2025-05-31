
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';

// Animation keyframes
const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Color scheme
const colors = {
  primary: '#6a0dad',
  primaryLight: '#9c27b0',
  primaryDark: '#a000c8',
  accentGold: '#FFD700',
  background: '#ffffff',
  text: '#2d3748',
};

// Styled components
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  background-size: 400% 400%;
  animation: ${gradientFlow} 15s ease infinite;
`;

const AuthCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  backdrop-filter: blur(25px);
  border-radius: 30px;
  padding: 3rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, ${colors.primary}, ${colors.accentGold}, ${colors.primary});
    background-size: 200% 200%;
    animation: ${gradientFlow} 3s ease infinite;
  }
`;

const CardHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const CardTitle = styled.h2`
  font-size: 2.2rem;
  color: white;
  margin-bottom: 0.5rem;
  background: linear-gradient(to right, ${colors.accentGold}, ${colors.primaryLight});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const AuthInput = styled.input`
  width: 100%;
  padding: 1.2rem;
  background: rgba(15, 12, 41, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  font-size: 1rem;
  color: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${colors.accentGold};
    box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.2);
  }
`;

const AuthButton = styled(motion.button)`
  width: 100%;
  padding: 1.2rem;
  background: linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark});
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, ${colors.primaryLight}, ${colors.primary});
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const AuthFooter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const AuthLink = styled(Link)`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  margin: 0 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.accentGold};
  }
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await axios.post('http://localhost:5005/auth/login', { email, password });
      login(res.data.user);

      toast.success('Login successful!', {
        position: "top-right",
        autoClose: 2000,
        style: {
          background: 'rgba(15, 12, 41, 0.9)',
          border: `1px solid ${colors.accentGold}`,
          color: 'white',
        }
      });

      // Handle navigation based on user role
      if (res.data.user.email === "admin@gmail.com") {
        navigate('/AdminDashboard');
      } else if (res.data.user.email === "vendor@gmail.com") {
        navigate('/vendor');
      } else {
        navigate('/Home');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed', {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: 'rgba(15, 12, 41, 0.9)',
          border: '1px solid #ff4d4f',
          color: 'white',
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LoginContainer>
      <AuthCard
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
        </CardHeader>

        <AuthForm onSubmit={handleLogin}>
          <InputGroup>
            <AuthInput
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <AuthInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>

          <AuthButton
            type="submit"
            disabled={isSubmitting}
            whileTap={{ scale: 0.95 }}
          >
            {isSubmitting ? 'Logging in...' : 'Sign In'}
          </AuthButton>
        </AuthForm>

        <AuthFooter>
          <AuthLink to="/register">Create Account</AuthLink>
          <AuthLink to="/forgot-password">Forgot Password?</AuthLink>
        </AuthFooter>
      </AuthCard>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{
          borderRadius: '12px',
          padding: '16px',
          background: 'rgba(15, 12, 41, 0.9)',
        }}
      />
    </LoginContainer>
  );
}

export default Login;



