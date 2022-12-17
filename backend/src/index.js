import express from 'express';
import userRouter from './routers/userRouter';
import dotenv from 'dotenv';
app.use(express.json());
app.use(userRouter)
const mongo=import('./mongo/index.js');

dotenv.config();
const app = express();
const port = process.env.PORT;





app.listen(port, () => {
    console.log(`Server is up and running at port ${port} ⚡`)
})
