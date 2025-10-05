const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import routes
const userRoutes = require('./routes/users');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/orders');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

// Test route
app.get('/', (req, res) => res.send('Smart Food Ordering Backend Running!'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
