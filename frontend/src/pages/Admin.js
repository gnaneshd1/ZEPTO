import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlusCircle, FaArrowRight, FaSave, FaTags, FaDollarSign, FaImage, FaTrash } from 'react-icons/fa';

const Admin = () => {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    image: ''
  });
  const [cart, setCart] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const addToCart = (e) => {
    e.preventDefault();
    if (product.name && product.category && product.price && product.image) {
      setCart(prev => [...prev, { ...product, id: Date.now() }]);
      setProduct({ name: '', category: '', price: '', image: '' });
    }
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const saveProducts = () => {
    if (cart.length === 0) return;
    
    // Get existing products from localStorage or initialize empty array
    const existingProducts = JSON.parse(localStorage.getItem('adminProducts')) || [];
    const updatedProducts = [...existingProducts, ...cart];
    
    localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
    setCart([]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
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

        {/* Header */}
        <motion.div 
          className="admin-header"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
          >
            <FaPlusCircle className="header-icon" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Add New Product
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Fill in the details below to add new items
          </motion.p>
        </motion.div>

        <form onSubmit={addToCart} className="admin-form">
          <div className="form-grid">
            {/* Name Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="form-group floating"
            >
              <div className="input-decoration"></div>
              <FaTags className="input-icon" />
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                placeholder=" "
                required
              />
              <label>Product Name</label>
              <span className="input-highlight"></span>
            </motion.div>

            {/* Category Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="form-group floating"
            >
              <div className="input-decoration"></div>
              <FaTags className="input-icon" />
              <input
                type="text"
                name="category"
                value={product.category}
                onChange={handleInputChange}
                placeholder=" "
                required
              />
              <label>Category</label>
              <span className="input-highlight"></span>
            </motion.div>

            {/* Price Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="form-group floating"
            >
              <div className="input-decoration"></div>
              <FaDollarSign className="input-icon" />
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                placeholder=" "
                min="0"
                step="0.01"
                required
              />
              <label>Price</label>
              <span className="input-highlight"></span>
            </motion.div>

            {/* Image Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="form-group floating"
            >
              <div className="input-decoration"></div>
              <FaImage className="input-icon" />
              <input
                type="url"
                name="image"
                value={product.image}
                onChange={handleInputChange}
                placeholder=" "
                required
              />
              <label>Image URL</label>
              <span className="input-highlight"></span>
            </motion.div>
          </div>

          <div className="button-group">
            <motion.button 
              type="submit"
              className="submit-btn"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <FaPlusCircle className="btn-icon" />
              Add to Cart
            </motion.button>

            <motion.button 
              type="button" 
              onClick={saveProducts}
              className="save-btn"
              disabled={cart.length === 0}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 25px -5px rgba(33, 150, 243, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <FaSave className="btn-icon" />
              Save All Products
            </motion.button>
          </div>
        </form>

        <div className="cart-container">
          <h3>Cart Items ({cart.length})</h3>
          <div className="cart-items-wrapper">
            <AnimatePresence>
              {cart.map(item => (
                <motion.div
                  key={item.id}
                  className="cart-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100?text=No+Image';
                    }} />
                  </div>
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p className="cart-item-category">{item.category}</p>
                    <p className="cart-item-price">${parseFloat(item.price).toFixed(2)}</p>
                  </div>
                  <button 
                    className="cart-item-remove" 
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    <FaTrash />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              className="success-message"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 0.8 }}
              >
                ✓
              </motion.div>
              <span>Products Saved Successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <style jsx>{`
        :root {
          --primary: #6366f1;
          --primary-hover: #4f46e5;
          --secondary: #2196F3;
          --gold: #FFD700;
          --text: #1e293b;
          --glass: rgba(255, 255, 255, 0.15);
          --error: #ef4444;
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
          max-width: 800px;
          width: 100%;
          padding: 3rem;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15));
          border-radius: 2.5rem;
          backdrop-filter: blur(25px);
          box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
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
        }
        .admin-header h2 {
          font-size: 2.2rem;
          background: linear-gradient(to right, var(--primary), var(--gold));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }
        .admin-header p {
          color: #64748b;
          margin: 0;
        }
        .header-icon {
          color: var(--gold);
          filter: drop-shadow(0 2px 8px rgba(255, 215, 0, 0.3));
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin-bottom: 2.5rem;
        }

        .form-group {
          position: relative;
        }
        .form-group .input-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
          z-index: 2;
        }
        .form-group .input-decoration {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(241, 245, 249, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 0.75rem;
          z-index: 1;
          pointer-events: none;
        }
        .form-group .input-highlight {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(to right, var(--primary), var(--gold));
          transition: width 0.4s ease;
          z-index: 3;
        }
        .form-group input {
          position: relative;
          width: 100%;
          padding: 1.5rem 1rem 1rem 3rem;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text);
          font-size: 1rem;
          z-index: 2;
        }
        .form-group input:focus ~ .input-icon {
          color: var(--gold);
        }
        .form-group input:focus ~ .input-highlight {
          width: 100%;
        }
        .form-group label {
          position: absolute;
          top: 1rem;
          left: 3rem;
          color: #64748b;
          transition: all 0.3s ease;
          z-index: 2;
          pointer-events: none;
        }
        .form-group input:focus ~ label,
        .form-group input:not(:placeholder-shown) ~ label {
          top: 0.5rem;
          left: 3rem;
          font-size: 0.75rem;
          color: var(--gold);
        }

        .button-group {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .submit-btn, .save-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1.2rem 2rem;
          border-radius: 1rem;
          color: white;
          font-weight: 600;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          backdrop-filter: blur(10px);
          transition: all 0.4s ease;
        }
        .submit-btn:disabled, .save-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .submit-btn {
          background: linear-gradient(135deg, var(--primary), var(--primary-hover));
        }
        .submit-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, var(--primary-hover), var(--primary));
        }

        .save-btn {
          background: linear-gradient(135deg, var(--secondary), #1976D2);
        }
        .save-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #1976D2, var(--secondary));
        }

        .btn-icon {
          font-size: 1.2rem;
        }

        .cart-container {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          padding: 1.5rem;
        }
        .cart-container h3 {
          margin-top: 0;
          margin-bottom: 1.5rem;
          color: var(--text);
        }

        .cart-items-wrapper {
          max-height: 300px;
          overflow-y: auto;
          padding-right: 0.5rem;
        }
        .cart-items-wrapper::-webkit-scrollbar {
          width: 6px;
        }
        .cart-items-wrapper::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .cart-items-wrapper::-webkit-scrollbar-thumb {
          background: var(--gold);
          border-radius: 3px;
        }

        .cart-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 0.8rem;
          padding: 1rem;
          margin-bottom: 1rem;
          position: relative;
        }
        .cart-item:last-child {
          margin-bottom: 0;
        }

        .cart-item-image {
          width: 60px;
          height: 60px;
          border-radius: 0.5rem;
          overflow: hidden;
          flex-shrink: 0;
        }
        .cart-item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cart-item-details {
          flex-grow: 1;
        }
        .cart-item-details h4 {
          margin: 0 0 0.25rem 0;
          color: var(--text);
          font-size: 1rem;
        }
        .cart-item-category {
          margin: 0;
          font-size: 0.8rem;
          color: #64748b;
        }
        .cart-item-price {
          margin: 0.25rem 0 0 0;
          font-weight: 600;
          color: var(--primary);
        }

        .cart-item-remove {
          background: none;
          border: none;
          color: #ef4444;
          cursor: pointer;
          font-size: 1rem;
          padding: 0.5rem;
          transition: all 0.2s ease;
          opacity: 0.7;
        }
        .cart-item-remove:hover {
          opacity: 1;
          transform: scale(1.1);
        }

        .success-message {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 2rem;
          padding: 1rem 2rem;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          color: #10b981;
          font-weight: 600;
          z-index: 100;
        }
        .success-message div {
          font-size: 1.5rem;
          line-height: 1;
        }

        @media (max-width: 768px) {
          .admin-glass-panel {
            padding: 2rem 1.5rem;
          }
          .form-grid {
            grid-template-columns: 1fr;
          }
          .button-group {
            flex-direction: column;
          }
          .cart-item {
            flex-direction: column;
            align-items: flex-start;
          }
          .cart-item-remove {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Admin;


















// import React, { useState } from 'react';
// import axios from 'axios';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaReact, FaTags, FaDollarSign, FaImage, FaPlusCircle, FaArrowRight } from 'react-icons/fa';

// const Admin = () => {
//   const [product, setProduct] = useState({
//     name: '',
//     category: '',
//     price: '',
//     image: '',
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
//       const response = await axios.post('http://localhost:5005/api/products', product);
//       console.log(response.data);
//       setShowSuccess(true);
//       setTimeout(() => setShowSuccess(false), 3000);
//       setProduct({ name: '', category: '', price: '', image: '' });
//     } catch (error) {
//       console.error('Error adding product:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="luxury-admin-container">
//       <motion.div 
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
//         className="admin-glass-panel"
//       >
//         {/* Floating particles background */}
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

//         {/* Header with elegant animation */}
//         <motion.div 
//           className="admin-header"
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2, duration: 0.8 }}
//         >
//           <motion.div
//             animate={{ 
//               rotate: [0, 5, -5, 0],
//               scale: [1, 1.05, 1]
//             }}
//             transition={{ 
//               duration: 4,
//               repeat: Infinity,
//               repeatType: "mirror",
//               ease: "easeInOut"
//             }}
//           >
//             <FaPlusCircle className="header-icon" />
//           </motion.div>
//           <motion.h2
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4, duration: 0.8 }}
//           >
//             Add New Product
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6, duration: 0.8 }}
//           >
//             Fill in the details below to add a new luxury item
//           </motion.p>
//         </motion.div>

