const express = require('express');
const router = express.Router();
const Booking=require('../models/Booking')
const authenticate=require('../middleware/authenticate');
router.post('/bookings', authenticate,  async (req, res) => {
    // Extract booking data from the request body
    try {
      
      const { userId, bookingID,  startDate, endDate, destination, days, nights, review, totalSeats } = req.body;
      
      // Validate the booking data
      // Perform necessary checks, such as checking for available slots, user authentication, etc.
      
      // If the booking data is valid, proceed with booking creation
      // Create a new booking record in the database
      const obj = {
        userId,
        // packageId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        destination,
        days,
        nights,
        review,
        totalSeats
      };
      if(!bookingID){
        
        // Save the new booking to the database
        const newBooking=await Booking.create(obj)
        await newBooking.save();
        res.status(200).json({msg:"Booked", newBooking});
        console.log("booking created")
    }else{
       const updatedBooking=await Booking.findOneAndUpdate({ _id:bookingID }, obj);
        res.status(200).json({msg:"Booking Updated", updatedBooking});
      // const updateBooking=await Booking.updateOne({_id:mongoose.Types.ObjectId(bookingID)}, obj );
      // updateBooking.save();
      console.log("booking updated")
    }
    } catch (err) {
      
      
      console.error('Error saving booking:', err);
      res.status(500).json({ message: 'Failed to create booking', err });
    }
       
    });

  router.get('/bookings/:bookingId', authenticate,  async (req, res) => {
    // Extract the booking ID from the request parameters
    try {
      
      const  bookingId  = req.params.bookingId;
      const booking=await Booking.findById(bookingId);
      console.log(booking)
      // Retrieve the booking details from the database using the booking ID
      // booking.startDate=startDate.toString();
      // booking.endDate=endDate.toString();
      // If the booking is found, send the details as a response
      res.status(200).json({ booking });
    } catch (error) {
      
      
      // If the booking is not found, send an error response
      res.status(404).json({ message: 'Booking not found' , error});
    }
  });

  router.get('/packages/:packageId', authenticate,  async (req, res) => {
    // Extract the booking ID from the request parameters
    try {
      
      const  packageId  = req.params.packageId;
      const bookings=await Booking.find({packageId:packageId});
      console.log(bookings)
      // Retrieve the booking details from the database using the booking ID
      // booking.startDate=startDate.toString();
      // booking.endDate=endDate.toString();
      // If the booking is found, send the details as a response
      res.status(200).json({ bookings });
    } catch (error) {
      
      
      // If the booking is not found, send an error response
      res.status(404).json({ message: 'Booking not found' , error});
    }
  });

  router.get('/mybookings', authenticate,  async (req, res) => {
    // Extract the booking ID from the request parameters
    try {
      
      const  userId  = req.params.userId;
      const booking=await Booking.find({userId:req.user.id});
      console.log(booking)
      // Retrieve the booking details from the database using the booking ID
      // booking.startDate=startDate.toString();
      // booking.endDate=endDate.toString();
      // If the booking is found, send the details as a response
      res.status(200).json({ booking });
    } catch (error) {
      
      
      // If the booking is not found, send an error response
      res.status(404).json({ message: 'Booking not found' , error});
    }
  });

  router.get('/bookings', async(req, res)=>{
    try {
      const allBookings=await Booking.find().select("-userId");
      if(!allBookings)return res.status(200).json("No bookings yet");
      return res.status(200).json({"Bookings":allBookings})
    } catch (error) {
      res.status(401).json(error)
    }
  })
  module.exports = router;