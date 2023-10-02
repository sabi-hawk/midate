import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import apiRouter from './routes';
import helmet from "helmet";
import path from 'path';
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config()
// require('dotenv').config();

const app = express();
const port = process.env.PORT || 8001;

app.use(express.json());
app.use(helmet());

const corsOptions = {
  origin: ['http://example.com', 'http://localhost:3000'],
};

app.use(cors(corsOptions));
app.disable('x-powered-by');
app.use("/api", apiRouter);


// Define your custom middleware
app.use((req, res, next) => {
  console.log(`Received a ${req.method} request at ${req.url}`);
  next();
});

app.use("/images", express.static(path.join(__dirname, '../../uploads')))

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


// Create HTTP server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Initialize Socket.IO
const io = new Server(server);

io.on("connection", async (socket) => {
  console.log(`Socket ${socket.id} connected`);

  socket.on("test", () => {
    console.log("Test Emit is Working Fine")
  })
  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });

});