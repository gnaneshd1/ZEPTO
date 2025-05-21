// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { FaCreditCard, FaLock, FaCheckCircle, FaArrowLeft, FaMapMarkerAlt, FaUser, FaTruck, FaGift, FaShieldAlt } from 'react-icons/fa';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Container, Row, Col, Card, Form, Button, Alert, ProgressBar } from 'react-bootstrap';
// import Confetti from 'react-confetti';
// import { useWindowSize } from 'react-use';

// const PaymentPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { width, height } = useWindowSize();
//   const { addressData } = location.state || {};
  
//   const [cardNumber, setCardNumber] = useState('');
//   const [cardName, setCardName] = useState('');
//   const [expiry, setExpiry] = useState('');
//   const [cvv, setCvv] = useState('');
//   const [saveCard, setSaveCard] = useState(false);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const [activeTab, setActiveTab] = useState('card');
//   const [showConfetti, setShowConfetti] = useState(true);
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     if (paymentSuccess) {
//       const timer = setInterval(() => {
//         setProgress((oldProgress) => {
//           if (oldProgress === 100) {
//             clearInterval(timer);
//             return 100;
//           }
//           return Math.min(oldProgress + 10, 100);
//         });
//       }, 300);

//       return () => clearInterval(timer);
//     }
//   }, [paymentSuccess]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setPaymentSuccess(true);
//     setTimeout(() => setShowConfetti(false), 5000);
//   };

//   // Animation variants
//   const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   const tabContentVariants = {
//     hidden: { opacity: 0, x: -10 },
//     visible: { opacity: 1, x: 0 },
//     exit: { opacity: 0, x: 10 }
//   };

//   const glitterVariants = {
//     initial: { opacity: 0, scale: 0 },
//     animate: { 
//       opacity: [0, 1, 0],
//       scale: [0, 1.2, 0],
//       rotate: [0, 360],
//       transition: { duration: 1.5, ease: "easeOut" }
//     }
//   };

//   if (paymentSuccess) {
//     return (
//       <Container className="payment-success-container" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e8f4f8 100%)' }}>
//         {showConfetti && (
//           <>
//             <Confetti
//               width={width}
//               height={height}
//               numberOfPieces={200}
//               recycle={false}
//               gravity={0.2}
//               colors={['#6c5ce7', '#00b894', '#0984e3', '#fd79a8', '#fdcb6e']}
//             />
//             {[...Array(50)].map((_, i) => (
//               <motion.div
//                 key={i}
//                 className="glitter-particle"
//                 style={{
//                   position: 'fixed',
//                   top: `${Math.random() * 100}%`,
//                   left: `${Math.random() * 100}%`,
//                   width: `${Math.random() * 10 + 5}px`,
//                   height: `${Math.random() * 10 + 5}px`,
//                   background: `hsl(${Math.random() * 360}, 100%, 70%)`,
//                   borderRadius: '50%',
//                   zIndex: 10,
//                 }}
//                 variants={glitterVariants}
//                 initial="initial"
//                 animate="animate"
//                 transition={{ delay: Math.random() * 0.5 }}
//               />
//             ))}
//           </>
//         )}
        
//         <motion.div
//           initial={{ scale: 0.5, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ type: 'spring', stiffness: 100 }}
//           className="success-card"
//         >
//           <motion.div
//             animate={{ 
//               // rotate: 360,
//               // scale: [1, 1.2, 1],
//               // boxShadow: ['0 0 0 rgba(108, 92, 231, 0.4)', '0 0 20px rgba(108, 92, 231, 0.6)', '0 0 0 rgba(108, 92, 231, 0.4)']
//             }}
//             // transition={{ duration: 1.5, repeat: Infinity }}
//             // className="success-icon-container"
//           >
//             <FaCheckCircle className="success-icon" />
//           </motion.div>
          
//           <motion.h2 
//             initial={{ y: 20, opacity: 0 }} 
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="success-title"
//           >
//             Order Confirmed!
//           </motion.h2>
          
//           <motion.p 
//             initial={{ opacity: 0 }} 
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//             className="success-message"
//           >
//             {activeTab === 'cod' 
//               ? 'Your order is being prepared and will be delivered soon.' 
//               : 'Your payment was processed successfully. Order #' + Math.floor(Math.random() * 1000000)}
//           </motion.p>
          
//           <motion.div 
//             initial={{ opacity: 0, width: 0 }}
//             animate={{ opacity: 1, width: '100%' }}
//             transition={{ delay: 0.7 }}
//             className="progress-container"
//           >
//             {/* <ProgressBar now={progress} label={`${progress}%`} className="success-progress" />
//             <div className="progress-labels">
//               <span>Processing</span>
//               <span>Shipping</span>
//               <span>Delivered</span>
//             </div> */}
//           </motion.div>
          
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1 }}
//           >
//             <Button 
//               variant="primary" 
//               onClick={() => navigate('/home')}
//               className="continue-shopping-btn"
//               as={motion.button}
//               whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(108, 92, 231, 0.4)' }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Continue Shopping
//             </Button>
            
