import React from 'react';

const SuperSonicBanner = () => {
  // Main banner styles
  const bannerStyles = {
    position: 'fixed',
    top: '0',
    right: '0',
    width: '150px',
    height: '150px',
    overflow: 'hidden',
    zIndex: '9999',
    pointerEvents: 'none',
  };

  // Content styles (rotated part)
  const contentStyles = {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '200px',
    height: '200px',
    transform: 'rotate(45deg)',
    transformOrigin: '0 0',
    background: 'linear-gradient(135deg, #FF0000, #FF6600)',
    color: 'white',
    textAlign: 'center',
    paddingTop: '30px',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
  };

  // Text styles
  const mainTextStyles = {
    fontSize: '16px',
    marginBottom: '5px',
    textTransform: 'uppercase',
  };

  const discountTextStyles = {
    fontSize: '14px',
    marginTop: '5px',
  };

  return (
    <div style={bannerStyles}>
      <div style={contentStyles}>
        <div style={mainTextStyles}>Super Sonic</div>
        <div style={{ fontSize: '12px' }}>DEALS</div>
        <div style={discountTextStyles}>UP TO 90% OFF</div>
      </div>
    </div>
  );
};

export default SuperSonicBanner;