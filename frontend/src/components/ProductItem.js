import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Modal, Form, InputGroup, Alert } from "react-bootstrap";
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [availableStock, setAvailableStock] = useState(product.stock || 6);
  const [stockAlert, setStockAlert] = useState(null);

  useEffect(() => {
    if (!showModal) {
      setStockAlert(null);
    }
  }, [showModal]);

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    
    if (delta === 1) {
      if (newQuantity > availableStock) {
        setStockAlert(`Only ${availableStock} available in stock!`);
        return;
      }
    } else if (delta === -1) {
      if (newQuantity < 1) return;
    }
    
    setQuantity(newQuantity);
    setStockAlert(null);
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    
    if (value > availableStock) {
      setStockAlert(`Only ${availableStock} available in stock!`);
      setQuantity(availableStock);
      return;
    }
    
    setQuantity(Math.max(1, value));
    setStockAlert(null);
  };

  const handleAddToCart = () => {
    if (quantity > availableStock) {
      setStockAlert(`Only ${availableStock} available in stock!`);
      return;
    }

    const itemToAdd = {
      ...product,
      quantity,
    };
    
    dispatch(addToCart(itemToAdd));
    
    // Update local stock state
    const newStock = availableStock - quantity;
    setAvailableStock(newStock);
    setQuantity(1);

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
    
    if (newStock === 0) {
      setStockAlert('This product is now out of stock');
    } else {
      setStockAlert(`${newStock} items remaining in stock`);
    }
    
    handleCloseModal();
  };

  
  const handleShowModal = () => {
    setShowModal(true);
    setQuantity(1);
    setStockAlert(availableStock === 0 ? 'This product is out of stock' : null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: {
      y: -10,
      rotate: -2,
      boxShadow: "0 20px 40px rgba(160, 0, 200, 0.3)",
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      rotate: 2,
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 8px 20px rgba(160,0,200,0.4)",
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.95
    }
  };

  const addedNotificationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      <motion.div 
        className="product-item"
        initial="hidden"
        animate="visible"
        whileHover="hover"
        variants={cardVariants}
      >
        <div className="product-image-container">
          <motion.img
            src={product.image}
            alt={product.name}
            variants={imageVariants}
            className="product-image"
          />
          
          {product.onSale && (
            <div className="product-badge">Sale</div>
          )}
          
          {product.discount && (
            <div className="discount-badge">
              -{product.discount}%
            </div>
          )}
          
          {availableStock === 0 && (
            <div className="out-of-stock-badge">Out of Stock</div>
          )}
        </div>
        
        <div className="product-details">
          <div className="product-category">{product.category}</div>
          <h3 className="product-title">{product.name}</h3>
          
          <div className="product-price-container">
            <span className="current-price">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          
          <div className="product-rating">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className={`star ${i < (product.rating || 0) ? 'filled' : ''}`}
              >
                ★
              </span>
            ))}
            <span className="rating-count">({product.reviews || 0})</span>
          </div>
          
          <div className="stock-info">
            {availableStock > 0 ? (
              `${availableStock} in stock`
            ) : (
              <span className="out-of-stock-text">Out of stock</span>
            )}
          </div>
          
          <motion.button
            onClick={handleShowModal}
            className="add-to-cart-btn"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            disabled={availableStock === 0}
          >
            {availableStock > 0 ? 'Add to Cart' : 'Out of Stock'}
            <FaShoppingCart className="cart-icon" />
          </motion.button>
        </div>
        
        <AnimatePresence>
          {isAdded && (
            <motion.div
              className="added-notification"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={addedNotificationVariants}
            >
              {quantity} {product.name} added to cart!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Modal for product details and quantity selection */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{product.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-image-container">
            <img
              src={product.image}
              alt={product.name}
              className="modal-product-image"
            />
          </div>
          
          {stockAlert && (
            <Alert variant={availableStock === 0 ? 'danger' : 'warning'}>
              {stockAlert}
            </Alert>
          )}
          
          <div className="modal-detail">
            <strong>Weight:</strong> {product.weight || 'N/A'}
          </div>
          <div className="modal-detail">
            <strong>Price:</strong> ₹{product.price.toLocaleString()}
          </div>
          <div className="modal-detail">
            <strong>Available Stock:</strong> {availableStock}
          </div>
          <div className="modal-detail">
            <strong>Quantity:</strong>
            <InputGroup className="quantity-selector">
              <Button
                variant="outline-secondary"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1 || availableStock === 0}
              >
                <FaMinus />
              </Button>
              <Form.Control
                type="number"
                value={quantity}
                onChange={handleInputChange}
                min="1"
                max={availableStock}
                className="quantity-input"
                disabled={availableStock === 0}
              />
              <Button
                variant="outline-secondary"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= availableStock || availableStock === 0}
              >
                <FaPlus />
              </Button>
            </InputGroup>
          </div>
          <div className="modal-total">
            <strong>Total:</strong> ₹{(product.price * quantity).toLocaleString()}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            className="add-to-cart-modal-btn"
            onClick={handleAddToCart}
            disabled={availableStock === 0}
          >
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx>{`
        .product-item {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
          position: relative;
          width: 100%;
          max-width: 300px;
          margin: 0.5rem auto;
          display: flex;
          flex-direction: column;
        }
        
        .product-image-container {
          position: relative;
          overflow: hidden;
          height: 200px;
          background: #f9f9f9;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .product-image {
          max-width: 80%;
          max-height: 80%;
          object-fit: contain;
          transition: all 0.3s ease;
        }
        
        .product-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #ff4757;
          color: white;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
        }
        
        .discount-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #a000c8;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
        }
        
        .out-of-stock-badge {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          background: rgba(0,0,0,0.7);
          color: white;
          padding: 8px;
          text-align: center;
          font-weight: bold;
          transform: translateY(-50%);
        }
        
        .product-details {
          padding: 15px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          flex-grow: 1;
        }
        
        .product-category {
          color: #a000c8;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 2px;
        }
        
        .product-title {
          font-size: 16px;
          font-weight: 700;
          margin: 2px 0;
          color: #333;
          line-height: 1.2;
        }
        
        .product-price-container {
          display: flex;
          align-items: center;
          gap: 5px;
          margin: 3px 0;
        }
        
        .current-price {
          font-size: 18px;
          font-weight: 800;
          color: #a000c8;
        }
        
        .original-price {
          font-size: 14px;
          color: #999;
          text-decoration: line-through;
        }
        
        .product-rating {
          display: flex;
          align-items: center;
          gap: 3px;
          margin: 3px 0;
        }
        
        .star {
          color: #ddd;
          font-size: 14px;
        }
        
        .star.filled {
          color: #ffc107;
        }
        
        .rating-count {
          font-size: 12px;
          color: #777;
        }
        
        .stock-info {
          font-size: 12px;
          margin: 3px 0;
          color: #666;
        }
        
        .out-of-stock-text {
          color: #ff4757;
          font-weight: bold;
        }
        
        .add-to-cart-btn {
          background: linear-gradient(135deg, #a000c8, #8000a0);
          color: white;
          border: none;
          padding: 8px;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: auto;
          transition: all 0.3s ease;
        }
        
        .add-to-cart-btn:disabled {
          background: #ddd;
          cursor: not-allowed;
        }
        
        .cart-icon {
          font-size: 16px;
        }
        
        .added-notification {
          position: absolute;
          top: -20px;
          left: 0;
          right: 0;
          background: #4CAF50;
          color: white;
          padding: 8px;
          text-align: center;
          font-size: 12px;
          font-weight: 600;
          border-radius: 0 0 8px 8px;
          z-index: 10;
        }

        /* Modal styles */
        .modal-image-container {
          text-align: center;
          margin-bottom: 20px;
        }

        .modal-product-image {
          max-width: 100%;
          max-height: 200px;
          border-radius: 8px;
        }

        .modal-detail {
          margin-bottom: 15px;
        }

        .quantity-selector {
          width: 150px;
          margin-top: 5px;
        }

        .quantity-input {
          text-align: center;
        }

        .modal-total {
          font-weight: bold;
          margin-bottom: 10px;
          font-size: 1.1rem;
        }

        .add-to-cart-modal-btn {
          background-color: #a000c8;
          border-color: #a000c8;
        }

        .add-to-cart-modal-btn:hover {
          background-color: #8000a0;
          border-color: #8000a0;
        }

        .add-to-cart-modal-btn:disabled {
          background-color: #ddd;
          border-color: #ddd;
        }

        @media (max-width: 768px) {
          .product-item {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default ProductItem;