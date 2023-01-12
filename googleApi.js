const axios = require('axios');
const connectDB = require('./config/db.js');
const {book} = require('./Models/Book')


exports.fetch = async(topic, page = 0)=>{
    console.log(page);
    // https://developers.google.com/books/docs/v1/using#query-params
    const v = "https://www.googleapis.com/books/v1/volumes?q="+topic+"&maxResults="+ 10;
    
    axios.get(v)
    .then(async(response)=>{
        // console.log(response.data.items)
        console.log(response.data.items)
        importData(response.data.items)
    })
    .catch((error)=>{console.log(`Error occured  ${error}`)});
}
// Би async хэрэглэх газар async ашиглахгүй бол юу болдгийг нь мэдмээр байна. Яг ямар алдаа гардгийг нь мэдэхгүй болохоор шал тэнэг байна л даа. 
function importData(resource){
     resource.map(async({id, volumeInfo})=>{
        await book.create([{ 
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

// connectDB();

connectDB(); 
fetch("New York Bestseller", 6);