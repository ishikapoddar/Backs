const router = require('express').Router()
const Book = require('../models/book');



// to get a single book
router.get('/:id' , (req , res)=>{
   
    Book.find({bookId:req.body.bookId},{ _id: 0, __v: 0 },(err,data)=>{
        if(err){
            res.send(err)
        }
        res.json(data);
    })
})

//add a new book
//we will extract all the information from teh body of the request
router.post('/' , async (req , res)=>{
   // const {title, author, description,bookId} = req.body
    const book =new Book({
        
        title:req.body.title,
        author:req.body.author,
        description:req.body.description,
        bookId:req.body.bookId,
       
        lentto:req.body.lentto
        
    })

    Book.countDocuments({ bookId: req.body.bookId }, function (err, count) {
        if (count > 0) {
          Book.findOneAndUpdate(
            { bookId: req.body.bookId },
            {
              $inc: {
                author: req.body.author,
              },
            },
            { new: true },
            (err, book) => {
              if (err) {
                res.send(err);
              } else res.json(book);
            }
          );
        } else {
          book.save((err, Book) => {
            if (err) {
              res.send(err);
            }
            res.json(Book);
          });
        }
      });
    });
    
// router.get('/delete/:id', (req, res) => {  

//     Book.deleteOne({bookId:req.body.bookId})
//     res.json({message: 'delete an existing book'});
// });

//update a book
// router.put('/:id', (req, res) => {
//     //res.json({message: 'update a book'});
//     const book =new Book({
//         bookId:req.body.bookId,
//         title:req.body.title,
//         author:req.body.author,
//         description:req.body.description
        
//     })
//     book.save((err, Book) => {
//         if (err) {
//           res.send(err);
//         }
//         res.json(Book);
//       });

// });

router.delete('/:id', (req, res) => {
  const id = req.params.bookId;
  
  Book.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/books' });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports  = router