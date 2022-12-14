
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const mongoUrl=process.env.MONGOURL;

mongoose.connect(mongoUrl);
mongoose.set('strictQuery', false)

export const mongo = mongoose.connection;
mongo.on('error', (error) => console.error(error));
mongo.once('open', () => {
    console.log('connected to database');
});

