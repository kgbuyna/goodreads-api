const express = require('express');
const {
    getBooks , getBook
} = require('../controllers/books')

const router = express.Router({ mergeParams: true});
router.route('/').get(getBooks);
// want to read дээр дарахдаа нөгөө газар луу гаа post хийнэ. Тэгээд бас rate хийхдээ rate-г нь өөрчлөнө шүү дээ. 
router.route('/:id').get(getBook);

module.exports = router;  