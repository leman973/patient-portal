const express = require('express')
const app = express();
require('dotenv').config();
const connectDB = require('./config/mongoDB')
const bodyParser = require('body-parser')
const cors = require('cors')
const authRouter = require("./Routes/authRouter")
const BookingRouter = require("./Routes/BookingRouter")
const userDetailsRouter = require("./Routes/userDetailsRouter")

const PORT = process.env.PORT || 8080;
connectDB();

app.use(bodyParser.json())
app.use(cors())

app.use('/api/auth',authRouter)
app.use('/api/bookings',BookingRouter)
app.use('/api/me',userDetailsRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})