// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaTrash, FaCheckCircle, FaSyncAlt } from 'react-icons/fa';
// import Admin from './Admin';
// const AdminMainPage = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionFeedback, setActionFeedback] = useState(null);

//   // Fetch products from API
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:5005/api/products');
//         setProducts(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleDelete = async (productId) => {
//     try {
//       await axios.delete(`http://localhost:5005/api/products/Rs.{productId}`);
//       setProducts(prev => prev.filter(p => p._id !== productId));
//       showFeedback('Product deleted successfully!');
//     } catch (error) {
//       console.error('Error deleting product:', error);
//     }
//   };

//   const handleProceed = async (productId) => {
//     try {
//       await axios.post(`http://localhost:5005/api/products/confirm/Rs.{productId}`);
//       setProducts(prev => prev.filter(p => p._id !== productId));
//       showFeedback('Product confirmed and stored!');
//     } catch (error) {
//       console.error('Error confirming product:', error);
//     }
//   };

//   const showFeedback = (message) => {
//     setActionFeedback(message);
//     setTimeout(() => setActionFeedback(null), 2000);
//   };

//   return (
//     <div className="luxury-admin-main">
//       <motion.div 
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
//         className="admin-main-glass"
//       >
//         {/* Floating particles */}
//         <div className="particles">
//           {[...Array(15)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="particle"
//               initial={{ 
//                 opacity: 0,
//                 x: Math.random() * 100,
//                 y: Math.random() * 100,
//                 scale: Math.random() * 0.5 + 0.5
//               }}
//               animate={{ 
//                 opacity: [0, 0.3, 0],
//                 y: [Math.random() * 100, Math.random() * -100],
//                 x: [Math.random() * 100, Math.random() * -100],
//               }}
//               transition={{
//                 duration: Math.random() * 10 + 10,
//                 repeat: Infinity,
//                 repeatType: "reverse",
//                 ease: "linear"
//               }}
//             />
//           ))}
//         </div>

//         {/* Header */}
//         <motion.div 
//           className="admin-main-header"
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2, duration: 0.8 }}
//         >
//           <motion.h2
//             animate={{ 
//               textShadow: ['0 2px 10px rgba(99, 102, 241, 0.3)', '0 4px 20px rgba(99, 102, 241, 0.5)', '0 2px 10px rgba(99, 102, 241, 0.3)']
//             }}
//             transition={{ duration: 4, repeat: Infinity }}
//           >
//             Product Monitoring Dashboard
//           </motion.h2>
//           <p>Manage and confirm newly added products</p>
//         </motion.div>

//         {/* Product List */}
//         <div className="product-list">
//           {loading ? (
//             <motion.div 
//               className="loading-spinner"
//               animate={{ rotate: 360 }}
//               transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
//             >
//               <FaSyncAlt />
//             </motion.div>
//           ) : (
//             <AnimatePresence>
//               {products.map((product) => (
//                 <motion.div
//                   key={product._id}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.8 }}
//                   transition={{ duration: 0.4 }}
//                   className="product-card"
//                 >
//                   <div className="product-image">
//                     <img src={product.image} alt={product.name} />
//                   </div>
//                   <div className="product-details">
//                     <h3>{product.name}</h3>
//                     <p>{product.category}</p>
//                     <div className="price-tag">Rs.{product.price}</div>
//                   </div>
//                   <div className="product-actions">
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="delete-btn"
//                       onClick={() => handleDelete(product._id)}
//                     >
//                       <FaTrash />
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="proceed-btn"
//                       onClick={() => handleProceed(product._id)}
//                     >
//                       <FaCheckCircle />
//                     </motion.button>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           )}
//         </div>

//         {/* Action Feedback */}
//         <AnimatePresence>
//           {actionFeedback && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="action-feedback"
//             >
//               {actionFeedback}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>

//       <style jsx>{`
//         .luxury-admin-main {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           min-height: 100vh;
//           background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
//           padding: 2rem;
//           position: relative;
//           overflow: hidden;
//         }

//         .admin-main-glass {
//           max-width: 1200px;
//           width: 100%;
//           padding: 3rem;
//           background: linear-gradient(
//             135deg, 
//             rgba(255, 255, 255, 0.25), 
//             rgba(255, 255, 255, 0.15)
//           );
//           border-radius: 2.5rem;
//           backdrop-filter: blur(25px);
//           box-shadow: 
//             0 25px 45px rgba(0, 0, 0, 0.1),
//             inset 0 0 0 1px rgba(255, 255, 255, 0.4);
//           border: 1px solid rgba(255, 255, 255, 0.3);
//           position: relative;
//           overflow: hidden;
//         }

//         .admin-main-header {
//           text-align: center;
//           margin-bottom: 3rem;
//           h2 {
//             font-size: 2.2rem;
//             margin: 1rem 0 0.5rem;
//             font-weight: 700;
//             background: linear-gradient(to right, #6366f1, #FFD700);
//             -webkit-background-clip: text;
//             -webkit-text-fill-color: transparent;
//           }
//           p {
//             color: #64748b;
//             font-size: 1rem;
//           }
//         }

