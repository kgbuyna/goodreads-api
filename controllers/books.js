const {book} = require('../Models/Book');
const {fetch} = require('../googleApi')
const asyncHandler = require('../middleware/asyncHandler')

exports.getBooks = asyncHandler(async(req, res, next)=>{
    let query; 
    if(req.query.keyword)
        // Энэ page-г чинь req явуулахдаа оруулж өгнө. 
        // Гэхдээ page-г заавал бас оруулаад баймааргүй байнаа. Эхнийх дээр бол угаасаа дамжуулна гэж худлаа. Тэгэхээр дамжуулахгүй бол 0 байна гэдгийг зааж өгөх хэрэгтэй юм шиг санагдав. 
        fetch(req.query.keyword, req.query.page, req.query.max);
    else{
        // Refresh хийгдэхэд энэ page чинь өөрчлөгдөнө. 
        await book.deleteMany({});
        
        await fetch('Love', req.query.page, req.query.max);
        // Энд ажиллах ёстой.
        console.log("Api-гаас датагаа авав."); 
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
  