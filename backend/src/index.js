import express from 'express';
import {userRouter} from './routers/userRouter.js';
import {tripRouter} from './routers/tripRouter.js';
import dotenv from 'dotenv';
const mongo = import('./mongo/index.js');
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(cors({origin:'*'}));
app.use(express.json());
app.use(userRouter)
app.use(tripRouter)
app.listen(port, () => {
    console.log(`Server is up and running at port ${port} ⚡`)
})