//             <Button 
//               variant="outline-primary" 
//               onClick={() => navigate('/orders')}
//               className="view-orders-btn"
//               as={motion.button}
//               whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(108, 92, 231, 0.2)' }}
//               whileTap={{ scale: 0.95 }}
//             >
//               View My Orders
//             </Button>
//           </motion.div>
//         </motion.div>
//       </Container>
//     );
//   }

//   return (
//     <Container className="payment-page">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.6 }}
//       >
//         <Button 
//           variant="link" 
//           onClick={() => navigate(-1)}
//           className="back-button"
//           as={motion.button}
//           whileHover={{ x: -4 }}
//         >
//           <FaArrowLeft /> Back to Address
//         </Button>

//         <Row className="justify-content-center">
//           <Col lg={10} xl={8}>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//             >
//               <h1 className="page-title">Complete Your Order</h1>
//               <p className="page-subtitle">Secure and fast checkout</p>
//             </motion.div>
            
//             <Row>
//               <Col md={7}>
//                 <motion.div
//                   variants={cardVariants}
//                   initial="hidden"
//                   animate="visible"
//                   transition={{ delay: 0.2 }}
//                 >
//                   <Card className="payment-methods-card">
//                     <Card.Body>
//                       <div className="payment-tabs">
//                         {['card', 'upi', 'cod'].map((tab) => (
//                           <motion.button
//                             key={tab}
//                             className={`tab-button ${activeTab === tab ? 'active' : ''}`}
//                             onClick={() => setActiveTab(tab)}
//                             whileHover={{ scale: 1.02 }}
//                             whileTap={{ scale: 0.98 }}
//                             transition={{ type: 'spring', stiffness: 300 }}
//                           >
//                             {tab === 'card' && <FaCreditCard className="tab-icon" />}
//                             {tab === 'upi' && <FaLock className="tab-icon" />}
//                             {tab === 'cod' && <FaTruck className="tab-icon" />}
//                             {tab === 'card' && 'Credit/Debit Card'}
//                             {tab === 'upi' && 'UPI Payment'}
//                             {tab === 'cod' && 'Cash on Delivery'}
//                             {activeTab === tab && (
//                               <motion.div
//                                 className="underline"
//                                 layoutId="underline"
//                                 style={{ background: 'linear-gradient(45deg, #6c5ce7, #a992ff)' }}
//                               />
//                             )}
//                           </motion.button>
//                         ))}
//                       </div>

//                       <AnimatePresence mode='wait'>
//                         <motion.div
//                           key={activeTab}
//                           variants={tabContentVariants}
//                           initial="hidden"
//                           animate="visible"
//                           exit="exit"
//                           transition={{ duration: 0.2 }}
//                         >
//                           {activeTab === 'card' ? (
//                             <Form onSubmit={handleSubmit} className="payment-form">
//                               {[
//                                 { label: 'Card Number', icon: <FaCreditCard />, type: 'text', value: cardNumber, max: 19 },
//                                 { label: 'Cardholder Name', icon: <FaUser />, type: 'text', value: cardName },
//                                 { label: 'Expiry Date (MM/YY)', type: 'text', value: expiry, max: 5 },
//                                 { label: 'CVV', type: 'password', value: cvv, max: 3, icon: <FaLock /> },
//                               ].map((field, index) => (
//                                 <motion.div
//                                   key={field.label}
//                                   variants={cardVariants}
//                                   initial="hidden"
//                                   animate="visible"
//                                   transition={{ delay: index * 0.1 }}
//                                 >
//                                   <Form.Group className="mb-3">
//                                     <Form.Label>{field.label}</Form.Label>
//                                     <div className={`input-with-icon ${field.icon ? 'has-icon' : ''}`}>
//                                       {field.icon}
//                                       <Form.Control
//                                         type={field.type}
//                                         placeholder={field.label}
//                                         value={field.value}
//                                         onChange={(e) => {
//                                           if(field.label === 'Card Number') {
//                                             const val = e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
//                                             setCardNumber(val);
//                                           }
//                                           if(field.label === 'Cardholder Name') setCardName(e.target.value);
//                                           if(field.label === 'Expiry Date (MM/YY)') {
//                                             const val = e.target.value.replace(/\D/g, '')
//                                               .replace(/(\d{2})(\d)/, '$1/$2')
//                                               .substring(0, 5);
//                                             setExpiry(val);
//                                           }
//                                           if(field.label === 'CVV') setCvv(e.target.value.replace(/\D/g, '').substring(0, 3));
//                                         }}
//                                         maxLength={field.max}
//                                         required
//                                       />
//                                     </div>
//                                   </Form.Group>
//                                 </motion.div>
//                               ))}

