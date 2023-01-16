import express from 'express';
import {userRouter} from './routers/userRouter.js';
import {tripRouter} from './routers/tripRouter.js';
import errorLogging from './Middleware/errorsMiddleware.js';
import dotenv from 'dotenv';
const mongo = import('./mongo/index.js');
import cors from 'cors';
//Adding morgan middleware for better logs >> npm install morgan at first use
import morgan from 'morgan';

dotenv.config();
const app = express();
const port = process.env.PORT;

//Invoke morgan middleware with option "dev"
app.use(morgan('dev'));

app.use(cors({origin:'*'}));
app.use(express.json());

//Login router
//app.use('/auth/login', require('./routers/authRouter'));

// Adding Error Handling Middleware as per Best Practice. Must be last middleware before app.listen. Will capture any error.
// There is an OS Middleware in Express called error-handling but we chose the hard way :)
app.use(errorLogging);

app.listen(port, () => {
    console.log(`Server is up and running at port ${port} ⚡`)
})
