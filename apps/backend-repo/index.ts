import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeFirebase } from './config/firebaseConfig';

dotenv.config();

// Initialize Firebase
initializeFirebase();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
