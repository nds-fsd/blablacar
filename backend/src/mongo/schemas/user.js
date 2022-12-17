import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name:{type : String},
    birthDate:{Type :String},
    email:{type: String},
});

const Users = model('Users', userSchema);
export default Users;