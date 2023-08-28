// server.js
import dotenv from 'dotenv'; // Import dotenv
import app from './app.js'; // Adjust the path as needed
import connectDB from './config/db.js';

// Load environment variables based on NODE_ENV
if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: '.env.development' });
  } else {
    dotenv.config();
  }

const port = process.env.PORT || 8080;


connectDB();
app.listen(port, () => console.log(`Server started on port ${port}`));