//         <form onSubmit={handleSubmit} className="admin-form">
//           <div className="form-grid">
//             {/* Name Field */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.3, duration: 0.6 }}
//               className="form-group floating"
//             >
//               <div className="input-decoration"></div>
//               <FaReact className="input-icon" />
//               <input
//                 type="text"
//                 name="name"
//                 value={product.name}
//                 onChange={handleChange}
//                 placeholder=" "
//                 required
//               />
//               <label>Product Name</label>
//               <span className="input-highlight"></span>
//             </motion.div>

//             {/* Category Field */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.4, duration: 0.6 }}
//               className="form-group floating"
//             >
//               <div className="input-decoration"></div>
//               <FaTags className="input-icon" />
//               <input
//                 type="text"
//                 name="category"
//                 value={product.category}
//                 onChange={handleChange}
//                 placeholder=" "
//                 required
//               />
//               <label>Category</label>
//               <span className="input-highlight"></span>
//             </motion.div>

//             {/* Price Field */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.5, duration: 0.6 }}
//               className="form-group floating"
//             >
//               <div className="input-decoration"></div>
//               <FaDollarSign className="input-icon" />
//               <input
//                 type="number"
//                 name="price"
//                 value={product.price}
//                 onChange={handleChange}
//                 placeholder=" "
//                 required
//               />
//               <label>Price</label>
//               <span className="input-highlight"></span>
//             </motion.div>

