import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/orders');
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const toggleOrderExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) return (
    <div className="loading-container">
      <div className="futuristic-spinner">
        <div className="spinner-sector spinner-sector-red"></div>
        <div className="spinner-sector spinner-sector-blue"></div>
        <div className="spinner-sector spinner-sector-green"></div>
      </div>
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="loading-text"
      >
        LOADING ORDER DATA...
      </motion.h2>
    </div>
  );

  if (error) return (
    <motion.div 
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className="error-container"
    >
      <div className="error-card">
        <h2>ERROR</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          RETRY CONNECTION
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="order-list-container">
      <motion.h1 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="page-title"
      >
        ORDER MANAGEMENT
      </motion.h1>
      
      <div className="summary-cards">
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="summary-card total-orders"
        >
          <h3>TOTAL ORDERS</h3>
          <p>{orders.length}</p>
        </motion.div>
        
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="summary-card total-revenue"
        >
          <h3>TOTAL REVENUE</h3>
          <p>₹{orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0).toFixed(2)}</p>
        </motion.div>
        
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="summary-card pending-orders"
        >
          <h3>PENDING ORDERS</h3>
          <p>{orders.filter(order => order.status === 'pending').length}</p>
        </motion.div>
      </div>
      
      <div className="orders-container">
        {orders.map((order, index) => (
          <motion.div 
            key={order._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="order-card"
          >
            <div className="order-header" onClick={() => toggleOrderExpand(order._id)}>
              <div className="order-id">ORDER #{order.orderId}</div>
              <div className="order-date">
                {new Date(order.orderDate).toLocaleDateString()}
              </div>
              <div className="order-amount">₹{order.totalAmount.toFixed(2)}</div>
              <div className={`order-status ${order.status.toLowerCase()}`}>
                {order.status.toUpperCase()}
              </div>
              <motion.div 
                animate={{ rotate: expandedOrder === order._id ? 180 : 0 }}
                className="expand-icon"
              >
                ▼
              </motion.div>
            </div>
            
            <AnimatePresence>
              {expandedOrder === order._id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="order-details-container"
                >
                  <div className="customer-section">
                    <h3>CUSTOMER DETAILS</h3>
                    <div className="customer-info">
                      <div className="info-item">
                        <span className="info-label">Email:</span>
                        <span className="info-value">
                          {order.shippingAddress?.email || 'Not provided'}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Phone:</span>
                        <span className="info-value">
                          {order.shippingAddress?.phoneNumber || 'Not provided'}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Address:</span>
                        <span className="info-value">
                          {[
                            order.shippingAddress?.street,
                            order.shippingAddress?.city,
                            order.shippingAddress?.state,
                            order.shippingAddress?.zipCode
                          ].filter(Boolean).join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="products-section">
                    <h3>ORDER ITEMS</h3>
                    <div className="products-list">
                      {order.products?.length > 0 ? (
                        order.products.map((product, idx) => (
                          <div key={`${product.productId}-${idx}`} className="product-item">
                            <div className="product-image">
                              {product.image ? (
                                <img src={product.image} alt={product.name} />
                              ) : (
                                <div className="image-placeholder">No Image</div>
                              )}
                            </div>
                            <div className="product-details">
                              <div className="product-name">{product.name}</div>
                              <div className="product-sku">SKU: {product.productId}</div>
                              <div className="product-quantity">Qty: {product.quantity}</div>
                            </div>
                            <div className="product-price">
                              ₹{(product.price * product.quantity).toFixed(2)}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="no-products">No products found</div>
                      )}
                    </div>
                  </div>

                  <div className="order-footer">
                    <div className="payment-method">
                      Payment Method: {order.paymentMethod.toUpperCase()}
                    </div>
                    <div className="order-total">
                      TOTAL: ₹{order.totalAmount.toFixed(2)}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      
      <style jsx>{`
        .order-list-container {
          padding: 2rem;
          background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
          min-height: 100vh;
          color: white;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .page-title {
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 2rem;
          background: linear-gradient(90deg, #00dbde, #fc00ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-transform: uppercase;
          letter-spacing: 2px;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }
        
        .summary-cards {
          display: flex;
          justify-content: space-around;
          margin-bottom: 2rem;
          gap: 1rem;
        }
        
        .summary-card {
          flex: 1;
          padding: 1.5rem;
          border-radius: 15px;
          text-align: center;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          transition: all 0.3s ease;
        }
        
        .summary-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.5);
        }
        
        .summary-card h3 {
          margin-top: 0;
          font-size: 1rem;
          color: #aaa;
        }
        
        .summary-card p {
          font-size: 2rem;
          margin: 0.5rem 0 0;
          font-weight: bold;
          background: linear-gradient(90deg, #fff, #ddd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .total-orders {
          border-top: 3px solid #4cc9f0;
        }
        
        .total-revenue {
          border-top: 3px solid #4adc91;
        }
        
        .pending-orders {
          border-top: 3px solid #f72585;
        }
        
        .orders-container {
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .order-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          margin-bottom: 1.5rem;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        
        .order-header {
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          background: linear-gradient(90deg, rgba(15,12,41,0.8), rgba(48,43,99,0.8));
          transition: all 0.3s ease;
        }
        
        .order-header:hover {
          background: linear-gradient(90deg, rgba(15,12,41,0.9), rgba(48,43,99,0.9));
        }
        
        .order-id {
          font-family: 'Courier New', monospace;
          color: #4cc9f0;
          font-weight: bold;
          flex: 2;
        }
        
        .order-date {
          flex: 1;
          font-size: 0.9rem;
          color: #aaa;
        }
        
        .order-amount {
          flex: 1;
          text-align: center;
          font-weight: bold;
          color: #4adc91;
          font-size: 1.2rem;
        }
        
        .order-status {
          flex: 1;
          text-align: center;
          text-transform: uppercase;
          font-size: 0.8rem;
          font-weight: bold;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          min-width: 100px;
        }
        
        .order-status.completed {
          background: rgba(74, 220, 145, 0.2);
          color: #4adc91;
          border: 1px solid #4adc91;
        }
        
        .order-status.pending {
          background: rgba(247, 37, 133, 0.2);
          color: #f72585;
          border: 1px solid #f72585;
        }
        
        .order-status.processing {
          background: rgba(252, 211, 77, 0.2);
          color: #fcd34d;
          border: 1px solid #fcd34d;
        }
        
        .order-status.shipped {
          background: rgba(110, 231, 183, 0.2);
          color: #6ee7b7;
          border: 1px solid #6ee7b7;
        }
        
        .order-status.cancelled {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
          border: 1px solid #ef4444;
        }
        
        .expand-icon {
          font-size: 0.8rem;
          transition: all 0.3s ease;
          color: #aaa;
          margin-left: 1rem;
        }
        
        .order-details-container {
          background: rgba(0, 0, 0, 0.2);
          padding: 1.5rem;
          overflow: hidden;
        }
        
        .customer-section, .products-section {
          margin-bottom: 2rem;
        }
        
        .customer-section h3, .products-section h3 {
          font-size: 1.1rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #4cc9f0;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 0.5rem;
        }
        
        .customer-info {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
        }
        
        .info-item {
          display: flex;
          flex-direction: column;
        }
        
        .info-label {
          font-weight: bold;
          color: #aaa;
          font-size: 0.9rem;
        }
        
        .info-value {
          color: #fff;
          font-size: 1rem;
          word-break: break-word;
        }
        
        .products-list {
          margin-top: 1rem;
        }
        
        .product-item {
          display: flex;
          align-items: center;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .product-item:last-child {
          border-bottom: none;
        }
        
        .product-image {
          width: 60px;
          height: 60px;
          margin-right: 1rem;
          border-radius: 8px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #aaa;
          font-size: 0.8rem;
        }
        
        .product-details {
          flex: 3;
        }
        
        .product-name {
          font-weight: bold;
          color: #fff;
          margin-bottom: 0.3rem;
        }
        
        .product-description {
          font-size: 0.8rem;
          color: #aaa;
        }
        
        .product-quantity {
          flex: 1;
          text-align: center;
          color: #aaa;
        }
        
        .product-price {
          flex: 1;
          text-align: right;
          color: #4adc91;
          font-weight: bold;
        }
        
        .no-products {
          color: #aaa;
          font-style: italic;
          text-align: center;
          padding: 1rem 0;
        }
        
        .order-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .payment-method {
          font-size: 0.9rem;
          color: #aaa;
        }
        
        .payment-method .method {
          color: #fff;
          font-weight: bold;
          text-transform: uppercase;
        }
        
        .order-total {
          font-weight: bold;
          font-size: 1.2rem;
          color: #4adc91;
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(135deg, #0f0c29, #302b63);
        }
        
        .futuristic-spinner {
          width: 100px;
          height: 100px;
          position: relative;
          margin-bottom: 2rem;
        }
        
        .spinner-sector {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 10px solid transparent;
          mix-blend-mode: overlay;
          animation: rotate 2s linear infinite;
        }
        
        .spinner-sector-red {
          border-top-color: #f72585;
          animation-delay: 0.1s;
        }
        
        .spinner-sector-blue {
          border-top-color: #4cc9f0;
          animation-delay: 0.2s;
        }
        
        .spinner-sector-green {
          border-top-color: #4adc91;
          animation-delay: 0.3s;
        }
        
        .loading-text {
          font-size: 1.5rem;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.7);
        }
        
        .error-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(135deg, #0f0c29, #302b63);
        }
        
        .error-card {
          background: rgba(255, 0, 0, 0.1);
          border: 1px solid rgba(255, 0, 0, 0.3);
          padding: 2rem;
          border-radius: 15px;
          text-align: center;
          max-width: 500px;
          backdrop-filter: blur(10px);
        }
        
        .error-card h2 {
          color: #f72585;
          margin-top: 0;
        }
        
        .error-card p {
          color: #aaa;
          margin-bottom: 2rem;
        }
        
        .retry-button {
          background: linear-gradient(90deg, #f72585, #7209b7);
          border: none;
          color: white;
          padding: 0.8rem 2rem;
          border-radius: 25px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .retry-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(247, 37, 133, 0.4);
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default OrderList;