const express = require ('express');
const {userRouter} = require('./routers/userRouter.js');
const {tripRouter} = require('./routers/tripRouter.js');
const {authRouter} = require('./routers/authRouter.js');
const errorLogging = require('./Middleware/errorsMiddleware.js');
const dotenv = require('dotenv');
const {connectDB} = require ('./mongo/index.js');
const cors = require('cors');
//Adding morgan middleware for better logs >> npm install morgan at first use
const morgan= require ('morgan');

dotenv.config();
const app = express();
let port = process.env.PORT;

if(process.env.NODE_ENV !== 'test'){
    connectDB().then((error) => {
        if(error){
            console.log(error);
        }else{
            console.log('🏢 Connected to database!');
        }
    });
}else{
    port = process.env.TEST_PORT
}

//Invoke morgan middleware with option "dev"
app.use(morgan('dev'));

app.use(cors({origin:'*'}));
app.use(express.json());

//Routers 
app.use(userRouter)
app.use(tripRouter)
//Login router
app.use('/auth', authRouter);

// Adding Error Handling Middleware as per Best Practice. Must be last middleware before app.listen. Will capture any error.
// There is an OS Middleware in Express called error-handling but we chose the hard way :)
app.use(errorLogging);


const server = app.listen(port, () => {
    console.log(`Server is up and running at port ${port} ⚡`)
})


module.exports = {server,app}