const {book} = require('../Models/Book');
const {fetch} = require('../googleApi')
const asyncHandler = require('../middleware/asyncHandler')

exports.getBooks = asyncHandler(async(req, res, next)=>{
    let query; 
    if(req.keyword)
        // Энэ page-г чинь req явуулахдаа оруулж өгнө. 
        fetch(req.params.keyword, req.params.page);
    else{
        // Refresh хийгдэхэд энэ page чинь өөрчлөгдөнө. 
        book.deleteMany();
        fetch('New York Time Bestsellers', req.params.page);
    }
    query = book.find();
    const books = await query; 
    if(books){
        res.status(200).json({
            success: true, 
            data: books
        })
    }
})

exports.getBook =  asyncHandler(async(req, res, next)=>{
    let query;
    console.log("Get request");
    query = book.find(req.id);
    const books = await query; 
    if(books){
        res.status(200).json({
            success: true, 
            data: books
        })
    }
})
exports.updateRating = async(req, res, next) =>{
    const doc = await Model.findById(id);
    doc.rating = req.rating;
    await doc.save();
    res.status(200).json({
        success: true
    })
}
  