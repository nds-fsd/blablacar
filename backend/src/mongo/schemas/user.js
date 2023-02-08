const { Schema, model } = require ('mongoose');
const bcrypt = require ("bcrypt");

const userSchema = new Schema({
    name:{type : String},
    surname:{type : String},
    Birthday:Date,
    email:{type: String, unique: true},
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
    password:{type: String},
    idTrips: [{
        type: Schema.Types.ObjectId,
        ref: "Trip"
     }],
    bookedTrips: [{
        type: Schema.Types.ObjectId,
        ref: "Booking"
     }],
    picUrl:{type: String},
});

userSchema.pre('save',  function(next) {
	const user = this;
	if (!user.isModified('password')) return next();

	bcrypt.genSalt(10, function(err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});


userSchema.methods.comparePassword = (password)=> {
    return bcrypt.compareSync(password,this.password);
};

const Users = model('Users', userSchema);
module.exports=(Users);