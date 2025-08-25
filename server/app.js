import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import routes from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'Qlique Backend API is running!'});
});

app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
  
app.use('/api/v1', routes);

app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((error, req, res, next) => {
console.error(error.stack);
res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
console.log(`Health check: http://localhost:${PORT}/health`);
console.log(`API base: http://localhost:${PORT}/api/v1`);
});
  