//include modules
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import indexRouter from './routes/index';

//variables
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/', indexRouter);
// app.use(bodyParser.urlencoded({ extended: true }));

//error

const start = () =>{
    app.listen(PORT,()=>{
        console.log(`Server run on port = ${PORT}`);
    })
}

start();