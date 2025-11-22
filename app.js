require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const assignmentRoutes = require('./routes/assignments');
app.use('/assignments', assignmentRoutes);

// Home route
app.get('/', (req, res) => {
    res.render('home');
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✔ MongoDB Connected'))
    .catch(err => console.log('❌ MongoDB Connection Error:', err));

// Start server
app.listen(process.env.PORT || 3000, () => {
    console.log(`✔ Server running on http://localhost:${process.env.PORT}`);
});
