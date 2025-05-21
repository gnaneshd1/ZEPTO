// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   orderId: { type: String, required: true, unique: true },
//   customerId: { type: String, required: true },
//   products: [
//     {
//       productId: { type: String, required: true },
//       name: { type: String, required: true },
//       price: { type: Number, required: true },
//       quantity: { type: Number, required: true }
//     }
//   ],
//   totalAmount: { type: Number, required: true },
//   orderDate: { type: Date, default: Date.now },
//   status: { type: String, default: 'Pending' },
//   paymentMethod: { type: String, required: true },
//   shippingAddress: {
//     street: String,
//     city: String,
//     state: String,
//     zipCode: String,
//     country: String,
//     phoneNumber: String,
//     email: String
//   }
// });

// module.exports = mongoose.model('Order', orderSchema);







// Backend: order.model.js (Mongoose Schema)
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customerId: { type: String, required: true },
   products: [{
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true }
  }],
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' },
  paymentMethod: { type: String, required: true },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    phoneNumber: String,
    email: String
  }
});

module.exports = mongoose.model('Order', orderSchema);