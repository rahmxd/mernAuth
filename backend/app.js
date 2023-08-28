// app.js
import express from 'express';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get('/', (req, res) => res.send('Server is ready'));

app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