//         .product-list {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//           gap: 2rem;
//           padding: 1rem;
//         }

//         .product-card {
//           display: flex;
//           background: rgba(255, 255, 255, 0.1);
//           border-radius: 1.5rem;
//           padding: 1.5rem;
//           position: relative;
//           overflow: hidden;
//           transition: transform 0.3s ease;
//           border: 1px solid rgba(255, 255, 255, 0.3);
//         }

//         .product-card::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: linear-gradient(
//             45deg,
//             rgba(99, 102, 241, 0.1),
//             rgba(255, 215, 0, 0.05)
//           );
//           z-index: -1;
//         }

//         .product-image {
//           width: 100px;
//           height: 100px;
//           border-radius: 1rem;
//           overflow: hidden;
//           margin-right: 1.5rem;
//           img {
//             width: 100%;
//             height: 100%;
//             object-fit: cover;
//           }
//         }

//         .product-details {
//           flex: 1;
//           h3 {
//             margin: 0 0 0.5rem;
//             color: #1e293b;
//           }
//           p {
//             color: #64748b;
//             margin: 0 0 0.3rem;
//             font-size: 0.9rem;
//           }
//           .price-tag {
//             background: linear-gradient(45deg, #6366f1, #FFD700);
//             color: white;
//             padding: 0.3rem 0.8rem;
//             border-radius: 0.5rem;
//             display: inline-block;
//             font-weight: 600;
//             font-size: 0.9rem;
//           }
//         }

//         .product-actions {
//           display: flex;
//           flex-direction: column;
//           gap: 0.8rem;
//           margin-left: 1rem;
//           button {
//             border: none;
//             padding: 0.8rem;
//             border-radius: 0.8rem;
//             cursor: pointer;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             transition: all 0.3s ease;
//             font-size: 1.2rem;
//           }
//           .delete-btn {
//             background: #ff4757;
//             color: white;
//             &:hover {
//               background: #ff6b81;
//             }
//           }
//           .proceed-btn {
//             background: #2ed573;
//             color: white;
//             &:hover {
//               background: #7bed9f;
//             }
//           }
//         }

//         .loading-spinner {
//           position: absolute;
//           left: 50%;
//           top: 50%;
//           transform: translate(-50%, -50%);
//           font-size: 2.5rem;
//           color: #6366f1;
//         }

//         .action-feedback {
//           position: fixed;
//           bottom: 2rem;
//           left: 50%;
//           transform: translateX(-50%);
//           background: rgba(255, 255, 255, 0.9);
//           padding: 1rem 2rem;
//           border-radius: 2rem;
//           color: #2ed573;
//           font-weight: 600;
//           box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
//           border: 1px solid rgba(46, 213, 115, 0.3);
//         }

//         @media (max-width: 768px) {
//           .admin-main-glass {
//             padding: 2rem;
//           }
//           .product-card {
//             flex-direction: column;
//             align-items: center;
//             text-align: center;
//           }
//           .product-image {
//             margin-right: 0;
//             margin-bottom: 1rem;
//           }
//           .product-actions {
//             flex-direction: row;
//             margin-left: 0;
//             margin-top: 1rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AdminMainPage;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaSpinner, FaTrash, FaRocket } from 'react-icons/fa';

