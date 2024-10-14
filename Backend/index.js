import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/connectdb.js';
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});