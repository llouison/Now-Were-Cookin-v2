import express from 'express';
import path from 'path';
// import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();
const app = express();
const PORT = 3000;

// mongoose.connect(process.env.MONGO_URI);

/* Automatically parse urlencoded body content and form
data from incoming requests and place it in req.body */
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (_req, res) => {
  res.sendFile(
    path.resolve(path.resolve(import.meta.dirname, '../index.html'))
  );
});

/* 404 handler - TO-DO: Create custom page */
app.use('*catchall', (_req, res) => {
  res.status(404).send('Not Found');
});

/* Global error handler */
app.use((err, _req, res, _next) => {
  console.log(err);
  res.status(500).send({ error: err });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 express server listening on port ${PORT}`);
});

// module.exports = app;
