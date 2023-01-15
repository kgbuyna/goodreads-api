const axios = require('axios');
const connectDB = require('./config/db.js');
const {book} = require('./Models/Book')


exports.fetch = async (topic, page, maxResults)=>{
    console.log(page);
    const startIndex = parseInt(page) * maxResults;  
    const v = "https://www.googleapis.com/books/v1/volumes?q="+topic+"&maxResults="+ maxResults + "&startIndex=" + startIndex;
    // https://www.googleapis.com/books/v1/volumes?q=love&maxResults=1&&startIndex=2
    // Энд ажиллаж байх ёстой шүү дээ.  
    axios.get(v)
    .then(async(response)=>{
        importData(response.data.items);
        // db рүү гээ батны орж байна. Харин 
        console.log("Imported");
    })
    .catch((error)=>{console.log(`Error occured  ${error}`)});
}
// Би async хэрэглэх газар async ашиглахгүй бол юу болдгийг нь мэдмээр байна. Яг ямар алдаа гардгийг нь мэдэхгүй болохоор шал тэнэг байна л даа. 
function importData(resource){
     resource.map(async({id, volumeInfo})=>{
        await book.create([{ 
            bookId: id,
            title:volumeInfo.title, 
            categories:volumeInfo.categories, 
            authors: volumeInfo.authors,
            publishedDate:volumeInfo.publishedDate,
            desc:volumeInfo.description,
            img:volumeInfo.imageLinks.thumbnail ? volumeInfo.imageLinks.thumbnail : null,
            pages:volumeInfo.pageCount
        }])         
    })
}


connectDB(); 
// fetch("New York Bestseller", 6);