const AdminMainPage = () => {
  const [products, setProducts] = useState([]);
  const [processingId, setProcessingId] = useState(null);
  const [showProceedSuccess, setShowProceedSuccess] = useState(false);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('adminProducts')) || [];
    setProducts(savedProducts);
  }, []);

  const handleDelete = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
  };

  const handleProceed = async (id) => {
    setProcessingId(id);
    try {
      const productToProceed = products.find(product => product.id === id);
      await axios.post('http://localhost:5005/api/products', productToProceed);
      setShowProceedSuccess(true);
      setTimeout(() => setShowProceedSuccess(false), 3000);
      
      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
    } catch (error) {
      console.error('Error proceeding with product:', error);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="luxury-admin-container">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        className="admin-glass-panel"
      >
        {/* Floating particles background */}
        <div className="particles">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              initial={{ 
                opacity: 0,
                x: Math.random() * 100,
                y: Math.random() * 100,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{ 
                opacity: [0, 0.3, 0],
                y: [Math.random() * 100, Math.random() * -100],
                x: [Math.random() * 100, Math.random() * -100],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
            />
          ))}
        </div>

        <motion.div 
          className="admin-header"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="title-gradient"
          >
            Products Dashboard
          </motion.h2>
        </motion.div>

        <motion.div 
          className="card-container"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          <AnimatePresence>
            {products.map((product) => (
              <motion.div 
                key={product.id} 
                className="product-card"
                variants={{
                  hidden: { opacity: 0, y: 50, scale: 0.95 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { 
                      type: 'spring', 
                      stiffness: 150,
                      damping: 15
                    }
                  }
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ 
                  y: -5,
                  boxShadow: '0 15px 30px rgba(0,0,0,0.12)'
                }}
              >
                <motion.div
                  className="image-container"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="product-image"
                  />
                </motion.div>
                
                <div className="product-content">
                  <h3>{product.name}</h3>
                  <p>Category: {product.category}</p>
                  <p>Price: Rs.{product.price}</p>
                  
                  <div className="button-group">
                    <motion.button 
                      onClick={() => handleProceed(product.id)}
                      className="proceed-btn"
                      disabled={processingId === product.id}
                      whileHover={{ 
                        scale: 1.05,
                        background: 'linear-gradient(135deg, #4CAF50, #45a049)'
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {processingId === product.id ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1 }}
                        >
                          <FaSpinner className="spin" />
                        </motion.div>
                      ) : (
                        <>
                          <FaRocket className="icon-spacing" />
                          Proceed
                        </>
                      )}
                    </motion.button>

                    <motion.button 
                      onClick={() => handleDelete(product.id)}
                      className="delete-btn"
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: '#ff3333'
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaTrash className="icon-spacing" />
                      Delete
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {showProceedSuccess && (
            <motion.div
              className="success-toast"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 0.6 }}
              >
                <FaCheckCircle className="success-icon" />
              </motion.div>
              <span>Product Launched Successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>

        <style jsx global>{`
          :root {
            --primary: #4CAF50;
            --primary-hover: #45a049;
            --danger: #ff4444;
            --danger-hover: #cc0000;
            --gold: #FFD700;
            --platinum: #f8f9fa;
          }

          .luxury-admin-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            padding: 2rem;
            position: relative;
            overflow: hidden;
          }

          .admin-glass-panel {
            max-width: 1200px;
            width: 100%;
            padding: 3rem;
            background: linear-gradient(
              135deg, 
              rgba(255, 255, 255, 0.25), 
              rgba(255, 255, 255, 0.15)
            );
            border-radius: 2.5rem;
            backdrop-filter: blur(25px);
            box-shadow: 
              0 25px 45px rgba(0, 0, 0, 0.1),
              inset 0 0 0 1px rgba(255, 255, 255, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.3);
            position: relative;
            overflow: hidden;
            z-index: 1;
          }

          .admin-glass-panel::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
              to bottom right,
              rgba(99, 102, 241, 0.1),
              rgba(255, 255, 255, 0),
              rgba(255, 215, 0, 0.05)
            );
            transform: rotate(30deg);
            z-index: -1;
            animation: shimmer 15s infinite linear;
          }

          @keyframes shimmer {
            0% { transform: rotate(30deg) translateX(-50%) translateY(-50%); }
            100% { transform: rotate(30deg) translateX(50%) translateY(50%); }
          }

          .particles .particle {
            position: absolute;
            width: 6px;
            height: 6px;
            background: var(--gold);
            border-radius: 50%;
            filter: blur(1px);
          }

          .admin-header {
            text-align: center;
            margin-bottom: 3rem;
            h2 {
              font-size: 2.2rem;
              margin: 1rem 0 0.5rem;
              font-weight: 700;
            }
          }

          .title-gradient {
            background: linear-gradient(to right, var(--primary), var(--gold));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          }

          .card-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1.5rem;
          }

          .product-card {
            background: linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.95),
              rgba(245, 245, 245, 0.95)
            );
            border-radius: 1rem;
            padding: 1.5rem;
            border: 1px solid rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(10px);
            position: relative;
            overflow: hidden;
          }

          .product-card::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 50%;
            height: 100%;
            background: linear-gradient(
              to right,
              rgba(255, 255, 255, 0),
              rgba(255, 255, 255, 0.3),
              rgba(255, 255, 255, 0)
            );
            transform: skewX(-20deg);
            transition: 0.6s;
          }

          .product-card:hover::after {
            left: 150%;
          }

          .image-container {
            border-radius: 0.8rem;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .product-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
          }

          .product-content {
            padding: 1.5rem 0 0;
          }

          .button-group {
            display: flex;
            justify-content: space-between;
            margin-top: 1.5rem;
          }

          .proceed-btn, .delete-btn {
            display: flex;
            align-items: center;
            padding: 0.8rem 1.5rem;
            border-radius: 0.8rem;
            font-weight: 600;
            border: none;
            cursor: pointer;
            color: white;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
          }

          .proceed-btn {
            background: linear-gradient(135deg, var(--primary), var(--primary-hover));
          }

          .delete-btn {
            background: linear-gradient(135deg, var(--danger), var(--danger-hover));
          }

          .proceed-btn::before, .delete-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.3),
              transparent
            );
            transition: 0.6s;
          }

          .proceed-btn:hover::before, .delete-btn:hover::before {
            left: 100%;
          }

          .success-toast {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(245, 245, 245, 0.95));
            padding: 1.5rem 2rem;
            border-radius: 1.2rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(10px);
          }

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          .spin {
            animation: spin 1s linear infinite;
          }

          @media (max-width: 768px) {
            .admin-glass-panel {
              padding: 2rem;
            }
            
            .card-container {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </motion.div>
    </div>
  );
};

export default AdminMainPage;