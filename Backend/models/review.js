const mongoose= require("mongoose");
const Schema=mongoose.Schema;

const reviewShema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    review:{
        type:String,
        required:true,
    },
    
},{
    timestamps:true,
});

const Review=mongoose.model("Review",reviewShema);
module.exports=Review;
