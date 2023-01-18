// const mongoose = require('mongoose');

// const bookSchema = new mongoose.Schema({
//     title: {type:String, required:true},
//     author: {type:String, required:true},
//     description: {type:String, required:true},
// },{
//     timestamps: true,
// });

// const Book = mongoose.model('book', bookSchema)

// module.exports = Book
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {type:String, required:true},
    author: {type:String, required:true},
    description: {type:String, required:true},
    bookId:{
        type:Number,
        required:true
    },
    
    lentto:{type:String, required:true}
},{
    timestamps: true,
});

const Book = mongoose.model('book', bookSchema)

module.exports = Book