//             {/* Image Field */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.6, duration: 0.6 }}
//               className="form-group floating"
//             >
//               <div className="input-decoration"></div>
//               <FaImage className="input-icon" />
//               <input
//                 type="text"
//                 name="image"
//                 value={product.image}
//                 onChange={handleChange}
//                 placeholder=" "
//                 required
//               />
//               <label>Image URL</label>
//               <span className="input-highlight"></span>
//             </motion.div>
//           </div>

//           {/* Submit Button */}
//           <motion.button 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.8, duration: 0.6 }}
//             whileHover={{ 
//               scale: 1.02,
//               boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)"
//             }}
//             whileTap={{ scale: 0.98 }}
//             type="submit" 
//             className="submit-btn"
//             disabled={isSubmitting}
//           >
//             <motion.span
//               animate={isSubmitting ? { opacity: 0 } : { opacity: 1 }}
//             >
//               Add Product
//             </motion.span>
//             <motion.div
//               className="btn-loader"
//               animate={isSubmitting ? { opacity: 1 } : { opacity: 0 }}
//             >
//               <div className="loader-circle"></div>
//             </motion.div>
//             <motion.span
//               animate={{ 
//                 x: [0, 5, 0],
//                 transition: { 
//                   duration: 2, 
//                   repeat: Infinity,
//                   ease: "easeInOut"
//                 } 
//               }}
//             >
//               <FaArrowRight className="btn-icon" />
//             </motion.span>
//           </motion.button>
//         </form>

//         {/* Success Animation */}
//         <AnimatePresence>
//           {showSuccess && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.8 }}
//               transition={{ type: "spring", stiffness: 300 }}
//               className="success-message"
//             >
//               <motion.div
//                 animate={{ 
//                   scale: [1, 1.1, 1],
//                   rotate: [0, 10, -10, 0]
//                 }}
//                 transition={{ duration: 0.8 }}
//               >
//                 ✓
//               </motion.div>
//               <span>Product Added Successfully</span>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>

//       <style jsx>{`
//         :root {
//           --primary: #6366f1;
//           --primary-light: #a5b4fc;
//           --primary-hover: #4f46e5;
//           --gold: #FFD700;
//           --platinum: #E5E4E2;
//           --text: #1e293b;
//           --glass: rgba(255, 255, 255, 0.15);
//         }

//         .luxury-admin-container {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           min-height: 100vh;
//           background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
//           padding: 2rem;
//           position: relative;
//           overflow: hidden;
//         }

//         .admin-glass-panel {
//           max-width: 800px;
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
//           z-index: 1;
//         }

//         .admin-glass-panel::before {
//           content: '';
//           position: absolute;
//           top: -50%;
//           left: -50%;
//           width: 200%;
//           height: 200%;
//           background: linear-gradient(
//             to bottom right,
//             rgba(99, 102, 241, 0.1),
//             rgba(255, 255, 255, 0),
//             rgba(255, 215, 0, 0.05)
//           );
//           transform: rotate(30deg);
//           z-index: -1;
//           animation: shimmer 15s infinite linear;
//         }

//         @keyframes shimmer {
//           0% { transform: rotate(30deg) translateX(-50%) translateY(-50%); }
//           100% { transform: rotate(30deg) translateX(50%) translateY(50%); }
//         }

//         .particles {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           overflow: hidden;
//           z-index: -1;
//         }

//         .particle {
//           position: absolute;
//           width: 6px;
//           height: 6px;
//           background: var(--gold);
//           border-radius: 50%;
//           filter: blur(1px);
//         }

//         .admin-header {
//           text-align: center;
//           margin-bottom: 3rem;
//           position: relative;
//           h2 {
//             font-size: 2.2rem;
//             margin: 1rem 0 0.5rem;
//             font-weight: 700;
//             background: linear-gradient(to right, var(--primary), var(--gold));
//             -webkit-background-clip: text;
//             -webkit-text-fill-color: transparent;
//             text-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
//           }
//           p {
//             color: #64748b;
//             margin: 0;
//             font-size: 1rem;
//             letter-spacing: 0.5px;
//           }
//           .header-icon {
//             font-size: 3rem;
//             color: var(--gold);
//             filter: drop-shadow(0 2px 8px rgba(255, 215, 0, 0.3));
//           }
//         }

//         .form-grid {
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 2rem;
//           margin-bottom: 2.5rem;
//         }

//         .form-group {
//           position: relative;
//           .input-icon {
//             position: absolute;
//             left: 1.2rem;
//             top: 50%;
//             transform: translateY(-50%);
//             color: #94a3b8;
//             z-index: 2;
//             transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
//           }

//           .input-decoration {
//             position: absolute;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background: rgba(241, 245, 249, 0.2);
//             border-radius: 1rem;
//             z-index: 0;
//             border: 1px solid rgba(255, 255, 255, 0.4);
//             transition: all 0.4s ease;
//             box-shadow: 
//               inset 0 1px 2px rgba(255, 255, 255, 0.3),
//               0 2px 4px rgba(0, 0, 0, 0.05);
//           }

