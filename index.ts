//include modules
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import indexRouter from './routes/indexRouter';
import errorHandler from './middleware/ErrorHandlingMiddleware'

//variables
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());    //for use json
app.use('/', indexRouter);  //route to indexRouter.ts

//error
app.use(errorHandler);      //catch errors

//start server
app.listen(PORT, () => {
    console.log(`Server run on port = ${PORT}`);
})