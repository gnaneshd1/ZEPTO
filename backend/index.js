require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const orderRoutes = require('./server/routes/orderRoutes');


// const User = require('./Modules/User');
const path = require('path');
const product = require('./server/models/Product')
require('dotenv').config();

// Route files
const authRoutes = require('./server/routes/auth');
const productRoutes = require('./server/routes/productRoutes.js');

const paymentRoutes = require('./server/routes/paymentRoutes');


// Initialize app here
const app = express();



// Use CORS middleware
// Enhanced Middleware
app.use(cors({
    origin: ['http://localhost:3001', 'http://13.202.229.14:3001'], // Adjust according to your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  app.use(bodyParser.json({ limit: '10mb' })); // Handle larger JSON payloads
  app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  app.use(express.static(path.join(__dirname, 'views')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Required to parse JSON request bodies
app.use(express.json());

app.use('/api', paymentRoutes); // Add this line with existing route declarations


app.use('/api/orders', orderRoutes);

app.use('/auth', authRoutes);
app.use('/api', productRoutes);

app.get('/Register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

// app.get('/ForgotPassword', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'forgot-password.html'));
// });

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'MONGO_URI=mongodb://fervent_jepsen:27017/zepto-login', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));


// Order list endpoint
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Routes
app.use('/api/orders', orderRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Server running at: http://localhost:${PORT}`));










