const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = mongoose.model('User', new  Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 15,
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 25,
        unique: true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 25
    }
}));
// Эндээсээ тэгээд get , post этр хийгээд явна шүү дээ. 


exports.User = User;