//                               <Form.Group className="mb-4">
//                                 <motion.div whileHover={{ scale: 1.02 }}>
//                                   <Form.Check
//                                     type="checkbox"
//                                     label={
//                                       <span>
//                                         Save this card for future payments <FaShieldAlt className="text-muted ms-1" />
//                                       </span>
//                                     }
//                                     checked={saveCard}
//                                     onChange={(e) => setSaveCard(e.target.checked)}
//                                     className="save-card-checkbox"
//                                   />
//                                 </motion.div>
//                               </Form.Group>

//                               <Button 
//                                 variant="primary" 
//                                 type="submit"
//                                 className="pay-now-btn"
//                                 as={motion.button}
//                                 whileHover={{ 
//                                   scale: 1.02,
//                                   boxShadow: '0 5px 15px rgba(108, 92, 231, 0.4)'
//                                 }}
//                                 whileTap={{ scale: 0.98 }}
//                               >
//                                 Pay Now
//                               </Button>
//                             </Form>
//                           ) : activeTab === 'upi' ? (
//                             <div className="upi-payment-method">
//                               <motion.div 
//                                 className="upi-logo-container"
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                               >
//                                 {['Google Pay', 'PhonePe', 'Paytm', 'Amazon Pay'].map((name, i) => (
//                                   <motion.div
//                                     key={i}
//                                     className="upi-logo-card"
//                                     whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
//                                   >
//                                     <div className="upi-logo-placeholder">
//                                       {name.split(' ')[0]}
//                                     </div>
//                                     <span>{name}</span>
//                                   </motion.div>
//                                 ))}
//                               </motion.div>
//                               <Form.Group className="mb-3">
//                                 <Form.Label>UPI ID</Form.Label>
//                                 <div className="input-with-icon">
//                                   <FaLock />
//                                   <Form.Control
//                                     type="text"
//                                     placeholder="yourname@upi"
//                                     required
//                                   />
//                                 </div>
//                               </Form.Group>
//                               <Button 
//                                 variant="primary" 
//                                 className="pay-now-btn"
//                                 onClick={() => setPaymentSuccess(true)}
//                                 as={motion.button}
//                                 whileHover={{ 
//                                   scale: 1.02,
//                                   boxShadow: '0 5px 15px rgba(108, 92, 231, 0.4)'
//                                 }}
//                               >
//                                 Pay via UPI
//                               </Button>
//                             </div>
//                           ) : (
//                             <div className="cod-payment-method">
//                               <motion.div
//                                 initial={{ opacity: 0, scale: 0.9 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 className="cod-content"
//                               >
//                                 <div className="cod-icon-container">
//                                   <motion.div
//                                     animate={{ 
//                                       rotate: [0, 10, -10, 0],
//                                       transition: { repeat: Infinity, duration: 2 }
//                                     }}
//                                   >
//                                     <FaTruck className="cod-icon" />
//                                   </motion.div>
//                                 </div>
//                                 <h4 className="cod-title">Pay when you receive</h4>
//                                 <p className="cod-description">
//                                   Please keep exact change ready for the delivery executive.
//                                   Digital payments accepted at delivery.
//                                 </p>
//                                 <div className="cod-benefits">
//                                   <div className="benefit-item">
//                                     <FaGift className="benefit-icon" />
//                                     <span>No prepayment required</span>
//                                   </div>
//                                   <div className="benefit-item">
//                                     <FaShieldAlt className="benefit-icon" />
//                                     <span>100% buyer protection</span>
//                                   </div>
//                                 </div>
//                                 <Button 
//                                   variant="success" 
//                                   className="confirm-order-btn"
//                                   onClick={() => setPaymentSuccess(true)}
//                                   as={motion.button}
//                                   whileHover={{ 
//                                     scale: 1.02,
//                                     boxShadow: '0 5px 15px rgba(0, 184, 148, 0.4)'
//                                   }}
//                                   whileTap={{ scale: 0.98 }}
//                                 >
//                                   Confirm Order
//                                 </Button>
//                               </motion.div>
//                             </div>
//                           )}
//                         </motion.div>
//                       </AnimatePresence>
//                     </Card.Body>
//                   </Card>
//                 </motion.div>
//               </Col>

//               <Col md={5}>
//                 <motion.div
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.4 }}
//                 >
//                   <Card className="order-summary-card">
//                     <Card.Body>
//                       <h3 className="summary-title">Order Summary</h3>
                      
//                       <motion.div 
//                         className="address-summary"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 0.6 }}
//                       >
//                         <h4><FaMapMarkerAlt className="summary-icon" /> Delivery Address</h4>
//                         {addressData && (
//                           <div className="address-details">
//                             <p><strong>{addressData.addressLabel}</strong></p>
//                             <p>{addressData.fullAddress}</p>
//                             <p>Phone: {addressData.phoneNumber}</p>
//                             <p>Email: {addressData.email}</p>
//                           </div>
//                         )}
//                       </motion.div>