//           .input-highlight {
//             position: absolute;
//             bottom: 0;
//             left: 0;
//             width: 0;
//             height: 2px;
//             background: linear-gradient(to right, var(--primary), var(--gold));
//             transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
//             z-index: 3;
//           }

//           input {
//             position: relative;
//             width: 100%;
//             padding: 1.2rem 1.2rem 1.2rem 3.5rem;
//             border: none;
//             background: transparent;
//             border-radius: 1rem;
//             font-size: 1rem;
//             transition: all 0.4s ease;
//             z-index: 1;
//             color: var(--text);
//             font-weight: 500;
            
//             &:focus {
//               outline: none;
//               ~ .input-decoration {
//                 border-color: rgba(99, 102, 241, 0.5);
//                 box-shadow: 
//                   inset 0 1px 2px rgba(255, 255, 255, 0.4),
//                   0 5px 15px rgba(99, 102, 241, 0.1);
//               }
//               ~ .input-highlight {
//                 width: 100%;
//               }
//               ~ .input-icon {
//                 color: var(--gold);
//                 transform: translateY(-50%) scale(1.2);
//               }
//               ~ label {
//                 color: var(--gold);
//               }
//             }
//           }

//           label {
//             position: absolute;
//             left: 3.5rem;
//             top: 1.2rem;
//             pointer-events: none;
//             transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
//             background: linear-gradient(to bottom, rgba(241, 245, 249, 0.9), rgba(241, 245, 249, 0.7));
//             padding: 0 0.5rem;
//             color: #64748b;
//             z-index: 1;
//             font-size: 0.9rem;
//           }

//           input:placeholder-shown + label {
//             top: 1.3rem;
//             left: 3.5rem;
//             font-size: 1rem;
//           }

//           input:focus + label,
//           input:not(:placeholder-shown) + label {
//             top: -0.7rem;
//             left: 1rem;
//             font-size: 0.75rem;
//             color: var(--gold);
//             font-weight: 600;
//             z-index: 4;
//             text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
//           }
//         }

//         .submit-btn {
//           position: relative;
//           width: 100%;
//           padding: 1.2rem;
//           background: linear-gradient(135deg, var(--primary), var(--primary-hover));
//           color: white;
//           border: none;
//           border-radius: 1rem;
//           font-size: 1.1rem;
//           font-weight: 600;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 0.8rem;
//           transition: all 0.4s ease;
//           overflow: hidden;
//           box-shadow: 
//             0 4px 6px rgba(0, 0, 0, 0.1),
//             0 1px 3px rgba(0, 0, 0, 0.08);
//           z-index: 1;
          
//           &::before {
//             content: '';
//             position: absolute;
//             top: 0;
//             left: -100%;
//             width: 100%;
//             height: 100%;
//             background: linear-gradient(
//               90deg,
//               transparent,
//               rgba(255, 255, 255, 0.2),
//               transparent
//             );
//             transition: 0.6s;
//             z-index: -1;
//           }
          
//           &:hover {
//             background: linear-gradient(135deg, var(--primary-hover), #7c3aed);
//             box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.4);
            
//             &::before {
//               left: 100%;
//             }
//           }
          
//           .btn-icon {
//             transition: transform 0.3s ease;
//           }
          
//           &:disabled {
//             background: linear-gradient(135deg, #a5b4fc, #818cf8);
//             cursor: not-allowed;
//           }
//         }

//         .btn-loader {
//           position: absolute;
//           display: flex;
//           align-items: center;
//           justify-content: center;
          
//           .loader-circle {
//             width: 20px;
//             height: 20px;
//             border: 3px solid rgba(255, 255, 255, 0.3);
//             border-radius: 50%;
//             border-top-color: white;
//             animation: spin 1s ease-in-out infinite;
//           }
//         }

//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }

//         .success-message {
//           position: absolute;
//           bottom: 2rem;
//           left: 50%;
//           transform: translateX(-50%);
//           background: rgba(255, 255, 255, 0.9);
//           padding: 1rem 2rem;
//           border-radius: 2rem;
//           display: flex;
//           align-items: center;
//           gap: 0.8rem;
//           box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
//           border: 1px solid rgba(255, 255, 255, 0.3);
          
//           div {
//             font-size: 1.5rem;
//             color: var(--gold);
//             font-weight: bold;
//           }
          
//           span {
//             color: var(--text);
//             font-weight: 500;
//             white-space: nowrap;
//           }
//         }

//         @media (max-width: 768px) {
//           .form-grid {
//             grid-template-columns: 1fr;
//             gap: 1.5rem;
//           }
          
//           .admin-glass-panel {
//             padding: 2rem;
//           }
          
//           .luxury-admin-container {
//             padding: 1rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Admin;



































// import React, { useState } from 'react';
// import axios from 'axios';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaReact, FaTags, FaDollarSign, FaImage, FaPlusCircle, FaArrowRight, FaTrash, FaShoppingCart } from 'react-icons/fa';

// const Admin = () => {
//   const [product, setProduct] = useState({
//     name: '',
//     category: '',
//     price: '',
//     image: '',
//   });

//   const [cart, setCart] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [activeTab, setActiveTab] = useState('add');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct(prev => ({ ...prev, [name]: value }));
//   };

//   const addToCart = () => {
//     if (product.name && product.category && product.price) {
//       const newProduct = {
//         ...product,
//         id: Date.now(),
//         price: parseFloat(product.price).toFixed(2),
//         status: 'pending' // Add status field for AdminMainPage
//       };
//       setCart([...cart, newProduct]);
//       setProduct({ name: '', category: '', price: '', image: '' });
//     }
//   };

