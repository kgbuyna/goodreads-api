const axios = require('axios');
const connectDB = require('./config/db.js');
const book = require('./Models/Book')

async function fetch(topic, size){
    axios.get("https://www.googleapis.com/books/v1/volumes?q="+topic+"&maxResults="+ size)
    .then((response)=>importData(response.data.items))
    .catch((error)=>{console.log("Error occured")});
}

function importData(resource){
    resource.map(({id, volumeInfo})=>{
        book.create([{ 
            _id: id,
            title:volumeInfo.title, 
            categories:volumeInfo.categories, 
            authors: volumeInfo.authors,
            publishedDate:volumeInfo.publishedDate,
            desc:volumeInfo.description,
            img:volumeInfo.imageLinks.thumbnail,
            pages:volumeInfo.pageCount
        }])         
    })
}

connectDB(); 
fetch("New York Bestseller", 6);