//                       <motion.div 
//                         className="price-breakdown"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 0.8 }}
//                       >
//                         <div className="price-section">
//                           {['Subtotal (3 items)', 'Shipping', 'Tax', 'Discount'].map((label, i) => (
//                             <div key={label} className="price-row">
//                               <span>{label}</span>
//                               <span>${[129.99, 5.99, 9.75, -10.00][i].toFixed(2)}</span>
//                             </div>
//                           ))}
//                         </div>
//                         <div className="price-row total">
//                           <span>Total</span>
//                           <span>${(129.99 + 5.99 + 9.75 - 10.00).toFixed(2)}</span>
//                         </div>
//                       </motion.div>

//                       <motion.div
//                         initial={{ scale: 0.9 }}
//                         animate={{ scale: 1 }}
//                         transition={{ type: 'spring' }}
//                       >
//                         <Alert variant="success" className="promo-alert">
//                           <div className="promo-content">
//                             <FaGift className="promo-icon" />
//                             <div>
//                               <strong>Free shipping</strong> on orders over $100
//                               <div className="promo-subtext">You saved $5.99 on shipping</div>
//                             </div>
//                           </div>
//                         </Alert>
//                       </motion.div>
//                     </Card.Body>
//                   </Card>
//                 </motion.div>
//               </Col>
//             </Row>
//           </Col>
//         </Row>
//       </motion.div>

//       <style jsx>{`
//         .payment-page {
//           padding: 4rem 0;
//           background: linear-gradient(135deg, #f8f9fa 0%, #f1f3f5 100%);
//           min-height: 100vh;
//         }
        
//         .back-button {
//           color: #6c5ce7;
//           margin-bottom: 2rem;
//           font-weight: 600;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//           padding: 0.5rem 0;
//           position: relative;
//           display: inline-flex;
//           align-items: center;
//           gap: 0.5rem;
//         }
        
//         .back-button:after {
//           content: '';
//           position: absolute;
//           bottom: 0;
//           left: 0;
//           width: 0;
//           height: 2px;
//           background: #6c5ce7;
//           transition: width 0.3s ease;
//         }
        
//         .back-button:hover:after {
//           width: 100%;
//         }
        
//         .page-title {
//           font-size: 2.5rem;
//           font-weight: 800;
//           background: linear-gradient(45deg, #2d3436, #6c5ce7);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           margin-bottom: 0.5rem;
//           position: relative;
//           display: inline-block;
//         }
        
//         .page-title:after {
//           content: '';
//           position: absolute;
//           bottom: -10px;
//           left: 0;
//           width: 60px;
//           height: 4px;
//           background: linear-gradient(45deg, #6c5ce7, #a992ff);
//           border-radius: 2px;
//         }
        
//         .page-subtitle {
//           color: #636e72;
//           font-size: 1.1rem;
//           margin-bottom: 3rem;
//         }
        
//         .payment-methods-card, .order-summary-card {
//           border-radius: 20px;
//           border: none;
//           box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
//           background: rgba(255, 255, 255, 0.95);
//           backdrop-filter: blur(10px);
//           overflow: hidden;
//           transition: transform 0.3s, box-shadow 0.3s;
//         }
        
//         .payment-methods-card:hover, .order-summary-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
//         }
        
//         .payment-tabs {
//           display: flex;
//           gap: 1rem;
//           margin-bottom: 2rem;
//           position: relative;
//         }
        
//         .tab-button {
//           flex: 1;
//           padding: 1.2rem;
//           border: none;
//           background: none;
//           border-radius: 12px;
//           font-weight: 600;
//           color: #636e72;
//           position: relative;
//           overflow: hidden;
//           transition: all 0.3s;
//           z-index: 1;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 0.5rem;
//         }
        
//         .tab-button.active {
//           color: white;
//         }
        
//         .tab-button .underline {
//           position: absolute;
//           bottom: 0;
//           left: 0;
//           right: 0;
//           height: 100%;
//           border-radius: 12px;
//           z-index: -1;
//         }
        
//         .tab-icon {
//           font-size: 1.2rem;
//         }
        
//         .cod-payment-method {
//           text-align: center;
//           padding: 2rem 0;
//         }
        
//         .cod-icon-container {
//           background: linear-gradient(45deg, #6c5ce7, #a992ff);
//           width: 80px;
//           height: 80px;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           margin: 0 auto 1.5rem;
//           box-shadow: 0 10px 20px rgba(108, 92, 231, 0.3);
//         }
        
//         .cod-icon {
//           font-size: 2rem;
//           color: white;
//         }
        
