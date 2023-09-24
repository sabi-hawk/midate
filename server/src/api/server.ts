import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import apiRouter from './routes';
import helmet from "helmet";

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(helmet());
app.use(cors());
app.disable('x-powered-by');
app.use("/api", apiRouter);


// Define your custom middleware
app.use((req, res, next) => {
  console.log(`Received a ${req.method} request at ${req.url}`);
  next();
});

mongoose
// @ts-ignore
  .connect(process.env.MONGO_DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to Datebase');
  })
  .catch((error: any) => {
    console.error('MongoDB connection error:', error);
  });

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Midate API' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
