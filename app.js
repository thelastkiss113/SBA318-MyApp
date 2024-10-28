const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // Serve static files from the public directory

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/sample_trainings', {
    // No need for useNewUrlParser and useUnifiedTopology
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Sample API route
app.get('/api/grades', (req, res) => {
    // Replace with your actual logic to retrieve grades
    res.json([{ id: 1, grade: 'A' }, { id: 2, grade: 'B' }]);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
