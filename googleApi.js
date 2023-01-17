const axios = require("axios");
const connectDB = require("./config/db.js");
const { book } = require("./Models/Book");

exports.fetch = async (topic, page, maxResults) => {
  // console.log(page);
  const startIndex = parseInt(page) * maxResults;
  const v =
    "https://www.googleapis.com/books/v1/volumes?q=" +
    topic +
    "&maxResults=" +
    maxResults +
    "&startIndex=" +
    startIndex;

  await axios
    .get(v)
    .then(async (response) => {
      console.log(response.data.items.length);
      await importData(response.data.items); 
    })
    .catch((error) => {
      console.log(`Error occured  ${error}`);
    });
};
// Би async хэрэглэх газар async ашиглахгүй бол юу болдгийг нь мэдмээр байна. Яг ямар алдаа гардгийг нь мэдэхгүй болохоор шал тэнэг байна л даа.
async function importData(resource) {
  // Зүгээр энийг ажиллуулах юм бол
  await resource.map(async ({ id, volumeInfo }) => {
    book
      .create([
        {
          _id: id,
          title: volumeInfo.title,
          categories: volumeInfo.categories,
          authors: volumeInfo.authors,
          publishedDate: volumeInfo.publishedDate,
          desc: volumeInfo.description,
          img: volumeInfo.imageLinks.thumbnail,
          pages: volumeInfo.pageCount,
        },
      ])
      .then(() => {
        book.countDocuments().then((count) => {
          console.log("Number of documents: " + count);
        });
      });
  });
  //   console.log("DB ruu hiij duuslaa 1");
}

connectDB();
// fetch("New York Bestseller", 6);
