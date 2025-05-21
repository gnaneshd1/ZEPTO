import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

const ZeptoPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <GlobalStyles />
      <AuthContainer>
        <AuthButton 
          bg="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.72.1/og-image.jpeg"
          onClick={() => navigate('/login')}
        >
          <span>User Login</span>
          <div className="hover-effect" />
        </AuthButton>

        <AuthButton 
          bg="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.72.1/og-image.jpeg"
          onClick={() => navigate('/VendorMainPage')}  // Changed to navigate to vendor main page
        >
          <span>Vendor Login</span>
          <div className="hover-effect" />
        </AuthButton>

        <AuthButton 
          bg="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.72.1/og-image.jpeg"
          onClick={() => console.log('Admin login')}
        >
          <span>Admin Login</span>
          <div className="hover-effect" />
        </AuthButton>
      </AuthContainer>
    </>
  );
};
// Global background styling
const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-image: url('https://cdn.appsrhino.com/new-website-2022/strapi/8_Fascinating_Things_You_Can_Learn_From_Zepto_And_It_s_Business_Model_01_cc142debf9.jpg');
    background-size: cover;
    background-position: center 130px; /* Moves image down by 10px */
    background-attachment: fixed;
    font-family: 'Segoe UI', system-ui, sans-serif;
    height: 700vh;
    overflow: hidden;
  }
`;

// Main container
const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 1.5rem;
  padding: 2rem;
//   backdrop-filter: blur(2px);
`;

// Auth button with impressive effects
const AuthButton = styled.button`
  position: relative;
  width: 100%;
  max-width: 300px;
  height: 80px;
  border: none;
  border-radius: 12px;
  overflow: hidden;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
//   box-shadow: 0 10px 20px rgba(0,0,0,0.3);
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: 1;
  
  span {
    position: relative;
    z-index: 2;
    // text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  }

  .hover-effect {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background: linear-gradient(135deg, rgba(0,0,0,0.4) 0%, transparent 100%);
    transition: all 0.4s ease;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-5px);
    // box-shadow: 0 15px 30px rgba(0,0,0,0.4);
    
    .hover-effect {
    //   background: linear-gradient(135deg, rgba(0,0,0,0.6) 0%, transparent 100%);
    }
  }

  &:active {
    transform: translateY(0);
    // box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    z-index: 0;
  }
`;

export default ZeptoPage;