//         .cod-title {
//           font-size: 1.5rem;
//           font-weight: 700;
//           margin-bottom: 1rem;
//           color: #2d3436;
//         }
        
//         .cod-description {
//           color: #636e72;
//           margin-bottom: 2rem;
//           line-height: 1.6;
//           max-width: 80%;
//           margin-left: auto;
//           margin-right: auto;
//         }
        
//         .cod-benefits {
//           display: flex;
//           justify-content: center;
//           gap: 1.5rem;
//           margin-bottom: 2rem;
//         }
        
//         .benefit-item {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           font-size: 0.9rem;
//           color: #636e72;
//         }
        
//         .benefit-icon {
//           color: #6c5ce7;
//         }
        
//         .confirm-order-btn {
//           background: linear-gradient(45deg, #00b894, #00cec9);
//           border: none;
//           padding: 1.2rem 2.5rem;
//           font-size: 1.1rem;
//           border-radius: 12px;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//           font-weight: 600;
//           position: relative;
//           overflow: hidden;
//         }
        
//         .confirm-order-btn:after {
//           content: '';
//           position: absolute;
//           top: -50%;
//           left: -60%;
//           width: 200%;
//           height: 200%;
//           background: rgba(255, 255, 255, 0.2);
//           transform: rotate(30deg);
//           transition: all 0.3s;
//         }
        
//         .confirm-order-btn:hover:after {
//           left: 100%;
//         }
        
//         .input-with-icon {
//           position: relative;
//           background: #f8f9fa;
//           border-radius: 12px;
//           transition: all 0.3s;
//           border: 1px solid #dfe6e9;
//         }
        
//         .input-with-icon:hover {
//           border-color: #b2bec3;
//         }
        
//         .input-with-icon.has-icon:before {
//           content: '';
//           position: absolute;
//           top: 50%;
//           left: 3.5rem;
//           transform: translateY(-50%);
//           width: 1px;
//           height: 60%;
//           background: #dfe6e9;
//         }
        
//         .form-control {
//           padding-left: 4.5rem;
//           height: 56px;
//           border: none;
//           background: transparent;
//           font-weight: 500;
//           transition: all 0.3s;
//           border-radius: 12px;
//         }
        
//         .form-control:focus {
//           box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.2);
//         }
        
//         .input-with-icon svg {
//           position: absolute;
//           left: 1.25rem;
//           top: 50%;
//           transform: translateY(-50%);
//           color: #636e72;
//           font-size: 1rem;
//         }
        
//         .pay-now-btn {
//           background: linear-gradient(45deg, #6c5ce7, #857cdd);
//           border: none;
//           padding: 1.2rem;
//           font-size: 1.1rem;
//           border-radius: 12px;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//           font-weight: 600;
//           width: 100%;
//           position: relative;
//           overflow: hidden;
//         }
        
//         .pay-now-btn:after {
//           content: '';
//           position: absolute;
//           top: -50%;
//           left: -60%;
//           width: 200%;
//           height: 200%;
//           background: rgba(255, 255, 255, 0.2);
//           transform: rotate(30deg);
//           transition: all 0.3s;
//         }
        
//         .pay-now-btn:hover:after {
//           left: 100%;
//         }
        
//         .order-summary-card {
//           position: sticky;
//           top: 2rem;
//         }
        
//         .summary-title {
//           font-size: 1.5rem;
//           font-weight: 700;
//           margin-bottom: 1.5rem;
//           color: #2d3436;
//           position: relative;
//           padding-bottom: 0.75rem;
//         }
        
//         .summary-title:after {
//           content: '';
//           position: absolute;
//           bottom: 0;
//           left: 0;
//           width: 50px;
//           height: 3px;
//           background: linear-gradient(45deg, #6c5ce7, #a992ff);
//           border-radius: 3px;
//         }
        
//         .summary-icon {
//           color: #6c5ce7;
//           margin-right: 0.5rem;
//         }
        
//         .address-summary h4 {
//           font-size: 1.1rem;
//           margin-bottom: 1rem;
//           display: flex;
//           align-items: center;
//         }
        
//         .address-details {
//           background: #f8f9fa;
//           border-radius: 12px;
//           padding: 1.25rem;
//           margin-bottom: 1.5rem;
//         }
        
//         .address-details p {
//           margin-bottom: 0.5rem;
//           color: #636e72;
//         }
        
//         .address-details p:last-child {
//           margin-bottom: 0;
//         }
        
//         .price-breakdown {
//           margin-bottom: 1.5rem;
//         }
        
//         .price-section {
//           padding-bottom: 1rem;
//           margin-bottom: 1rem;
//           border-bottom: 1px dashed #dfe6e9;
//         }
        
//         .price-row {
//           display: flex;
//           justify-content: space-between;
//           margin-bottom: 0.75rem;
//           color: #636e72;
//         }
        
