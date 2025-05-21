import React from 'react';

const Divine = () => {
  const products = [
    {
      id: 1,
      name: "Tawa Plain Paratha - Pack of 2",
      serving: "Pack of 2",
      originalPrice: 64,
      discountedPrice: 55,
      imageUrl: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-4579-4579,pr-true,f-auto,q-80/cms/product_variant/c64cab0a-4c25-40d3-87ea-964fb8533920/Tawa-Plain-Paratha-Pack-of-2.jpeg"
    },
    {
      id: 2,
      name: "Chole Kulche",
      serving: "Serves 1",
      originalPrice: 179,
      discountedPrice: 544,
      imageUrl: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-2400-2400,pr-true,f-auto,q-80/cms/product_variant/da3bf048-ddb0-461f-9ab2-b267475da0d7/Chole-Kulche-.jpeg"
    },
    {
      id: 3,
      name: "Paneer Tikka Masala",
      serving: "Serves 1",
      originalPrice: 169,
      discountedPrice: 304,
      imageUrl: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-3669-3669,pr-true,f-auto,q-80/cms/product_variant/668eaf44-3f3b-4ec3-a855-238a19a2f79e/Paneer-Tikka-Masala.jpeg"
    },
    {
      id: 4,
      name: "Wheat Chapati - Pack of 10",
      serving: "Pack of 10",
      originalPrice: 99,
      discountedPrice: 274,
      imageUrl: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-4487-4487,pr-true,f-auto,q-80/cms/product_variant/21d61d6b-b585-4b37-88f7-5e9ac3168edb/Wheat-Chapati-Pack-of-10.jpeg"
    },
    {
      id: 5,
      name: "Tandoori Chicken Tikka & Pieces",
      serving: "4 Pieces",
      originalPrice: 140,
      discountedPrice: 369,
      imageUrl: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-3842-3842,pr-true,f-auto,q-80/cms/product_variant/64c96ed1-e34a-4d84-9b26-b11c0c738aae/Tandoori-Chicken-Tikka.jpeg"
    }
  ];

  const styles = {
    container: {
      padding: '30px 20px',
      fontFamily: "'Arial', sans-serif",
      maxWidth: '1400px',
      margin: '0 auto',
      backgroundColor: '#F4E9FF',  // Changed to pure white
      minHeight: '400px',
      borderRadius: '12px',  // Added rounded corners
      boxShadow: '0 2px 16px rgba(0,0,0,0.08)'  // Added container shadow
    },
    banner: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '30px',
      marginBottom: '15px'
    },
    headerText: {
      width: '300px',
      flexShrink: 0,
      paddingLeft: '20px'
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#2D2D2D',
      marginBottom: '15px',
      lineHeight: '1.2'
    },
    subtitle: {
      fontSize: '16px',
      color: '#666',
      lineHeight: '1.4',
      marginBottom: '20px'
    },
    productsContainer: {
      display: 'flex',
      overflowX: 'auto',
      gap: '20px',
      padding: '10px 0',
      flexGrow: 1,
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    },
    productCard: {
      minWidth: '240px',
      height: '360px',
      borderRadius: '12px',  // Increased from 8px
      backgroundColor: '#F4E9FF',
    //   boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      padding: '15px',
      display: 'flex',
      flexDirection: 'column'
    },
    productImage: {
      width: '100%',
      height: '180px',
      borderRadius: '8px',  // Increased from 6px
      objectFit: 'cover',
      marginBottom: '12px'
    },
    productName: {
      fontSize: '16px',
      fontWeight: '600',
      marginBottom: '6px',
      color: '#333'
    },
    serving: {
      fontSize: '12px',
      color: '#888',
      marginBottom: '12px'
    },
    priceContainer: {
      marginTop: 'auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    discountedPrice: {
      fontSize: '16px',
      fontWeight: '700',
      color: '#2d2d2d'
    },
    originalPrice: {
      fontSize: '12px',
      color: '#999',
      textDecoration: 'line-through',
      marginLeft: '8px'
    },
    addButton: {
      backgroundColor: '#F4E9FF',
      color: '#ff3b3b',
      border: 'none',
      borderRadius: '6px',  // Increased from 4px
      padding: '8px 16px',
      fontSize: '12px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      ':hover': {
        backgroundColor: '#ff2828'
      }
    },
    moreItems: {
      color: '#ff3b3b',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      padding: '0 20px',
      textAlign: 'right',
      marginTop: '15px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.banner}>
        <div style={styles.headerText}>
            <div style={styles.subtitle}></div>
            <div style={styles.subtitle}> </div>
            <div style={styles.subtitle}>WHOLESOME MEALS </div>
          <div style={styles.title}> Delight in every bite with these delicacies</div>
          
        </div>
        
        <div style={styles.productsContainer}>
          {products.map(product => (
            <div key={product.id} style={styles.productCard}>
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                style={styles.productImage}
              />
              <div style={styles.productName}>{product.name}</div>
              <div style={styles.serving}>{product.serving}</div>
              <div style={styles.priceContainer}>
                <div>
                  <span style={styles.discountedPrice}>₹{product.discountedPrice}</span>
                  <span style={styles.originalPrice}>₹{product.originalPrice}</span>
                </div>
                <button style={styles.addButton}>
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.moreItems}>More Items →</div>
    </div>
  );
};

export default Divine;