//1-sep-23
const cors = require("cors")
require('dotenv').config()
const PORT = process.env.PORT || 8080;
const express = require('express')
const bodyParser = require("body-parser");
const app = express();
// const sendMail = require('./controller/sendMail')
const mongoose = require('mongoose');
const  route  = require('./Routing/index');
const url = "mongodb+srv://anshivam18:anshivam18@cluster0.fjtcd0e.mongodb.net/?retryWrites=true&w=majority"
app.use(bodyParser.json());
app.use(cors())


// app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`)) //---> imp
app.listen( PORT, () => console.log(`Server is up and running on port ${PORT}`)) //---> imp



//mongo db connection through mongoose
mongoose.connect(url).then((res)=>console.log("data base connected")).catch((err)=>console.log("db not connected ----> ", err))

 
//routes
app.use('/api', route)


// //get api =>
app.get('/', (req, res) => res.send(`Server is up and running on port ${PORT}`))
// app.get('/product', (req, res) => res.send("hey there"))


// app.get("/sendmail", sendMail);
 

