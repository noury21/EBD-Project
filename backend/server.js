import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'; 

const app = express();



app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});


if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas successfully!'))
    .catch((err) => console.error('MongoDB connection error:', err));
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
