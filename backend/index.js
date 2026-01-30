const express = require('express')
const app = express();
require('dotenv').config();
require("./Models/dbs")
const bodyParser = require('body-parser')
const cors = require('cors')
const authRouter = require("./Routes/authRouter")

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json())
app.use(cors())

app.use('/auth',authRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})