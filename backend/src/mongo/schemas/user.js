import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name:{type : String},
    surname:{type : String},
    birthDate:{Type :String},
    email:{type: String},
    role:{type: String},
    status:{type:Number, min:1, max:5},
    tratamiento: String,
    genero:String,
    fumador:Boolean,
    hablador:{type:Number, min:1, max:3},
    musica:{type:Number, min:1, max:3},
    ID:String,
    ValidatedID:{type:Number, min:1, max:3, default:1},
    RGPDaccepted:Boolean,
    Nacimiento:Date,
});

const Users = model('Users', userSchema);
export default Users;