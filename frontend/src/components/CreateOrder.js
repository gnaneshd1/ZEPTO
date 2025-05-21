import React, { useState } from 'react';
import { createOrder } from '../services/orderService';

const CreateOrder = () => {
  // 1. Initialize state for the order form
  const [order, setOrder] = useState({
    orderId: '',
    customerId: '',
    products: [{ productId: '', name: '', price: 0, quantity: 1 }],
    totalAmount: 0,
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });

  // 2. Handle changes for top-level order fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder(prev => ({ ...prev, [name]: value }));
  };

  // 3. Handle changes for shipping address fields
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setOrder(prev => ({
      ...prev,
      shippingAddress: { ...prev.shippingAddress, [name]: value }
    }));
  };

  // 4. Handle changes for product fields
  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const newProducts = [...order.products];
    newProducts[index] = { 
      ...newProducts[index], 
      [name]: name === 'price' || name === 'quantity' ? Number(value) : value 
    };
    setOrder(prev => ({ ...prev, products: newProducts }));
  };

  // 5. Add a new empty product field
  const addProduct = () => {
    setOrder(prev => ({
      ...prev,
      products: [...prev.products, { productId: '', name: '', price: 0, quantity: 1 }]
    }));
  };

  // 6. Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 7. Validate required fields
      if (!order.orderId.trim()) {
        throw new Error('Order ID is required');
      }
      if (!order.customerId.trim()) {
        throw new Error('Customer ID is required');
      }
      if (order.products.some(p => !p.productId.trim())) {
        throw new Error('All products must have an ID');
      }

      // 8. Calculate total if not provided
      const calculatedTotal = order.products.reduce(
        (sum, product) => sum + (product.price * product.quantity), 
        0
      );
      
      // 9. Prepare the order data
      const orderData = {
        ...order,
        totalAmount: order.totalAmount > 0 ? order.totalAmount : calculatedTotal
      };

      // 10. Make the API call
      const response = await fetch('http://localhost:5005/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      // 11. Handle response
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      const result = await response.json();
      alert(`Order ${result.orderId} created successfully!`);
      
      // 12. Reset form after success
      setOrder({
        orderId: '',
        customerId: '',
        products: [{ productId: '', name: '', price: 0, quantity: 1 }],
        totalAmount: 0,
        shippingAddress: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: ''
        }
      });

    } catch (error) {
      console.error('Order submission error:', error);
      alert(`Error: ${error.message}`);
    }
  };

  // 13. Render the form
  return (
    <div className="order-form">
      <h2>Create New Order</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Order ID Field */}
        <div className="form-group">
          <label>Order ID:</label>
          <input
            type="text"
            name="orderId"
            value={order.orderId}
            onChange={handleChange}
            required
          />
        </div>

        {/* Customer ID Field */}
        <div className="form-group">
          <label>Customer ID:</label>
          <input
            type="text"
            name="customerId"
            value={order.customerId}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Products Section */}
        <h3>Products</h3>
        {order.products.map((product, index) => (
          <div key={index} className="product-group">
            <div className="form-group">
              <label>Product ID:</label>
              <input
                type="text"
                name="productId"
                value={product.productId}
                onChange={(e) => handleProductChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={(e) => handleProductChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label>Price:</label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={product.price}
                onChange={(e) => handleProductChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label>Quantity:</label>
              <input
                type="number"
                min="1"
                name="quantity"
                value={product.quantity}
                onChange={(e) => handleProductChange(index, e)}
                required
              />
            </div>
          </div>
        ))}
        <button 
          type="button" 
          onClick={addProduct}
          className="add-product-btn"
        >
          Add Product
        </button>
        
        {/* Shipping Address Section */}
        <h3>Shipping Address</h3>
        <div className="form-group">
          <label>Street:</label>
          <input
            type="text"
            name="street"
            value={order.shippingAddress.street}
            onChange={handleAddressChange}
          />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={order.shippingAddress.city}
            onChange={handleAddressChange}
          />
        </div>
        <div className="form-group">
          <label>State:</label>
          <input
            type="text"
            name="state"
            value={order.shippingAddress.state}
            onChange={handleAddressChange}
          />
        </div>
        <div className="form-group">
          <label>Zip Code:</label>
          <input
            type="text"
            name="zipCode"
            value={order.shippingAddress.zipCode}
            onChange={handleAddressChange}
          />
        </div>
        <div className="form-group">
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={order.shippingAddress.country}
            onChange={handleAddressChange}
          />
        </div>
        
        {/* Total Amount Field */}
        <div className="form-group">
          <label>Total Amount:</label>
          <input
            type="number"
            step="0.01"
            name="totalAmount"
            value={order.totalAmount}
            onChange={handleChange}
          />
        </div>
        
        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          Create Order
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;