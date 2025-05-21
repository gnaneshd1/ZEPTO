const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-payment-intent', async (req, res) => {
  try {
    // Convert amount to cents (Stripe requires integer)
    const amount = Math.round(req.body.amount * 100);
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'inr', // Changed to INR for Indian Rupee
      automatic_payment_methods: { enabled: true },
      metadata: { integration_check: 'accept_a_payment' }
    });

    res.status(200).json({ 
      clientSecret: paymentIntent.client_secret 
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Payment processing failed',
      details: error.message 
    });
  }
});

module.exports = router;