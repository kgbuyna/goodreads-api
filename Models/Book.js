const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
    id : {
        type : String,
    }, 
    title : String,
    categories:[String],  
    authors:[String], 
    publishedDate: Date, 
    desc: String, 
    rating:{type :Number, default: Math.floor(Math.random() * 5)}, 
    reviews:{type:Number, default: Math.floor(Math.random() * 10000)}, 
    img: String,
    pages:Number, 
}); 
exports.wantToReads = mongoose.model('wantToReads', bookSchema); 
exports.reading = mongoose.model('reading', bookSchema); 
exports.book = mongoose.model('book', bookSchema);