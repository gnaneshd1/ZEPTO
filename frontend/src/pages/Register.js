import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled, { keyframes, css } from 'styled-components';

// Animations (same as Login)
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const neonGlow = keyframes`
  0% { box-shadow: 0 0 5px rgba(183, 82, 250, 0.7), 0 0 10px rgba(183, 82, 250, 0.5); }
  50% { box-shadow: 0 0 15px rgba(183, 82, 250, 0.9), 0 0 25px rgba(183, 82, 250, 0.7); }
  100% { box-shadow: 0 0 5px rgba(183, 82, 250, 0.7), 0 0 10px rgba(183, 82, 250, 0.5); }
`;

// Styled Components (same as Login with minor adjustments)
const CyberContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(-45deg, #0f0c29, #302b63, #24243e, #000000);
  background-size: 400% 400%;
  animation: ${() => css`${gradientFlow} 15s ease infinite`};
  padding: 20px;
  overflow: hidden;
`;

const CyberGlow = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(183, 82, 250, 0.3) 0%, rgba(0,0,0,0) 70%);
  border-radius: 50%;
  filter: blur(30px);
  animation: ${() => css`${float} 6s ease-in-out infinite`};
  z-index: 0;
`;

const CyberCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
  padding: 50px;
  width: 100%;
  max-width: 480px;
  position: relative;
  z-index: 1;
  overflow: hidden;
  transition: all 0.5s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #b752fa, #7b2cbf, #b752fa);
    background-size: 200% 200%;
    animation: ${() => css`${gradientFlow} 3s ease infinite`};
  }
`;

const CyberTitle = styled.h2`
  color: white;
  text-align: center;
  margin-bottom: 40px;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 1px;
  position: relative;
  text-shadow: 0 0 10px rgba(183, 82, 250, 0.5);

  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #b752fa, #7b2cbf);
    margin: 15px auto 0;
    border-radius: 3px;
  }
`;

const CyberForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const InputContainer = styled.div`
  position: relative;
`;

const CyberInput = styled.input`
  width: 100%;
  padding: 18px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  font-size: 16px;
  color: white;
  transition: all 0.3s;
  backdrop-filter: blur(5px);

  &:focus {
    outline: none;
    border-color: #b752fa;
    box-shadow: 0 0 15px rgba(183, 82, 250, 0.3);
    background: rgba(255, 255, 255, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const InputLabel = styled.label`
  position: absolute;
  left: 15px;
  top: -10px;
  font-size: 12px;
  color: #b752fa;
  background: rgba(0, 0, 0, 0.7);
  padding: 0 5px;
  border-radius: 4px;
`;

const CyberButton = styled.button`
  background: linear-gradient(45deg, #b752fa, #7b2cbf);
  color: white;
  border: none;
  padding: 18px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  z-index: 1;
  text-transform: uppercase;
  letter-spacing: 1px;
  animation: ${() => css`${neonGlow} 2s infinite`};

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(183, 82, 250, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #7b2cbf, #b752fa);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover::before {
    opacity: 1;
  }

  &:disabled {
    opacity: 0.7;
    animation: none;
    cursor: not-allowed;
  }
`;

const CyberLinks = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  padding-top: 25px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const CyberLink = styled(Link)`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.3s;
  position: relative;

  &:hover {
    color: #b752fa;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: #b752fa;
    transition: width 0.3s;
  }

  &:hover::after {
    width: 100%;
  }
`;

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { firstName, lastName, email, phone, password } = formData;

    if (!/^\d{10}$/.test(phone)) {
      toast.error('Phone number must be exactly 10 digits');
      setLoading(false);
      return;
    }

    if (!/^[\w-]+(\.[\w-]+)*@gmail\.com$/.test(email)) {
      toast.error('Please enter a valid Gmail address');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5005/auth/Register', { 
        firstName, 
        lastName, 
        email, 
        phone, 
        password 
      });
      toast.success('Registered Successfully');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CyberContainer>
      <CyberGlow style={{ top: '20%', left: '10%' }} />
      <CyberGlow style={{ bottom: '15%', right: '10%', animationDelay: '2s' }} />
      
      <CyberCard>
        <CyberTitle>CREATE ACCOUNT</CyberTitle>
        
        <CyberForm onSubmit={handleRegister}>
          <InputContainer>
            <InputLabel>FIRST NAME</InputLabel>
            <CyberInput
              type="text"
              name="firstName"
              placeholder="John"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
          </InputContainer>

          <InputContainer>
            <InputLabel>LAST NAME</InputLabel>
            <CyberInput
              type="text"
              name="lastName"
              placeholder="Doe"
              required
              value={formData.lastName}
              onChange={handleChange}
            />
          </InputContainer>

          <InputContainer>
            <InputLabel>EMAIL (GMAIL)</InputLabel>
            <CyberInput
              type="email"
              name="email"
              placeholder="user@gmail.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </InputContainer>

          <InputContainer>
            <InputLabel>PHONE NUMBER</InputLabel>
            <CyberInput
              type="text"
              name="phone"
              placeholder="1234567890"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </InputContainer>

          <InputContainer>
            <InputLabel>PASSWORD</InputLabel>
            <CyberInput
              type="password"
              name="password"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </InputContainer>

          <CyberButton type="submit" disabled={loading}>
            {loading ? 'REGISTERING...' : 'REGISTER'}
          </CyberButton>
        </CyberForm>

        <CyberLinks>
          <CyberLink to="/login">ALREADY HAVE AN ACCOUNT? LOGIN</CyberLink>
        </CyberLinks>
      </CyberCard>
      
      <ToastContainer
        toastStyle={{
          borderRadius: '12px',
          backdropFilter: 'blur(10px)'
        }}
      />
    </CyberContainer>
  );
}

export default Register;