const Joi = require('joi');
require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const connectDB = require('./DB/DB');
connectDB();
const charactersRouter = require('./routes/characters');
app.use('/characters',charactersRouter)
const port = process.env.PORT ||'3000';
app.listen(port, () => console.log(`Listening on port: ${port}...` ))

