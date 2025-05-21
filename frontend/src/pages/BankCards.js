import React from 'react';

const BankCards = () => {
  const cardsData = [
    {
    //   title: "Zero Forex Markup",
    //   content: "Zero forex marking with zero joining & annual fees",
    //   ctaText: "Get The Card",
    //   signature: "Legend: Report",
      url: "https://www.goniyo.com",
      bgImage: "https://cdn.zeptonow.com/production/tr:w-1050,ar-1050-660,pr-true,f-auto,q-80/inventory/banner/1bc8faa1-9dcc-44dd-b728-d2007571424d.png"
    },
    {
    //   title: "1 Cr. Life Cover",
    //   content: "at just ₹327/month*",
    //   signature: "App Name",
      url: "https://www.policybazaar.com/life-insurance",
      bgImage: "https://cdn.zeptonow.com/production/tr:w-1051,ar-1051-660,pr-true,f-auto,q-80/inventory/banner/c66c27e8-8fc7-424c-b61d-f4ddb4689650.png"
    },
    {
    //   title: "Free Services",
    //   content: "Jio/Hotstar, Zomato & more with Insta DNI Card",
    //   signature: "Access",
      url: "https://www.indusind.com/in/en/personal/cards/debit-cards/insta-smart-card.html",
      bgImage: "https://cdn.zeptonow.com/production/tr:w-1050,ar-1050-660,pr-true,f-auto,q-80/inventory/banner/36f826c5-6d3f-493e-980b-2b36ba2a7ec5.png"
    },
    {
    //   title: "Savings Card",
    //   content: "Up to ₹1.2L savings annually!",
    //   signature: "Welcome",
      url: "https://www.axisbank.com/retail/cards/credit-card/axis-bank-next-credit-card",
      bgImage: "https://cdn.zeptonow.com/production/tr:w-1051,ar-1051-660,pr-true,f-auto,q-80/inventory/banner/e7d9e166-8e29-4082-b903-4f1616c54af8.png"
    }
  ];

  const styles = {
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '0.5rem',
      padding: '0.8rem',
      width: '100%',
      margin: '0 auto',
      maxWidth: '1200px'
    },
    card: {
      background: '#fff',
      borderRadius: '6px',
      padding: '0.8rem',
      cursor: 'pointer',
      border: '1px solid #e0e0e0',
      position: 'relative',
      overflow: 'hidden',
      height: '180px',
      color: '#fff',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.2s ease'
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    //   background: 'linear-gradient(45deg, rgba(0,0,0,0.65), rgba(0,0,0,0.35))',
      zIndex: 1
    },
    content: {
      position: 'relative',
      zIndex: 2,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    header: {
      fontSize: '1rem',
      fontWeight: '700',
      marginBottom: '0.25rem',
      lineHeight: '1.2'
    },
    ctaButton: {
      display: 'inline-block',
      background: '#2563eb',
      color: '#fff',
      padding: '0.4rem 0.8rem',
      borderRadius: '3px',
      fontSize: '0.75rem',
      fontWeight: '500',
      textDecoration: 'none',
      marginTop: '0.5rem'
    },
    signature: {
      fontSize: '0.7rem',
      opacity: 0.9,
      textAlign: 'right',
      marginTop: 'auto'
    }
  };

  const handleCardClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div style={styles.container}>
      {cardsData.map((card, index) => (
        <div 
          key={index}
          style={{ 
            ...styles.card,
            backgroundImage: `url(${card.bgImage})`
          }}
          onClick={() => handleCardClick(card.url)}
        >
          <div style={styles.overlay}></div>
          <div style={styles.content}>
            <div>
              <h3 style={styles.header}>{card.title}</h3>
              <p style={{ fontSize: '0.8rem', lineHeight: '1.1' }}>{card.content}</p>
            </div>
            <div>
              {card.ctaText && <div style={styles.ctaButton}>{card.ctaText}</div>}
              <div style={styles.signature}>{card.signature}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BankCards;