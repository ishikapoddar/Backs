

const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const bookRoutes = require('./routes/books.js')
const port = process.env.PORT || 3000
//const hello="mongodb+srv://ishikaback:M1them1tics@cluster0.6wobkbs.mongodb.net/Library?retryWrites=true&w=majority"
mongoose.set('strictQuery', false);

//express app
const app = express()


//middlewares
app.use(express.json())
app.use((req, res, next) =>{
   console.log(req.path, req.method);
   next()
})

//routes
app.use('/books',bookRoutes)

//connect to the DB

mongoose.connect(process.env.MONGO_URI)
   .then(() => {
      //listen for requests
      app.listen(port , ()=> console.log('> Connected to DB and listening to port ' + port))
   })
   .catch((error) => {
      console.log(error)
   })

