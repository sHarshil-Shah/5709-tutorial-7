import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './user.routes';


const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Connect to MongoDB Atlas
mongoose
  .connect('mongodb+srv://admin:MyP%40ss12@tutorial6.sp5czon.mongodb.net/')
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error(`Failed to connect to MongoDB Atlas: ${error}`));
