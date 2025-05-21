// Constants
const TAX_RATE = 0.18;
const FIXED_DELIVERY = 50;

const initialState = {
  cartItems: [],
  cartCounter: 0,
  totalPrice: 0,
  deliveryCharges: FIXED_DELIVERY,
  taxes: 0,
  grandTotal: 0,
};

const calculateTotals = (items, delivery) => {
  const totalPrice = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const taxes = parseFloat((totalPrice * TAX_RATE).toFixed(2));
  const grandTotal = parseFloat((totalPrice + taxes + delivery).toFixed(2));
  
  return { 
    totalPrice: parseFloat(totalPrice.toFixed(2)),
    taxes,
    grandTotal 
  };
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const item = action.payload;
      if (!item?.id || typeof item.price !== 'number') {
        console.error('Invalid item:', item);
        return state;
      }

      const existingIndex = state.cartItems.findIndex(i => i.id === item.id);
      const updatedCartItems = [...state.cartItems];
      
      if (existingIndex > -1) {
        const existingItem = updatedCartItems[existingIndex];
        const newQuantity = existingItem.quantity + item.quantity;
        updatedCartItems[existingIndex] = {
          ...existingItem,
          quantity: newQuantity,
          total_item_price: item.price * newQuantity
        };
      } else {
        updatedCartItems.push({
          ...item,
          total_item_price: item.price * item.quantity
        });
      }
      
      return {
        ...state,
        cartItems: updatedCartItems,
        cartCounter: state.cartCounter + item.quantity,
        ...calculateTotals(updatedCartItems, state.deliveryCharges)
      };
    }

    case 'REMOVE_FROM_CART': {
      const itemId = action.payload;
      const itemIndex = state.cartItems.findIndex(item => item.id === itemId);
      if (itemIndex === -1) return state;

      const removedItem = state.cartItems[itemIndex];
      const updatedCartItems = state.cartItems.filter((_, index) => index !== itemIndex);

      return {
        ...state,
        cartItems: updatedCartItems,
        cartCounter: state.cartCounter - removedItem.quantity,
        ...calculateTotals(updatedCartItems, state.deliveryCharges)
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity: newQuantity } = action.payload;
      const itemIndex = state.cartItems.findIndex(item => item.id === id);
      if (itemIndex === -1) return state;

      const updatedCartItems = [...state.cartItems];
      const item = updatedCartItems[itemIndex];
      const oldQuantity = item.quantity;

      updatedCartItems[itemIndex] = {
        ...item,
        quantity: Math.max(1, newQuantity),
        total_item_price: item.price * Math.max(1, newQuantity)
      };

      return {
        ...state,
        cartItems: updatedCartItems,
        cartCounter: state.cartCounter - oldQuantity + updatedCartItems[itemIndex].quantity,
        ...calculateTotals(updatedCartItems, state.deliveryCharges)
      };
    }

    case 'CLEAR_CART':
      return {
        ...initialState,
        ...calculateTotals([], initialState.deliveryCharges)
      };

    default:
      return state;
  }
};

export default cartReducer;