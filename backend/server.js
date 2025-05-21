
const productRoutes = require('./routes/productRoutes');


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(productRoutes);


mongoose.connect('mongodb://localhost:27017/zepto-login', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));


const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: String,
  password: String
});

const User = mongoose.model('User', UserSchema);

// Register Route
app.post('/Register', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;
    if (!email.endsWith('@gmail.com')) {
      return res.status(400).json({ message: 'Email must end with @gmail.com' });
    }
    if (phone.length !== 10) {
      return res.status(400).json({ message: 'Phone number must be exactly 10 digits' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ firstName, lastName, email, phone, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'Registered Successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error in Registration', error: err });
  }
});


// Login Route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.status(200).json({ message: 'Login Successful' });
  } catch (err) {
    res.status(500).json({ message: 'Error in Login', error: err });
  }
});

const PORT = 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
