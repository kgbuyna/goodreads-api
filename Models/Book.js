const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
    id : {
        type : String, 
        // unique : true, 
    }, 
    title : String,
    categories:[String],  
    authors:[String], 
    publishedDate: Date, 
    desc: String, 
    rating:{type :Number, default:0}, 
    reviews:{type:Number, default:0}, 
    img: String,
    pages:Number, 
});

module.exports = mongoose.model('book', bookSchema);