const mongoose = require("mongoose");
const transcationSchema= new mongoose.Schema({
   userid:{
    type:String,
    required:true
   },
   amount:{
    type:Number,
    required:[true,"Amount is required"]
   },
   type:{
      type:String,
      required:[true,"type is required"]
   },
   category:{
    type:String,
    required:[true,"cat is required"]
   },
   reference:{
    type:String,
   },
   description: {
     type: String,
      required: [true, "description is required"]
},date: {
  type:Date,
  required: [true, "Date is required"]
}
},{timestamps:true});
const transcationModel = mongoose.model("transcations",transcationSchema);
module.exports=transcationModel;