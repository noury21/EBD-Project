import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'; 

const app = express();



app.use(express.json());


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas successfully!'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});