//   const removeFromCart = (id) => {
//     setCart(cart.filter(item => item.id !== id));
//   };

//   const submitProducts = async () => {
//     if (cart.length === 0) return;
    
//     setIsSubmitting(true);
    
//     try {
//       // Send products to the same endpoint used in AdminMainPage
//       const response = await axios.post('http://localhost:5005/api/products', {
//         products: cart
//       });
      
//       console.log('Products submitted:', response.data);
//       setShowSuccess(true);
//       setTimeout(() => setShowSuccess(false), 3000);
//       setCart([]);
//     } catch (error) {
//       console.error('Error adding products:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="luxury-admin-container">
//       <motion.div 
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
//         className="admin-glass-panel"
//       >
//         {/* Floating particles background */}
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

//         {/* Tabs */}
//         <div className="admin-tabs">
//           <button 
//             className={`tab-btn ${activeTab === 'add' ? 'active' : ''}`}
//             onClick={() => setActiveTab('add')}
//           >
//             Add Product
//           </button>
//           <button 
//             className={`tab-btn ${activeTab === 'cart' ? 'active' : ''}`}
//             onClick={() => setActiveTab('cart')}
//           >
//             <FaShoppingCart /> Cart ({cart.length})
//           </button>
//         </div>

//         {/* Header with elegant animation */}
//         <motion.div 
//           className="admin-header"
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2, duration: 0.8 }}
//         >
//           <motion.div
//             animate={{ 
//               rotate: [0, 5, -5, 0],
//               scale: [1, 1.05, 1]
//             }}
//             transition={{ 
//               duration: 4,
//               repeat: Infinity,
//               repeatType: "mirror",
//               ease: "easeInOut"
//             }}
//           >
//             <FaPlusCircle className="header-icon" />
//           </motion.div>
//           <motion.h2
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4, duration: 0.8 }}
//           >
//             {activeTab === 'add' ? 'Add New Product' : 'Product Cart'}
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6, duration: 0.8 }}
//           >
//             {activeTab === 'add' 
//               ? 'Fill in the details below to add a new luxury item' 
//               : `You have ${cart.length} items ready to submit`}
//           </motion.p>
//         </motion.div>

//         {activeTab === 'add' ? (
//           <form onSubmit={(e) => { e.preventDefault(); addToCart(); }} className="admin-form">
//             <div className="form-grid">
//               {/* Name Field */}
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.3, duration: 0.6 }}
//                 className="form-group floating"
//               >
//                 <div className="input-decoration"></div>
//                 <FaReact className="input-icon" />
//                 <input
//                   type="text"
//                   name="name"
//                   value={product.name}
//                   onChange={handleChange}
//                   placeholder=" "
//                   required
//                 />
//                 <label>Product Name</label>
//                 <span className="input-highlight"></span>
//               </motion.div>

//               {/* Category Field */}
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.4, duration: 0.6 }}
//                 className="form-group floating"
//               >
//                 <div className="input-decoration"></div>
//                 <FaTags className="input-icon" />
//                 <input
//                   type="text"
//                   name="category"
//                   value={product.category}
//                   onChange={handleChange}
//                   placeholder=" "
//                   required
//                 />
//                 <label>Category</label>
//                 <span className="input-highlight"></span>
//               </motion.div>

//               {/* Price Field */}
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.5, duration: 0.6 }}
//                 className="form-group floating"
//               >
//                 <div className="input-decoration"></div>
//                 <FaDollarSign className="input-icon" />
//                 <input
//                   type="number"
//                   name="price"
//                   value={product.price}
//                   onChange={handleChange}
//                   placeholder=" "
//                   required
//                   min="0"
//                   step="0.01"
//                 />
//                 <label>Price</label>
//                 <span className="input-highlight"></span>
//               </motion.div>

//               {/* Image Field */}
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.6, duration: 0.6 }}
//                 className="form-group floating"
//               >
//                 <div className="input-decoration"></div>
//                 <FaImage className="input-icon" />
//                 <input
//                   type="text"
//                   name="image"
//                   value={product.image}
//                   onChange={handleChange}
//                   placeholder=" "
//                 />
//                 <label>Image URL (Optional)</label>
//                 <span className="input-highlight"></span>
//               </motion.div>
//             </div>

//             {/* Add to Cart Button */}
//             <motion.button 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.8, duration: 0.6 }}
//               whileHover={{ 
//                 scale: 1.02,
//                 boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)"
//               }}
//               whileTap={{ scale: 0.98 }}
//               type="submit" 
//               className="submit-btn"
//             >
//               <motion.span>
//                 Add to Cart
//               </motion.span>
//               <motion.span
//                 animate={{ 
//                   x: [0, 5, 0],
//                   transition: { 
//                     duration: 2, 
//                     repeat: Infinity,
//                     ease: "easeInOut"
//                   } 
//                 }}
//               >
//                 <FaArrowRight className="btn-icon" />
//               </motion.span>
//             </motion.button>
//           </form>
//         ) : (
//           <div className="cart-container">
//             {cart.length === 0 ? (
//               <div className="empty-cart">
//                 <motion.div
//                   animate={{ 
//                     scale: [1, 1.05, 1],
//                     transition: { duration: 2, repeat: Infinity }
//                   }}
//                 >
//                   <FaShoppingCart size={48} color="#94a3b8" />
//                 </motion.div>
//                 <p>Your cart is empty</p>
//                 <button 
//                   className="back-to-add-btn"
//                   onClick={() => setActiveTab('add')}
//                 >
//                   Add Products
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <div className="cart-items">
//                   {cart.map(item => (
//                     <motion.div 
//                       key={item.id}
//                       className="cart-item"
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, x: -20 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <div className="item-image">
//                         {item.image ? (
//                           <img src={item.image} alt={item.name} onError={(e) => {
//                             e.target.src = 'https://via.placeholder.com/80?text=No+Image';
//                           }} />
//                         ) : (
//                           <div className="image-placeholder">
//                             <FaImage size={24} />
//                           </div>
//                         )}
//                       </div>
//                       <div className="item-info">
//                         <h4>{item.name}</h4>
//                         <div className="item-details">
//                           <span className="category">{item.category}</span>
//                           <span className="price">${item.price}</span>
//                         </div>
//                       </div>
//                       <button 
//                         className="remove-btn"
//                         onClick={() => removeFromCart(item.id)}
//                       >
//                         <FaTrash />
//                       </button>
//                     </motion.div>
//                   ))}
//                 </div>
                
