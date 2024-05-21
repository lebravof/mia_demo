//import app from './src/app.js';
import express from 'express';
import { PORT } from './config.js';

const app = express();

app.listen(PORT, () => {
    console.log(`Running Express Server on Port ${PORT}`);
});