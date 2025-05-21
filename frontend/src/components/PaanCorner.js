
// import React, { useState } from 'react';

// const PaanCorner = ({ addToCart }) => {
//   const [hoverStates, setHoverStates] = useState({});
//   const [quantities, setQuantities] = useState({});

//   const styles = {
//     container: {
//       maxWidth: '1500px',
//       margin: '0 auto',
//       padding: '2rem',
//       fontFamily: '"Poppins", Arial, sans-serif',
//       background: 'linear-gradient(to bottom, #f9f9f9, #fff)'
//     },
//     header: {
//       textAlign: 'center',
//       padding: '6rem 0',
//       background: `url(https://cdn.zeptonow.com/production/tr:w-1280,ar-3840-705,pr-true,f-auto,q-80/inventory/banner/4ea3de05-f469-4df2-9548-db9c9863dfdf.png)`,
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//       backgroundRepeat: 'no-repeat',
//       color: 'white',
//       borderRadius: '15px',
//       marginBottom: '2rem',
//       boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
//       animation: 'fadeIn 1s ease-out',
//       position: 'relative',
//       overflow: 'hidden',
//       minHeight: '250px'
//     },
//     categorySection: {
//       margin: '3rem 0'
//     },
//     categoryTitle: {
//       textTransform: 'capitalize',
//       color: '#333',
//       marginBottom: '1.5rem',
//       paddingLeft: '1rem',
//       fontSize: '1.5rem'
//     },
//     productGrid: {
//       display: 'flex',
//       gap: '2rem',
//       padding: '1rem',
//       overflowX: 'auto',
//       scrollBehavior: 'smooth',
//     },
//     productCard: {
//       background: 'white',
//       borderRadius: '15px',
//       padding: '1.5rem',
//       minWidth: '280px',
//       transition: 'all 0.3s ease',
//       boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
//       flexShrink: 0
//     },
//     productImage: {
//       width: '100%',
//       height: '200px',
//       objectFit: 'contain',
//       borderRadius: '10px',
//       marginBottom: '1rem'
//     },
//     addToCartButton: {
//       background: '#27ae60',
//       color: 'white',
//       border: 'none',
//       padding: '0.8rem 1.5rem',
//       borderRadius: '25px',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       width: '100%'
//     },
//     quantityControl: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       gap: '1rem',
//       margin: '1rem 0'
//     },
//     quantityButton: {
//       padding: '0.5rem 1rem',
//       border: 'none',
//       background: '#3498db',
//       color: 'white',
//       borderRadius: '50%',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease'
//     }
//   };

