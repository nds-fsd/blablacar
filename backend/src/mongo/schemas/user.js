import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name:{type : String},
    surname:{type : String},
    dateOfBirth:{Type :String},
    email:{type: String},
    role:{type: String},
    status:{type:Number, min:1, max:5},
    treatment:{type: String},
    genero:{type: String},
    fumador:Boolean,
    hablador:{type:Number, min:1, max:3},
    musica:{type:Number, min:1, max:3},
    ID:String,
    ValidatedID:{type:Number, min:1, max:3, default:1},
    RGPDaccepted:Boolean,
    Nacimiento:Date,
    password:{type: String},
});

const Users = model('Users', userSchema);
export default Users;