//                 <div className="cart-summary">
//                   <div className="total-items">
//                     Total Items: <span>{cart.length}</span>
//                   </div>
//                   <div className="total-price">
//                     Total Price: <span>${cart.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2)}</span>
//                   </div>
//                 </div>
                
//                 <motion.button 
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.2, duration: 0.6 }}
//                   whileHover={{ 
//                     scale: 1.02,
//                     boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)"
//                   }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={submitProducts}
//                   className="submit-cart-btn"
//                   disabled={isSubmitting || cart.length === 0}
//                 >
//                   <motion.span
//                     animate={isSubmitting ? { opacity: 0 } : { opacity: 1 }}
//                   >
//                     Submit All Products
//                   </motion.span>
//                   <motion.div
//                     className="btn-loader"
//                     animate={isSubmitting ? { opacity: 1 } : { opacity: 0 }}
//                   >
//                     <div className="loader-circle"></div>
//                   </motion.div>
//                 </motion.button>
//               </>
//             )}
//           </div>
//         )}

//         {/* Success Animation */}
//         <AnimatePresence>
//           {showSuccess && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.8 }}
//               transition={{ type: "spring", stiffness: 300 }}
//               className="success-message"
//             >
//               <motion.div
//                 animate={{ 
//                   scale: [1, 1.1, 1],
//                   rotate: [0, 10, -10, 0]
//                 }}
//                 transition={{ duration: 0.8 }}
//               >
//                 ✓
//               </motion.div>
//               <span>{cart.length > 1 ? 'Products Added Successfully' : 'Product Added Successfully'}</span>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>

//       <style jsx>{`
//         :root {
//           --primary: #6366f1;
//           --primary-light: #a5b4fc;
//           --primary-hover: #4f46e5;
//           --gold: #FFD700;
//           --platinum: #E5E4E2;
//           --text: #1e293b;
//           --glass: rgba(255, 255, 255, 0.15);
//         }

//         .luxury-admin-container {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           min-height: 100vh;
//           background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
//           padding: 2rem;
//           position: relative;
//           overflow: hidden;
//         }

//         .admin-glass-panel {
//           max-width: 800px;
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
//           z-index: 1;
//         }

//         .admin-glass-panel::before {
//           content: '';
//           position: absolute;
//           top: -50%;
//           left: -50%;
//           width: 200%;
//           height: 200%;
//           background: linear-gradient(
//             to bottom right,
//             rgba(99, 102, 241, 0.1),
//             rgba(255, 255, 255, 0),
//             rgba(255, 215, 0, 0.05)
//           );
//           transform: rotate(30deg);
//           z-index: -1;
//           animation: shimmer 15s infinite linear;
//         }

//         @keyframes shimmer {
//           0% { transform: rotate(30deg) translateX(-50%) translateY(-50%); }
//           100% { transform: rotate(30deg) translateX(50%) translateY(50%); }
//         }

//         .particles {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           overflow: hidden;
//           z-index: -1;
//         }

//         .particle {
//           position: absolute;
//           width: 6px;
//           height: 6px;
//           background: var(--gold);
//           border-radius: 50%;
//           filter: blur(1px);
//         }

//         .admin-tabs {
//           display: flex;
//           margin-bottom: 1.5rem;
//           border-bottom: 1px solid rgba(255, 255, 255, 0.3);
//         }

//         .tab-btn {
//           flex: 1;
//           padding: 0.8rem;
//           background: transparent;
//           border: none;
//           border-bottom: 3px solid transparent;
//           font-size: 1rem;
//           font-weight: 600;
//           color: #64748b;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 0.5rem;
//           transition: all 0.3s ease;

//           &:hover {
//             color: var(--primary);
//           }

//           &.active {
//             color: var(--primary);
//             border-bottom-color: var(--gold);
//           }
//         }

//         .admin-header {
//           text-align: center;
//           margin-bottom: 3rem;
//           position: relative;
//           h2 {
//             font-size: 2.2rem;
//             margin: 1rem 0 0.5rem;
//             font-weight: 700;
//             background: linear-gradient(to right, var(--primary), var(--gold));
//             -webkit-background-clip: text;
//             -webkit-text-fill-color: transparent;
//             text-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
//           }
//           p {
//             color: #64748b;
//             margin: 0;
//             font-size: 1rem;
//             letter-spacing: 0.5px;
//           }
//           .header-icon {
//             font-size: 3rem;
//             color: var(--gold);
//             filter: drop-shadow(0 2px 8px rgba(255, 215, 0, 0.3));
//           }
//         }