//   //  Product Data
//   const products = {
//     smokingAccessories: [
//       {  id: 1,
//          name: "Designer Glass Pipe", 
//          price: 799, discount: "30% OFF", 
//          desc: "Artistic hand-blown glass pipe", 
//          image: "https://5.imimg.com/data5/SELLER/Default/2024/4/414234863/LU/MS/ZS/38899/designer-glass-smoking-pipes-250x250.jpg" 
//       },
//       { 
//         id: 2, 
//         name: "Premium Rolling Papers", 
//         price: 149, 
//         discount: "Pack of 10", 
//         desc: "Ultra-thin natural hemp papers", 
//         image: "https://jonnybaba.co.in/cdn/shop/products/Luxetransparentrollingpaper.jpg?v=1716138081&width=400" 
//       },
//       { 
//         id: 3, 
//         name: "Luxury Lighter", 
//         price: 1299, 
//         discount: "Free Engraving", 
//         desc: "Windproof butane lighter", 
//         image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQfdRJdDWxUSb6gGVv7OzrKE6dSDVtZssAnh9J05FYiTd4M1CsAdlfGDlxhj-pha1oXbA0XRKRWc1LUWXivM1zklQHZO0bJQCc0gm1KBjF-At7djmLKrVAD" 
//       },
//       { 
//         id: 4, 
//         name: "Herb Grinder", 
//         price: 599, 
//         discount: "4-Layer", 
//         desc: "Aircraft-grade aluminum", 
//         image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT0pmzDCNoODqIoFYW2QkXND5Kbm0c_WPCmX8QXSF4WlF5Dtgk0X471Vph1F8_H6_QnzPUIQNQPhkMugt1xOmDXL9Y-IenhIJDuYWwVbHx8nNWet0wsAhfK" 
//       },
//       { 
//         id: 5, 
//         name: "Smoke Filter", 
//         price: 299, 
//         discount: "5-Pack", 
//         desc: "Activated carbon filters", 
//         image: "https://c.media-amazon.com/images/I/81pQxgXHi7L._SX425_.jpg" 
//       }
//     ],
//     fresheners: [
//       { 
//         id: 6, 
//         name: "Rose Air Freshener", 
//         price: 199, discount: "100ml",
//         desc: "Long-lasting floral fragrance", 
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQALzlw64-940mQhwal_oR3y72_nDM47dhHe3s2r4-jqQZowguFXOc0mi0&usqp=CAE&s" 
//       },
//       { id: 7,
//          name: "Assorted Mithai Box",
//           price: 499, 
//           discount: "Festival Special", 
//           desc: "12 traditional sweets", 
//           image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeQWJzbj65jpUpZhujYGHGOATb7VvWHk088g&s" 
//         },
//       { 
//         id: 8, 
//         name: "Car Perfume",
//          price: 349, 
//          discount: "60% OFF", 
//          desc: "Leather scent capsule", 
//          image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTO_NZ__bEZODTNlnx2RRgy7Io_MZmjeZY6p2b83C0rdkALUUwlG0mhnDti05DFq1EBb5JfBCl9elQAYeK46oQAZs8UpwbMRUncURH_WiPsdPgW7oIetz2E" 
//         },
//       { 
//         id: 9,
//          name: "Organic Candies",
//           price: 149,
//            discount: "Sugar Free",
//             desc: "Mixed fruit flavors", 
//             image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQR4zX_X2WxKOTkDNIy4WWSrZYcDXyHA_NZLkTBXOUOQsW1km0NQESphIAo5rS4kap4lDVcasq4xRl9nhpw2Q3VkzByPnsCuOOM0eFVDUeATkTSWWlemCkqlxc" 
//           },
//       {
//          id: 10, 
//          name: "Scented Candles",
//           price: 899,
//            discount: "Triple Wick",
//             desc: "Sandalwood & Vanilla",
//              image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTp7MByttNlGwkkrx1W4QIgjpQ9h68BSkL0ZrSSOcwGA0POojHZA8bA88QFPLlX0vHrVCF-Gci1f04Qi8Wc72jlNqJ3tRAPcVtE_jCLcgNZcb9PTR_WHS_B" 
//             }
//     ],
//     mints: [
//       {
//          id: 11,
//           name: "Strong Mints",
//            price: 99, 
//            discount: "50% OFF",
//             desc: "Extra fresh breath", 
//             image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQE8YFMhJK25VT0KmETccPyrzDL-av4XrmTQS9RFwnKlsefxPUX9zAEijfvJdv--pp0nspbxCgRZRMON8zKv5JBPqocpSP2VVYVxgpbYOOve7DV4PjtXBx5CxE"
//        },
//       {
//          id: 12,
//           name: "CBD Gummies",
//            price: 499,
//             discount: "Relax Formula",
//              desc: "10mg per piece",
//               image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTNOQ11Pfc2pSSlGtqz9fnpzxEfgj1vrP6-yEvpvAUuSzGmp_vIlQ51seVRC7hLAFX6vwwZAyqRSOZhY7drXq8T-_de7wpD"
//        },
//       {
//         id: 13, 
//         name: "Breath Strips", 
//         price: 129,
//         discount: "24 Strips", 
//         desc: "Instant freshness", 
//         image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ_Oi0F4EYFMMGzPEnNM8qMKvbPMG6Pn5ih7-lKPH4EAQxSOhDxS6B6DPVUmncUNENBfvyFU7cCRuTIzSoLoS2RDc2-u5fEpdQj8scO213VjxNw2eovAYWq" 
//         },
//       { 
//         id: 14, 
//         name: "Mint Chocolates", 
//         price: 299, 
//         discount: "Gift Box", 
//         desc: "Dark chocolate mint",
//         image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTW8Yk742ApHykwIMhoPP1747F9flu4XZ-4pQZtDqFlVdsVuf24x3mPtcAEbrkLXNTjgHNgRm5tXQEbkBUDUgA0jReRb7rM4uj3js0ZEGI05PLKOcWoA6YK1w" 
//       },
//       {
//         id: 15,
//         name: "Herbal Mukhwas",
//         price: 199,
//         discount: "Ayurvedic",
//         desc: "Digestive freshener", 
//         image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSDj6wJHcHsYsd-9IyuhhKVT8ZHBV8Gi_dXCLDJSOR97K8RtX06re0aBvr2E2QwbNw8qYHelSCQ-8M3xpaQ5CyWP86uENxH30gg2wZJiNDLCrt499eT-eC4O-k"
//        }
//     ]
//   };


