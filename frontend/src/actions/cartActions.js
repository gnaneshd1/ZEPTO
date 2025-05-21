// cartActions.js

// Validates item structure before creating ADD_TO_CART action
export const addToCart = (item) => {
  // Validate required item properties
  if (!item || !item.id || typeof item.price !== 'number' || !item.image) {
    console.error('Attempted to add invalid item to cart:', item);
    return {
      type: 'CART_ACTION_ERROR',
      payload: {
        error: 'Invalid item format',
        invalidItem: item,
        timestamp: Date.now()
      }
    };
  }

  return {
    type: 'ADD_TO_CART',
    payload: {
      ...item,
      quantity: 1, // Default quantity when first added
      addedAt: new Date().toISOString(),
      // Generated unique cart ID for items with same product ID but different variants
      cartId: `${item.id}-${Date.now()}`
    }
  };
};

export const removeFromCart = (cartId) => ({
  type: 'REMOVE_FROM_CART',
  payload: cartId
});

export const updateQuantity = (cartId, newQuantity) => {
  // Validate quantity is a positive integer
  if (!Number.isInteger(newQuantity) || newQuantity < 1) {
    console.error('Invalid quantity value:', newQuantity);
    return {
      type: 'CART_ACTION_ERROR',
      payload: {
        error: 'Quantity must be a positive integer',
        cartId,
        invalidQuantity: newQuantity,
        timestamp: Date.now()
      }
    };
  }

  return {
    type: 'UPDATE_QUANTITY',
    payload: { cartId, quantity: newQuantity }
  };
};

export const clearCart = () => ({
  type: 'CLEAR_CART'
});

// Optional: For handling cart persistence
export const loadCartFromStorage = (cartItems) => ({
  type: 'LOAD_CART_FROM_STORAGE',
  payload: cartItems
});

// Optional: Error handling action
export const cartActionError = (error) => ({
  type: 'CART_ACTION_ERROR',
  payload: error
});