const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username :{
        type: String,
        required : [true , 'user name is required'],
        unique: [true, "Username is already taken !"]
    },
    email :{
        type: String , 
        require : [true,"please provide email address"],
        unique:[ true, "user with this email already exist"]
    },
    password:{
        type: String,
        require: [true , "please provide password"],
        minlength: [6, "Atleast 6 character required!"]
    }
},
{
    timestamp: true
})


module.exports = User = mongoose.model('User' , userSchema) // here you just have to write the title name of your data