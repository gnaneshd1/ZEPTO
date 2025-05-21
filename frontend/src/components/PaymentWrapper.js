// components/PaymentWrapper.jsx
import { Elements } from '@stripe/react-stripe-js';
import getStripe from '../config/stripe';
import PaymentPage from '../pages/PaymentPage';

export default function PaymentWrapper() {
  return (
    <Elements stripe={getStripe()}>
      <PaymentPage />
    </Elements>
  );
}