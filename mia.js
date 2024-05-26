import app from './src/app.js';
import { PORT } from './config.js';

app.listen(PORT, () => {
    console.log(`MIA app running on Express Server on Railway Port ${PORT}`);
});