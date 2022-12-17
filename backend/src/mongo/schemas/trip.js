import { Schema, model } from 'mongoose';

const tripSchema = new Schema({
    origin:  {type: String},
    originDate: {type:Date},
    destination:  {type: String},
    destinationDate: {type:Date},
    seats:{type: Number},
    price:{type: Number},
});

const Trip = model('Trip', tripSchema);
export default Trip;