//         .form-grid {
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 2rem;
//           margin-bottom: 2.5rem;
//         }

//         .form-group {
//           position: relative;
//           .input-icon {
//             position: absolute;
//             left: 1.2rem;
//             top: 50%;
//             transform: translateY(-50%);
//             color: #94a3b8;
//             z-index: 2;
//             transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
//           }

//           .input-decoration {
//             position: absolute;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background: rgba(241, 245, 249, 0.2);
//             border-radius: 1rem;
//             z-index: 0;
//             border: 1px solid rgba(255, 255, 255, 0.4);
//             transition: all 0.4s ease;
//             box-shadow: 
//               inset 0 1px 2px rgba(255, 255, 255, 0.3),
//               0 2px 4px rgba(0, 0, 0, 0.05);
//           }

//           .input-highlight {
//             position: absolute;
//             bottom: 0;
//             left: 0;
//             width: 0;
//             height: 2px;
//             background: linear-gradient(to right, var(--primary), var(--gold));
//             transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
//             z-index: 3;
//           }

//           input {
//             position: relative;
//             width: 100%;
//             padding: 1.2rem 1.2rem 1.2rem 3.5rem;
//             border: none;
//             background: transparent;
//             border-radius: 1rem;
//             font-size: 1rem;
//             transition: all 0.4s ease;
//             z-index: 1;
//             color: var(--text);
//             font-weight: 500;
            
//             &:focus {
//               outline: none;
//               ~ .input-decoration {
//                 border-color: rgba(99, 102, 241, 0.5);
//                 box-shadow: 
//                   inset 0 1px 2px rgba(255, 255, 255, 0.4),
//                   0 5px 15px rgba(99, 102, 241, 0.1);
//               }
//               ~ .input-highlight {
//                 width: 100%;
//               }
//               ~ .input-icon {
//                 color: var(--gold);
//                 transform: translateY(-50%) scale(1.2);
//               }
//               ~ label {
//                 color: var(--gold);
//               }
//             }
//           }

//           label {
//             position: absolute;
//             left: 3.5rem;
//             top: 1.2rem;
//             pointer-events: none;
//             transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
//             background: linear-gradient(to bottom, rgba(241, 245, 249, 0.9), rgba(241, 245, 249, 0.7));
//             padding: 0 0.5rem;
//             color: #64748b;
//             z-index: 1;
//             font-size: 0.9rem;
//           }

//           input:placeholder-shown + label {
//             top: 1.3rem;
//             left: 3.5rem;
//             font-size: 1rem;
//           }

//           input:focus + label,
//           input:not(:placeholder-shown) + label {
//             top: -0.7rem;
//             left: 1rem;
//             font-size: 0.75rem;
//             color: var(--gold);
//             font-weight: 600;
//             z-index: 4;
//             text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
//           }
//         }

//         .submit-btn {
//           position: relative;
//           width: 100%;
//           padding: 1.2rem;
//           background: linear-gradient(135deg, var(--primary), var(--primary-hover));
//           color: white;
//           border: none;
//           border-radius: 1rem;
//           font-size: 1.1rem;
//           font-weight: 600;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 0.8rem;
//           transition: all 0.4s ease;
//           overflow: hidden;
//           box-shadow: 
//             0 4px 6px rgba(0, 0, 0, 0.1),
//             0 1px 3px rgba(0, 0, 0, 0.08);
//           z-index: 1;
          
//           &::before {
//             content: '';
//             position: absolute;
//             top: 0;
//             left: -100%;
//             width: 100%;
//             height: 100%;
//             background: linear-gradient(
//               90deg,
//               transparent,
//               rgba(255, 255, 255, 0.2),
//               transparent
//             );
//             transition: 0.6s;
//             z-index: -1;
//           }
          
//           &:hover {
//             background: linear-gradient(135deg, var(--primary-hover), #7c3aed);
//             box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.4);
            
//             &::before {
//               left: 100%;
//             }
//           }
          
//           .btn-icon {
//             transition: transform 0.3s ease;
//           }
          
//           &:disabled {
//             background: linear-gradient(135deg, #a5b4fc, #818cf8);
//             cursor: not-allowed;
//           }
//         }

//         .btn-loader {
//           position: absolute;
//           display: flex;
//           align-items: center;
//           justify-content: center;
          
//           .loader-circle {
//             width: 20px;
//             height: 20px;
//             border: 3px solid rgba(255, 255, 255, 0.3);
//             border-radius: 50%;
//             border-top-color: white;
//             animation: spin 1s ease-in-out infinite;
//           }
//         }

//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }

//         /* Cart Styles */
//         .cart-container {
//           display: flex;
//           flex-direction: column;
//           gap: 1.5rem;
//         }

//         .empty-cart {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           padding: 3rem 0;
//           color: #64748b;
//           gap: 1rem;

//           p {
//             font-size: 1.2rem;
//             margin: 0;
//           }
//         }

//         .back-to-add-btn {
//           padding: 0.8rem 1.5rem;
//           background: var(--primary);
//           color: white;
//           border: none;
//           border-radius: 0.8rem;
//           font-size: 1rem;
//           font-weight: 500;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           margin-top: 1rem;

//           &:hover {
//             background: var(--primary-hover);
//             transform: translateY(-2px);
//           }
//         }

