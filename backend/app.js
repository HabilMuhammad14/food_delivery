import express from 'express';
import bcrypt from 'bcrypt'
import cors from 'cors';
import meals from './routes/meals.js'
import orders from './routes/orders.js'
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/meals', meals)
app.use('/api/orders', orders)
app.listen(5000, () => {
    console.log('Server Berjalan Pada Port 5000')
});