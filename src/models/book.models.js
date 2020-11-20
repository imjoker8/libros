const mongoose = require('mongoose');
const BookSchema = mongoose.Schema({
    name: {
        type:String, 
        required:true
    },
    autor: {
        type:String, 
        required:true
    },
    imagen: {
        type:String,
    },
    status: {
        type:String
    }
});

module.exports = mongoose.model('book_cards', BookSchema);