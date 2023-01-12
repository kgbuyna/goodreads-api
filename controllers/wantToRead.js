const asyncHandler = require('../middleware/asyncHandler');
const {wantToReads} = require('../Models/Book');



exports.getBook = asyncHandler( async (req, res, next)=>{
    let query;
    console.log("Get request");
    query = wantToReads.find(req.id);
    const books = await query; 
    if(books){
        res.status(200).json({
            success: true, 
            data: books
        })
    }
})

exports.getBooks = asyncHandler( async (req, res, next)=>{
    let query;
    console.log("Get request");
    query = wantToReads.find();
    const books = await query; 
    if(books){
        res.status(200).json({
            success: true, 
            data: books
        })
    }
})


exports.addToList = asyncHandler( async(req, res, next) =>{
    req.body.id = req.body._id;
    console.log(req.body);
    
    // console.log("Add request");
    // console.log(req.body); 
    // Ийшээ бол дамжуулж байгаа шдээ. Гэхдээ нөгөө хэсэг нь хаана байна вэ? req р ч гэсэн орж ирж байгаа 
    // localhost дээр ажиллаж байна уу? шалгаад үзэх хэрэгтэй юм шиг байна. 

    const book = await wantToReads.create(req.body);
    console.log("");
    res.status(200).json({
        success:true,
        data: book,
    })
})

exports.removeFromList = asyncHandler( async(req, res, next) =>{    
    const book = await wantToReads.deleteOne(req.id);
    res.status(200).json({
        success:true,
        data: book,
        message:'Устгагдлаа.'
    })
})
  