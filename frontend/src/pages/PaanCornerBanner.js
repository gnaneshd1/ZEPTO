import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaanCornerBanner = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Styles
  const styles = {
    container: {
      backgroundImage: ' url(https://cdn.zeptonow.com/production/tr:w-1280,ar-3840-705,pr-true,f-auto,q-80/inventory/banner/4ea3de05-f469-4df2-9548-db9c9863dfdf.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '40px',
      fontFamily: 'Arial, sans-serif',
      borderRadius: '15px',
      maxWidth: '1500px',
      height: '250px', 
      margin: '20px auto',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer' // Add cursor pointer to indicate clickability
    },
    content: {
      position: 'relative',
      zIndex: 2
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      marginBottom: '5px',
      color: '#fff',
      textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
    },
    subtitle: {
      fontSize: '18px',
      color: '#eee',
      marginBottom: '30px',
      textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
    },
    orderButton: {
      backgroundColor: '#e74c3c',
      color: 'white',
      border: 'none',
      padding: '12px 30px',
      fontSize: '16px',
      fontWeight: 'bold',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
    },
    orderButtonHover: {
      backgroundColor: '#c0392b'
    }
  };

  // Handle banner click
  const handleBannerClick = (e) => {
    // Prevent triggering if the click was on the button (let button handle its own click)
    if (!e.target.closest('button')) {
      navigate('/paan-corner'); // Navigate to the PaanCorner page
    }
  };

  return (
    <div style={styles.container} onClick={handleBannerClick}>
      <div style={styles.content}>
        {/* <h1 style={styles.title}>Paan Corner</h1>
        <p style={styles.subtitle}>Smoking Accessories, Mints & More</p>
        
        <button 
          style={{
            ...styles.orderButton,
            backgroundColor: isHovered 
              ? styles.orderButtonHover.backgroundColor 
              : styles.orderButton.backgroundColor
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={(e) => {
            e.stopPropagation(); // Prevent the banner click from firing
            navigate('/paan-corner');
          }}
        >
          Order Now
        </button> */}
      </div>
    </div>
  );
};

export default PaanCornerBanner;