const axios = require('axios');
const connectDB = require('./config/db.js');
const {book} = require('./Models/Book')


exports.fetch = async(topic, page, maxResults)=>{
    console.log(page);
    const startIndex = parseInt(page) * maxResults;  
    // const maxResults = max;
    console.log("Topic: " + topic);
    const v = "https://www.googleapis.com/books/v1/volumes?q="+topic+"&maxResults="+ max + "&startIndex=" + startIndex;
    // https://www.googleapis.com/books/v1/volumes?q=love&maxResults=1&&startIndex=2
    // Энд ажиллаж байх ёстой шүү дээ.  
    console.log("Requests: "+ v);    
    axios.get(v)
    .then(async(response)=>{
        console.log("Ajillaj bn."); 
        // console.log(response.data.items)
        console.log(response.data.items[0]);
        importData(response.data.items);
    })
    .catch((error)=>{console.log(`Error occured  ${error}`)});
}
// Би async хэрэглэх газар async ашиглахгүй бол юу болдгийг нь мэдмээр байна. Яг ямар алдаа гардгийг нь мэдэхгүй болохоор шал тэнэг байна л даа. 
async function importData(resource){
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