//         .price-row.total {
//           font-weight: 700;
//           font-size: 1.2rem;
//           color: #2d3436;
//           margin-top: 1rem;
//         }
        
//         .promo-alert {
//           border-radius: 12px;
//           border: none;
//           background: linear-gradient(45deg, rgba(0, 184, 148, 0.1), rgba(0, 206, 201, 0.1));
//         }
        
//         .promo-content {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//         }
        
//         .promo-icon {
//           font-size: 1.5rem;
//           color: #00b894;
//         }
        
//         .promo-subtext {
//           font-size: 0.85rem;
//           opacity: 0.8;
//         }
        
//         .upi-payment-method {
//           padding: 1rem 0;
//         }
        
//         .upi-logo-container {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 1rem;
//           justify-content: center;
//           margin-bottom: 2rem;
//         }
        
//         .upi-logo-card {
//           background: white;
//           border-radius: 12px;
//           padding: 1rem;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 0.5rem;
//           cursor: pointer;
//           box-shadow: 0 5px 15px rgba(0,0,0,0.05);
//           transition: all 0.3s;
//           width: calc(50% - 0.5rem);
//           border: 1px solid #dfe6e9;
//         }
        
//         .upi-logo-placeholder {
//           width: 60px;
//           height: 30px;
//           background: #f8f9fa;
//           border-radius: 6px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: #636e72;
//           font-weight: 600;
//           font-size: 0.9rem;
//         }
        
//         .save-card-checkbox .form-check-input:checked {
//           background-color: #6c5ce7;
//           border-color: #6c5ce7;
//         }
        
//         /* Success page styles */
//         .payment-success-container {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           min-height: 100vh;
//           padding: 2rem;
//         }
        
//         .success-card {
//           background: white;
//           border-radius: 20px;
//           padding: 3rem;
//           text-align: center;
//           max-width: 600px;
//           width: 100%;
//           box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
//           position: relative;
//           overflow: hidden;
//         }
        
//         .success-card:before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 10px;
//           background: linear-gradient(45deg, #6c5ce7, #a992ff);
//         }
        
//         .success-icon-container {
//           width: 100px;
//           height: 100px;
//           margin: 0 auto 2rem;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 50%;
//           background: rgba(108, 92, 231, 0.1);
//         }
        
//         .success-icon {
//           font-size: 4rem;
//           color: #6c5ce7;
//         }
        
//         .success-title {
//           font-size: 2.2rem;
//           font-weight: 800;
//           margin-bottom: 1rem;
//           background: linear-gradient(45deg, #6c5ce7, #00b894);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }
        
//         .success-message {
//           color: #636e72;
//           font-size: 1.1rem;
//           margin-bottom: 2rem;
//           line-height: 1.6;
//         }
        
//         .progress-container {
//           margin-bottom: 2rem;
//         }
        
//         .success-progress {
//           height: 10px;
//           border-radius: 5px;
//           margin-bottom: 0.5rem;
//         }
        
//         .success-progress .progress-bar {
//           background: linear-gradient(45deg, #6c5ce7, #a992ff);
//           border-radius: 5px;
//         }
        
//         .progress-labels {
//           display: flex;
//           justify-content: space-between;
//           font-size: 0.85rem;
//           color: #636e72;
//         }
        
//         .continue-shopping-btn {
//           background: linear-gradient(45deg, #6c5ce7, #a992ff);
//           border: none;
//           padding: 0.8rem 2rem;
//           font-size: 1rem;
//           border-radius: 12px;
//           margin-right: 1rem;
//           font-weight: 600;
//         }
        
//         .view-orders-btn {
//           padding: 0.8rem 2rem;
//           font-size: 1rem;
//           border-radius: 12px;
//           font-weight: 600;
//           border-width: 2px;
//         }
        
//         .glitter-particle {
//           pointer-events: none;
//         }
        
//         @media (max-width: 768px) {
//           .payment-page {
//             padding: 2rem 0;
//           }
          
//           .page-title {
//             font-size: 2rem;
//           }
          
//           .payment-tabs {
//             flex-direction: column;
//           }
          
//           .cod-icon-container {
//             width: 60px;
//             height: 60px;
//           }
          
//           .success-card {
//             padding: 2rem 1.5rem;
//           }
          
//           .continue-shopping-btn, .view-orders-btn {
//             width: 100%;
//             margin-right: 0;
//             margin-bottom: 1rem;
//           }
//         }
//       `}</style>
//     </Container>
//   );
// };

// export default PaymentPage;















