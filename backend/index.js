const express = require('express')
const app = express();
require('dotenv').config();
require("./Models/dbs")
const bodyParser = require('body-parser')
const cors = require('cors')
const authRouter = require("./Routes/authRouter")
const Productrouter = require("./Routes/Productrouter")

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json())
app.use(cors())

app.use('/auth',authRouter)
app.use('/products',Productrouter)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})