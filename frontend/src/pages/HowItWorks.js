import React from 'react';

const HowItWorks = () => {
  const styles = {
    container: {
      maxWidth: '1000px',
      margin: '20px auto',
      fontFamily: "'Arial', sans-serif",
      padding: '20px',
      color: '#333'
    },
    sectionTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '30px',
      textAlign: 'center'
    },
    stepsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '20px',
      marginBottom: '30px'
    },
    stepBanner: {
      flex: 1,
      minWidth: '250px',
      height: '300px',
      borderRadius: '12px',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column'
    },
    bannerImage: {
      width: '100%',
      height: '60%',
      objectFit: 'contain', // Changed from 'cover' to 'contain' to zoom out
      transform: 'scale(0.8)' // Added to zoom out further
    },
    bannerContent: {
      padding: '20px',
      backgroundColor: '#f8f8f8',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end'
    },
    stepTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '8px',
      color: '#2D2D2D',
      textAlign: 'center'
    },
    stepDescription: {
      fontSize: '14px',
      color: '#666',
      lineHeight: '1.5',
      textAlign: 'center'
    }
  };

  const banners = [
    {
      image: 'https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.72.2/images/pdp/place-order.svg',
      title: 'Open the app',
      description: 'Choose from over 7000 products across groceries, fresh fruits & veggies, meat, pet care, beauty items & more'
    },
    {
      image: 'https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.72.2/images/pdp/do-not-blink.svg',
      title: 'Place an order',
      description: 'Add your favourite items to the cart & avail the best offers'
    },
    {
      image: 'https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.72.2/images/pdp/enjoy.svg',
      title: 'Get free delivery',
      description: 'Experience lighting-fast speed & get all your items delivered in 10 minutes'
    }
  ];

  return (
    <div style={styles.container}>
      <h3 style={styles.sectionTitle}>How it Works</h3>
      
      <div style={styles.stepsContainer}>
        {banners.map((banner, index) => (
          <div key={index} style={styles.stepBanner}>
            <img 
              src={banner.image} 
              alt={banner.title} 
              style={styles.bannerImage}
            />
            <div style={styles.bannerContent}>
              <h2 style={styles.stepTitle}>{banner.title}</h2>
              <p style={styles.stepDescription}>{banner.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;