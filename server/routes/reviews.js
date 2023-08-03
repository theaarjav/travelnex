const express=require("express")
const Review=require("../models/Reviews")
const User=require('../models/User')
const router=express.Router();
const authenticate=require('../middleware/authenticate')

router.post('/:reviewID', authenticate, async(req, res)=>{
    try {
        const {userId, text}=req.body;
        var reviewID=req.params.reviewID;
        console.log(reviewID)
        if(reviewID==="none")reviewID="0"
        const user=await User.findById(userId).populate("name");
        const obj={
            user:userId, 
            // name:user.name,
            text,
            parent:reviewID
        }
        if(user && user.name)obj.name=user.name
        const newReview=await Review.create(obj);
        await newReview.save();
        res.status(200).json(newReview)
        console.log("Review posted")
    } catch (error) {
        res.status(403).json({"err":error})
    }
})


router.get('/', async(req, res)=>{
    try {
        const allReviews=await Review.find();
        res.status(200).json({"allReviews":allReviews})
    } catch (error) {
        res.status(403).json({"err":error})
    }
})

module.exports=router