//   const handleHover = (productId, isHovering) => {
//     setHoverStates(prev => ({ ...prev, [productId]: isHovering }));
//   };

//   const handleQuantity = (productId, action) => {
//     setQuantities(prev => ({
//       ...prev,
//       [productId]: Math.max(0, action === 'inc' ? (prev[productId] || 0) + 1 : (prev[productId] || 0) - 1)
//     }));
//   };

//   const addToCartHandler = (product) => {
//     const quantity = quantities[product.id] || 1;
//     addToCart({ ...product, quantity });
//   };

//   return (
//     <div style={styles.container}>
//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         ::-webkit-scrollbar {
//           height: 8px;
//         }
//         ::-webkit-scrollbar-track {
//           background: #f1f1f1;
//           border-radius: 10px;
//         }
//         ::-webkit-scrollbar-thumb {
//           background: #888;
//           border-radius: 10px;
//         }
//       `}</style>

//       <header style={styles.header}>
//         <h1></h1>
//         <p></p> 
//       </header>

//       {Object.entries(products).map(([category, items]) => (
//         <section key={category} style={styles.categorySection}>
//           <h2 style={styles.categoryTitle}>
//             {category.replace(/([A-Z])/g, ' $1').toUpperCase()}
//           </h2>
//           <div style={styles.productGrid}>
//             {items.map(product => (
//               <div 
//                 key={product.id}
//                 style={{ 
//                   ...styles.productCard,
//                   transform: hoverStates[product.id] ? 'translateY(-10px)' : 'translateY(0)',
//                   boxShadow: hoverStates[product.id] ? '0 15px 30px rgba(0,0,0,0.15)' : '0 5px 15px rgba(0,0,0,0.1)'
//                 }}
//                 onMouseEnter={() => handleHover(product.id, true)}
//                 onMouseLeave={() => handleHover(product.id, false)}
//               >
//                 <img 
//                   src={product.image} 
//                   alt={product.name} 
//                   style={styles.productImage} 
//                 />
//                 <h3 style={{ margin: '0.5rem 0', color: '#333' }}>{product.name}</h3>
//                 <p style={{ color: '#666', fontSize: '0.9rem' }}>{product.desc}</p>
//                 <div style={{ margin: '1rem 0' }}>
//                   <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>₹{product.price}</span>
//                   <span style={{ marginLeft: '1rem', color: '#27ae60' }}>{product.discount}</span>
//                 </div>
//                 <div style={styles.quantityControl}>
//                   <button
//                     style={styles.quantityButton}
//                     onClick={() => handleQuantity(product.id, 'dec')}
//                   >
//                     -
//                   </button>
//                   <span>{quantities[product.id] || 1}</span>
//                   <button
//                     style={styles.quantityButton}
//                     onClick={() => handleQuantity(product.id, 'inc')}
//                   >
//                     +
//                   </button>
//                 </div>
//                 <button
//                   style={{ 
//                     ...styles.addToCartButton,
//                     transform: hoverStates[product.id] ? 'scale(1.05)' : 'scale(1)'
//                   }}
//                   onClick={() => addToCartHandler(product)}
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             ))}
//           </div>
//         </section>
//       ))}
//     </div>
//   );
// };

// export default PaanCorner;































import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';

