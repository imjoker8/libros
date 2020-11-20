const express = require('express');
const { update } = require('../models/book.models');
const router = express.Router();
const Books = require('../models/book.models')

//GET all the book cards
router.get('/', async (req, res) => {
    try {
        const books = await Books.find();
        res.json({data: books});
    } catch(err) {
        res.json({message: err });
    }
});

//POST create a new card
router.post('/', async (req, res) =>{
    const book = new Books({
        name: req.body.name,
        autor: req.body.autor,
        imagen: req.body.imagen,
        state: req.body.state,
    });
    try { 
        const saveBook = await book.save();
        res.json({data:saveBook});
    } catch(err) {
        res.json({message: err});
    }
});

//GET one specific book
router.get('/:id', async (req, res)=>{
    try{
        const book = await Books.findById(req.params.id);
        res.json({data: book});
    } catch(err) {
        res.json({message: "No se ha encontrado el libro."});
    }
});

//DELETE a book
router.delete('/:id', async (req, res) => {
    try {
        const removeBook = await Books.remove({_id: req.params.id });
        res.json({data: removeBook});
    } catch (err) {
        res.json({message: "No se pudo eliminar el libro."});
    }
});

//UPDATE a book
router.put('/:id', async (req, res) => {
    const _id = req.params.id;
    const body = req.body;
    try {
        const updateBook = await Books.findByIdAndUpdate(
            _id, body,
            {new: true});
        if (!updateBook) {
            return res.status(400).json({
                message: err
            })
        }
        res.status(200).json(updateBook)

    } catch (err) {
        res.status(500).json({message:"No se ha podido actualizar el libro."});
    }
});

module.exports = router;