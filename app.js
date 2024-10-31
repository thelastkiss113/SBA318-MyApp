import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static('public'));

// Set Mongoose strictQuery option to suppress the warning
mongoose.set('strictQuery', false);

// MongoDB connection
mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB Connected');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Basic route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
