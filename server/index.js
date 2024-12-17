const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
const path = require('path');
const { userRouter } = require('./routes/authRoutes');
const { ResRouter } = require('./routes/restaurantRoutes');
const { foodRouter } = require('./routes/foodRoutes');


app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Welcome to the Food API!');
});

app.use('/user', userRouter);
app.use('/Restaurant', ResRouter);
app.use('/Food', foodRouter);


const PORT = 8090;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})