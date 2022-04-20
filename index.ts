//include modules
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import indexRouter from './routes/index';
import errorHandler from './middleware/ErrorHandlingMiddleware'
import { Note } from './repositories/Note';

//variables
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/', indexRouter);

//error
app.use(errorHandler)

const start = () =>{
    app.listen(PORT,()=>{
        console.log(`Server run on port = ${PORT}`);
    })
}

start();