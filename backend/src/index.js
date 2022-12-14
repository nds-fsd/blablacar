import express from 'express';
import dotenv from 'dotenv';
const mongo=import('../mongo/index.js');

dotenv.config();
const app = express();
const port = process.env.PORT;





app.listen(port, () => {
    console.log(`Server is up and running at port ${port} ⚡`)
})
