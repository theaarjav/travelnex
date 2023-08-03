const express=require("express");
const app=express();

const cors=require("cors");
const dotEnv=require("dotenv");
const bodyParser=require("body-parser");

const mongoose=require("mongoose");

const authRouter=require('./routes/auth')
const bookingsRouter=require('./routes/bookings')
const reviewRouter=require('./routes/reviews');
const paymentRouter=require('./routes/payment')
const port = 5000; // Choose any port number you prefer
app.use(cors());
app.use(express.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.json({limit:"50mb"}));

app.use(bodyParser.urlencoded({limit:"50mb", parameterLimit:100000, extended:true}));

dotEnv.config({path:'./.env'});
mongoose.connect(process.env.mongoDB_URL, {useNewUrlParser: true, useUnifiedTopology:true})
.then(()=>console.log("DB Connected"))
.catch((e)=>{
    console.log("Error occurred", e)
    process.exit(1);
})

// Define a route to handle the rot URL
app.get('/', (req, res) => {
  res.send('Hello, world!'); // You can customize the response here
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.use('/api/auth', authRouter);
app.use('/api', bookingsRouter);
app.use('/api/review', reviewRouter)
app.use('/payment', paymentRouter)