//         .cart-items {
//           display: flex;
//           flex-direction: column;
//           gap: 1rem;
//           max-height: 300px;
//           overflow-y: auto;
//           padding-right: 0.5rem;

//           &::-webkit-scrollbar {
//             width: 6px;
//           }

//           &::-webkit-scrollbar-track {
//             background: rgba(255, 255, 255, 0.1);
//             border-radius: 10px;
//           }

//           &::-webkit-scrollbar-thumb {
//             background: rgba(99, 102, 241, 0.4);
//             border-radius: 10px;
//           }
//         }

//         .cart-item {
//           display: flex;
//           align-items: center;
//           padding: 1rem;
//           background: rgba(255, 255, 255, 0.2);
//           border-radius: 1rem;
//           border: 1px solid rgba(255, 255, 255, 0.3);
//           transition: all 0.3s ease;
//           gap: 1rem;

//           &:hover {
//             background: rgba(255, 255, 255, 0.3);
//             transform: translateY(-2px);
//           }
//         }

//         .item-image {
//           width: 60px;
//           height: 60px;
//           border-radius: 0.8rem;
//           overflow: hidden;
//           flex-shrink: 0;
//           background: rgba(255, 255, 255, 0.2);
//           display: flex;
//           align-items: center;
//           justify-content: center;
          
//           img {
//             width: 100%;
//             height: 100%;
//             object-fit: cover;
//           }

//           .image-placeholder {
//             width: 100%;
//             height: 100%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             color: #94a3b8;
//             background: rgba(241, 245, 249, 0.3);
//           }
//         }

//         .item-info {
//           flex: 1;
//           min-width: 0;

//           h4 {
//             margin: 0 0 0.5rem 0;
//             color: var(--text);
//             font-size: 1.1rem;
//             white-space: nowrap;
//             overflow: hidden;
//             text-overflow: ellipsis;
//           }
//         }

//         .item-details {
//           display: flex;
//           gap: 1rem;
//           font-size: 0.9rem;

//           .category {
//             color: #64748b;
//             background: rgba(100, 116, 139, 0.1);
//             padding: 0.2rem 0.5rem;
//             border-radius: 0.5rem;
//           }

//           .price {
//             color: var(--primary);
//             font-weight: 600;
//           }
//         }

//         .remove-btn {
//           background: none;
//           border: none;
//           color: #ef4444;
//           cursor: pointer;
//           font-size: 1rem;
//           padding: 0.5rem;
//           border-radius: 50%;
//           transition: all 0.3s ease;
//           flex-shrink: 0;

//           &:hover {
//             background: rgba(239, 68, 68, 0.1);
//             transform: scale(1.1);
//           }
//         }

//         .cart-summary {
//           display: flex;
//           justify-content: space-between;
//           padding: 1rem 0;
//           border-top: 1px solid rgba(255, 255, 255, 0.3);
//           margin-top: 1rem;

//           div {
//             font-size: 1.1rem;
//             font-weight: 500;
//             color: var(--text);

//             span {
//               font-weight: 600;
//               color: var(--primary);
//             }
//           }
//         }

//         .submit-cart-btn {
//           position: relative;
//           width: 100%;
//           padding: 1.2rem;
//           background: linear-gradient(135deg, var(--primary), var(--primary-hover));
//           color: white;
//           border: none;
//           border-radius: 1rem;
//           font-size: 1.1rem;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.4s ease;
//           overflow: hidden;
//           box-shadow: 
//             0 4px 6px rgba(0, 0, 0, 0.1),
//             0 1px 3px rgba(0, 0, 0, 0.08);
          
//           &:hover:not(:disabled) {
//             background: linear-gradient(135deg, var(--primary-hover), #7c3aed);
//             box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.4);
//           }
          
//           &:disabled {
//             background: linear-gradient(135deg, #a5b4fc, #818cf8);
//             cursor: not-allowed;
//             opacity: 0.7;
//           }
//         }

//         .success-message {
//           position: absolute;
//           bottom: 2rem;
//           left: 50%;
//           transform: translateX(-50%);
//           background: rgba(255, 255, 255, 0.9);
//           padding: 1rem 2rem;
//           border-radius: 2rem;
//           display: flex;
//           align-items: center;
//           gap: 0.8rem;
//           box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
//           border: 1px solid rgba(255, 255, 255, 0.3);
          
//           div {
//             font-size: 1.5rem;
//             color: var(--gold);
//             font-weight: bold;
//           }
          
//           span {
//             color: var(--text);
//             font-weight: 500;
//             white-space: nowrap;
//           }
//         }

//         @media (max-width: 768px) {
//           .form-grid {
//             grid-template-columns: 1fr;
//             gap: 1.5rem;
//           }
          
//           .admin-glass-panel {
//             padding: 2rem;
//           }
          
//           .luxury-admin-container {
//             padding: 1rem;
//           }

//           .admin-tabs {
//             flex-direction: column;
//             border-bottom: none;
//             gap: 0.5rem;
//           }

//           .tab-btn {
//             border-bottom: none;
//             border-radius: 0.8rem;
//             padding: 0.8rem;
//             background: rgba(255, 255, 255, 0.2);

//             &.active {
//               background: rgba(99, 102, 241, 0.2);
//               border-bottom: none;
//             }
//           }

//           .cart-item {
//             padding: 0.8rem;
//           }

//           .item-image {
//             width: 50px;
//             height: 50px;
//           }

//           .item-info h4 {
//             font-size: 1rem;
//           }

//           .item-details {
//             flex-direction: column;
//             gap: 0.3rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Admin;