import mongoose from "mongoose";
import express from "express";
import userRouter from './router/userRouter.js'
import productRouter from './router/productRouter.js';


const app = express();

// app.use(express.urlencoded({ extended: true }));
app.use(express.text());


app.use('/',userRouter);
app.use('/products',productRouter)

var port = 8080;
mongoose.connect(
  'mongodb+srv://mongo:mongo@confusion.jpav0c7.mongodb.net/?retryWrites=true&w=majority')
    .then(() => app.listen(port))
    .then(() => console.log(`Server started on port http://localhost:${port}/`))
    .catch((err)=>console.log(err));

