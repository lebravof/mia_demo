import app from './src/app.js';
import { PORT } from './config.js';

app.listen(PORT, () => {
    console.log(`Running Express Server on Port ${PORT}`);
});