const initializeStockData = (products) => {
  const initialStock = {};
  Object.values(products).flat().forEach(product => {
    initialStock[product.id] = 10;
  });
  return initialStock;
};
const products = {
  smokingAccessories: [
    {  
      id: 1,
      name: "Designer Glass Pipe", 
      price: 799, 
      discount: "30% OFF", 
      desc: "Artistic hand-blown glass pipe", 
      image: "https://5.imimg.com/data5/SELLER/Default/2024/4/414234863/LU/MS/ZS/38899/designer-glass-smoking-pipes-250x250.jpg" 
    },
    { 
      id: 2, 
      name: "Premium Rolling Papers", 
      price: 149, 
      discount: "Pack of 10", 
      desc: "Ultra-thin natural hemp papers", 
      image: "https://jonnybaba.co.in/cdn/shop/products/Luxetransparentrollingpaper.jpg?v=1716138081&width=400" 
    },
    { 
      id: 3, 
      name: "Luxury Lighter", 
      price: 1299, 
      discount: "Free Engraving", 
      desc: "Windproof butane lighter", 
      image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQfdRJdDWxUSb6gGVv7OzrKE6dSDVtZssAnh9J05FYiTd4M1CsAdlfGDlxhj-pha1oXbA0XRKRWc1LUWXivM1zklQHZO0bJQCc0gm1KBjF-At7djmLKrVAD" 
    },
    { 
      id: 4, 
      name: "Herb Grinder", 
      price: 599, 
      discount: "4-Layer", 
      desc: "Aircraft-grade aluminum", 
      image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT0pmzDCNoODqIoFYW2QkXND5Kbm0c_WPCmX8QXSF4WlF5Dtgk0X471Vph1F8_H6_QnzPUIQNQPhkMugt1xOmDXL9Y-IenhIJDuYWwVbHx8nNWet0wsAhfK" 
    },
    { 
      id: 5, 
      name: "Smoke Filter", 
      price: 299, 
      discount: "5-Pack", 
      desc: "Activated carbon filters", 
      image: "https://c.media-amazon.com/images/I/81pQxgXHi7L._SX425_.jpg" 
    }
  ],
  fresheners: [
    { 
      id: 6, 
      name: "Rose Air Freshener", 
      price: 199, 
      discount: "100ml",
      desc: "Long-lasting floral fragrance", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQALzlw64-940mQhwal_oR3y72_nDM47dhHe3s2r4-jqQZowguFXOc0mi0&usqp=CAE&s" 
    },
    { 
      id: 7,
      name: "Assorted Mithai Box",
      price: 499, 
      discount: "Festival Special", 
      desc: "12 traditional sweets", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeQWJzbj65jpUpZhujYGHGOATb7VvWHk088g&s" 
    },
    { 
      id: 8, 
      name: "Car Perfume",
      price: 349, 
      discount: "60% OFF", 
      desc: "Leather scent capsule", 
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTO_NZ__bEZODTNlnx2RRgy7Io_MZmjeZY6p2b83C0rdkALUUwlG0mhnDti05DFq1EBb5JfBCl9elQAYeK46oQAZs8UpwbMRUncURH_WiPsdPgW7oIetz2E" 
    },
    { 
      id: 9,
      name: "Organic Candies",
      price: 149,
      discount: "Sugar Free",
      desc: "Mixed fruit flavors", 
      image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQR4zX_X2WxKOTkDNIy4WWSrZYcDXyHA_NZLkTBXOUOQsW1km0NQESphIAo5rS4kap4lDVcasq4xRl9nhpw2Q3VkzByPnsCuOOM0eFVDUeATkTSWWlemCkqlxc" 
    },
    {
      id: 10, 
      name: "Scented Candles",
      price: 899,
      discount: "Triple Wick",
      desc: "Sandalwood & Vanilla",
      image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTp7MByttNlGwkkrx1W4QIgjpQ9h68BSkL0ZrSSOcwGA0POojHZA8bA88QFPLlX0vHrVCF-Gci1f04Qi8Wc72jlNqJ3tRAPcVtE_jCLcgNZcb9PTR_WHS_B" 
    }
  ],
  mints: [
    {
      id: 11,
      name: "Strong Mints",
      price: 99, 
      discount: "50% OFF",
      desc: "Extra fresh breath", 
      image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQE8YFMhJK25VT0KmETccPyrzDL-av4XrmTQS9RFwnKlsefxPUX9zAEijfvJdv--pp0nspbxCgRZRMON8zKv5JBPqocpSP2VVYVxgpbYOOve7DV4PjtXBx5CxE"
    },
    {
      id: 12,
      name: "CBD Gummies",
      price: 499,
      discount: "Relax Formula",
      desc: "10mg per piece",
      image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTNOQ11Pfc2pSSlGtqz9fnpzxEfgj1vrP6-yEvpvAUuSzGmp_vIlQ51seVRC7hLAFX6vwwZAyqRSOZhY7drXq8T-_de7wpD"
    },
    {
      id: 13, 
      name: "Breath Strips", 
      price: 129,
      discount: "24 Strips", 
      desc: "Instant freshness", 
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ_Oi0F4EYFMMGzPEnNM8qMKvbPMG6Pn5ih7-lKPH4EAQxSOhDxS6B6DPVUmncUNENBfvyFU7cCRuTIzSoLoS2RDc2-u5fEpdQj8scO213VjxNw2eovAYWq" 
    },
    { 
      id: 14, 
      name: "Mint Chocolates", 
      price: 299, 
      discount: "Gift Box", 
      desc: "Dark chocolate mint",
      image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTW8Yk742ApHykwIMhoPP1747F9flu4XZ-4pQZtDqFlVdsVuf24x3mPtcAEbrkLXNTjgHNgRm5tXQEbkBUDUgA0jReRb7rM4uj3js0ZEGI05PLKOcWoA6YK1w" 
    },
    {
      id: 15,
      name: "Herbal Mukhwas",
      price: 199,
      discount: "Ayurvedic",
      desc: "Digestive freshener", 
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSDj6wJHcHsYsd-9IyuhhKVT8ZHBV8Gi_dXCLDJSOR97K8RtX06re0aBvr2E2QwbNw8qYHelSCQ-8M3xpaQ5CyWP86uENxH30gg2wZJiNDLCrt499eT-eC4O-k"
    }
  ]
};

