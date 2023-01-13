const asyncHandler = require("../middleware/asyncHandler");
const { wantToReads } = require("../Models/Book");

exports.getBook = asyncHandler(async (req, res, next) => {
  let query;
  console.log("Get request");
  query = wantToReads.find(req.id);
  const books = await query;
  if (books) {
    res.status(200).json({
      success: true,
      data: books,
    });
  }
});

exports.getBooks = asyncHandler(async (req, res, next) => {
  let query;
  console.log("Get request");
  query = wantToReads.find();
  const books = await query;
  if (books) {
    res.status(200).json({
      success: true,
      data: books,
    });
  }
});

exports.addToList = asyncHandler(async (req, res, next) => {
  console.log(req.body);

  // const obj = req.body;
  // obj["id"] = obj["_id"];
  // delete obj["_id"];
  
  const book = await wantToReads.create(req.body);
  console.log("");
  res.status(200).json({
    success: true,
    data: book,
  });
});

exports.removeFromList = asyncHandler(async (req, res, next) => {
  const book = await wantToReads.deleteOne(req.id);
  res.status(200).json({
    success: true,
    data: book,
    message: "Устгагдлаа.",
  });
});
