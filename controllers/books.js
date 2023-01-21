const { book } = require("../Models/Book");
const { fetch } = require("../googleApi");
const asyncHandler = require("../middleware/asyncHandler");

exports.getBooks = asyncHandler(async (req, res, next) => {
  // Searchbar дээр keyword орж тэгэхээр нь эд нарыг ашиглана. Homescreen дээр гарч ирэх номноос ялгаатай нь устгахгүй дээр нь нэмж бичнэ.
  if (req.query.keyword) {
    await fetch(req.query.keyword, req.query.page, req.query.max).then(
      async () => {
        console.log("Datagaa butsaalaa shu.");
        const books = await book.find();
        if (books) {
          //   Яг энд илгээж байхад нь db хоосон байсан гэсэн үг шүү дээ.
          res.status(200).json({
            success: true,
            data: books,
          });
        }
      }
    );
  } else {
    await book.deleteMany({}).exec().then(async()=>{
      await fetch("Love", req.query.page, req.query.max).then(async () => {
        books=[];
        while(books.length != 6){
          books = await book.find();
        }
        res.status(200).json({
          success: true,
          data: books,
        });
      });
    })
  }
});

exports.getBook = asyncHandler(async (req, res, next) => {
  let query;
  console.log("Get request");
  query = book.find(req.id);
  const books = await query;
  if (books) {
    res.status(200).json({
      success: true,
      data: books,
    });
  }
});
exports.updateRating = async (req, res, next) => {
  const doc = await Model.findById(id);
  doc.rating = req.rating;
  await doc.save();
  res.status(200).json({
    success: true,
  });
};