const PaanCorner = () => {  // Removed addToCart from props
  const dispatch = useDispatch();
  const [hoverStates, setHoverStates] = useState({});
  const [quantities, setQuantities] = useState({});
  const [showStockAlert, setShowStockAlert] = useState({});
  const [stockData, setStockData] = useState(() => initializeStockData(products));


  const styles = { 
    container: {
      maxWidth: '1500px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: '"Poppins", Arial, sans-serif',
      background: 'linear-gradient(to bottom, #f9f9f9, #fff)'
    },
    header: {
      textAlign: 'center',
      padding: '6rem 0',
      background: `url(https://cdn.zeptonow.com/production/tr:w-1280,ar-3840-705,pr-true,f-auto,q-80/inventory/banner/4ea3de05-f469-4df2-9548-db9c9863dfdf.png)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      color: 'white',
      borderRadius: '15px',
      marginBottom: '2rem',
      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
      animation: 'fadeIn 1s ease-out',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '250px'
    },
    categorySection: {
      margin: '3rem 0'
    },
    categoryTitle: {
      textTransform: 'capitalize',
      color: '#333',
      marginBottom: '1.5rem',
      paddingLeft: '1rem',
      fontSize: '1.5rem'
    },
    productGrid: {
      display: 'flex',
      gap: '2rem',
      padding: '1rem',
      overflowX: 'auto',
      scrollBehavior: 'smooth',
    },
    productCard: {
      background: 'white',
      borderRadius: '15px',
      padding: '1.5rem',
      minWidth: '280px',
      transition: 'all 0.3s ease',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
      flexShrink: 0,
      position: 'relative'
    },
    outOfStockOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255,255,255,0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '15px',
      zIndex: 1
    },
    outOfStockText: {
      backgroundColor: '#e74c3c',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      fontWeight: 'bold'
    },
    productImage: {
      width: '100%',
      height: '100px',
      objectFit: 'contain',
      borderRadius: '10px',
      marginBottom: '1rem'
    },
    addToCartButton: {
      background: '#27ae60',
      color: 'white',
      border: 'none',
      padding: '0.8rem 1.5rem',
      borderRadius: '25px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      width: '100%'
    },
    disabledAddToCartButton: {
      background: '#95a5a6',
      color: 'white',
      border: 'none',
      padding: '0.8rem 1.5rem',
      borderRadius: '25px',
      width: '100%',
      cursor: 'not-allowed'
    },
    quantityControl: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      margin: '1rem 0'
    },
    quantityButton: {
      padding: '0.5rem 1rem',
      border: 'none',
      background: '#3498db',
      color: 'white',
      borderRadius: '50%',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    disabledQuantityButton: {
      padding: '0.5rem 1rem',
      border: 'none',
      background: '#bdc3c7',
      color: 'white',
      borderRadius: '50%',
      cursor: 'not-allowed'
    },
    stockAlert: {
      color: '#e74c3c',
      fontSize: '0.8rem',
      textAlign: 'center',
      marginTop: '0.5rem'
    },
    stockInfo: {
      fontSize: '0.8rem',
      color: '#7f8c8d',
      textAlign: 'center',
      marginBottom: '0.5rem'
    }
  };

  const handleHover = (productId, isHovering) => {
    setHoverStates(prev => ({ ...prev, [productId]: isHovering }));
  };

  const handleQuantity = (productId, action) => {
    const current = quantities[productId] || 1;
    const available = stockData[productId];
    
    if(action === 'inc') {
      if(current < available) {
        setQuantities(prev => ({ ...prev, [productId]: current + 1 }));
        setShowStockAlert(prev => ({ ...prev, [productId]: false }));
      } else {
        setShowStockAlert(prev => ({ ...prev, [productId]: true }));
      }
    } 
    else if(action === 'dec' && current > 1) {
      setQuantities(prev => ({ ...prev, [productId]: current - 1 }));
      setShowStockAlert(prev => ({ ...prev, [productId]: false }));
    }
  };

  // Modified addToCartHandler with Redux dispatch
  const addToCartHandler = (product) => {
    const qty = quantities[product.id] || 1;
    if(qty > stockData[product.id]) {
      setShowStockAlert(prev => ({ ...prev, [product.id]: true }));
      return;
    }
    
    dispatch(addToCart({ 
      ...product, 
      quantity: qty,
      totalPrice: product.price * qty
    }));
    
    setStockData(prev => ({
      ...prev,
      [product.id]: Math.max(prev[product.id] - qty, 0)
    }));
    
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

   return (
    <div style={styles.container}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        ::-webkit-scrollbar {
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
      `}</style>

      <header style={styles.header}>
        <h1></h1>
        <p></p> 
      </header>

      {Object.entries(products).map(([category, items]) => (
        <section key={category} style={styles.categorySection}>
          <h2 style={styles.categoryTitle}>
            {category.replace(/([A-Z])/g, ' $1').toUpperCase()}
          </h2>
          <div style={styles.productGrid}>
            {items.map(product => {
              const stock = stockData[product.id];
              const qty = quantities[product.id] || 1;
              const outOfStock = stock <= 0;
              const hovering = hoverStates[product.id];

              return (
                <div 
                  key={product.id}
                  style={{ 
                    ...styles.productCard,
                    transform: hovering ? 'translateY(-10px)' : 'none',
                    boxShadow: hovering 
                      ? '0 15px 30px rgba(0,0,0,0.15)' 
                      : '0 5px 15px rgba(0,0,0,0.1)',
                    opacity: outOfStock ? 0.8 : 1
                  }}
                  onMouseEnter={() => handleHover(product.id, true)}
                  onMouseLeave={() => handleHover(product.id, false)}
                >
                  {outOfStock && (
                    <div style={styles.outOfStockOverlay}>
                      <span style={styles.outOfStockText}>OUT OF STOCK</span>
                    </div>
                  )}

                  <img 
                    src={product.image} 
                    alt={product.name} 
                    style={styles.productImage} 
                  />
                  <h3 style={{ margin: '0.5rem 0', color: '#333' }}>
                    {product.name}
                  </h3>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>
                    {product.desc}
                  </p>
                  <div style={{ margin: '1rem 0' }}>
                    <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>
                      ₹{product.price}
                    </span>
                    <span style={{ marginLeft: '1rem', color: '#27ae60' }}>
                      {product.discount}
                    </span>
                  </div>
                  
                  <div style={styles.stockInfo}>
                    {outOfStock ? 'Out of Stock' : `In Stock: ${stock}`}
                  </div>

                  <div style={styles.quantityControl}>
                    <button
                      style={outOfStock ? styles.disabledQuantityButton : styles.quantityButton}
                      onClick={() => handleQuantity(product.id, 'dec')}
                      disabled={outOfStock || qty <= 1}
                    >
                      -
                    </button>
                    <span>{qty}</span>
                    <button
                      style={outOfStock ? styles.disabledQuantityButton : styles.quantityButton}
                      onClick={() => handleQuantity(product.id, 'inc')}
                      disabled={outOfStock || qty >= stock}
                    >
                      +
                    </button>
                  </div>

                  {showStockAlert[product.id] && (
                    <div style={styles.stockAlert}>
                      Only {stock} available in stock!
                    </div>
                  )}

                  <button
                    style={{ 
                      ...(outOfStock 
                        ? styles.disabledAddToCartButton 
                        : styles.addToCartButton),
                      transform: hovering && !outOfStock ? 'scale(1.05)' : 'none'
                    }}
                    onClick={() => !outOfStock && addToCartHandler(product)}
                    disabled={outOfStock}
                  >
                    {outOfStock ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};

export default PaanCorner;