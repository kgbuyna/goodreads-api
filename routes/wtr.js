const express = require('express');
const {
    getBooks , getBook, addToList, removeFromList
} = require('../controllers/wantToRead')

const router = express.Router({ mergeParams: true});

router.route('/').get(getBooks).post(addToList);
// router.get("/", async (req, res, next) => {
//     res.status(201).send({test:"sda"});
//   });

// want to read дээр дарахдаа нөгөө газар луу гаа post хийнэ. Тэгээд бас rate хийхдээ rate-г нь өөрчлөнө шүү дээ. 
router.route('/:id').get(getBook).delete(removeFromList);

module.exports = router;  