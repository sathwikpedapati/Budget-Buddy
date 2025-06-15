const mongoose = require("mongoose");
const passportLocalMongoose= require('passport-local-mongoose');
const userSchema =  new mongoose. Schema({
    name: String,
    email:{
        type:String,
        required:true,
        unique:true
    },
   
},{timestamps:true});
userSchema.plugin(passportLocalMongoose,{
     usernameField: "email"
});
const userModel = mongoose.model("users",userSchema);
module.exports= userModel;