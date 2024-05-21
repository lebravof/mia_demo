//import app from './src/mia_server.js';
import express from 'express';
import app from './src/mia_server.js';

import { PORT } from './config.js';
//const app = express();

app.listen(PORT, () => {
    console.log(`Running Express Server on Port ${PORT}`);
});