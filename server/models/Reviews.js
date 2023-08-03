const mongoose=require('mongoose');
const reviewSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:false
    },
    name:{
        type:String
    },
    parent:{
        type:String,
        default:"0"
    },
    text:{
        type:String,
        required:true
    },
    booking:{
        type:String,
        default:"0"
    }
})

const Review=mongoose.model("Review", reviewSchema);
module.exports=Review