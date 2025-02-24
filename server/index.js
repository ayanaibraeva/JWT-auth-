require('dotenv').config();

//базовая структура express приложения

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index');

const PORT = process.env.PORT || 5000;
const app = express();

//необходимые middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());  //для взаимодецствия сервера с браузером
app.use('/api', router)
const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL) //возможно потому что Vite
        console.log('DB_URL:', process.env.DB_URL);
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`) )
    } catch (e) {
        console.log(e)
    }
}

start();