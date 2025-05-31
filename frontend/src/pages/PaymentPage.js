
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