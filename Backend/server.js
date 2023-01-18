// const express = require('express');
//  const mongoose = require('mongoose');

// const Book = require('./models/book');

// const app=express();

// mongoose.set('strictQuery', false);


// const hello="mongodb+srv://ishikaback:M1them1tics@cluster0.6wobkbs.mongodb.net/Library?retryWrites=true&w=majority"

// mongoose.connect(hello)
//     .then((result)=>{
//         console.log('connected to the database')
//         app.listen(3000);
//     })
//     .catch((err)=>{console.log(err)})


// app.get ('/home', (req, res) => {
//     res.json({
//         name:"ishia"
//     })
// })


// app.post ('/books', (req, res) => {

//     const book = new Book(req.body);

//     book.save()
//         .then((result)=>{
//             res.redirect('/home')
//         })
//         .catch((err)=>{
//             console.log(err)
//         })

    
// })

// app.use((req,res) => {
//     res.json({
//         log: "404 not found"
//     })
// })

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

