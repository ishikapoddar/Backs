const router = require('express').Router()
const Book = require('../models/book');




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
   
    const book =new Book({
        
        title:req.body.title,
        author:req.body.author,
        description:req.body.description,
        bookId:req.body.bookId,
       
        lentto:req.body.lentto
        
    })

    
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
router.patch('/:id',async(req,res)=>{
  try{
    const _id=req.params.id;
    const update1= await Book.findByIdAndUpdate(_id, req.body, { new:true});
  
    res.send(update1);

  }
  catch(e){
     //res.status(404).send(update1);
  }
})

module.exports  = router