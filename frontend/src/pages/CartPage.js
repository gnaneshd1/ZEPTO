import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from "../actions/cartActions";
import LocationModal from "../components/cart/LocationModal";
import AddressModal from "../components/cart/AddressModal";

const CartItem = ({ item, dispatch }) => (
  <div style={styles.cartItem}>
    <img src={item.image} alt={item.name} style={styles.itemImage} />
    <div style={styles.itemDetails}>
      <div style={styles.itemName}>{item.name}</div>
      <div style={styles.itemPrice}>₹{item.price.toFixed(2)} × {item.quantity}</div>
      <div style={styles.quantityControls}>
        <Button 
          variant="outline-secondary" 
          size="sm"
          onClick={() => dispatch(updateQuantity(item.id, Math.max(1, item.quantity - 1)))}
          disabled={item.quantity <= 1}
        >
          -
        </Button>
        <span style={styles.quantityValue}>{item.quantity}</span>
        <Button 
          variant="outline-secondary" 
          size="sm"
          onClick={() => dispatch(updateQuantity(item.id, item.quantity + 1))}
        >
          +
        </Button>
      </div>
    </div>
    <div style={styles.itemTotal}>₹{(item.price * item.quantity).toFixed(2)}</div>
    <Button 
      variant="link" 
      onClick={() => dispatch(removeFromCart(item.id))}
      style={styles.removeBtn}
    >
      <FaTimes />
    </Button>
  </div>
);

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart);
  
  const [modals, setModals] = useState({
    location: false,
    address: false
  });
  
  const [checkoutData, setCheckoutData] = useState({
    address: null,
    location: null
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const cartMetrics = {
    itemCount: cartItems.reduce((total, item) => total + item.quantity, 0),
    subtotal: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    shipping: cartItems.length > 0 ? 25 : 0,
    get total() {
      return this.subtotal + this.shipping;
    }
  };

  const handleModal = (modal, state) => {
    setModals(prev => ({ ...prev, [modal]: state }));
  };

  const handleCheckoutFlow = () => {
    handleModal('location', true);
  };

  const handleLocationSelection = (location) => {
    setCheckoutData(prev => ({ ...prev, location }));
    handleModal('location', false);
    handleModal('address', true);
  };

  const handleAddressSubmission = (address) => {
    setCheckoutData(prev => ({ ...prev, address }));
    handleModal('address', false);
    
    navigate('/payment', { 
      state: { 
        cartItems: cartItems.map(({ id, name, price, quantity, image }) => ({
          id, name, price, quantity, image
        })), 
        addressData: address,
        locationData: checkoutData.location,
        subtotal: cartMetrics.subtotal,
        shippingCharge: cartMetrics.shipping,
        totalAmount: cartMetrics.total
      } 
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Shopping Cart ({cartMetrics.itemCount})</h1>
      
      {cartItems.length === 0 ? (
        <div style={styles.emptyCart}>Your cart is empty</div>
      ) : (
        <>
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} dispatch={dispatch} />
          ))}
          
          <div style={styles.summarySection}>
            <div style={styles.summaryCard}>
              <div style={styles.summaryRow}>
                <span>Subtotal:</span>
                <span>₹{cartMetrics.subtotal.toFixed(2)}</span>
              </div>
              <div style={styles.summaryRow}>
                <span>Shipping:</span>
                <span>₹{cartMetrics.shipping.toFixed(2)}</span>
              </div>
              <div style={styles.totalRow}>
                <span>Total:</span>
                <span>₹{cartMetrics.total.toFixed(2)}</span>
              </div>
            </div>
            
            <div style={styles.actionButtons}>
              <Button 
                variant="danger" 
                onClick={() => dispatch(clearCart())}
                style={styles.clearButton}
              >
                Clear Cart
              </Button>
              <Button 
                variant="primary" 
                onClick={handleCheckoutFlow}
                style={styles.checkoutButton}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </>
      )}

      <LocationModal 
        show={modals.location} 
        onHide={() => handleModal('location', false)}
        onConfirm={handleLocationSelection}
      />

      <AddressModal 
        show={modals.address} 
        onHide={() => handleModal('address', false)}
        onSave={handleAddressSubmission}
      />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px'
  },
  header: {
    marginBottom: '30px'
  },
  emptyCart: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#666'
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    borderBottom: '1px solid #eee',
    position: 'relative'
  },
  itemImage: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    marginRight: '20px'
  },
  itemDetails: {
    flex: 1
  },
  itemName: {
    fontWeight: 'bold',
    marginBottom: '5px'
  },
  itemPrice: {
    color: '#666',
    marginBottom: '10px'
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  quantityValue: {
    minWidth: '30px',
    textAlign: 'center'
  },
  itemTotal: {
    fontWeight: 'bold',
    margin: '0 20px'
  },
  removeBtn: {
    color: '#dc3545',
    padding: '5px'
  },
  summarySection: {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px'
  },
  summaryCard: {
    marginBottom: '20px'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    borderTop: '1px solid #ddd',
    paddingTop: '10px'
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '15px'
  },
  clearButton: {
    marginRight: '10px'
  },
  checkoutButton: {
    minWidth: '200px'
  }
};

export default CartPage;