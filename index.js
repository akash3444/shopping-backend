const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require('./routes/user');
const productsRouter = require('./routes/product');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(productsRouter);


mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true }, () => console.log('DB Connected!'));
mongoose.connection.on('error', (error) => console.log(`Failed to connect: ${error}`));

app.listen(PORT, () => console.log('Server started successfully!'))