import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCreditCard, FaCheckCircle, FaArrowLeft, FaMapMarkerAlt, FaTruck, FaMobileAlt, FaHome, FaBriefcase, FaStar, FaPhone, FaEnvelope, FaBox } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Row, Col, Card, Form, Button, Alert, ListGroup } from 'react-bootstrap';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const StripePaymentForm = ({ handleSubmit, processing, error, cardName, setCardName, orderTotal }) => {
  const stripe = useStripe();
  const elements = useElements();

  return (
    <Form onSubmit={(e) => handleSubmit(e, stripe, elements)}>
      <Form.Group className="mb-4">
        <Form.Label>Cardholder Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="John Doe"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Card Details</Form.Label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': { color: '#aab7c4' }
              }
            }
          }}
        />
      </Form.Group>

      {error && <Alert variant="danger">{error}</Alert>}

      <Button
        type="submit"
        disabled={processing || !stripe}
        className="w-100 py-3"
        style={{
          background: '#6c5ce7',
          border: 'none',
          borderRadius: '12px',
          fontWeight: '600'
        }}
      >
        {processing ? 'Processing...' : `Pay ₹${orderTotal.toFixed(2)}`}
      </Button>
    </Form>
  );
};

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { width, height } = useWindowSize();
  const { addressData, cartItems, subtotal, shippingCharge, totalAmount, locationData } = location.state || {};
  
  const [cardName, setCardName] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('card');
  const [showConfetti, setShowConfetti] = useState(true);
  const [upiId, setUpiId] = useState('');
  
  const orderTotal = totalAmount || 0;
  const orderSubtotal = subtotal || 0;
  const orderShipping = shippingCharge || 0;

  const saveOrderToDB = async (paymentMethod) => {
    try {
      const orderData = {
        orderId: uuidv4(),
        customerId: addressData?.userId || 'guest',
        products: cartItems.map(item => ({ // Match the field name
          productId: item.id || item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        image: item.image
        })),
        totalAmount: orderTotal,
        orderDate: new Date(),
        status: paymentMethod === 'cod' ? 'Pending' : 'completed',
        paymentMethod: paymentMethod,
        shippingAddress: {
          street: `${addressData.houseNo}, ${addressData.buildingNo}${addressData.landmark ? `, ${addressData.landmark}` : ''}`,
          city: locationData?.city || '',
          state: locationData?.state || '',
          zipCode: locationData?.pincode || '',
          country: 'India',
          phoneNumber: addressData?.phoneNumber || '',
          email: addressData?.email || ''
        }
      };

      const response = await axios.post('/api/orders', orderData);
      return response.data;
    } catch (err) {
      setError('Failed to save order. Please contact support.');
      throw err;
    }
  };

  const handlePayment = async (e, stripe, elements) => {
    e.preventDefault();
    setProcessing(true);
    setError('');

    try {
      const { data: { clientSecret } } = await axios.post('/api/create-payment-intent', {
        amount: Math.round(orderTotal * 100)
      });

      const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name: cardName }
        }
      });

      if (stripeError) throw stripeError;
      
      await saveOrderToDB('card');
      setPaymentSuccess(true);
      setTimeout(() => setShowConfetti(false), 5000);
    } catch (err) {
      setError(err.message || 'Payment processing failed');
      setProcessing(false);
    }
  };

  const handleUPIConfirm = async (e) => {
    e.preventDefault();
    setProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await saveOrderToDB('upi');
      setPaymentSuccess(true);
      setTimeout(() => setShowConfetti(false), 5000);
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  const getAddressLabelIcon = () => {
    switch (addressData?.addressLabel) {
      case 'Home': return <FaHome className="me-2" />;
      case 'Work': return <FaBriefcase className="me-2" />;
      case 'Other': return <FaStar className="me-2" />;
      default: return <FaHome className="me-2" />;
    }
  };

  if (paymentSuccess) {
    return (
      <Container style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#f8f9fa'
      }}>
        {showConfetti && <Confetti width={width} height={height} recycle={false} />}
        
        <motion.div
          style={{
            background: 'white',
            padding: '3rem',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center',
            maxWidth: '600px'
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <FaCheckCircle style={{ color: '#6c5ce7', fontSize: '4rem', marginBottom: '1rem' }} />
          <h2 style={{ color: '#2d3436', marginBottom: '1rem' }}>Payment Successful!</h2>
          <p style={{ color: '#636e72', marginBottom: '2rem' }}>
            Your order will be delivered to {addressData?.fullAddress}
          </p>
          <Button
            onClick={() => navigate('/home')}
            style={{
              background: '#6c5ce7',
              border: 'none',
              padding: '0.75rem 2rem',
              borderRadius: '8px'
            }}
          >
            Continue Shopping
          </Button>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container style={{ padding: '2rem 0', minHeight: '100vh' }}>
      <Button
        variant="link"
        onClick={() => navigate(-1)}
        style={{
          color: '#6c5ce7',
          textDecoration: 'none',
          marginBottom: '2rem',
          fontWeight: '600'
        }}
      >
        <FaArrowLeft /> Back to Address
      </Button>

      <Row className="g-4 justify-content-center">
        <Col md={7}>
          <Card style={{ borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <Card.Body>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                {['card', 'upi', 'cod'].map((tab) => (
                  <Button
                    key={tab}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      background: activeTab === tab ? '#6c5ce7' : '#f1f3f5',
                      color: activeTab === tab ? 'white' : '#495057',
                      border: 'none',
                      borderRadius: '12px',
                      fontWeight: '600'
                    }}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === 'card' ? <FaCreditCard /> : tab === 'upi' ? <FaMobileAlt /> : <FaTruck />}
                    {tab === 'card' ? 'Credit/Debit Card' : tab.toUpperCase()}
                  </Button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  {activeTab === 'card' ? (
                    <Elements stripe={stripePromise}>
                      <StripePaymentForm
                        handleSubmit={handlePayment}
                        processing={processing}
                        error={error}
                        cardName={cardName}
                        setCardName={setCardName}
                        orderTotal={orderTotal}
                      />
                    </Elements>
                  ) : activeTab === 'upi' ? (
                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                      <Form onSubmit={handleUPIConfirm}>
                        <Form.Group className="mb-4">
                          <Form.Label>UPI ID</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="example@upi"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            required
                          />
                        </Form.Group>
                        <Button
                          type="submit"
                          disabled={processing}
                          style={{
                            background: '#6c5ce7',
                            border: 'none',
                            padding: '1rem 2rem',
                            borderRadius: '12px'
                          }}
                        >
                          {processing ? 'Processing...' : `Pay ₹${orderTotal.toFixed(2)} via UPI`}
                        </Button>
                      </Form>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                      <Button
                        style={{
                          background: '#6c5ce7',
                          border: 'none',
                          padding: '1rem 2rem',
                          borderRadius: '12px'
                        }}
                        onClick={async () => {
                          try {
                            await saveOrderToDB('cod');
                            setPaymentSuccess(true);
                          } catch (err) {
                            setError('Failed to place COD order');
                          }
                        }}
                      >
                        Confirm Cash on Delivery (₹{orderTotal.toFixed(2)})
                      </Button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </Card.Body>
          </Card>
        </Col>

        <Col md={5}>
          <Card style={{ borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', position: 'sticky', top: '1rem' }}>
            <Card.Body>
              <h3 style={{ color: '#2d3436', marginBottom: '1.5rem' }}>Order Summary</h3>
              
              {/* Product List Section */}
              <div className="mb-4">
                <h5 style={{ color: '#495057' }}><FaBox className="me-2" /> Products</h5>
                <ListGroup>
                  {cartItems?.map((item, index) => (
                    <ListGroup.Item key={index} className="d-flex align-items-center">
                      <div className="d-flex align-items-center w-100">
                        {/* Product Image */}
                        <img 
                          src={item.image} 
                          alt={item.name}
                          style={{
                            width: '64px',
                            height: '64px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            marginRight: '1rem'
                          }}
                          className="img-thumbnail"
                        />
                        
                        {/* Product Details */}
                        <div className="d-flex justify-content-between w-100">
                          <div>
                            <div>{item.name}</div>
                            <small className="text-muted">Qty: {item.quantity}</small>
                          </div>
                          <div>₹{(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>

              {addressData && (
                <div className="mb-4">
                  <h5 style={{ color: '#495057' }}><FaMapMarkerAlt /> Delivery Address</h5>
                  <div style={{ 
                    backgroundColor: '#f8f9fa', 
                    padding: '1rem', 
                    borderRadius: '10px',
                    marginTop: '0.5rem'
                  }}>
                    <div className="d-flex align-items-center mb-2">
                      {getAddressLabelIcon()}
                      <span style={{ fontWeight: '500' }}>{addressData.addressLabel}</span>
                    </div>
                    <p className="text-muted mb-1">
                      {addressData.houseNo}, {addressData.buildingNo}
                      {addressData.landmark && `, ${addressData.landmark}`}
                    </p>
                    <p className="text-muted mb-1">{addressData.areaName}</p>
                    {locationData && (
                      <p className="text-muted mb-1">
                        {locationData.city}, {locationData.pincode}
                      </p>
                    )}
                    <div className="d-flex align-items-center mt-2">
                      <FaPhone className="me-2 text-muted" />
                      <span className="text-muted">{addressData.phoneNumber}</span>
                    </div>
                    <div className="d-flex align-items-center mt-1">
                      <FaEnvelope className="me-2 text-muted" />
                      <span className="text-muted">{addressData.email}</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Payment Summary */}
              <div className="border-top pt-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>₹{orderSubtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span>₹{orderShipping.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Payment Method:</span>
                  <span className="text-capitalize">{activeTab === 'card' ? 'Credit/Debit Card' : activeTab}</span>
                </div>
                <div className="d-flex justify-content-between fw-bold pt-2">
                  <span>Total:</span>
                  <span>₹{orderTotal.toFixed(2)}</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;