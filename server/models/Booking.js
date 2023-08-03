const mongoose=require('mongoose')

const bookingSchema = new mongoose.Schema({
    userId: {type:String},
    destination: {type:String},
    packageId:{type:String},
    description:{type:String},
    price:{type:Number},
    startDate: {type:Date},
    endDate: {type:Date},
    days:{type:Number},
    nights:{type:Number},
    review:{type:Number},
    booked:{type:Boolean, default:false},
    totalSeats:{type:Number},
  },
  {timestamps:true}
  );
  
  const Booking = mongoose.model('Booking', bookingSchema);
  module.exports=Booking