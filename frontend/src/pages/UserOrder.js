import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const UserOrder = () => {
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
        ORDERS
      </motion.h1>

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
              <div className="order-meta">
                <span className="order-id">ORDER #{order.orderId}</span>
                <span className="order-date">
                  {new Date(order.orderDate).toLocaleDateString()}
                </span>
              </div>
              <div className="status-indicator">
                <div className={`status-dot ${order.status.toLowerCase()}`}>
                  {order.status === 'delivered' && (
                    <motion.span 
                      className="checkmark"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >✓</motion.span>
                  )}
                </div>
                <motion.div 
                  animate={{ rotate: expandedOrder === order._id ? 180 : 0 }}
                  className="expand-icon"
                >
                  ▼
                </motion.div>
              </div>
            </div>

            <AnimatePresence>
              {expandedOrder === order._id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="order-details-container"
                >
                  <div className="delivery-timeline">
                    <div className="timeline-line"></div>
                    <div className="timeline-steps">
                      <div className={`timeline-step ${['confirmed', 'shipped', 'delivered'].includes(order.status) ? 'active' : ''}`}>
                        <div className="step-dot"></div>
                        <div className="step-info">
                          <h4>Order Confirmed</h4>
                          <p>Your order has been confirmed</p>
                        </div>
                      </div>
                      <div className={`timeline-step ${['shipped', 'delivered'].includes(order.status) ? 'active' : ''}`}>
                        <div className="step-dot"></div>
                        <div className="step-info">
                          <h4>Shipped</h4>
                          <p>Item has left our facility</p>
                        </div>
                      </div>
                      <div className={`timeline-step ${order.status === 'delivered' ? 'active delivered' : ''}`}>
                        <div className="step-dot">
                          {order.status === 'delivered' && (
                            <motion.div 
                              className="pulse"
                              animate={{ scale: [1, 1.2] }}
                              transition={{ repeat: Infinity, duration: 1 }}
                            />
                          )}
                        </div>
                        <div className="step-info">
                          <h4>Delivered</h4>
                          <p>Item successfully delivered</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="details-grid">
                    <div className="customer-info">
                      <h3>Customer Details</h3>
                      <div className="info-item">
                        <span>Email:</span>
                        <p>{order.shippingAddress?.email || 'N/A'}</p>
                      </div>
                      <div className="info-item">
                        <span>Phone:</span>
                        <p>{order.shippingAddress?.phoneNumber || 'N/A'}</p>
                      </div>
                      <div className="info-item">
                        <span>Address:</span>
                        <p>{[
                          order.shippingAddress?.street,
                          order.shippingAddress?.city,
                          order.shippingAddress?.state,
                          order.shippingAddress?.zipCode
                        ].filter(Boolean).join(', ')}</p>
                      </div>
                    </div>

                    <div className="product-info">
                      <h3>Products</h3>
                      <div className="products-list">
                        {order.products?.map((product, idx) => (
                          <div key={idx} className="product-item">
                            <div className="product-image">
                              {product.image ? (
                                <img src={product.image} alt={product.name} />
                              ) : (
                                <div className="image-placeholder">No Image</div>
                              )}
                            </div>
                            <div className="product-meta">
                              <h4>{product.name}</h4>
                              <p>Qty: {product.quantity}</p>
                              <p>₹{(product.price * product.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="order-total">
                        <span>Total Amount:</span>
                        <span>₹{order.totalAmount.toFixed(2)}</span>
                      </div>
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
          background: #f8f9fa;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
        }

        .page-title {
          text-align: center;
          font-size: 2.5rem;
          color: #2d3436;
          margin-bottom: 2rem;
        }

        .orders-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .order-card {
          background: white;
          border-radius: 12px;
          margin-bottom: 1rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .order-header {
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          background:  #F4E5FF;
        }

        .order-meta {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .order-id {
          font-weight: 600;
          color: #2d3436;
        }

        .order-date {
          color: #666;
          font-size: 0.9rem;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .status-dot {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background:#5BA82F;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .status-dot.delivered {
          background: #4adc91;
          color: white;
        }

        .checkmark {
          font-size: 1.2rem;
        }

        .expand-icon {
          transition: all 0.3s ease;
          color: #666;
        }

        .order-details-container {
          padding: 2rem;
          background: #FBF5FF;
          border-top: 1px solid #eee;
        }

        .delivery-timeline {
          position: relative;
          margin-bottom: 2rem;
        }

        .timeline-line {
          position: absolute;
          left: 16px;
          top: 0;
          bottom: 0;
          width: 2px;
          background:#A8E877;
          z-index: 1;
        }

        .timeline-steps {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .timeline-step {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .step-dot {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #72C73E;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .timeline-step.active .step-dot {
          background: #4adc91;
          color: white;
        }

        .timeline-step.delivered .step-dot {
          background: #4adc91;
        }

        .pulse {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(74, 220, 145, 0.3);
        }

        .details-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 2rem;
        }

        .customer-info {
          padding-right: 2rem;
          border-right: 2px solid #eee;
        }

        .info-item {
          margin-bottom: 1.5rem;
        }

        .info-item span {
          color: #666;
          font-weight: 500;
          display: block;
          margin-bottom: 0.3rem;
        }

        .products-list {
          display: grid;
          gap: 1rem;
        }

        .product-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .product-image {
          width: 190px;
          height: 190px;
          border-radius: 8px;
          overflow: hidden;
          background: #f8f9fa;
        }

        .image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          font-size: 0.8rem;
        }

        .product-meta {
          flex: 1;
        }

        .product-meta h4 {
          margin: 0 0 0.5rem 0;
          color: #2d3436;
        }

        .order-total {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 2px solid #eee;
          display: flex;
          justify-content: space-between;
          font-weight: 600;
          color: #2d3436;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: #2d3436;
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
          border-top-color: #ff7675;
        }

        .spinner-sector-blue {
          border-top-color: #74b9ff;
        }

        .spinner-sector-green {
          border-top-color: #55efc4;
        }

        .error-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: #2d3436;
        }

        .error-card {
          background: rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 15px;
          text-align: center;
          max-width: 500px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .error-card h2 {
          color: #ff7675;
          margin-top: 0;
        }

        .retry-button {
          background: #4adc91;
          color: white;
          border: none;
          padding: 0.8rem 2rem;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .retry-button:hover {
          background: #3ecf84;
        }
      `}</style>
    </div>
  );
};

export default UserOrder;