// src/components/PromoBanners.js
import React from 'react';

const PromoBanners = () => {
  // Banner data
  const banners = [
    {
      id: 1,
      title: "Super Sonic",
      subtitle: "D E A L S",
      discount: "UP TO 90% OFF",
      poweredBy: "Powered By LAKNE",
      imageUrl: "https://cdn.zeptonow.com/production/tr:w-1280,ar-2368-528,pr-true,f-auto,q-80/inventory/banner/eaff67d6-aa53-40fe-a6ba-38793acdd518.png",
      link: "/products/super-sonic-deals"
    },
    {
      id: 2,
      title: "Beauty LIT",
      subtitle: "F E S T",
      discount: "UP TO 60% OFF",
      poweredBy: "",
      imageUrl: "https://cdn.zeptonow.com/production/tr:w-1280,ar-2368-528,pr-true,f-auto,q-80/inventory/banner/874d9674-2f4f-4f60-bc5b-9fb52084a738.png",
      link: "/products/beauty-fest"
    },
    // {
    //   id: 3,
    //   title: "C O F F E E",
    //   subtitle: "L O V E R S",
    //   discount: "SPECIAL OFFERS",
    //   poweredBy: "",
    //   imageUrl: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop",
    //   link: "/products/coffee-lovers"
    // }
  ];

  // Styles
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      padding: '20px',
      Width: '1200px',
      margin: '0 auto',
      flexWrap: 'wrap'
    },
    banner: {
      flex: '1',
      minWidth: '500px',
      height: '300px',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: '15px',
      overflow: 'hidden',
      position: 'relative',
      cursor: 'pointer',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      ':hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)'
      }
    },
    content: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0',
      padding: '20px',
      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)',
      color: 'white',
      textAlign: 'center'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      margin: '0 0 10px 0',
      textTransform: 'uppercase'
    },
    subtitle: {
      fontSize: '1.5rem',
      letterSpacing: '3px',
      margin: '0 0 10px 0'
    },
    discount: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      margin: '0 0 5px 0'
    },
    powered: {
      fontSize: '0.8rem',
      opacity: '0.8',
      margin: '10px 0 0 0'
    }
  };

  // Click handler
  const handleBannerClick = (link) => {
    // In a real app, you would use react-router's navigate or window.location
    console.log(`Navigating to: ${link}`);
    // window.location.href = link; // Uncomment this in production
  };

  return (
    <div style={styles.container}>
      {banners.map((banner) => (
        <div 
          key={banner.id} 
          style={{
            ...styles.banner,
            backgroundImage: `url(${banner.imageUrl})`,
            ':hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)'
            }
          }}
          onClick={() => handleBannerClick(banner.link)}
        >
          <div style={styles.content}>
            <h2 style={styles.title}>{banner.title}</h2>
            <p style={styles.subtitle}>{banner.subtitle}</p>
            <p style={styles.discount}>{banner.discount}</p>
            {banner.poweredBy && <p style={styles.powered}>{banner.poweredBy}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromoBanners;